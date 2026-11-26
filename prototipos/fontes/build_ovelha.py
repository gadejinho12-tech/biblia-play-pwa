# Monta filmes/ovelha.html (A Ovelha Perdida) a partir de filmes/natal.html + ovelha_parts.js
# e gera falas_ovelha.json. Depois: python3 regravar_filme.py ovelha
import json, os, re
AQUI = os.path.dirname(os.path.abspath(__file__)); F = os.path.join(AQUI, '..', '..', 'filmes')
s = open(os.path.join(F, 'natal.html'), encoding='utf-8').read()
P = {m.group(1): m.group(2) for m in re.finditer(r'//@@(\w+)\n(.*?)(?=//@@|\Z)', open(os.path.join(AQUI, 'ovelha_parts.js'), encoding='utf-8').read(), re.S)}

def R(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:90]); s = s.replace(a, b)
def entre(a, b, novo, manter_b=True):
    global s
    i = s.index(a); j = s.index(b, i); s = s[:i] + novo + (s[j:] if manter_b else s[j + len(b):])

# áudios: começa vazio (as vozes são gravadas depois)
# áudios: reaproveita os já gravados do ovelha.html (se existir); senão começa vazio
rec, dur = '{}', '{}'
if os.path.exists(os.path.join(F, 'ovelha.html')):
    velho = open(os.path.join(F, 'ovelha.html'), encoding='utf-8').read()
    rec = re.search(r'const REC = (\{.*?\});\n', velho, re.S).group(1); dur = re.search(r'const REC_DUR = (\{[^}]*\});', velho).group(1)
s = re.sub(r'const REC = \{.*?\};\n', lambda m: 'const REC = ' + rec + ';\n', s, count=1, flags=re.S)
s = re.sub(r'const REC_DUR = \{[^}]*\};', lambda m: 'const REC_DUR = ' + dur + ';', s, count=1)
# elenco, cenas, roteiro, trilha e jogo
R('const CAST={\n', 'const CAST={\n' + P['CAST'])
R('/* ================= ROTEIRO', P['SCENES'] + '/* ================= ROTEIRO')
entre('const CH=', 'let vi=0;', P['ROTEIRO'])
R("(l.sc==='viagem'||l.sc==='magos'||l.sc==='estabulo')", "(l.sc==='campo'||l.sc==='procura'||l.sc==='ombros')")
entre('const MOOD=', '\nlet chordT', P['MOOD'].rstrip('\n'))
entre('/* ================= JOGO DE RECOMPENSA', '/* ================= LOOP', P['GAME'])
R("const scName=P.started? l.sc : 'estabulo';", "const scName=P.started? l.sc : 'jesus_conta';")
R("(SC[scName]||SC.estabulo)(P.started? P.scT : 6.5)", "(SC[scName]||SC.jesus_conta)(P.started? P.scT : 6.5)")
R("music(dt, GS.phase===1?'estabulo':(GS.phase===2?'pastores':'magos'));", "music(dt, ['campo','procura','festa'][GS.phase-1]||'campo');")
s = s.replace('bp_natal_', 'bp_ovelha_')
# textos da página
R('<title>O Nascimento de Jesus</title>', '<title>A Ovelha Perdida</title>')
R('aria-label="Filme ilustrado: O nascimento de Jesus"', 'aria-label="Filme ilustrado: A ovelha perdida"')
entre('<div class="screen" id="cover">', '<div id="ghud"', '''<div class="screen" id="cover">
  <div class="page cover">
    <div class="eyebrow">Biblinha Play · Filmes</div>
    <h1>A Ovelha Perdida</h1>
    <p>Um pastor, cem ovelhinhas e uma que se perdeu. A história que Jesus contou para mostrar que Deus nunca desiste de você. Com narração, para assistir em família.</p>
    <button class="go" id="play">▶ Assistir o filme</button>
    <div class="row" style="margin-top:12px"><a class="ghost" href="index.html">📚 Voltar à estante</a></div>
    <div class="meta">Cerca de 2 minutos · 4 capítulos · Lucas 15:3-7<br>Depois do filme: o jogo <b>Ache a Ovelhinha!</b>, com 3 fases diferentes 🎁</div>
    <div class="row" style="margin-top:10px"><button class="ghost" id="coverGame" hidden>🎮 Jogar Ache a Ovelhinha!</button></div>
  </div>
</div>
''')
entre('<div class="screen" id="gwin" hidden>', '<div class="screen" id="summary" hidden>', '''<div class="screen" id="gwin" hidden>
  <div class="page cover">
    <div class="bp-hello" hidden><img alt=""><span></span></div>
    <div class="eyebrow">Ache a Ovelhinha!</div>
    <h1>A ovelhinha voltou! 🐑</h1>
    <div class="stars" id="gStars">⭐⭐⭐</div>
    <p id="gRes"></p>
    <div class="verse"><q>Alegrem-se comigo, pois encontrei a minha ovelha perdida.</q><span>Lucas 15:6</span></div>
    <div class="row"><button class="go" id="gAgain">↻ Jogar de novo</button><button class="ghost" id="gFilm">🎬 Ver o filme</button><a class="ghost" href="index.html">📚 Estante</a></div>
  </div>
</div>
''')
entre('<div class="screen" id="summary" hidden>', '\n<script>', '''<div class="screen" id="summary" hidden>
  <div class="page sum">
    <div class="bp-hello" hidden><img alt=""><span></span></div>
    <div class="eyebrow" style="text-align:center">Resumo da história</div>
    <h3>O que aprendemos com a ovelha perdida</h3>
    <ul>
      <li><span class="ic">💛</span><div><b>Você é importante</b>Deus conhece e ama cada pessoa, uma por uma.</div></li>
      <li><span class="ic">🔦</span><div><b>Deus procura</b>O Bom Pastor não desiste de quem se perdeu.</div></li>
      <li><span class="ic">🎉</span><div><b>Alegria no céu</b>Há festa no céu quando alguém volta para Deus.</div></li>
    </ul>
    <div class="verse"><q>Eu sou o bom pastor. Conheço as minhas ovelhas.</q><span>João 10:14</span></div>
    <div class="talk"><b>Para conversar em família</b>Você já se perdeu de alguém? Como se sentiu quando foi encontrado?</div>
    <div class="row"><button class="go" id="toGame">🎁 Agora é sua vez: jogar!</button><button class="ghost" id="again">↻ Assistir de novo</button><a class="ghost" href="index.html">📚 Estante</a></div>
  </div>
</div>
''')
open(os.path.join(F, 'ovelha.html'), 'w', encoding='utf-8').write(s)

# falas para gravar (mesma numeração do filme: v01.. e c1..c4)
roteiro = P['ROTEIRO']
CH = re.findall(r"'([^']+)'", re.search(r'const CH=\[(.*?)\];', roteiro).group(1))
QUEM = {'N': 'Narrador', 'JES': 'Jesus', 'PAS': 'Pastor'}
NUM = ['um', 'dois', 'três', 'quatro']
falas = []; vi = 0
for m in re.finditer(r"\{card:(\d)\}|\.\.\.(N|JES|PAS)\('((?:[^'\\]|\\.)*)'\)", roteiro):
    if m.group(1) is not None:
        c = int(m.group(1)); falas.append(['c%d' % (c + 1), 'Narrador', 'Capítulo %s. %s.' % (NUM[c], CH[c])])
    else:
        vi += 1; falas.append(['v%02d' % vi, QUEM[m.group(2)], m.group(3)])
json.dump(falas, open(os.path.join(AQUI, 'falas_ovelha.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print('ok:', len(falas), 'falas')
