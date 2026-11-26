// Foto rápida de uma fase de jogo em vários aparelhos (sem jogar): S=<pasta> node foto-fase-ab.js natal 2 [espera_ms]
const {chromium,devices}=require('playwright'); const path=require('path'), fs=require('fs');
const OUT=process.env.S||'/tmp/pf'; fs.mkdirSync(OUT,{recursive:true}); const ROOT=path.resolve(__dirname,'..','..');
const VIEWS={'iphone-deitado':devices['iPhone 13 landscape'],'iphone-empe':devices['iPhone 13'],'ipad-deitado':devices['iPad Mini landscape'],'ipad-empe':devices['iPad Mini'],'pc':{viewport:{width:1280,height:720}},'android-deitado':{viewport:{width:640,height:360},hasTouch:true,isMobile:true}};
const [film,ph,wait]=process.argv.slice(2);
(async()=>{ const b=await chromium.launch();
 for(const [n,o] of Object.entries(VIEWS)){ const c=await b.newContext({...o,deviceScaleFactor:1}); const p=await c.newPage(); p.on('pageerror',e=>console.log('ERR',n,e.message));
  await p.goto('file://'+ROOT+'/filmes/'+film+'.html#jogo'); await p.waitForTimeout(500);
  await p.evaluate(()=>{ sessionStorage.setItem('bl_gire','1'); document.getElementById('blGire')?.remove(); });
  await p.click('#coverGame'); await p.evaluate(n=>{ loadPhase(n); },+ph); await p.waitForTimeout(+(wait||1500));
  await p.screenshot({path:`${OUT}/${film}-f${ph}-${n}.png`}); await c.close(); }
 await b.close(); })();
