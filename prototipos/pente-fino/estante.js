// Estante: cada cartão abre o filme/jogo certo, cenas da vitrine sem erro, baú, layout em todos os tamanhos.
const {chromium,VPS,abre}=require('./jogos-comum.js');
(async()=>{ const b=await chromium.launch(); const only=process.argv[2];
for(const [nm,opt] of VPS){ if(only&&nm!==only) continue; const errs=[], prob=[]; const {c,p}=await abre(b,opt,'index.html',errs); await p.waitForTimeout(1200);
  // cenas da vitrine (palco) — todas as 9
  const blank=[]; for(let i=0;i<9;i++){ await p.evaluate(i=>showHero(i),i); await p.waitForTimeout(350);
    const v=await p.evaluate(()=>{ const cv=document.getElementById('hCanvas'); const x=cv.getContext('2d'); const d=x.getImageData(0,0,cv.width,cv.height).data; let s=new Set(); for(let k=0;k<d.length;k+=4*997) s.add(d[k]+','+d[k+1]+','+d[k+2]); return {n:s.size,t:document.getElementById('hTitle').textContent,href:document.getElementById('hPlay').getAttribute('href'),tag:document.getElementById('hTag').textContent}; });
    if(v.n<8) blank.push(v.t); if(i===8||i===6) await p.screenshot({path:'prototipos/pente-fino/estante-'+nm+'-vitrine'+i+'.png'}); }
  if(blank.length) prob.push('vitrine vazia: '+blank.join(','));
  // cartões
  const cards=await p.evaluate(()=>[...document.querySelectorAll('.rail .card')].map(a=>({h:a.querySelector('h3').textContent,href:(a.querySelector('a.thumb')||{}).getAttribute?.call(a.querySelector('a.thumb'),'href'),cv:(()=>{const cv=a.querySelector('canvas'); if(!cv||!cv.width) return 0; const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data; const s=new Set(); for(let k=0;k<d.length;k+=4*499) s.add(d[k]+','+d[k+1]); return s.size;})()})));
  for(const k of cards){ if(k.cv<5) prob.push('cartao sem desenho: '+k.h); }
  // clicar no cartão de cada filme e voltar
  const hrefs=cards.filter(k=>k.href).map(k=>[k.h,k.href]);
  for(const [h,href] of hrefs){ await p.locator('.card',{hasText:h}).locator('a.thumb').first().click(); await p.waitForLoadState('domcontentloaded'); const u=p.url().split('/').pop(); const t=await p.title();
    if(u.split('#')[0]!==href.split('#')[0]) prob.push('cartao '+h+' abriu '+u); await p.goBack(); await p.waitForTimeout(300); }
  // baú
  await p.locator('#bau').click(); await p.locator('#chest').click(); await p.waitForTimeout(300); const msg=await p.textContent('#bauMsg'); await p.locator('#bauOk').click();
  const lay=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth,bar:[...document.querySelectorAll('.bar .in > *')].map(e=>{const r=e.getBoundingClientRect(); return Math.round(r.right);}).filter(x=>x>innerWidth)}));
  if(lay.sw>lay.vw) prob.push('rola de lado '+lay.sw); if(lay.bar.length) prob.push('barra corta');
  await p.evaluate(()=>scrollTo(0,0)); await p.screenshot({path:'prototipos/pente-fino/estante-'+nm+'.png'});
  console.log(nm,'cartoes',cards.length,'| bau:',msg.replace(/\s+/g,' ').slice(0,50),'| probs',prob.join(' | ')||'-','| erros',[...new Set(errs)].join(' / ')||'-'); await c.close(); }
await b.close(); })();
