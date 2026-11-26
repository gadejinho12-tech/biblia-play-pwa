// Joga as 3 fases dos jogos de ovelha.html, paes.html e zaqueu.html com cliques/arrastos reais do mouse,
// em 6 telas, e confere se chega na tela final (#gwin). Uso:  S=saida/ node teste-jogos-ovelha-paes-zaqueu.js [ovelha|paes|zaqueu ...]
// (rodar na raiz do repositório). Salva prints do início de cada fase em $S.
const {chromium,devices}=require('playwright'); const fs=require('fs');
const S=process.env.S||'/tmp/pf'; fs.mkdirSync(S,{recursive:true});
const VPS=[['cel-deitado',devices['iPhone 13 landscape']],['cel-empe',devices['iPhone 13']],['tablet-deitado',devices['iPad Mini landscape']],
  ['tablet-empe',devices['iPad Mini']],['pc',{viewport:{width:1280,height:720}}],['android-peq',{viewport:{width:640,height:360},isMobile:true,hasTouch:true}]];
const JOGOS=process.argv.slice(2).length? process.argv.slice(2) : ['ovelha','paes','zaqueu'];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
// conversões (rodam na página): tela virtual (sx,sy) -> px CSS; mundo -> px CSS
const HELP=`window.__v2c=(sx,sy)=>{ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; return {x:(sx*K+offX)/dpr, y:sy*K/dpr}; };
 window.__w2c=(x,y)=>{ const [sx,sy]=toScreen(x,y); return __v2c(sx,sy); };
 window.__dentro=(p,m)=>p.x>=m && p.y>=m && p.x<=innerWidth-m && p.y<=innerHeight-m;`;
async function esperaBanner(p){ for(let i=0;i<60;i++){ if(await p.evaluate(()=>GS.banner<1.4)) return; await sleep(100); } }
// entrada real: toque via CDP (Input.dispatchTouchEvent) nos aparelhos com toque — assim aparece o pointercancel se o
// touch-action do canvas deixar o navegador "roubar" o arrasto —, mouse no pc.
let CDP=null;
async function tStart(p,x,y){ if(CDP) await CDP.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]}); else { await p.mouse.move(x,y); await p.mouse.down(); } }
async function tMove(p,x,y){ if(CDP) await CDP.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]}); else await p.mouse.move(x,y); }
async function tEnd(p){ if(CDP) await CDP.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); else await p.mouse.up(); }
async function tap(p,x,y){ await tStart(p,x,y); await sleep(40); await tEnd(p); }
async function drag(p,pts,hold){ await tStart(p,pts[0].x,pts[0].y); let a=pts[0]; for(const q of pts.slice(1)){ for(let i=1;i<=12;i++){ await tMove(p,a.x+(q.x-a.x)*i/12,a.y+(q.y-a.y)*i/12); await sleep(12); } a=q; } if(hold){ const t=Date.now(); while(Date.now()-t<hold){ await tMove(p,a.x+(Math.random()-.5),a.y); await sleep(50); } } await tEnd(p); }
const prob=[];
const PLAY={
 ovelha:{
  1: async(p,log)=>{ const t0=Date.now(); while(Date.now()-t0<60000){ const r=await p.evaluate(()=>({ph:GS.phase,fin:GS.finished,o:GS.ovs.filter(o=>!o.ok).map(o=>__w2c(o.x,-30))}));
      if(r.ph!==1||r.fin) return true; const alvo=r.o.find(q=>__dentroNode(q,r)); if(alvo) await tap(p,alvo.x,alvo.y); await sleep(120); } return false; },
  2: async(p,log)=>{ const r=await p.evaluate(()=>{ GS.escIdx=4; esconderijos(); /* pior caso: o esconderijo mais à direita */ const t=__w2c(GS.esconde,-30); const todos=GS.lugares.map(([x])=>__w2c(x,-30)); return {t,ok:__dentro(t,10),todos:todos.map(q=>__dentro(q,10)),vw:innerWidth,vh:innerHeight}; });
      if(!r.ok) log('alvo escondido FORA da tela '+JSON.stringify(r.t)); if(r.todos.includes(false)){ log('PROBLEMA esconderijos visíveis: '+r.todos.join(',')); return false; }
      // forçar teste do pior caso: cada esconderijo
      await drag(p,[{x:r.vw/2,y:r.vh/2},r.t],1300); await sleep(300); return await p.evaluate(()=>GS.finished||GS.phase!==2); },
  3: async(p,log)=>{ const rotas=[[[.12,.5],[.25,.5],[.36,.5],[.46,.38],[.6,.36],[.66,.46],[.84,.5]],[[.12,.5],[.22,.18],[.5,.12],[.6,.36],[.84,.5]],[[.12,.5],[.22,.86],[.55,.9],[.6,.64],[.84,.5]]];
      for(const ro of rotas){ const pts=await p.evaluate(ro=>ro.map(([a,b])=>__v2c(a*W,b*H)),ro); await drag(p,pts); await sleep(400); if(await p.evaluate(()=>GS.walkT>=0||GS.finished)) return true; log('rota falhou, tentando outra'); await sleep(600); } return false; } },
 paes:{
  1: async(p,log)=>{ const todos=await p.evaluate(()=>GS.itens.map(i=>({k:i.k,...__w2c(i.x,i.y-12)}))); const foraT=todos.filter(q=>!__dentroNode(q,{vw:VW,vh:VH},20)); if(foraT.length) log('PROBLEMA itens fora da tela: '+foraT.length);
      const r=todos.filter(i=>i.k==='pao'||i.k==='peixe'); const fora=r.filter(q=>!__dentroNode(q,{vw:VW,vh:VH},20)); if(fora.length) log('pães/peixes FORA da tela: '+fora.length);
      for(const q of r){ if(await p.evaluate(()=>GS.finished)) break; await tap(p,q.x,q.y); await sleep(200); } await sleep(200); return await p.evaluate(()=>GS.finished); },
  2: async(p,log)=>{ const t0=Date.now(); while(Date.now()-t0<60000){ const r=await p.evaluate(()=>{ if(GS.phase!==2||GS.finished) return null; const z=ZOOM*cam.z*PZ(), gr=GS.grupos[GS.fome]; if(!GS.pao||GS.pao.voa) return {wait:1}; return {a:__v2c(GS.pao.x,GS.pao.y), b:__w2c(gr.fx*W/z,-60)}; });
      if(!r) return true; if(r.wait){ await sleep(150); continue; } if(!__dentroNode(r.a,{vw:VW,vh:VH},10)) log('pão fora da tela'); await drag(p,[r.a,r.b]); await sleep(700); } return false; },
  3: async(p,log)=>{ const t0=Date.now(); while(Date.now()-t0<90000){ const r=await p.evaluate(()=>{ if(GS.phase!==3||GS.finished) return null; return GS.migalhas.filter(m=>!m.ok).map(m=>__v2c(m.x,m.y)).sort((a,b)=>a.x-b.x); });
      if(!r) return true; if(r.length) await drag(p,r.slice(0,8)); await sleep(300); } return false; } },
 zaqueu:{
  1: async(p,log)=>{ const t0=Date.now(); while(Date.now()-t0<40000){ const r=await p.evaluate(()=>{ if(GS.phase!==1||GS.finished) return null; const B=botoes(); return __v2c(B[GS.lado][0],B[GS.lado][1]); }); if(!r) return true; await tap(p,r.x,r.y); await sleep(160); } return false; },
  2: async(p,log)=>{ const t0=Date.now(); while(Date.now()-t0<60000){ const r=await p.evaluate(()=>{ if(GS.phase!==2||GS.finished) return null; if(GS.mostra>=0||GS.espera>0) return {wait:1}; return GS.seq.slice(GS.entrada).map(i=>__v2c(COISAS[i][2]*W,COISAS[i][3]*H)); });
      if(!r) return true; if(r.wait){ await sleep(150); continue; } for(const q of r){ await tap(p,q.x,q.y); await sleep(250); } await sleep(300); } return false; },
  3: async(p,log)=>{ const t0=Date.now(); while(Date.now()-t0<60000){ const r=await p.evaluate(()=>{ if(GS.phase!==3||GS.finished) return null; if(!GS.moeda) return {wait:1}; const z=ZOOM*cam.z*PZ(); const al=GS.pessoas.find(q=>q.n<4); return {a:__v2c(GS.moeda.x,GS.moeda.y), b:__w2c(al.fx*W/z,-70)}; });
      if(!r) return true; if(r.wait){ await sleep(150); continue; } await drag(p,[r.a,r.b]); await sleep(300); } return false; } } };
let VW=0,VH=0; global.__dentroNode=(q,r,m=10)=>q.x>=m&&q.y>=m&&q.x<=(r.vw||VW)-m&&q.y<=(r.vh||VH)-m;
(async()=>{ const b=await chromium.launch(); const res=[];
 for(const jogo of JOGOS) for(const [nm,opt] of VPS){
  const c=await b.newContext({...opt,deviceScaleFactor:1}); await c.addInitScript(()=>{ try{ sessionStorage.setItem('bl_gire','1'); }catch(e){} });
  const p=await c.newPage(); CDP=opt.hasTouch? await c.newCDPSession(p) : null; let cancel=0; const erros=[]; p.on('pageerror',e=>erros.push(e.message)); p.on('console',m=>{ if(m.type()==='error' && !/fonts|net::|Failed to load/.test(m.text())) erros.push(m.text()); });
  VW=opt.viewport.width; VH=opt.viewport.height;
  await p.goto('file://'+process.cwd()+'/filmes/'+jogo+'.html#jogo'); await sleep(700);
  await p.evaluate(HELP); if(process.env.CSS_VELHO) await p.addStyleTag({content:'body.game #cv{touch-action:manipulation!important}'}); /* simula o CSS antigo */ await p.evaluate(()=>{ window.__cancel=0; addEventListener('pointercancel',()=>__cancel++); }); await p.evaluate(()=>{ document.getElementById('blGire')?.remove(); }); await p.click('#coverGame');
  const log=m=>console.log('  ['+jogo+' '+nm+'] '+m); const fases=[];
  for(let f=1;f<=3;f++){ for(let i=0;i<80 && await p.evaluate(f=>GS.phase!==f,f);i++) await sleep(100); await esperaBanner(p); await sleep(400);
    await p.screenshot({path:`${S}/${jogo}-f${f}-${nm}.png`}); const ok=await PLAY[jogo][f](p,log); fases.push(ok?'ok':'FALHOU'); if(!ok){ log('fase '+f+' não terminou'); break; } }
  for(let i=0;i<70 && await p.evaluate(()=>document.getElementById('gwin').hidden);i++) await sleep(100);
  const win=await p.evaluate(()=>!document.getElementById('gwin').hidden); if(win) await p.screenshot({path:`${S}/${jogo}-fim-${nm}.png`});
  const nc=await p.evaluate(()=>__cancel); const linha=`${jogo} ${nm}${CDP?' (toque)':' (mouse)'}: fases=${fases.join(',')} gwin=${win} pointercancel=${nc} erros=${erros.length?JSON.stringify(erros.slice(0,3)):0}`; console.log(linha); res.push(linha); await c.close(); }
 await b.close(); console.log('\nRESUMO\n'+res.join('\n')); })();
