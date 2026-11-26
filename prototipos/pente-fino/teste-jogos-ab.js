// Joga de verdade (toque/mouse reais) as 3 fases dos jogos de natal, jonas e tempestade
// em vários aparelhos, e confere se todo alvo está na tela, fora da legenda e grande o bastante.
// Uso: S=<pasta-saida> node prototipos/pente-fino/teste-jogos-ab.js natal [aparelho...]
const {chromium,devices}=require('playwright');
const path=require('path'), fs=require('fs');
const OUT=process.env.S||'/tmp/pf'; fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'..','..');
const VIEWS={
  'iphone-deitado':devices['iPhone 13 landscape'], 'iphone-empe':devices['iPhone 13'],
  'ipad-deitado':devices['iPad Mini landscape'], 'ipad-empe':devices['iPad Mini'],
  'pc':{viewport:{width:1280,height:720}}, 'android-deitado':{viewport:{width:640,height:360},hasTouch:true,isMobile:true},
};
const film=process.argv[2]; const only=process.argv.slice(3);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

// ---- funções que rodam na página
const PAGE_HELPERS=`
window.__w2s=function(wx,wy,f){ f=f==null?1:f; const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const z=1+(cam.z*ZOOM*PZ()-1)*f;
  const lx=(wx-cam.x*f)*z+W/2, ly=(wy-cam.y*f)*z+H*CY; return {x:(lx*K+offX)/dpr, y:ly*K/dpr, s:z*K/dpr}; };
window.__v2s=function(lx,ly){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; return {x:(lx*K+offX)/dpr, y:ly*K/dpr, s:K/dpr}; };
window.__blocks=function(){ const r=[]; const s=document.getElementById('sub'); if(s.classList.contains('on')){ const b=s.getBoundingClientRect(); r.push(['legenda',b.left,b.top,b.right,b.bottom]); }
  for(const c of document.querySelectorAll('#ghud .chip')){ const b=c.getBoundingClientRect(); if(b.width) r.push(['hud',b.left,b.top,b.right,b.bottom]); } return r; };
`;

async function run(name,opt){
  const b=await chromium.launch(); const c=await b.newContext({...opt,deviceScaleFactor:1}); const p=await c.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push('pageerror '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('console '+m.text()); });
  await p.goto('file://'+ROOT+'/filmes/'+film+'.html#jogo'); await p.waitForTimeout(700);
  await p.evaluate(()=>{ sessionStorage.setItem('bl_gire','1'); document.getElementById('blGire')?.remove(); });
  await p.evaluate(PAGE_HELPERS);
  const vw=opt.viewport.width, vh=opt.viewport.height;
  const touch=!!opt.hasTouch; const cdp=touch? await c.newCDPSession(p) : null;
  let down=false;
  const T={
    async start(x,y){ down=true; if(touch) await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]}); else { await p.mouse.move(x,y); await p.mouse.down(); } },
    async move(x,y){ if(touch) await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]}); else await p.mouse.move(x,y); },
    async end(){ if(!down) return; down=false; if(touch) await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); else await p.mouse.up(); },
    async tap(x,y){ await T.start(x,y); await sleep(40); await T.end(); },
    async swipe(x1,y1,x2,y2,n=6){ await T.start(x1,y1); for(let i=1;i<=n;i++){ await T.move(x1+(x2-x1)*i/n,y1+(y2-y1)*i/n); await sleep(16); } await T.end(); },
  };
  const issues={}; const note=(k)=>{ issues[k]=(issues[k]||0)+1; };
  // confere um alvo: na tela, fora de legenda/hud, tamanho
  async function check(ph,t,label){ const m=22; if(t.x<m||t.x>vw-m||t.y<m||t.y>vh-m) note(`F${ph} ${label} fora da tela/na borda`);
    if(t.r!=null && t.r*2<44) note(`F${ph} ${label} alvo pequeno (${Math.round(t.r*2)}px)`);
    const bl=await p.evaluate(()=>__blocks()); for(const [k,l,tp,r,bt] of bl) if(t.x>l&&t.x<r&&t.y>tp&&t.y<bt) note(`F${ph} ${label} debaixo da ${k}`); }
  // começa pelo botão da capa, como uma criança
  await p.click('#coverGame'); await p.waitForTimeout(300);
  const t0=Date.now(); const done={}; let shots={}; let lastPh=0;
  while(Date.now()-t0<240000){
    const won=await p.evaluate(()=>!document.getElementById('gwin').hidden); if(won){ done.win=(Date.now()-t0)/1000; break; }
    const st=await BOTS[film].state(p);
    if(st.phase!==lastPh){ if(lastPh) done[lastPh]=(Date.now()-t0)/1000; lastPh=st.phase; await T.end(); }
    if(!st.busy){ const k=st.phase+''; if(!shots[k] && st.shoot){ shots[k]=1; await p.screenshot({path:`${OUT}/${film}-${name}-fase${k}.png`}); } }
    await BOTS[film].act(p,st,T,check,note);
    await sleep(60);
  }
  await T.end();
  if(done.win) await p.screenshot({path:`${OUT}/${film}-${name}-fim.png`});
  const res={film,name,vw,vh,done,issues,errs:errs.slice(0,5)};
  console.log(JSON.stringify(res)); await b.close(); return res;
}

const BOTS={
 natal:{
  async state(p){ return p.evaluate(()=>{ const g=GS; const o={phase:g.phase,busy:g.banner>1.6||g.finished,banner:g.banner,fin:g.finished,shoot:g.banner<=0};
    if(g.phase===1){ o.m=__w2s(g.mx,-30); const hs=g.hay.filter(h=>!h.got&&!h.gone).sort((a,b)=>b.y-a.y); o.hay=hs.map(h=>({...__w2s(h.x,h.y),wx:h.x})); o.r=85*o.m.s; }
    if(g.phase===2){ o.bush=g.bush.map((b,i)=>({i,open:b.open,...__w2s(b.x,b.hy!=null?b.hy:b.y-30)})); o.R=(typeof BUSH_R!=='undefined'?BUSH_R:70); }
    if(g.phase===3){ const s=g.estrelas.find(s=>s.n===g.seq); o.star=s? {...__v2s(s.fx*W,s.fy*H)} : null; o.R=g.estR||34; }
    return o; }); },
  async act(p,st,T,check,note){
    if(st.busy){ if(st.fin) await T.end(); return; }
    if(st.phase===1){ const h=st.hay[0]; if(!this.down){ this.down=1; await T.start(st.m.x,st.m.y); }
      if(h){ if(h.x<0||h.x>p.viewportSize().width) note('F1 palhinha caindo fora da tela'); await T.move(Math.max(2,Math.min(p.viewportSize().width-2,h.x)),st.m.y); } return; }
    this.down=0;
    if(st.phase===2){ const b=st.bush.find(b=>!b.open); if(!b){ note('F2 todos abertos e não terminou'); return; } await check(2,{x:b.x,y:b.y,r:st.R*b.s},'arbusto'); await T.tap(b.x,b.y); await p.waitForTimeout(350); return; }
    if(st.phase===3 && st.star){ await check(3,{x:st.star.x,y:st.star.y,r:st.R*st.star.s},'estrela'); await T.tap(st.star.x,st.star.y); await p.waitForTimeout(300); }
  } },
 jonas:{
  async state(p){ return p.evaluate(()=>{ const g=GS, L=JPH[g.phase-1]; const o={phase:g.phase,kind:L.kind,busy:g.banner>1.2||g.done,fin:g.done,shoot:g.banner<=0,y:g.y,x:g.x,chao:g.chao,hold:g.hold};
    if(L.kind==='nado'){ const ahead=g.objs.filter(q=>q.x>g.x+20&&q.x<g.x+500); const bub=ahead.filter(q=>q.k==='bub'&&!q.got)[0]; const jel=ahead.filter(q=>q.k==='jelly'&&q.x<g.x+220).map(q=>q.y+Math.sin(G*1.4+q.ph)*q.amp); o.ty=bub? bub.y : -200; o.jel=jel; o.me=__w2s(g.x,g.y); }
    if(L.kind==='luz'){ o.luz=g.luzes.filter(l=>!l.ok).map(l=>({...__v2s(l.x,l.y),r:l.r})); }
    if(L.kind==='caminho'){ o.obst=g.objs.filter(q=>(q.k==='pedra'||q.k==='carangueijo')&&!q.hit&&q.x>g.x).map(q=>q.x-g.x)[0]; o.me=__w2s(g.x,g.y-60); }
    return o; }); },
  async act(p,st,T,check,note){ const vp=p.viewportSize();
    if(st.kind==='nado'){ if(st.fin){ await T.end(); this.h=0; return; }
      if(st.me && (st.me.x<0||st.me.x>vp.width||st.me.y<0||st.me.y>vp.height)) note('F1 Jonas fora da tela');
      let ty=st.ty; for(const jy of st.jel) if(Math.abs(jy-ty)<70) ty = jy> -180? jy-110 : jy+110;
      const want = st.y>ty+8; if(want && !this.h){ this.h=1; await T.start(vp.width/2,vp.height/2); } else if(!want && this.h){ this.h=0; await T.end(); } return; }
    this.h=0;
    if(st.kind==='luz'){ if(st.busy) return; const l=st.luz[0]; if(!l) return; await check(2,{x:l.x,y:l.y,r:Math.max(70,l.r*2.2)*l.s},'luzinha'); await T.tap(l.x,l.y); await p.waitForTimeout(120); return; }
    if(st.kind==='caminho'){ if(st.fin) return; if(st.me && (st.me.x<0||st.me.x>vp.width)) note('F3 Jonas fora da tela');
      if(st.chao && st.obst!=null && st.obst<95 && st.obst>40) await T.tap(vp.width/2,vp.height/2); }
  } },
 tempestade:{
  async state(p){ return p.evaluate(()=>{ const g=GS; const o={phase:g.phase,busy:g.banner>1.6||g.finished,fin:g.finished,shoot:g.banner<=0,water:g.water};
    o.pud=g.puddles.filter(q=>!q.dead).map(q=>{ const w=puddleWorld(q); return __w2s(w.x,w.y); });
    o.wav=g.waves.filter(w=>w.state==='up').map(w=>({...__w2s(w.x,60-w.h*.8),R:Math.max(60,w.h*.5),wx:w.x}));
    return o; }); },
  async act(p,st,T,check,note){ if(st.busy) return; const vp=p.viewportSize();
    // ondas visíveis primeiro (só dá pra deslizar no que se vê)
    const vis=st.wav.filter(w=>w.x>10&&w.x<vp.width-10).sort((a,b)=>Math.abs(a.wx)-Math.abs(b.wx));
    if(st.wav.length && !vis.length) note(`F${st.phase} onda chegando fora da tela`);
    const w=vis[0]; if(w){ await check(st.phase,{x:w.x,y:w.y,r:w.R*w.s},'onda'); await T.swipe(w.x,w.y-60,w.x,w.y+60); return; }
    const q=st.pud[0]; if(q){ await check(st.phase,{x:q.x,y:q.y,r:62*q.s},'poça'); await T.tap(q.x,q.y); await p.waitForTimeout(100); }
  } },
};

(async()=>{ const names=only.length? only : Object.keys(VIEWS); const rs=[];
  for(const n of names) rs.push(await run(n,VIEWS[n]));
  fs.writeFileSync(`${OUT}/res-${film}.json`,JSON.stringify(rs,null,1)); })();
