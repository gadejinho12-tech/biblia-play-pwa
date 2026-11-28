# Monta filmes/rute.html (Rute e Boaz) a partir de filmes/natal.html + rute_parts.js
# e gera falas_rute.json. Depois: python3 regravar_filme.py rute  (e rode este script de novo: ele guarda os áudios)
import json, os, re
AQUI = os.path.dirname(os.path.abspath(__file__)); F = os.path.join(AQUI, '..', '..', 'filmes')
s = open(os.path.join(F, 'natal.html'), encoding='utf-8').read()
P = {m.group(1): m.group(2) for m in re.finditer(r'//@@(\w+)\n(.*?)(?=//@@|\Z)', open(os.path.join(AQUI, 'rute_parts.js'), encoding='utf-8').read(), re.S)}

def R(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:90]); s = s.replace(a, b)
def entre(a, b, novo, manter_b=True):
    global s
    i = s.index(a); j = s.index(b, i); s = s[:i] + novo + (s[j:] if manter_b else s[j + len(b):])

# áudios: reaproveita os já gravados do rute.html (se existir); senão começa vazio
rec, dur = '{}', '{}'
if os.path.exists(os.path.join(F, 'rute.html')):
    velho = open(os.path.join(F, 'rute.html'), encoding='utf-8').read()
    rec = re.search(r'const REC = (\{.*?\});\n', velho, re.S).group(1); dur = re.search(r'const REC_DUR = (\{[^}]*\});', velho).group(1)
s = re.sub(r'const REC = \{.*?\};\n', lambda m: 'const REC = ' + rec + ';\n', s, count=1, flags=re.S)
s = re.sub(r'const REC_DUR = \{[^}]*\};', lambda m: 'const REC_DUR = ' + dur + ';', s, count=1)
# elenco, cenas, roteiro, trilha e jogo
R('const CAST={\n', 'const CAST={\n' + P['CAST'])
R('/* ================= ROTEIRO', P['SCENES'] + '/* ================= ROTEIRO')
entre('const CH=', 'let vi=0;', P['ROTEIRO'])
R("(l.sc==='viagem'||l.sc==='magos'||l.sc==='estabulo')", "(l.sc==='viagem'||l.sc==='campo'||l.sc==='proposito')")
entre('const MOOD=', '\nlet chordT', P['MOOD'].rstrip('\n'))
entre('/* ================= JOGO DE RECOMPENSA', '/* ================= LOOP', P['GAME'])
R("const scName=P.started? l.sc : 'estabulo';", "const scName=P.started? l.sc : 'campo';")
R("(SC[scName]||SC.estabulo)(P.started? P.scT : 6.5)", "(SC[scName]||SC.campo)(P.started? P.scT : 6.5)")
R("music(dt, GS.phase===1?'estabulo':(GS.phase===2?'pastores':'magos'));", "music(dt, ['campo','conversa','familia'][GS.phase-1]||'campo');")
s = s.replace('bp_natal_', 'bp_rute_')
# personagens: poses novas (colher com a foice, bebê no colo), rosto triste, franja grisalha (Noemi) e cajado para qualquer um
R("  else if(pose==='kneel'){ h1=[22,-24]; h2=[30,-20]; }", "  else if(pose==='kneel'){ h1=[22,-24]; h2=[30,-20]; }\n"
  "  else if(pose==='reap'){ const a=Math.sin(t*5); h1=[18,-34]; h2=[34+a*6,-30-a*14]; }\n"
  "  else if(pose==='cradle'){ h1=[-6,-46]; h2=[18,-50]; }")
R("  if(pose==='harp') harp();", "  if(pose==='harp') harp();\n"
  "  if(pose==='reap'){ ctx.save(); ctx.translate(h2[0],h2[1]); ctx.rotate(.5+Math.sin(t*5)*.7); ctx.fillStyle='#7a5236'; rr(-2.5,-2,5,16,2); ctx.fill(); ctx.strokeStyle='#c8ccd0'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.beginPath(); ctx.arc(9,-2,10,Math.PI*1.05,Math.PI*1.95); ctx.stroke(); ctx.restore(); }")
R("  shade(0,0,19,18,C.skin[0],C.skin[1]);", "  shade(0,0,19,18,C.skin[0],C.skin[1]);\n  if(C.fringe){ shade(-1,-14,16,6,C.fringe,mix(C.fringe,'#000000',.15)); ctx.strokeStyle='rgba(120,90,70,.35)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(9,4); ctx.lineTo(13,6); ctx.moveTo(-12,4); ctx.lineTo(-8,6); ctx.stroke(); }")
R("  else { ctx.strokeStyle='#7a3a2e'; ctx.lineWidth=1.8; ctx.beginPath(); ctx.arc(3,6,4.5,.2*Math.PI,.8*Math.PI); ctx.stroke(); }",
  "  else if(o.sad){ ctx.strokeStyle='#7a3a2e'; ctx.lineWidth=1.8; ctx.beginPath(); ctx.arc(3,11.5,4,1.2*Math.PI,1.8*Math.PI); ctx.stroke(); }\n"
  "  else { ctx.strokeStyle='#7a3a2e'; ctx.lineWidth=1.8; ctx.beginPath(); ctx.arc(3,6,4.5,.2*Math.PI,.8*Math.PI); ctx.stroke(); }")
R("if(id==='noe' && o.staff)", "if(o.staff)")
# abertura: os campos dourados de Belém vistos de longe (não a primeira cena, que é em Moabe)
R("const prim=SCRIPT.find(l=>!l.intro && l.card==null).sc, cena=SC[prim];", "const cena=SC.campo;")
s = re.sub(r"const ABERTURA_TITULO=.*?;\n", lambda m: "const ABERTURA_TITULO='Os campos de Belém';\n", s, count=1)
# textos da página
R('<title>O Nascimento de Jesus</title>', '<title>Rute e Boaz</title>')
R('aria-label="Filme ilustrado: O nascimento de Jesus"', 'aria-label="Filme ilustrado: Rute e Boaz"')
entre('<div class="screen" id="cover">', '<div id="ghud"', '''<div class="screen" id="cover">
  <div class="page cover">
    <div class="eyebrow">Clubinho do Reino · Filmes</div>
    <h1>Rute e Boaz</h1>
    <p>Rute não deixou Noemi sozinha. No campo de Boaz, ela encontrou bondade... e Deus transformou a tristeza em alegria. Com narração, para assistir em família.</p>
    <button class="go" id="play">▶ Assistir o filme</button>
    <div class="row" style="margin-top:12px"><a class="ghost" href="index.html">📚 Voltar à estante</a></div>
    <div class="meta">Cerca de 2 minutos · 4 capítulos · Rute 1–4<br>Depois do filme: o jogo <b>O Campo de Boaz</b>, com 3 fases diferentes 🎁</div>
    <div class="row" style="margin-top:10px"><button class="ghost" id="coverGame" hidden>🎮 Jogar O Campo de Boaz</button></div>
  </div>
</div>
''')
entre('<div class="screen" id="gwin" hidden>', '<div class="screen" id="summary" hidden>', '''<div class="screen" id="gwin" hidden>
  <div class="page cover">
    <div class="bp-hello" hidden><img alt=""><span></span></div>
    <div class="eyebrow">O Campo de Boaz</div>
    <h1>Uma família abençoada! 🌾</h1>
    <div class="stars" id="gStars">⭐⭐⭐</div>
    <p id="gRes"></p>
    <div class="verse"><q>Que o Senhor Deus abençoe você!</q><span>Rute 2:12</span></div>
    <div class="row"><button class="go" id="gAgain">↻ Jogar de novo</button><button class="ghost" id="gFilm">🎬 Ver o filme</button><a class="ghost" href="index.html">📚 Estante</a></div>
  </div>
</div>
''')
entre('<div class="screen" id="summary" hidden>', '\n<script>', '''<div class="screen" id="summary" hidden>
  <div class="page sum">
    <div class="bp-hello" hidden><img alt=""><span></span></div>
    <div class="eyebrow" style="text-align:center">Resumo da história</div>
    <h3>O que aprendemos com Rute</h3>
    <ul>
      <li><span class="ic">🤝</span><div><b>Lealdade</b>Rute não abandonou Noemi.</div></li>
      <li><span class="ic">💛</span><div><b>Bondade</b>Boaz ajudou Rute de coração.</div></li>
      <li><span class="ic">🌾</span><div><b>Deus cuida</b>Deus transformou a tristeza de Noemi em alegria.</div></li>
    </ul>
    <div class="verse"><q>Aonde você for, eu irei; o seu Deus será o meu Deus.</q><span>Rute 1:16</span></div>
    <div class="talk"><b>Para conversar em família</b>Quem você pode ajudar hoje, como Boaz ajudou Rute?</div>
    <div class="row"><button class="go" id="toGame">🎁 Agora é sua vez: jogar!</button><button class="ghost" id="again">↻ Assistir de novo</button><a class="ghost" href="index.html">📚 Estante</a></div>
  </div>
</div>
''')
for velho in ('Biblinha Play', 'Bíblia Play', 'Amiguinhos', 'TV das Ovelhinhas'):
    assert velho not in s, velho
open(os.path.join(F, 'rute.html'), 'w', encoding='utf-8').write(s)

# falas para gravar (mesma numeração do filme: v01.. e c1..c4)
roteiro = P['ROTEIRO']
CH = re.findall(r"'([^']+)'", re.search(r'const CH=\[(.*?)\];', roteiro).group(1))
QUEM = {'N': 'Narrador', 'NOE': 'Noemi', 'RUT': 'Rute', 'BOA': 'Boaz', 'TRA': 'Trabalhador'}
NUM = ['um', 'dois', 'três', 'quatro']
falas = []; vi = 0
for m in re.finditer(r"\{card:(\d)\}|\.\.\.(NOE|RUT|BOA|TRA|N)\('((?:[^'\\]|\\.)*)'\)", roteiro):
    if m.group(1) is not None:
        c = int(m.group(1)); falas.append(['c%d' % (c + 1), 'Narrador', 'Capítulo %s. %s.' % (NUM[c], CH[c])])
    else:
        vi += 1; falas.append(['v%02d' % vi, QUEM[m.group(2)], m.group(3)])
json.dump(falas, open(os.path.join(AQUI, 'falas_rute.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print('ok:', len(falas), 'falas')
