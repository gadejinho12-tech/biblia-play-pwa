#!/usr/bin/env python3
"""Monta o index.html final.

O jogo é publicado como UM arquivo só (index.html, com os áudios embutidos em base64).
Os módulos novos ficam em src/*.js (mais fáceis de editar) e este script:
  1) aplica pequenos ajustes no núcleo do index.html (save, loop, transição...)
  2) embute src/fx.js logo depois do núcleo
  3) embute as histórias novas antes do bloco "iniciar"
É idempotente: remove o que foi embutido antes e embute de novo.

Uso:  python3 src/build.py
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / 'index.html'
SRC = ROOT / 'src'

html = INDEX.read_text(encoding='utf-8')

# --- remove injeções anteriores -------------------------------------------
html = re.sub(r'<script data-src="[^"]+">.*?</script>\n', '', html, flags=re.S)

NEW_KEYS = ['tempestade1', 'tempestade2', 'tempestade3', 'paes1', 'paes2', 'paes3']

def patch(old, new, count=1):
    global html
    if new in html:
        return  # já aplicado
    n = html.count(old)
    if n != count:
        sys.exit(f'patch falhou ({n} ocorrências): {old[:70]!r}')
    html = html.replace(old, new)

# 1) save: chaves das fases novas
patch("diferencas:0, animals:[]",
      "diferencas:0, " + ", ".join(k + ":0" for k in NEW_KEYS) + ", animals:[]")
# 2) loadGame: carregar as chaves novas
patch("'memoria3','diferencas']){ if(typeof p[k]",
      "'memoria3','diferencas'," + ",".join(f"'{k}'" for k in NEW_KEYS) + "]){ if(typeof p[k]")
# 3) setScene avisa a camada FX (transição + cenário)
patch("scene = scenes[name]; scene.init(...a);",
      "scene = scenes[name]; if(typeof FX!=='undefined') FX.onScene(name); scene.init(...a);")
# 4) loop com HD + efeitos
patch("""  const dt = Math.min(0.05, (ts-last)/1000 || 0.016); last = ts; T += dt;
  if(DLG.active) dlgUpdate();
  else if(!END.active && scene && scene.update) scene.update(dt);
  if(scene && scene.draw) scene.draw(dt);
  if(DLG.active) dlgDraw();
  if(END.active) endDraw(dt);
  requestAnimationFrame(loop);""",
"""  const dt = Math.min(0.05, (ts-last)/1000 || 0.016); last = ts; T += dt;
  const hasFX = typeof FX!=='undefined';
  if(hasFX){ try{ FX.update(dt); }catch(e){} FX.beginFrame(); }
  if(DLG.active) dlgUpdate();
  else if(!END.active && scene && scene.update) scene.update(dt);
  if(scene && scene.draw) scene.draw(dt);
  if(hasFX){ try{ FX.drawWorld(); }catch(e){} }
  if(DLG.active) dlgDraw();
  if(END.active) endDraw(dt);
  if(hasFX){ try{ FX.drawTop(); }catch(e){} }
  requestAnimationFrame(loop);""")
# 5) confete na tela de vitória
patch("  S.win(); setTimeout(()=>S.star(),500);\n  END.btns = [];",
      "  S.win(); setTimeout(()=>S.star(),500);\n  if(typeof FX!=='undefined') FX.celebrate();\n  END.btns = [];")
# 6) Modo Carreira: história que já tem estrela nunca volta a ficar trancada
#    (necessário porque as histórias novas entram NO MEIO da trilha)
patch("""  const idx = real.findIndex(t=>t.storyId===storyId);
  if(idx<=0) return true;""",
"""  const idx = real.findIndex(t=>t.storyId===storyId);
  const stHas = STORIES.find(s=>s.id===storyId);
  if(stHas && stHas.phases.some(p=>(save[p.key]||0)>0)) return true;
  if(idx<=0) return true;""")
patch("  { kind:'story', storyId:'zaqueu' }, // item Ordem 10",
      "  { kind:'story', storyId:'tempestade' },\n  { kind:'story', storyId:'paes' },\n  { kind:'story', storyId:'zaqueu' }, // item Ordem 10")
patch("Protótipo · Cartoon · toque numa história para jogar", "Toque numa história para jogar ✨")

def block(name):
    code = (SRC / name).read_text(encoding='utf-8')
    return f'<script data-src="{name}">\n{code}\n</script>\n'

# FX logo depois do 1º <script> (núcleo)
first_end = html.index('</script>\n') + len('</script>\n')
html = html[:first_end] + block('fx.js') + html[first_end:]

# histórias novas antes do bloco "iniciar"
marker = "<script>\n'use strict';\n/* ---------- iniciar ---------- */"
if marker not in html:
    sys.exit('marcador "iniciar" não encontrado')
extra = ''.join(block(n) for n in ['novas_comum.js', 'tempestade.js', 'paes.js'] if (SRC / n).exists())
html = html.replace(marker, extra + marker)

INDEX.write_text(html, encoding='utf-8')
print('ok', len(html), 'bytes')
