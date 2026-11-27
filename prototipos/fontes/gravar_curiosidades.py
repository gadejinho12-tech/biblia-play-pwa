# Grava o áudio do "Você sabia?" (voz da narradora) para cada curiosidade de filmes/curiosidades.js.
# Uso:  SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 gravar_curiosidades.py          (só as que faltam)
#       SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 gravar_curiosidades.py todas    (regrava tudo)
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gerar_vozes_edge import voz, limpa, gera
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'filmes')
s = open(os.path.join(F, 'curiosidades.js'), encoding='utf-8').read()
itens = re.findall(r"id:'(c\d+)'.*?texto:'((?:[^'\\]|\\.)*)'", s)
pasta = os.path.join(F, 'audio', 'curiosidades'); os.makedirs(pasta, exist_ok=True)
for cid, texto in itens:
    arq = os.path.join(pasta, cid + '.mp3')
    if os.path.exists(arq) and 'todas' not in sys.argv: continue
    gera(limpa(texto), voz('Narrador'), arq); print(cid, 'ok', os.path.getsize(arq)//1024, 'KB')
