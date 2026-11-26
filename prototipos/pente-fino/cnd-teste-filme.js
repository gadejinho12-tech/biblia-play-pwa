// Percorre o filme (criacao|noe|davi): para cada fala, pula até ela, avança o tempo da cena até o meio
// da fala, tira foto (celular deitado e em pé) e confere se a fala tem áudio gravado (REC/REC_DUR).
// uso: F=criacao node cnd-teste-filme.js
const {chromium,devices,abrir,OUT}=require('./cnd-comum.js'); const fs=require('fs'); fs.mkdirSync(OUT,{recursive:true});
const F=process.env.F||'criacao';
(async()=>{ const b=await chromium.launch();
for(const [nm,opt] of [['cel-deitado',devices['iPhone 13 landscape']],['cel-empe',devices['iPhone 13']]]){
  const errs=[]; const {c,p}=await abrir(b,opt,F+'.html',errs);
  await p.click('#play').catch(e=>errs.push('play: '+e.message)); await p.waitForTimeout(500);
  const info=await p.evaluate(()=>SCRIPT.map((l,i)=>({i,sc:l.sc,card:l.card,intro:!!l.intro,rec:l.rec,hasRec:!!(l.rec&&REC[l.rec]),dur:REC_DUR[l.rec],text:(l.text||'').slice(0,60)})));
  if(nm==='cel-deitado'){ const miss=info.filter(l=>!l.intro && !l.hasRec); console.log(F,'falas sem áudio:',miss.length? JSON.stringify(miss):'nenhuma'); }
  for(const l of info){ if(l.card!=null) continue;
    await p.evaluate(i=>{ // tempo da cena acumulado das falas anteriores na mesma cena + meio desta
      let t=0; for(let k=i-1;k>=0;k--){ const q=SCRIPT[k]; if(q.card!=null||q.sc!==SCRIPT[i].sc) break; t+=q.dur; }
      enterLine(i); P.scT=t+SCRIPT[i].dur*.55; P.lt=SCRIPT[i].dur*.3; togglePlay(false); },l.i);
    await p.waitForTimeout(+(process.env.WAIT||350));
    await p.screenshot({path:`${OUT}/filme-${F}-${nm}-${String(l.i).padStart(2,'0')}-${l.sc}.png`}); }
  console.log(F,nm,'erros:',errs.length? errs.join(' ; '):'nenhum'); await c.close(); }
await b.close(); })();
