// Caça-palavras: todas as histórias x 3 níveis; acha cada palavra arrastando (mouse = ponteiro) do começo ao fim, sem rolar durante o arraste.
const {chromium,VPS,abre,confere}=require('./jogos-comum.js');
(async()=>{ const b=await chromium.launch(); const only=process.argv[2]; const modo=process.argv[3]||'arrasta';
for(const [nm,opt] of VPS){ if(only && nm!==only) continue; const errs=[], prob=new Set(); const {c,p}=await abre(b,opt,'cacapalavras.html',errs);
  (await confere(p,'#stories .choice','historia')).forEach(x=>prob.add(x)); (await confere(p,'#lvl button','nivel-btn')).forEach(x=>prob.add(x));
  const ns=await p.locator('#stories .choice').count(); let wins=0, total=0, minCell=999, fora=0;
  for(let L=0;L<3;L++) for(let s=0;s<ns;s++){ total++;
    await p.locator('#lvl button').nth(L).click(); await p.locator('#stories .choice').nth(s).click(); await p.waitForTimeout(150);
    const pl=await p.evaluate(()=>__cp.placed.map(q=>({...q}))); const N=await p.evaluate(()=>__cp.lv.size);
    for(const q of pl){
      const a=p.locator('#grid .cell').nth(q.r0*N+q.c0), z=p.locator('#grid .cell').nth(q.r1*N+q.c1);
      await a.scrollIntoViewIfNeeded(); const ra=await a.boundingBox(), rz=await z.boundingBox(); const vh=await p.evaluate(()=>innerHeight);
      minCell=Math.min(minCell,ra.width);
      if(rz.y<0||rz.y+rz.height>vh||ra.y<0){ fora++; prob.add('palavra sai da tela ao arrastar (nivel '+L+')'); }
      if(modo==='toque'){ await p.mouse.click(ra.x+ra.width/2,ra.y+ra.height/2); await z.scrollIntoViewIfNeeded(); const r2=await z.boundingBox(); await p.mouse.click(r2.x+r2.width/2,r2.y+r2.height/2); }
      else { await p.mouse.move(ra.x+ra.width/2,ra.y+ra.height/2); await p.mouse.down(); await p.mouse.move(rz.x+rz.width/2,rz.y+rz.height/2,{steps:6}); await p.mouse.up(); }
      await p.waitForTimeout(40); }
    let won=true; try{ await p.locator('#win').waitFor({state:'visible',timeout:2500}); }catch(e){ won=false; } if(won) wins++; else { const st=await p.evaluate(()=>[...document.querySelectorAll('#list li')].map(l=>l.textContent+(l.classList.contains('got')?'+':'-')).join(',')); prob.add('nao ganhou L'+L+' s'+s+' '+st); }
    if(L===2&&s===ns-1){ await p.locator('#win').evaluate(e=>e.hidden=true); await p.screenshot({path:'prototipos/pente-fino/caca-dificil-'+nm+'.png'}); await p.locator('#win').evaluate(e=>e.hidden=false); }
    if(won) await p.locator('#other').click(); else { await p.goto(p.url()); await p.waitForTimeout(300); } }
  console.log(nm,'venceu',wins,'de',total,'menor celula',Math.round(minCell),'palavras fora da tela',fora); console.log('  probs',[...prob].join(' | ')||'-'); console.log('  errs',errs.join(' | ')||'-'); await c.close(); }
await b.close(); })();
