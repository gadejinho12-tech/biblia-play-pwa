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

# Elenco (ajustado pelo dono em 26/11/2026). Cada voz: (voz, velocidade, tom, efeito)
# efeito: 'grave'/'agudo' mudam o tamanho da voz (fator), 'eco' dá um ar solene.
ELENCO = {
    'Narrador':     ('pt-BR-FranciscaNeural', '-12%', '+0Hz', None),
    'Deus':         ('pt-BR-AntonioNeural', '-10%', '+0Hz', {'fator': .9, 'eco': True}),
    'Noé':          ('en-US-BrianMultilingualNeural', '-6%', '+0Hz', {'fator': .94}),
    'Filho de Noé': ('pt-BR-AntonioNeural', '+4%', '+0Hz', {'fator': 1.12}),
    'Vizinho':      ('pt-BR-AntonioNeural', '+6%', '+0Hz', None),
    'Davi':         ('en-US-BrianMultilingualNeural', '+0%', '+0Hz', {'fator': 1.12}),
    'Saul':         ('pt-BR-AntonioNeural', '-4%', '+0Hz', {'fator': .95}),
    'Golias':       ('pt-BR-AntonioNeural', '-8%', '+0Hz', {'fator': .76, 'eco': True, 'volume': -15.5}),
    'Jesus':        ('pt-BR-AntonioNeural', '-8%', '+0Hz', {'fator': .97}),
    'Pedro':        ('en-US-BrianMultilingualNeural', '+0%', '+0Hz', None),
    'Jonas':        ('en-US-BrianMultilingualNeural', '-4%', '+0Hz', None),
    'Marinheiro':   ('pt-BR-AntonioNeural', '+4%', '+0Hz', None),
    'José':         ('en-US-BrianMultilingualNeural', '-4%', '+0Hz', {'fator': .96}),
    'Maria':        ('pt-BR-ThalitaMultilingualNeural', '-8%', '+0Hz', None),
    'Anjo':         ('pt-BR-ThalitaMultilingualNeural', '-10%', '+0Hz', {'eco': True}),
}
HOMENS = ('en-US-BrianMultilingualNeural', '-4%', '+0Hz', None)

def voz(quem):
    return ELENCO.get(quem, HOMENS)

def limpa(t):
    t = re.sub(r'\(.*?\)', '', t)
    return re.sub(r'\s+', ' ', t.replace('"', '')).strip()

def gera(texto, v, saida):
    nome, rate, pitch, fx = v
    bruto = saida + '.bruto.mp3' if fx else saida
    cmd = ['edge-tts', '--voice', nome, '--rate=' + rate, '--pitch=' + pitch, '--text', texto, '--write-media', bruto]
    if os.environ.get('HTTPS_PROXY'): cmd[1:1] = ['--proxy', os.environ['HTTPS_PROXY']]
    for tentativa in range(5):
        r = subprocess.run(cmd, capture_output=True, text=True)
        # às vezes o serviço corta o áudio no meio: confere se o tempo bate com o tamanho do texto
        if r.returncode == 0 and os.path.getsize(bruto) > 1000 and duracao(bruto) >= len(texto) * 0.045: break
    else:
        raise SystemExit('falhou: ' + texto[:60] + '\n' + r.stderr[-400:])
    # todas as vozes no mesmo volume (o gigante um pouco mais forte)
    f = (fx or {}).get('fator', 1); filtros = []
    if f != 1: filtros.append('asetrate=24000*%s,aresample=24000,atempo=%s' % (f, round(1 / f, 4)))
    if (fx or {}).get('eco'): filtros.append('aecho=0.85:0.6:55|110:0.2|0.12')
    filtros.append('loudnorm=I=%s:TP=-1.5:LRA=11' % (fx or {}).get('volume', -18))
    filtros.append('aresample=24000')
    final = saida if fx else saida + '.norm.mp3'
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', bruto, '-af', ','.join(filtros), '-ac', '1', '-b:a', '64k', final], check=True)
    if fx: os.remove(bruto)
    else: os.replace(final, saida)

def duracao(arq):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', arq]).decode())

def main(falas_json, html):  # (uso antigo: só a Criação)
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
    m = re.search(r'const REC_DUR\s*=\s*(\{[^}]*\})', s)  # procura de novo: as posições mudaram com os áudios novos
    s = s[:m.start(1)] + json.dumps(dur) + s[m.end(1):]
    open(html, 'w', encoding='utf-8').write(s)
    print('regravadas:', feitos)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
