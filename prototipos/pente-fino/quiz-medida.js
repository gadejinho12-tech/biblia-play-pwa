// Quiz: as respostas e o botão "Próxima" aparecem sem rolar a tela?
const {chromium,VPS,abre}=require('./jogos-comum.js');
(async()=>{ const b=await chromium.launch();
for(const [nm,opt] of VPS){ const errs=[]; const {c,p}=await abre(b,opt,'quiz.html',errs);
  await p.evaluate(()=>__qz.start(__qz.STORIES[1])); await p.waitForSelector('#opts .opt',{timeout:6000});
  // procura a pergunta com 4 respostas longas
  await p.evaluate(()=>{ const q=QS.find(q=>q.rec==='q32'); __qz.round.splice(0,1,q); }); await p.evaluate(()=>show());
  await p.locator('#opts .opt').first().click(); await p.waitForTimeout(200);
  const m=await p.evaluate(()=>{ const r=e=>e.getBoundingClientRect(); const o=[...document.querySelectorAll('#opts .opt')]; return {vh:innerHeight,lastOpt:Math.round(r(o[o.length-1]).bottom),next:Math.round(r(document.getElementById('next')).bottom),sy:scrollY}; });
  await p.screenshot({path:'prototipos/pente-fino/quiz-pergunta-'+nm+'.png'});
  console.log(nm,JSON.stringify(m),errs.join('|')); await c.close(); }
await b.close(); })();
