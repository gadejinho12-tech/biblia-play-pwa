# Regrava TODAS as falas de um filme (filme + jogo) com as vozes novas, mantendo a voz de Deus.
# Junta as falas do arquivo falas_<filme>.json com os textos que estão hoje no jogo do HTML
# (gsay('chave','texto') e voice:['chave','texto']); falas novas sem áudio ganham gravação.
#
# Uso:  python3 regravar_filme.py jonas
import json, os, re, sys, base64, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gerar_vozes_edge import voz, limpa, gera, duracao

AQUI = os.path.dirname(os.path.abspath(__file__))
FILMES = os.path.join(AQUI, '..', '..', 'filmes')
# falas do jogo que não são da narradora
QUEM_NO_JOGO = {('davi', 'g7'): 'Golias', ('tempestade', 't6'): 'Jesus'}

def textos_do_jogo(s):
    achados = {}
    for k, t in re.findall(r"gsay\(\s*'([a-z0-9_]+)'\s*,\s*'([^']*)'", s): achados[k] = t
    for k, t in re.findall(r"voice:\['([a-z0-9_]+)','([^']*)'\]", s): achados[k] = t
    return achados

def main(nome):
    html = os.path.join(FILMES, nome + '.html')
    s = open(html, encoding='utf-8').read()
    falas = {}
    arq_falas = os.path.join(AQUI, 'falas_%s.json' % nome)
    if os.path.exists(arq_falas):
        for k, quem, t in json.load(open(arq_falas, encoding='utf-8')): falas[k] = [quem, t]
    for k, t in textos_do_jogo(s).items():
        falas[k] = [QUEM_NO_JOGO.get((nome, k), 'Narrador'), t]
    dur = json.loads(re.search(r'const REC_DUR\s*=\s*(\{[^}]*\})', s).group(1))
    tmp = tempfile.mkdtemp(); feitos = novos = 0
    for k, (quem, t) in falas.items():
        v = voz(quem)
        if v is None: continue  # Deus: mantém
        arq = os.path.join(tmp, k + '.mp3'); texto = limpa(t)
        gera(texto, v, arq)
        b64 = 'data:audio/mpeg;base64,' + base64.b64encode(open(arq, 'rb').read()).decode()
        s, n = re.subn(r'("%s":\s*")data:audio/[a-z0-9]+;base64,[^"]+(")' % re.escape(k), lambda mm: mm.group(1) + b64 + mm.group(2), s, count=1)
        if n == 0:  # fala nova: entra no começo da lista de áudios
            i = s.index('const REC = {') + len('const REC = {')
            s = s[:i] + '"%s": "%s", ' % (k, b64) + s[i:]; novos += 1
        dur[k] = round(duracao(arq), 2); feitos += 1
        print(k, quem, dur[k], 's', flush=True)
    m = re.search(r'const REC_DUR\s*=\s*(\{[^}]*\})', s)
    s = s[:m.start(1)] + json.dumps(dur) + s[m.end(1):]
    open(html, 'w', encoding='utf-8').write(s)
    print(nome, ': regravadas', feitos, '(novas:', novos, ')')

if __name__ == '__main__':
    for n in sys.argv[1:]: main(n)
