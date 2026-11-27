/* Clubinho do Reino — toques da marca em todas as telas:
   a Lili nas capas e finais, no botão da estante, e o aviso para deitar o celular nos filmes e jogos. */
(function(){
  const pagina = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
  const FILMES = ['criacao','noe','davi','jonas','natal','tempestade','ovelha','paes','zaqueu','rute'];
  const JOGOS = ['memoria','quiz','cacapalavras'];

  // ícone da aba
  if(!document.querySelector('link[rel="icon"]')){ const l=document.createElement('link'); l.rel='icon'; l.href='icons/icon-192.png'; document.head.appendChild(l); }

  const css = document.createElement('style');
  css.textContent = `
  .bl-lili{display:block;margin:0 auto 4px;width:clamp(74px,18vw,104px);height:auto;filter:drop-shadow(0 4px 0 rgba(43,58,85,.12))}
  .bl-lili.festa{animation:blPula 1.1s ease-in-out infinite alternate}
  @keyframes blPula{to{transform:translateY(-6px) rotate(-3deg)}}
  @media (max-height:560px){ .page.cover .bl-lili{display:none} }
  .bl-mini{width:1.35em;height:1.35em;vertical-align:-.3em;margin-right:.3em;border-radius:.35em}
  #blGire{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:24px;background:linear-gradient(#BDE9FFf5,#E9F8FFf5);color:#2B3A55;text-align:center;font-family:'Baloo 2',Nunito,system-ui,sans-serif}
  #blGire .cx{display:grid;gap:14px;justify-items:center;max-width:320px}
  #blGire .cel{width:74px;height:120px;border:7px solid #2B3A55;border-radius:16px;background:#fff;position:relative;animation:blGira 2.2s ease-in-out infinite}
  #blGire .cel::after{content:"";position:absolute;left:50%;bottom:5px;width:14px;height:4px;margin-left:-7px;border-radius:2px;background:#2B3A55}
  #blGire .cel img{position:absolute;inset:16px 6px;width:calc(100% - 12px);height:auto;margin:auto}
  @keyframes blGira{0%,25%{transform:rotate(0)}55%,90%{transform:rotate(-90deg)}100%{transform:rotate(0)}}
  #blGire b{font-size:28px;line-height:1.1}
  #blGire p{margin:0;font:700 17px/1.4 Nunito,system-ui,sans-serif;color:#55647F}
  #blGire button{border:0;border-radius:999px;padding:12px 22px;font:800 17px 'Baloo 2',Nunito,sans-serif;background:#fff;color:#2B3A55;box-shadow:0 4px 0 #CFE6F2;cursor:pointer}
  @media (prefers-reduced-motion:reduce){ .bl-lili.festa,#blGire .cel{animation:none} }`;
  document.head.appendChild(css);

  function lili(festa){ const i=new Image(); i.src = festa ? 'lili-festa.svg' : 'lili.svg'; i.alt=''; i.className='bl-lili'+(festa?' festa':''); return i; }

  function marcar(){
    // botões "📚 Estante" ganham a Lili no lugar dos livrinhos
    document.querySelectorAll('a[href="index.html"]').forEach(a=>{
      const t=a.firstChild; if(t && t.nodeType===3 && t.nodeValue.trim().startsWith('📚')){
        t.nodeValue=t.nodeValue.replace('📚','').replace(/^\s+/,'');
        const m=new Image(); m.src='icons/icon-192.png'; m.alt=''; m.className='bl-mini'; a.insertBefore(m,a.firstChild);
      }
    });
    // capa e final dos filmes: a Lili no alto do cartão
    document.querySelectorAll('.page.cover').forEach(p=>{
      if(p.querySelector('.bl-lili')) return;
      const festa=!!p.querySelector('.stars');
      p.insertBefore(lili(festa), p.firstChild);
    });
  }

  // aviso para deitar o celular (filmes e jogos), uma vez por visita
  function aviso(){
    if(!FILMES.includes(pagina) && !JOGOS.includes(pagina)) return;
    let fechou=false; try{ fechou=sessionStorage.getItem('bl_gire')==='1'; }catch(e){}
    const pequeno=()=>Math.min(screen.width,screen.height)<700;
    const empe=()=>window.matchMedia('(orientation: portrait)').matches;
    let el=null;
    function atualiza(){
      const mostrar=!fechou && pequeno() && empe() && ('ontouchstart' in window || navigator.maxTouchPoints>0);
      if(mostrar && !el){
        el=document.createElement('div'); el.id='blGire'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','Deite o celular');
        el.innerHTML='<div class="cx"><div class="cel"><img src="lili.svg" alt=""></div><b>Deite o celular!</b><p>'+(FILMES.includes(pagina)?'O filme':'O jogo')+' fica maior e mais gostoso de ver com o celular deitado.</p><button type="button">Continuar assim</button></div>';
        el.querySelector('button').onclick=()=>{ fechou=true; try{ sessionStorage.setItem('bl_gire','1'); }catch(e){} atualiza(); };
        document.body.appendChild(el);
      } else if(!mostrar && el){ el.remove(); el=null; }
    }
    window.matchMedia('(orientation: portrait)').addEventListener?.('change',atualiza);
    window.addEventListener('resize',atualiza);
    atualiza();
  }

  // "Você sabia?" no resumo do fim de cada filme (curiosidade daquela história)
  function curiosidade(){
    if(!FILMES.includes(pagina)) return;
    const pg=document.querySelector('#summary .page'); if(!pg) return;
    const por=()=>{ if(pg.querySelector('.vs')) return; window.vocesabia(pg,{historia:pagina, antes:pg.querySelector('.row')}); };
    if(window.vocesabia) por(); else { const sc=document.createElement('script'); sc.src='curiosidades.js'; sc.onload=por; document.head.appendChild(sc); }
  }

  function iniciar(){ marcar(); aviso(); curiosidade(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciar); else iniciar();
})();
