// Ajudante: escreve o nome, escolhe, "Pronto!" e confere na estante e no fim do jogo.
const {chromium,VPS,abre}=require('./jogos-comum.js');
(async()=>{ const b=await chromium.launch();
for(const [nm,opt] of VPS.filter(v=>['cel-empe','cel-deitado'].includes(v[0]))){ const errs=[]; const {c,p}=await abre(b,opt,'ajudante.html',errs);
  await p.fill('input',''); await p.locator('input').first().fill('Ana'); await p.locator('#style button').nth(1).click(); await p.locator('#rand').click();
  await p.getByText('Pronto').click(); await p.waitForTimeout(800); const u=p.url().split('/').pop();
  const ls=await p.evaluate(()=>({a:localStorage.getItem('bp_ajudante'),img:(localStorage.getItem('bp_ajudante_img')||'').slice(0,30)}));
  await p.goto(p.url().replace(/[^/]*$/,'index.html')); await p.waitForTimeout(800); const hello=await p.textContent('#hello');
  console.log(nm,'depois de Pronto:',u,'|',ls.a,ls.img,'| estante:',hello,'| erros',errs.join('/')||'-'); await c.close(); }
await b.close(); })();
