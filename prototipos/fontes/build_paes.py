# Monta filmes/paes.html (Pães e Peixes) a partir de filmes/natal.html + paes_parts.js
# e gera falas_paes.json. Depois: python3 regravar_filme.py paes
import json, os, re
AQUI = os.path.dirname(os.path.abspath(__file__)); F = os.path.join(AQUI, '..', '..', 'filmes')
s = open(os.path.join(F, 'natal.html'), encoding='utf-8').read()
P = {m.group(1): m.group(2) for m in re.finditer(r'//@@(\w+)\n(.*?)(?=//@@|\Z)', open(os.path.join(AQUI, 'paes_parts.js'), encoding='utf-8').read(), re.S)}

def R(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:90]); s = s.replace(a, b)
def entre(a, b, novo, manter_b=True):
    global s
    i = s.index(a); j = s.index(b, i); s = s[:i] + novo + (s[j:] if manter_b else s[j + len(b):])

# áudios: começa vazio (as vozes são gravadas depois)
# áudios: reaproveita os já gravados do paes.html (se existir); senão começa vazio
rec, dur = '{}', '{}'
if os.path.exists(os.path.join(F, 'paes.html')):
    velho = open(os.path.join(F, 'paes.html'), encoding='utf-8').read()
    rec = re.search(r'const REC = (\{.*?\});\n', velho, re.S).group(1); dur = re.search(r'const REC_DUR = (\{[^}]*\});', velho).group(1)
s = re.sub(r'const REC = \{.*?\};\n', lambda m: 'const REC = ' + rec + ';\n', s, count=1, flags=re.S)
s = re.sub(r'const REC_DUR = \{[^}]*\};', lambda m: 'const REC_DUR = ' + dur + ';', s, count=1)
# elenco, cenas, roteiro, trilha e jogo
R('const CAST={\n', 'const CAST={\n' + P['CAST'])
R('/* ================= ROTEIRO', P['SCENES'] + '/* ================= ROTEIRO')
entre('const CH=', 'let vi=0;', P['ROTEIRO'])
R("(l.sc==='viagem'||l.sc==='magos'||l.sc==='estabulo')", "(l.sc==='multidao'||l.sc==='reparte'||l.sc==='sobras')")
entre('const MOOD=', '\nlet chordT', P['MOOD'].rstrip('\n'))
entre('/* ================= JOGO DE RECOMPENSA', '/* ================= LOOP', P['GAME'])
R("const scName=P.started? l.sc : 'estabulo';", "const scName=P.started? l.sc : 'multidao';")
R("(SC[scName]||SC.estabulo)(P.started? P.scT : 6.5)", "(SC[scName]||SC.multidao)(P.started? P.scT : 6.5)")
R("music(dt, GS.phase===1?'estabulo':(GS.phase===2?'pastores':'magos'));", "music(dt, ['menino','reparte','sobras'][GS.phase-1]||'menino');")
s = s.replace('bp_natal_', 'bp_paes_')
# textos da página
R('<title>O Nascimento de Jesus</title>', '<title>Pães e Peixes</title>')
R('aria-label="Filme ilustrado: O nascimento de Jesus"', 'aria-label="Filme ilustrado: Pães e peixes"')
entre('<div class="screen" id="cover">', '<div id="ghud"', '''<div class="screen" id="cover">
  <div class="page cover">
    <div class="eyebrow">Biblinha Play · Filmes</div>
    <h1>Pães e Peixes</h1>
    <p>Uma multidão com fome, um menino com um lanche pequenininho... e Jesus, que fez o pouco virar muito. Com narração, para assistir em família.</p>
    <button class="go" id="play">▶ Assistir o filme</button>
    <div class="row" style="margin-top:12px"><a class="ghost" href="index.html">📚 Voltar à estante</a></div>
    <div class="meta">Cerca de 2 minutos · 4 capítulos · João 6:1-14<br>Depois do filme: o jogo <b>O Lanche que Não Acaba</b>, com 3 fases diferentes 🎁</div>
    <div class="row" style="margin-top:10px"><button class="ghost" id="coverGame" hidden>🎮 Jogar O Lanche que Não Acaba</button></div>
  </div>
</div>
''')
entre('<div class="screen" id="gwin" hidden>', '<div class="screen" id="summary" hidden>', '''<div class="screen" id="gwin" hidden>
  <div class="page cover">
    <div class="bp-hello" hidden><img alt=""><span></span></div>
    <div class="eyebrow">O Lanche que Não Acaba</div>
    <h1>Doze cestos cheios! 🧺</h1>
    <div class="stars" id="gStars">⭐⭐⭐</div>
    <p id="gRes"></p>
    <div class="verse"><q>Juntem os pedaços que sobraram, para que nada se perca.</q><span>João 6:12</span></div>
    <div class="row"><button class="go" id="gAgain">↻ Jogar de novo</button><button class="ghost" id="gFilm">🎬 Ver o filme</button><a class="ghost" href="index.html">📚 Estante</a></div>
  </div>
</div>
''')
entre('<div class="screen" id="summary" hidden>', '\n<script>', '''<div class="screen" id="summary" hidden>
  <div class="page sum">
    <div class="bp-hello" hidden><img alt=""><span></span></div>
    <div class="eyebrow" style="text-align:center">Resumo da história</div>
    <h3>O que aprendemos com os pães e peixes</h3>
    <ul>
      <li><span class="ic">🤲</span><div><b>Repartir</b>O menino deu o que tinha, e Jesus usou o lanche dele para alimentar todo mundo.</div></li>
      <li><span class="ic">🙏</span><div><b>Agradecer</b>Antes de repartir, Jesus agradeceu a Deus pelo alimento.</div></li>
      <li><span class="ic">💛</span><div><b>Deus cuida</b>Deus conhece as nossas necessidades e cuida de nós.</div></li>
    </ul>
    <div class="verse"><q>Eu sou o pão da vida.</q><span>João 6:35</span></div>
    <div class="talk"><b>Para conversar em família</b>O que você pode repartir com alguém esta semana?</div>
    <div class="row"><button class="go" id="toGame">🎁 Agora é sua vez: jogar!</button><button class="ghost" id="again">↻ Assistir de novo</button><a class="ghost" href="index.html">📚 Estante</a></div>
  </div>
</div>
''')
open(os.path.join(F, 'paes.html'), 'w', encoding='utf-8').write(s)

# falas para gravar (mesma numeração do filme: v01.. e c1..c4)
roteiro = P['ROTEIRO']
CH = re.findall(r"'([^']+)'", re.search(r'const CH=\[(.*?)\];', roteiro).group(1))
QUEM = {'N': 'Narrador', 'JES': 'Jesus', 'FIL': 'Filipe', 'AND': 'André', 'MEN': 'Menino'}
NUM = ['um', 'dois', 'três', 'quatro']
falas = []; vi = 0
for m in re.finditer(r"\{card:(\d)\}|\.\.\.(N|JES|FIL|AND|MEN)\('((?:[^'\\]|\\.)*)'\)", roteiro):
    if m.group(1) is not None:
        c = int(m.group(1)); falas.append(['c%d' % (c + 1), 'Narrador', 'Capítulo %s. %s.' % (NUM[c], CH[c])])
    else:
        vi += 1; falas.append(['v%02d' % vi, QUEM[m.group(2)], m.group(3)])
json.dump(falas, open(os.path.join(AQUI, 'falas_paes.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print('ok:', len(falas), 'falas')

# abertura do filme (câmera de longe chegando perto + musiquinha)
import abertura; abertura.aplicar('paes')
