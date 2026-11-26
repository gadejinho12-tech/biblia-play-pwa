// Abre cada página (estante e páginas de apoio) em todos os tamanhos: erros de JS, rolagem de lado, alvos pequenos, links quebrados.
const {chromium,VPS,abre}=require('./jogos-comum.js'); const fs=require('fs'),path=require('path');
const PAGS=(process.argv[2]||'index,arca,ajudante,pais,assinar,entrar,marca,quiz,memoria,cacapalavras').split(',');
(async()=>{ const b=await chromium.launch(); const only=process.argv[3];
for(const [nm,opt] of VPS){ if(only&&nm!==only) continue; for(const pg of PAGS){ const errs=[]; const {c,p}=await abre(b,opt,pg+'.html',errs); await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{ const vw=innerWidth, out={hscroll:document.documentElement.scrollWidth>vw+1?document.documentElement.scrollWidth:0, small:[], off:[], links:[]};
    for(const el of document.querySelectorAll('a[href],button,input,select,[role=button]')){ const r=el.getBoundingClientRect(); const cs=getComputedStyle(el); if(!r.width||cs.visibility==='hidden') continue; if(el.closest('[hidden]')) continue;
      const t=(el.getAttribute('aria-label')||el.textContent||el.value||'').trim().replace(/\s+/g,' ').slice(0,24);
      if(el.tagName!=='INPUT' && (r.height<40||r.width<40) && !el.closest('nav.quick,footer,.dots')) out.small.push(t+' '+Math.round(r.width)+'x'+Math.round(r.height));
      if(r.right>vw+1 && !el.closest('.rail,.quick')) out.off.push(t+'@'+Math.round(r.right)); }
    for(const a of document.querySelectorAll('a[href]')) out.links.push(a.getAttribute('href'));
    return out; });
  const bad=[...new Set(r.links)].filter(h=>!/^(https?:|#|mailto:|tel:|javascript:)/.test(h)).map(h=>h.split(/[?#]/)[0]).filter(h=>h && !fs.existsSync(path.join('filmes',h)));
  await p.screenshot({path:'prototipos/pente-fino/geral-'+pg+'-'+nm+'.png',fullPage:false});
  console.log(nm,pg,'| hscroll',r.hscroll,'| pequenos',r.small.length? [...new Set(r.small)].slice(0,8).join(', '):'-','| fora',r.off.join(',')||'-','| links-ruins',bad.join(',')||'-','| erros',errs.join(' / ')||'-'); await c.close(); } }
await b.close(); })();
