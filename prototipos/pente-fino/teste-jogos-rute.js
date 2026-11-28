// Joga as 3 fases de "O Campo de Boaz" (rute.html) com toques reais (CDP touch) nos aparelhos com toque e mouse no pc,
// em 6 telas; confere se chega na tela final (#gwin), se os alvos têm ≥44px e estão dentro da tela, e se não há erros.
// Uso (na raiz do repositório):  S=saida/ node prototipos/pente-fino/teste-jogos-rute.js
const {chromium,devices}=require('playwright'); const fs=require('fs');
const S=process.env.S||'/tmp/pfr'; fs.mkdirSync(S,{recursive:true});
const VPS=[['cel-deitado',devices['iPhone 13 landscape']],['cel-empe',devices['iPhone 13']],['tablet-deitado',devices['iPad Mini landscape']],
  ['tablet-empe',devices['iPad Mini']],['pc',{viewport:{width:1280,height:720}}],['android-peq',{viewport:{width:640,height:360},isMobile:true,hasTouch:true}]];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const HELP=`window.__v2c=(sx,sy)=>{ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; return {x:(sx*K+offX)/dpr, y:sy*K/dpr}; };
 window.__alvosC=()=>{ const a=__alvos(), k=innerHeight/720; return { tap:(a.tap||[]).map(([x,y])=>__v2c(x,y)), drag:(a.drag||[]).map(([p,q])=>[__v2c(p[0],p[1]),__v2c(q[0],q[1])]), rCss:a.r*k }; };`;
let CDP=null;
async function tStart(p,x,y){ if(CDP) await CDP.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]}); else { await p.mouse.move(x,y); await p.mouse.down(); } }
async function tMove(p,x,y){ if(CDP) await CDP.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]}); else await p.mouse.move(x,y); }
async function tEnd(p){ if(CDP) await CDP.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); else await p.mouse.up(); }
async function tap(p,x,y){ await tStart(p,x,y); await sleep(40); await tEnd(p); }
async function drag(p,a,b){ await tStart(p,a.x,a.y); for(let i=1;i<=14;i++){ await tMove(p,a.x+(b.x-a.x)*i/14,a.y+(b.y-a.y)*i/14); await sleep(14); } await sleep(30); await tEnd(p); }
let VW=0,VH=0; const dentro=(q,m=4)=>q.x>=m&&q.y>=m&&q.x<=VW-m&&q.y<=VH-m;
(async()=>{ const b=await chromium.launch(); const res=[];
 for(const [nm,opt] of VPS){
  const c=await b.newContext({...opt,deviceScaleFactor:1}); await c.addInitScript(()=>{ try{ sessionStorage.setItem('bl_gire','1'); }catch(e){} });
  const p=await c.newPage(); CDP=opt.hasTouch? await c.newCDPSession(p) : null; const erros=[]; p.on('pageerror',e=>erros.push(e.message)); p.on('console',m=>{ if(m.type()==='error' && !/fonts|net::|Failed to load/.test(m.text())) erros.push(m.text()); });
  VW=opt.viewport.width; VH=opt.viewport.height;
  await p.goto('file://'+process.cwd()+'/filmes/rute.html#jogo'); await sleep(700);
  await p.evaluate(HELP); await p.evaluate(()=>{ window.__cancel=0; addEventListener('pointercancel',()=>__cancel++); document.getElementById('blGire')?.remove(); }); await p.click('#coverGame');
  const log=m=>console.log('  ['+nm+'] '+m); const fases=[]; let menor=1e9, fora=0;
  const olha=a=>{ menor=Math.min(menor,a.rCss*2); for(const q of a.tap) if(!dentro(q)) fora++; for(const [q,r] of a.drag){ if(!dentro(q)) fora++; if(!dentro(r)) fora++; } };
  for(let f=1;f<=3;f++){ for(let i=0;i<80 && await p.evaluate(f=>GS.phase!==f,f);i++) await sleep(100); for(let i=0;i<60 && await p.evaluate(()=>GS.banner>1.4);i++) await sleep(100); await sleep(300);
    await p.screenshot({path:`${S}/rute-f${f}-${nm}.png`}); let ok=false; const t0=Date.now(); let tirou=false;
    if(f===1){ // um toque errado na grama (para conferir que não trava), depois as espigas
      const t=await p.evaluate(()=>{ const g=GS; const tf=g.tufos.find(t=>!g.espigas.some(e=>!e.ok && Math.hypot(e.fx*W-t.fx*W,e.fy*H-t.fy*H)<140)); return tf? __v2c(tf.fx*W,tf.fy*H-20*U()) : null; }); if(t) await tap(p,t.x,t.y); }
    while(Date.now()-t0<90000){ const st=await p.evaluate(f=>({ph:GS.phase,fin:GS.finished}),f); if(st.ph!==f||st.fin){ ok=true; break; }
      const a=await p.evaluate(()=>__alvosC()); olha(a);
      if(f===1){ if(a.tap.length){ const q=a.tap[0]; await tap(p,q.x,q.y); } else await sleep(250); }
      else { if(a.drag.length){ const [q,r]=a.drag[0]; await drag(p,q,r); if(!tirou && f===3){ await sleep(300); await p.screenshot({path:`${S}/rute-f3-meio-${nm}.png`}); tirou=true; } } else await sleep(250); }
      if(f===2 && !tirou){ await sleep(200); await p.screenshot({path:`${S}/rute-f2-meio-${nm}.png`}); tirou=true; }
      await sleep(180); }
    fases.push(ok?'ok':'FALHOU'); if(!ok){ log('fase '+f+' não terminou'); break; } }
  for(let i=0;i<120 && await p.evaluate(()=>document.getElementById('gwin').hidden);i++) await sleep(100);
  const win=await p.evaluate(()=>!document.getElementById('gwin').hidden); if(win) await p.screenshot({path:`${S}/rute-fim-${nm}.png`});
  const nc=await p.evaluate(()=>__cancel); const st=await p.evaluate(()=>localStorage.getItem('bp_rute_estrelas'));
  const linha=`rute ${nm}${CDP?' (toque)':' (mouse)'}: fases=${fases.join(',')} gwin=${win} estrelas=${st} menor-alvo=${Math.round(menor)}px alvos-fora=${fora} pointercancel=${nc} erros=${erros.length?JSON.stringify(erros.slice(0,3)):0}`; console.log(linha); res.push(linha); await c.close(); }
 await b.close(); console.log('\nRESUMO\n'+res.join('\n')); })();
