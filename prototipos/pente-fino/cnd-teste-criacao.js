// Joga as 3 fases do jogo "Encha o Mundo de Vida" (criacao.html) arrastando de verdade cada criação
const {chromium,VPS,abrir,V2C,OUT}=require('./cnd-comum.js'); const fs=require('fs'); fs.mkdirSync(OUT,{recursive:true});
(async()=>{ const b=await chromium.launch(); const only=process.env.VP;
for(const [nm,opt] of VPS){ if(only && only!==nm) continue; const errs=[]; const {c,p}=await abrir(b,opt,'criacao.html',errs);
  const touch=!!opt.hasTouch, cdp=touch? await c.newCDPSession(p) : null; // dedo de verdade nos aparelhos de toque
  await p.evaluate(()=>startGame()); await p.waitForTimeout(500);
  const log=[]; let ok=true;
  for(let ph=1;ph<=3;ph++){
    await p.waitForFunction(n=>GS.phase===n && GS.stage==='play' && GS.cur,ph,{timeout:15000}).catch(()=>{});
    await p.waitForTimeout(400);
    let shot=false;
    for(let guard=0;guard<20;guard++){
      const st=await p.evaluate(`(()=>{ const v=${V2C}; if(GS.stage!=='play'||!GS.cur) return null; const b=bands(); const z=ITEM_ZONE[GS.cur];
        const vis0=(0-(cv.width-W*K)/2)/K, vis1=vis0+innerWidth*(cv.width/innerWidth)/K; // faixa x visível (virtual)
        const mid=(vis0+vis1)/2;
        let tx= z==='dia'? (vis0+W/2)/2 : z==='noite'? (W/2+vis1)/2 : mid+ (z==='mar'?-60:80);
        let ty= z==='mar'? (b.land+H)/2 : z==='terra'? (b.sky+b.land)/2 : (z==='ceu'||z==='dia'||z==='noite')? b.sky*.55 : 0;
        if(z==='mar' && GS.phase===1) ty=b.land+90;
        return {it:GS.cur,z, from:v(GS.px,GS.py), to:v(tx,ty), vis:[vis0,vis1], W, iw:innerWidth, ih:innerHeight, placed:GS.placed.length, n:PHASES[GS.phase-1].items.length}; })()`);
      if(!st) break;
      const offs = st.to.x<0||st.to.x>st.iw||st.to.y<0||st.to.y>st.ih || st.from.x<0||st.from.x>st.iw;
      if(offs){ log.push('FORA DA TELA '+JSON.stringify(st)); ok=false; }
      if(touch){ await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:st.from.x,y:st.from.y,id:1}]});
        for(let i=1;i<=8;i++){ await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:st.from.x+(st.to.x-st.from.x)*i/8,y:st.from.y+(st.to.y-st.from.y)*i/8,id:1}]}); await p.waitForTimeout(16); } }
      else { await p.mouse.move(st.from.x,st.from.y); await p.mouse.down();
      for(let i=1;i<=8;i++){ await p.mouse.move(st.from.x+(st.to.x-st.from.x)*i/8, st.from.y+(st.to.y-st.from.y)*i/8); await p.waitForTimeout(16); } }
      if(!shot && process.env.SHOT){ shot=true; await p.screenshot({path:`${OUT}/criacao-${nm}-f${ph}-arrastando.png`}); }
      if(touch) await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); else await p.mouse.up(); await p.waitForTimeout(250);
      const after=await p.evaluate(()=>({placed:GS.placed.length,mist:GS.mistakes.slice(),stage:GS.stage}));
      if(after.placed!==st.placed+1){ log.push(`f${ph} ${st.it}->${st.z} NÃO colocou ${JSON.stringify(after)}`); ok=false; }
    }
    if(process.env.SHOT) await p.screenshot({path:`${OUT}/criacao-${nm}-f${ph}-fim.png`});
    const r=await p.evaluate(()=>({phase:GS.phase,stage:GS.stage,placed:GS.placed.length,mist:GS.mistakes}));
    log.push('f'+ph+' '+JSON.stringify(r));
  }
  await p.waitForFunction(()=>!document.getElementById('gwin').hidden,null,{timeout:12000}).catch(()=>{});
  const win=await p.evaluate(()=>!document.getElementById('gwin').hidden);
  if(process.env.SHOT) await p.screenshot({path:`${OUT}/criacao-${nm}-gwin.png`});
  console.log(nm, win&&ok?'OK':'FALHOU', 'gwin='+win, log.join(' | '), errs.length? 'ERROS: '+errs.join(';'):'' );
  await c.close(); }
await b.close(); })();
