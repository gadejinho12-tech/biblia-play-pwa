// Passa por todas as falas do filme (natal, jonas, tempestade), tira foto de cada uma no iPhone deitado e em pé,
// confere erros de JS e se toda fala narrada tem áudio (REC) e duração (REC_DUR).
// Uso: S=<pasta> node prototipos/pente-fino/teste-filmes-ab.js natal jonas tempestade
const {chromium,devices}=require('playwright'); const path=require('path'), fs=require('fs');
const OUT=process.env.S||'/tmp/pf'; fs.mkdirSync(OUT,{recursive:true}); const ROOT=path.resolve(__dirname,'..','..');
(async()=>{ const b=await chromium.launch();
 for(const film of process.argv.slice(2)) for(const [vn,dev] of [['deitado',devices['iPhone 13 landscape']],['empe',devices['iPhone 13']]]){
  const c=await b.newContext({...dev,deviceScaleFactor:1}); const p=await c.newPage(); const errs=[];
  p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });
  await p.goto('file://'+ROOT+'/filmes/'+film+'.html'); await p.waitForTimeout(600);
  await p.evaluate(()=>{ sessionStorage.setItem('bl_gire','1'); document.getElementById('blGire')?.remove(); });
  const chk=await p.evaluate(()=>SCRIPT.map((l,i)=>({i,rec:l.rec,who:l.who,sc:l.sc,card:l.card,has:!!(l.rec&&REC[l.rec]),dur:REC_DUR[l.rec]})));
  const miss=chk.filter(l=>!l.has && l.rec!==null && l.rec!==undefined); const noRec=chk.filter(l=>l.card==null && !l.rec && l.i>0);
  await p.click('#play'); await p.waitForTimeout(800);
  for(const l of chk){ if(l.card!=null || l.i===0) continue;
    await p.evaluate(i=>{ enterLine(i); P.playing=true; },l.i); await p.waitForTimeout(2600);
    await p.screenshot({path:`${OUT}/filme-${film}-${vn}-${String(l.i).padStart(2,'0')}-${l.sc}.png`}); }
  console.log(JSON.stringify({film,vn,lines:chk.length,missingRec:miss.map(l=>l.rec),semRec:noRec.map(l=>l.i),errs}));
  await c.close(); }
 await b.close(); })();
