// Passa por cada linha do filme (ovelha/paes/zaqueu) e tira print no celular deitado e em pé; confere REC de cada fala e erros de JS.
// Uso (na raiz do repo): S=saida/ node teste-filmes-ovelha-paes-zaqueu.js [ovelha|paes|zaqueu ...]
const {chromium,devices}=require('playwright'); const fs=require('fs');
const S=process.env.S||'/tmp/pff'; fs.mkdirSync(S,{recursive:true});
const FILMES=process.argv.slice(2).length? process.argv.slice(2) : ['ovelha','paes','zaqueu'];
const VPS=[['cel-deitado',devices['iPhone 13 landscape']],['cel-empe',devices['iPhone 13']]];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{ const b=await chromium.launch();
 for(const f of FILMES) for(const [nm,opt] of VPS){
  const c=await b.newContext({...opt,deviceScaleFactor:1}); await c.addInitScript(()=>{ try{ sessionStorage.setItem('bl_gire','1'); }catch(e){} });
  const p=await c.newPage(); const erros=[]; p.on('pageerror',e=>erros.push(e.message)); p.on('console',m=>{ if(m.type()==='error' && !/fonts|net::|Failed to load/.test(m.text())) erros.push(m.text()); });
  await p.goto('file://'+process.cwd()+'/filmes/'+f+'.html'); await sleep(600); await p.evaluate(()=>document.getElementById('blGire')?.remove());
  if(nm==='cel-deitado'){ const falta=await p.evaluate(()=>SCRIPT.filter(l=>l.rec && (!REC[l.rec] || !REC_DUR[l.rec])).map(l=>l.rec)); console.log(f,'linhas sem REC/REC_DUR:',JSON.stringify(falta)); }
  await p.click('#play'); // abertura
  for(const t of [600,3000,6000]){ await sleep(t===600?600:t-(t===3000?600:3000)); await p.screenshot({path:`${S}/${f}-abertura-${t}-${nm}.png`}); }
  const n=await p.evaluate(()=>SCRIPT.length);
  for(let i=0;i<n;i++){ const l=await p.evaluate(i=>{ const l=SCRIPT[i]; if(l.intro||l.card!=null) return null; __enter(i); return l.sc; },i); if(!l) continue;
    await sleep(2600); await p.screenshot({path:`${S}/${f}-${String(i).padStart(2,'0')}-${l}-${nm}.png`}); }
  console.log(f,nm,'erros:',erros.length? JSON.stringify(erros.slice(0,4)) : 0); await c.close(); }
 await b.close(); })();
