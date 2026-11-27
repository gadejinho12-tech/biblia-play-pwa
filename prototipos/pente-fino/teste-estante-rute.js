// Abre a estante (index.html) no pc e no celular, confere o cartão "Rute e Boaz" e erros de JS; salva prints em $S.
const {chromium,devices}=require('playwright'); const fs=require('fs'); const S=process.env.S||'/tmp/pfe'; fs.mkdirSync(S,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{ const b=await chromium.launch();
 for(const [nm,opt] of [['pc',{viewport:{width:1280,height:900}}],['cel-empe',devices['iPhone 13']]]){
  const c=await b.newContext({...opt,deviceScaleFactor:1}); const p=await c.newPage(); const erros=[]; p.on('pageerror',e=>erros.push(e.message)); p.on('console',m=>{ if(m.type()==='error' && !/fonts|net::|Failed to load/.test(m.text())) erros.push(m.text()); });
  await p.goto('file://'+process.cwd()+'/filmes/index.html'); await sleep(900);
  const card=p.locator('#at article', {hasText:'Rute e Boaz'}); const n=await card.count(); const ordem=await p.$$eval('#at article h3',a=>a.map(x=>x.textContent));
  if(n){ await card.scrollIntoViewIfNeeded(); await sleep(800); await card.screenshot({path:`${S}/estante-rute-${nm}.png`}); }
  await p.evaluate(()=>{ const i=FILMS.findIndex(f=>f.id==='rute'); showHero(i); }); await sleep(800); await p.locator('.stage').screenshot({path:`${S}/estante-hero-rute-${nm}.png`});
  console.log(nm,'cartão Rute:',n,'ordem AT:',JSON.stringify(ordem),'erros:',erros.length?JSON.stringify(erros):0); await c.close(); }
 await b.close(); })();
