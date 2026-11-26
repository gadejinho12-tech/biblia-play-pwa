// "Deite o celular": aparece nos 9 filmes e nos jogos com o celular em pé; não aparece deitado nem no computador.
const {chromium,devices}=require('playwright');
(async()=>{ const b=await chromium.launch(); const out=[];
for(const [nm,opt] of [['cel-empe',devices['iPhone 13']],['cel-deitado',devices['iPhone 13 landscape']],['pc',{viewport:{width:1280,height:720}}]]){
  const c=await b.newContext({...opt,deviceScaleFactor:1}); const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(p.url().split('/').pop()+': '+e.message));
  const row=[]; for(const pg of ['criacao','noe','davi','jonas','natal','tempestade','ovelha','paes','zaqueu','quiz','memoria','cacapalavras','index','arca']){
    await p.goto('file://'+process.cwd()+'/filmes/'+pg+'.html'); await p.waitForTimeout(250); row.push(pg+':'+(await p.locator('#blGire').count()? 'aviso':'-')); }
  // fechar o aviso
  await p.goto('file://'+process.cwd()+'/filmes/ovelha.html'); await p.waitForTimeout(200); if(await p.locator('#blGire').count()){ await p.locator('#blGire button').click(); row.push('fechou:'+(await p.locator('#blGire').count()?'NAO':'ok')); }
  console.log(nm,row.join(' '),'| erros',errs.join(' / ')||'-'); await c.close(); }
await b.close(); })();
