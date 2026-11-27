# Gera a voz da Lili frase por frase + uma musiquinha suave, e o arquivo de tempos para o vídeo.
# Uso: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 gerar_audio.py ovelha
import json, os, subprocess, sys, numpy as np
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'fontes'))
from gerar_vozes_edge import gera, duracao
LILI = ('pt-BR-ThalitaMultilingualNeural', '-4%', '+0Hz', {'fator': 1.16})
nome = sys.argv[1]; aqui = os.path.dirname(os.path.abspath(__file__)); d = json.load(open(os.path.join(aqui, nome + '.json'), encoding='utf-8'))
tmp = os.path.join(aqui, 'tmp_' + nome); os.makedirs(tmp, exist_ok=True)
SR = 24000; t = 0.8; partes = []; PAUSA = 0.45
for i, f in enumerate(d['falas']):
    arq = os.path.join(tmp, '%02d.mp3' % i)
    if not os.path.exists(arq): gera(f['t'], LILI, arq)
    du = duracao(arq); f['ini'] = round(t, 3); f['dur'] = round(du, 3); partes.append((t, arq)); t += du + PAUSA
total = t + 3.2; d['total'] = round(total, 2)
# voz inteira
voz = np.zeros(int(total * SR), dtype=np.float32)
for ini, arq in partes:
    a = np.frombuffer(subprocess.check_output(['ffmpeg', '-v', 'error', '-i', arq, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-']), dtype=np.float32)
    k = int(ini * SR); voz[k:k + len(a)] += a[:len(voz) - k]
# boca: volume por quadro (30 fps)
fr = SR // 30; env = [float(np.sqrt(np.mean(voz[i:i + fr] ** 2))) for i in range(0, len(voz), fr)]
m = max(env) or 1; d['boca'] = [round(min(1, e / m * 1.6), 2) for e in env]
# musiquinha suave (caixinha de música)
mus = np.zeros_like(voz); notas = [72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 79, 84, 81, 79, 76, 74]
passo = 0.42; n = 0; tt = 0.0
while tt < total:
    fq = 440 * 2 ** ((notas[n % len(notas)] - 69) / 12); L = int(1.1 * SR); x = np.arange(L) / SR
    nota = (np.sin(2 * np.pi * fq * x) + .3 * np.sin(4 * np.pi * fq * x)) * np.exp(-x * 4.5)
    k = int(tt * SR); mus[k:k + L] += nota[:len(mus) - k]; tt += passo; n += 1
mus *= 0.11 / (np.max(np.abs(mus)) or 1) * 1.0
mix = voz + mus; mix[-int(1.0 * SR):] *= np.linspace(1, 0, int(1.0 * SR))
saida = os.path.join(aqui, nome + '.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', saida], input=mix.astype(np.float32).tobytes(), check=True)
json.dump(d, open(os.path.join(aqui, nome + '.tempos.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print('total', round(total, 1), 's')
