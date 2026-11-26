const {chromium,VPS,abre,confere}=require('./jogos-comum.js');
(async()=>{ const b=await chromium.launch(); const only=process.argv[2];
for(const [nm,opt] of VPS){ if(only && nm!==only) continue; const errs=[], prob=new Set(); const {c,p}=await abre(b,opt,'memoria.html',errs);
  (await confere(p,'.choice','nivel')).forEach(x=>prob.add(x));
  const n=await p.locator('#levels .choice').count(); const res=[];
  for(let i=0;i<n;i++){ await p.locator('#levels .choice').nth(i).click(); await p.waitForTimeout(300);
    const info=await p.evaluate(()=>{ const bd=document.getElementById('board').getBoundingClientRect(); const cs=[...document.querySelectorAll('#board .card')].map(e=>e.getBoundingClientRect()); return {bw:Math.round(bd.width),bh:Math.round(bd.height),top:Math.round(bd.top),cw:Math.round(cs[0].width),ch:Math.round(cs[0].height),vh:innerHeight,vw:innerWidth,docH:document.documentElement.scrollHeight}; });
    if(info.top+info.bh>info.vh) prob.add('nivel '+i+': tabuleiro passa da tela (fim '+(info.top+info.bh)+' > '+info.vh+')');
    (await confere(p,'#board .card','carta')).forEach(x=>prob.add('nivel '+i+' '+x));
    // descobrir pares e clicar com o mouse/toque
    const ids=await p.evaluate(()=>[...document.querySelectorAll('#board .card')].map(e=>e.dataset.id));
    const seen={}; ids.forEach((id,k)=>(seen[id]=seen[id]||[]).push(k));
    // um erro primeiro
    const ks=Object.values(seen); await p.locator('#board .card').nth(ks[0][0]).click(); await p.locator('#board .card').nth(ks[1][0]).click(); await p.waitForTimeout(1200);
    for(const [a,bb] of ks){ await p.locator('#board .card').nth(a).click(); await p.locator('#board .card').nth(bb).click(); await p.waitForTimeout(420); }
    await p.waitForTimeout(1200); const won=await p.locator('#win').isVisible(); res.push(i+':'+(won?'ganhou':'NAO')+' '+info.cw+'x'+info.ch+' board '+info.bw+'x'+info.bh+'@'+info.top);
    if(i===n-1){ await p.locator('#win').evaluate(e=>e.hidden=true); await p.evaluate(()=>scrollTo(0,0)); await p.screenshot({path:'prototipos/pente-fino/memoria-dificil-'+nm+'.png'}); await p.locator('#win').evaluate(e=>e.hidden=false); }
    if(won) await p.locator('#other').click(); else { await p.goto(p.url()); } }
  console.log(nm,res.join(' ; ')); console.log('  probs',[...prob].join(' | ')||'-'); console.log('  errs',errs.join(' | ')||'-'); await c.close(); }
await b.close(); })();
