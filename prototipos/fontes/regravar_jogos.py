# Regrava a narradora dos jogos clássicos (memória, quiz, caça-palavras) com a voz nova.
# Uso: python3 regravar_jogos.py
import json, os, re, sys, base64, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gerar_vozes_edge import voz, limpa, gera

AQUI = os.path.dirname(os.path.abspath(__file__)); FILMES = os.path.join(AQUI, '..', '..', 'filmes')
txt = {k: t for k, q, t in json.load(open(os.path.join(AQUI, 'falas_jogos_classicos.json'), encoding='utf-8'))}
txt.update({'m_maria': 'Maria!', 'm_jose': 'José!', 'm_anjo': 'Anjo!', 'm_zaqueu': 'Zaqueu!', 'm_pastor1': 'Pastor!', 'm_menino': 'Menino!'})
quiz = open(os.path.join(FILMES, 'quiz.html'), encoding='utf-8').read()
extra = json.loads(re.search(r'const EXTRA=(\[.*?\]\]);', quiz, re.S).group(1))
for i, e in enumerate(extra): txt['q%02d' % (26 + i)] = e[2]
tmp = tempfile.mkdtemp()
SO_NOVAS = '--so-novas' in sys.argv  # grava só o que ainda não tem áudio
for nome in ['memoria', 'quiz', 'cacapalavras']:
    html = os.path.join(FILMES, nome + '.html'); s = open(html, encoding='utf-8').read()
    chaves = re.findall(r'"([a-zA-Z0-9_]+)":\s*"data:audio', s); feitos = 0
    # falas novas que ainda não têm áudio (perguntas novas do quiz, nomes novos da memória)
    if nome == 'quiz': novas = ['q%02d' % (26 + i) for i in range(len(extra))]
    elif nome == 'memoria': novas = ['m_' + x for x in re.findall(r"'([a-z0-9]+)'", re.search(r"const POOL=\[(.*?)\];", s).group(1))]
    else: novas = []
    faltam = [k for k in novas if k not in chaves]
    if SO_NOVAS: chaves = []
    for k in faltam:
        i = s.index('const REC={') + len('const REC={'); s = s[:i] + '"%s": "data:audio/mpeg;base64,", ' % k + s[i:]; chaves.append(k)
    for k in chaves:
        if k not in txt: print('sem texto:', nome, k); continue
        arq = os.path.join(tmp, nome + k + '.mp3'); gera(limpa(txt[k]), voz('Narrador'), arq)
        b64 = 'data:audio/mpeg;base64,' + base64.b64encode(open(arq, 'rb').read()).decode()
        s, n = re.subn(r'("%s":\s*")data:audio/[a-z0-9]+;base64,[^"]*(")' % re.escape(k), lambda mm: mm.group(1) + b64 + mm.group(2), s, count=1)
        feitos += n
    open(html, 'w', encoding='utf-8').write(s); print(nome, 'regravadas', feitos, 'de', len(chaves), flush=True)
