# Regrava as falas de um filme com as vozes neurais da Microsoft (gratuitas, via edge-tts)
# e troca os áudios dentro do HTML do filme.
#
# Uso:  python3 gerar_vozes_edge.py falas_criacao.json ../../filmes/criacao.html
#
# Elenco escolhido pelo dono em 25/11/2026:
#   Narradora  -> Francisca (pt-BR), um pouco mais lenta
#   Personagens masculinos -> Brian (multilíngue), leitura natural
#   Deus -> mantém a voz que já está no filme (não regrava)
# Precisa: pip install edge-tts, ffprobe, e acesso a speech.platform.bing.com.
import json, os, re, subprocess, sys, base64, tempfile

ELENCO = {
    'Narrador': ('pt-BR-FranciscaNeural', '-12%', '+0Hz'),
    'Deus': None,  # mantém a gravação atual
}
HOMENS = ('en-US-BrianMultilingualNeural', '-4%', '+0Hz')
MULHERES = ('pt-BR-ThalitaMultilingualNeural', '-8%', '+0Hz')
FEMININOS = {'Maria', 'Anjo'}

def voz(quem):
    if quem in ELENCO: return ELENCO[quem]
    return MULHERES if quem in FEMININOS else HOMENS

def limpa(t):
    t = re.sub(r'\(.*?\)', '', t)
    return re.sub(r'\s+', ' ', t.replace('"', '')).strip()

def gera(texto, v, saida):
    nome, rate, pitch = v
    cmd = ['edge-tts', '--voice', nome, '--rate=' + rate, '--pitch=' + pitch, '--text', texto, '--write-media', saida]
    if os.environ.get('HTTPS_PROXY'): cmd[1:1] = ['--proxy', os.environ['HTTPS_PROXY']]
    for tentativa in range(4):
        r = subprocess.run(cmd, capture_output=True, text=True)
        # às vezes o serviço corta o áudio no meio: confere se o tempo bate com o tamanho do texto
        if r.returncode == 0 and os.path.getsize(saida) > 1000 and duracao(saida) >= len(texto) * 0.052: return
    raise SystemExit('falhou: ' + texto[:60] + '\n' + r.stderr[-400:])

def duracao(arq):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', arq]).decode())

def main(falas_json, html):
    falas = json.load(open(falas_json, encoding='utf-8'))
    s = open(html, encoding='utf-8').read()
    m = re.search(r'const REC_DUR\s*=\s*(\{[^}]*\})', s)
    dur = json.loads(m.group(1))
    tmp = tempfile.mkdtemp()
    feitos = 0
    for chave, quem, texto in falas:
        v = voz(quem)
        if v is None: continue
        arq = os.path.join(tmp, chave + '.mp3')
        gera(limpa(texto), v, arq)
        b64 = base64.b64encode(open(arq, 'rb').read()).decode()
        s, n = re.subn(r'("%s":\s*")data:audio/[a-z0-9]+;base64,[^"]+(")' % re.escape(chave), lambda mm: mm.group(1) + 'data:audio/mpeg;base64,' + b64 + mm.group(2), s, count=1)
        if n != 1: raise SystemExit('não achei o áudio ' + chave + ' no HTML')
        dur[chave] = round(duracao(arq), 2)
        feitos += 1
        print(chave, quem, dur[chave], 's')
    s = s[:m.start(1)] + json.dumps(dur) + s[m.end(1):]
    open(html, 'w', encoding='utf-8').write(s)
    print('regravadas:', feitos)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
