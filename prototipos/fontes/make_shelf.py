import pathlib
H='<div class="bp-hello" hidden><img alt=""><span></span></div>'
HELLO=pathlib.Path('jogos/hello.html').read_text()
HEAD='<!doctype html>\n<html lang="pt-BR">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
for src,dst,sid,sv in [('noe-filme.html','shelf/noe.html','noe','st'),('davi-filme.html','shelf/davi.html','davi','st'),('criacao-filme.html','shelf/criacao.html','criacao','avg'),('jonas-filme.html','shelf/jonas.html','jonas','st'),('tempestade-filme.html','shelf/tempestade.html','tempestade','st'),('natal-filme.html','shelf/natal.html','natal','st')]:
    s=pathlib.Path(src).read_text()
    def R(a,b,n=1):
        global s
        assert s.count(a)==n,(src,a[:60],s.count(a)); s=s.replace(a,b)
    R('.ghost{','a.ghost{text-decoration:none;display:inline-block}\n.ghost{')
    R('<button class="go" id="play">▶ Assistir o filme</button>','<button class="go" id="play">▶ Assistir o filme</button>\n    <div class="row" style="margin-top:12px"><a class="ghost" href="index.html">📚 Voltar à estante</a></div>')
    R('<button class="ghost" id="again">↻ Assistir de novo</button></div>','<button class="ghost" id="again">↻ Assistir de novo</button><a class="ghost" href="index.html">📚 Estante</a></div>')
    R('<button class="ghost" id="gFilm">🎬 Ver o filme</button></div>','<button class="ghost" id="gFilm">🎬 Ver o filme</button><a class="ghost" href="index.html">📚 Estante</a></div>')
    R("$('gwin').hidden=false;","$('gwin').hidden=false; try{ const k='bp_%s_estrelas'; localStorage.setItem(k, Math.max(+(localStorage.getItem(k)||0), %s)); }catch(e){} if(window.bpAddCoins) setTimeout(()=>bpAddCoins(2*Math.round(%s),'pelo jogo!'),900);" % (sid,sv,sv))
    R("  $('summary').hidden = !l.summary;","  $('summary').hidden = !l.summary; if(l.summary){ try{ if(!localStorage.getItem('bp_%s_moeda')){ localStorage.setItem('bp_%s_moeda','1'); window.bpAddCoins&&bpAddCoins(10,'por assistir!'); } localStorage.setItem('bp_%s_visto','1'); }catch(e){} }" % (sid,sid,sid))
    a="try{ if(localStorage.getItem('bp_%s_visto')) $('coverGame').hidden=false; }catch(e){}"%sid
    R(a, a+"\ntry{ if(location.hash==='#jogo') $('coverGame').hidden=false; }catch(e){}")
    R("function music(dt,sc){ if(!AC) return;","function music(dt,sc){ if(!AC || window.__noMusic) return;")
    R("window.__P=P;","try{ const _c=JSON.parse(localStorage.getItem('bp_cfg')||'{}'); if(_c.voz===false){ voiceOn=false; $('vo').textContent='🔇'; $('vo').setAttribute('aria-label','Narração desligada'); } if(_c.musica===false) window.__noMusic=true; }catch(e){}\nwindow.__P=P;")
    R('<div class="eyebrow" style="text-align:center">Resumo da história</div>', H+'\n    <div class="eyebrow" style="text-align:center">Resumo da história</div>')
    R('<div class="screen" id="gwin" hidden>\n  <div class="page cover">', '<div class="screen" id="gwin" hidden>\n  <div class="page cover">\n    '+H)
    R('<div id="ctrl" hidden>', '<div id="xbar" hidden><button class="xb" id="xskip" aria-label="Pular para o fim do filme">Pular ⏭</button><a class="xb" href="index.html" aria-label="Sair do filme e voltar para a estante">✕</a></div>\n<div id="ctrl" hidden>')
    R('#ctrl.hide{', '#xbar{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));right:max(12px,env(safe-area-inset-right,0px));z-index:8;display:flex;gap:8px;transition:opacity .4s}\n#xbar.hide{opacity:0;pointer-events:none}\n.xb{border:0;border-radius:999px;height:34px;min-width:34px;padding:0 12px;display:grid;place-items:center;background:rgba(20,22,50,.38);color:#fff;font:800 13px var(--body);text-decoration:none;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:.82}\n.xb:hover,.xb:focus-visible{opacity:1;background:rgba(20,22,50,.6)}\n.xb:focus-visible{outline:2px solid #fff;outline-offset:2px}\n#ctrl.hide{')
    s=s+"""
<script>(function(){ const x=document.getElementById('xbar'), c=document.getElementById('ctrl');
  setInterval(()=>{ const sumOpen=!document.getElementById('summary').hidden; x.hidden=c.hidden || (typeof MODE!=='undefined' && MODE==='game'); document.getElementById('xskip').hidden=sumOpen; x.classList.toggle('hide', c.classList.contains('hide') && !sumOpen); },200);
  document.getElementById('xskip').onclick=e=>{ e.stopPropagation(); const i=SCRIPT.findIndex(l=>l.summary); if(i<0) return; P.scT=0; enterLine(i); if(typeof poke==='function') poke(); };
  addEventListener('pointermove',()=>{ if(typeof poke==='function' && !c.hidden) poke(); },{passive:true}); })();</script>
"""
    s=s+'\n'+HELLO
    pathlib.Path(dst).write_text(HEAD+'<script src="conta-config.js"></script><script src="conta.js"></script>\n'+s)
print('ok')
# (o atalho #jogo é aplicado logo depois deste script)
