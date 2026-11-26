// Joga as 3 fases da "Corrida para a Arca" (noe.html) com toques reais (multi-toque via CDP) nos botões
// ◀ ▶ PULAR e tocando nos animais na tela; no PC usa o teclado (setas/espaço) e o mouse para tocar.
const {chromium,VPS,abrir,OUT}=require('./cnd-comum.js'); const fs=require('fs'); fs.mkdirSync(OUT,{recursive:true});
const ONE=!!process.env.UMDEDO; // UMDEDO=1: um botão de cada vez (como uma criança pequena)
const W2C=`(wx,wy)=>{ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2, z=ZOOM*cam.z; const lx=(wx-cam.x)*z+W/2, ly=(wy-cam.y)*z+H*CY; return {x:(lx*K+offX)/dpr, y:ly*K/dpr}; }`;
(async()=>{ const b=await chromium.launch(); const only=process.env.VP;
for(const [nm,opt] of VPS){ if(only && only!==nm) continue; const errs=[]; const {c,p}=await abrir(b,opt,process.env.ARQ||'noe.html',errs);
  const touch=!!opt.hasTouch, cdp=touch? await c.newCDPSession(p):null;
  await p.evaluate(()=>startGame()); await p.waitForTimeout(600);
  const pads=await p.evaluate(()=>Object.fromEntries(['gL','gR','gJ'].map(id=>{ const r=document.getElementById(id).getBoundingClientRect(); return [id,{x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height}]; })));
  const hold={}; // id -> {x,y}
  // CDP: touchStart recebe todos os dedos ativos; touchEnd recebe só o dedo que sai
  const sendT=async(type,only)=>{ const pts=type==='touchEnd'? [{x:only.x,y:only.y,id:only.id}] : Object.entries(hold).map(([k,v])=>({x:v.x,y:v.y,id:+k})); await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:pts}); };
  const press=async(k,on)=>{ if(touch){ const id={gL:1,gR:2,gJ:3}[k]; if(on){ if(hold[id]) return; hold[id]=pads[k]; await sendT('touchStart'); } else { if(!hold[id]) return; const q={...hold[id],id}; delete hold[id]; await sendT('touchEnd',q); } }
    else { const key={gL:'ArrowLeft',gR:'ArrowRight',gJ:'Space'}[k]; if(on) await p.keyboard.down(key); else await p.keyboard.up(key); } };
  const tap=async(x,y)=>{ if(touch){ hold[9]={x,y}; await sendT('touchStart'); delete hold[9]; await sendT('touchEnd',{x,y,id:9}); } else await p.mouse.click(x,y); };
  const log=[]; let ok=true, t0=Date.now(), lastX=0, lastProg=Date.now(), phase=1, jumpUntil=0, offscreen=new Set(), shots=new Set();
  while(Date.now()-t0<240000){
    const s=await p.evaluate(`(()=>{ const v=${W2C}; const g=GS; return {ph:g.phase, won:g.won, x:g.p.x, y:g.p.y, gr:g.p.ground, vy:g.p.vy, falls:g.falls, END:GW.END, gaps:GW.GAPS, n:g.animals.filter(a=>a.follow).length, N:g.animals.length,
      an:g.animals.filter(a=>!a.follow).map(a=>({id:a.id,x:a.x,y:a.y,s:v(a.x,a.y-30)})), me:v(g.p.x,g.p.y-60), iw:innerWidth, ih:innerHeight, gwin:!document.getElementById('gwin').hidden}; })()`);
    if(s.gwin){ break; }
    if(s.ph!==phase){ log.push(`f${phase} ok`); phase=s.ph; lastProg=Date.now(); }
    if(s.y<60 && (s.me.x<0||s.me.x>s.iw||s.me.y<0||s.me.y>s.ih)){ /* caindo no riacho não conta */ if(!offscreen.has('noe'+s.ph)){ offscreen.add('noe'+s.ph); log.push(`f${s.ph} NOÉ FORA DA TELA x=${Math.round(s.x)} y=${Math.round(s.y)} tela=${JSON.stringify(s.me)}`); ok=false; } }
    // toca nos animais visíveis e próximos
    for(const a of s.an){ if(Math.abs(a.x-s.x)<300){ const vis=a.s.x>10&&a.s.x<s.iw-10&&a.s.y>10&&a.s.y<s.ih-10;
        if(!vis){ if(!offscreen.has(s.ph+':'+a.id)){ offscreen.add(s.ph+':'+a.id); log.push(`f${s.ph} animal ${a.id} perto mas FORA DA TELA ${JSON.stringify(a.s)}`); } continue; }
        if(process.env.SHOT && !shots.has(s.ph)){ shots.add(s.ph); await p.screenshot({path:`${OUT}/noe-${nm}-f${s.ph}.png`}); }
        if(ONE){ await press('gR',false); await press('gL',false); } await tap(a.s.x,a.s.y); } }
    if(s.won){ await press('gR',false); await press('gJ',false); await p.waitForTimeout(200); continue; }
    const now0=Date.now(); const behind=s.an.filter(a=>a.x<s.x-60);
    const goLeft=behind.length>0 && s.x>s.END-480;
    if(!(ONE && now0<jumpUntil)){ await press(goLeft?'gR':'gL',false); await press(goLeft?'gL':'gR',true); }
    const now=Date.now();
    if(now<jumpUntil){ } else { await press('gJ',false);
      const dir=goLeft?-1:1; const gap=s.gaps.find(([a,b])=> dir>0? (a-s.x>0 && a-s.x<85) : (s.x-b>0 && s.x-b<85));
      if(gap && s.gr){ if(ONE){ await press('gR',false); await press('gL',false); await p.waitForTimeout(120); await press('gJ',true); await p.waitForTimeout(90); await press('gJ',false); jumpUntil=Date.now()+900; }
        else { await press('gJ',true); jumpUntil=now+420; } } }
    if(Math.abs(s.x-lastX)>5 || s.won){ lastX=s.x; lastProg=now; } else if(now-lastProg>8000){ log.push(`f${s.ph} TRAVADO x=${Math.round(s.x)}`); ok=false; break; }
    await p.waitForTimeout(25);
  }
  for(const k of ['gL','gR','gJ']) await press(k,false);
  const r=await p.evaluate(()=>({gwin:!document.getElementById('gwin').hidden, phase:GS.phase, falls:GS.fallsBy, stars:document.getElementById('gStars').textContent}));
  if(process.env.SHOT) await p.screenshot({path:`${OUT}/noe-${nm}-gwin.png`});
  console.log(nm, r.gwin&&ok?'OK':'FALHOU', JSON.stringify(r), 'pads='+JSON.stringify(Object.values(pads).map(q=>Math.round(q.w))), log.join(' | '), errs.length?'ERROS: '+errs.join(';'):'', Math.round((Date.now()-t0)/1000)+'s');
  await c.close(); }
await b.close(); })();
