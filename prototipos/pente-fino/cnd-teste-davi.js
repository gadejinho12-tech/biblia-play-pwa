// Joga "A Funda de Davi" (davi.html): toca nas 5 pedras lisinhas (convertendo mundo->tela) e depois
// segura/solta a funda de verdade (toque via CDP nos aparelhos de toque, mouse no PC) nas 3 fases.
const {chromium,VPS,abrir,OUT}=require('./cnd-comum.js'); const fs=require('fs'); fs.mkdirSync(OUT,{recursive:true});
const W2C=`(wx,wy)=>{ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2, z=ZOOM*cam.z*PZ(); const lx=(wx-cam.x)*z+W/2, ly=(wy-cam.y)*z+H*CY; return {x:(lx*K+offX)/dpr, y:ly*K/dpr, r:55*z*K/dpr, vr:15*z*K/dpr}; }`;
(async()=>{ const b=await chromium.launch(); const only=process.env.VP;
for(const [nm,opt] of VPS){ if(only && only!==nm) continue; const errs=[]; const {c,p}=await abrir(b,opt,'davi.html',errs);
  const touch=!!opt.hasTouch, cdp=touch? await c.newCDPSession(p):null;
  const down=async(x,y)=>{ if(touch) await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]}); else { await p.mouse.move(x,y); await p.mouse.down(); } };
  const up=async(x,y)=>{ if(touch) await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[{x,y,id:1}]}); else await p.mouse.up(); };
  const tap=async(x,y)=>{ await down(x,y); await p.waitForTimeout(40); await up(x,y); };
  await p.evaluate(()=>startGame()); await p.waitForTimeout(2500); // câmera se ajeita
  const log=[]; let ok=true;
  const stones=await p.evaluate(`(()=>{ const v=${W2C}; return BROOK_STONES.map(([x,y,s],i)=>({i,s,...v(x,y)})); })()`);
  const vp=await p.evaluate(()=>({w:innerWidth,h:innerHeight}));
  if(process.env.SHOT) await p.screenshot({path:`${OUT}/davi-${nm}-pedras.png`});
  for(const s of stones.filter(q=>q.s)){ const vis=s.x>s.vr&&s.x<vp.w-s.vr&&s.y>0&&s.y<vp.h;
    if(!vis){ log.push(`pedra lisa ${s.i} FORA DA TELA (${Math.round(s.x)},${Math.round(s.y)})`); ok=false; continue; }
    await tap(s.x,s.y); await p.waitForTimeout(200); }
  const np=await p.evaluate(()=>GS.nPicked); log.push('pedras='+np+' raioToque='+Math.round(stones[0].r)+'px raioPedra='+Math.round(stones[0].vr)+'px');
  if(np<5){ ok=false; }
  else for(let ph=1;ph<=3;ph++){
    await p.waitForFunction(n=>GS.stage==='sling'&&GS.phase===n&&GS.busy<=0&&!GS.stone,ph,{timeout:15000}).catch(()=>{ log.push('f'+ph+' não começou'); ok=false; });
    if(!ok) break;
    if(process.env.SHOT) await p.screenshot({path:`${OUT}/davi-${nm}-f${ph}.png`});
    let tries=0;
    while(tries<8){ const done=await p.evaluate(n=>GS.phase!==n||GS.hit,ph); if(done) break;
      const ready=await p.evaluate(()=>GS.stage==='sling'&&!GS.stone&&!GS.hit&&GS.busy<=0); if(!ready){ await p.waitForTimeout(150); continue; }
      tries++; const X=vp.w/2, Y=vp.h*.45; await down(X,Y);
      const t0=Date.now(); let shot=false;
      while(Date.now()-t0<6000){ const s=await p.evaluate(()=>{ const [lo,hi]=zone(); return {pw:GS.power,lo,hi,hold:GS.hold,ht:GS.holdT}; });
        if(!s.hold){ log.push('f'+ph+' segurar não pegou'); break; }
        if(s.ht>.5 && s.pw>s.lo+.06 && s.pw<s.hi-.06){ if(process.env.SHOT&&!shot&&tries===1){ shot=true; await p.screenshot({path:`${OUT}/davi-${nm}-f${ph}-mira.png`}); } break; }
        await p.waitForTimeout(10); }
      await up(X,Y); await p.waitForTimeout(1600); }
    log.push(`f${ph} lances=${tries}`);
  }
  await p.waitForFunction(()=>!document.getElementById('gwin').hidden,null,{timeout:15000}).catch(()=>{});
  const r=await p.evaluate(()=>({gwin:!document.getElementById('gwin').hidden, phase:GS.phase, hit:GS.hit, by:GS.throwsBy}));
  if(process.env.SHOT) await p.screenshot({path:`${OUT}/davi-${nm}-gwin.png`});
  console.log(nm, r.gwin&&ok?'OK':'FALHOU', JSON.stringify(r), log.join(' | '), errs.length?'ERROS: '+errs.join(';'):'');
  await c.close(); }
await b.close(); })();
