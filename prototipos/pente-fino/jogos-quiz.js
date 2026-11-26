const {chromium,VPS,abre,confere}=require('./jogos-comum.js');
(async()=>{ const b=await chromium.launch(); const only=process.argv[2];
for(const [nm,opt] of VPS){ if(only && nm!==only) continue; const errs=[], prob=new Set(); const {c,p}=await abre(b,opt,'quiz.html',errs);
  (await confere(p,'.choice','escolha')).forEach(x=>prob.add(x)); (await confere(p,'.top .pill','topo')).forEach(x=>prob.add(x));
  const n=await p.locator('#stories .choice').count(); let res=[];
  for(let i=0;i<n;i++){ await p.locator('#stories .choice').nth(i).click(); await p.waitForSelector('#opts .opt',{timeout:6000});
    let k=0; while(true){ await p.waitForSelector('#opts .opt'); (await confere(p,'.opt','resposta')).forEach(x=>prob.add(x));
      const nok=await p.evaluate(()=>[...document.querySelectorAll('#opts .opt')].filter(b=>b.dataset.ok==='1').length); if(nok!==1) prob.add('pergunta com '+nok+' certas');
      // errar a 1a pergunta de cada rodada, acertar o resto
      const target = k===0? '#opts .opt[data-ok="0"]' : '#opts .opt[data-ok="1"]'; await p.locator(target).first().click({timeout:3000});
      await p.locator('#next').click({timeout:3000}); k++; await p.waitForTimeout(80);
      if(await p.locator('#win').isVisible()) break; if(k>15){ prob.add('nao terminou'); break; } }
    const w=await p.textContent('#wRes'); res.push(w); (await confere(p,'#win .btn','botao-fim')).forEach(x=>prob.add(x));
    if(i===n-1) await p.screenshot({path:'prototipos/pente-fino/quiz-fim-'+nm+'.png'});
    await p.locator('#other').click(); }
  console.log(nm,'rodadas',res.length,'|',res.join(' ; ')); console.log('  probs',[...prob].join(' | ')||'-'); console.log('  errs',errs.join(' | ')||'-'); await c.close(); }
await b.close(); })();
