// Foto de uma cena do filme num tempo fixo. uso: F=davi CENA=funda T=6.5 node cnd-foto-cena.js
const {chromium,devices,abrir,OUT}=require('./cnd-comum.js'); const fs=require('fs'); fs.mkdirSync(OUT,{recursive:true});
const F=process.env.F, CENA=process.env.CENA, T=+process.env.T;
(async()=>{ const b=await chromium.launch();
for(const [nm,opt] of [['cel-deitado',devices['iPhone 13 landscape']],['cel-empe',devices['iPhone 13']],['cel-empe-app',{viewport:{width:390,height:844},isMobile:true,hasTouch:true}]]){
  const errs=[]; const {c,p}=await abrir(b,opt,F+'.html',errs); await p.click('#play'); await p.waitForTimeout(300);
  await p.evaluate(([cena,t])=>{ const i=SCRIPT.findIndex(l=>l.sc===cena && l.card==null); enterLine(i); P.scT=t; togglePlay(false); },[CENA,T]);
  await p.waitForTimeout(2500); await p.screenshot({path:`${OUT}/cena-${F}-${CENA}-${nm}.png`}); console.log(nm,errs.join(';')); await c.close(); }
await b.close(); })();
