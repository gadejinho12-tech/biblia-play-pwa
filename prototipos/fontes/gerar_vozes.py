import json, subprocess, re, sys, soundfile as sf, numpy as np
from kokoro_onnx import Kokoro
k = Kokoro('kokoro-v1.0.onnx','voices-v1.0.bin')
# ELENCO FIXO (igual em todos os filmes)
#  voz base, velocidade, ajuste de tom (1.0 = normal), eco (sala grande)
CAST = {
  'Narrador':     ('pf_dora', 1.00, 1.00, False),
  'Noé':          ('pm_santa',0.95, 0.97, False),
  'Deus':         ('pm_alex', 0.88, 0.88, True),
  'Filho de Noé': ('pm_alex', 1.05, 1.08, False),
  'Vizinho':      ('pm_alex', 1.12, 1.02, False),
  'Davi':         ('pm_alex', 1.06, 1.17, False),
  'Golias':       ('pm_santa',0.90, 0.78, True),
  'Saul':         ('pm_alex', 0.95, 0.94, False),
  'Jonas':        ('pm_alex', 1.00, 1.03, False),
  'Marinheiro':   ('pm_santa',1.05, 0.92, False),
  'Jesus':        ('pm_alex', 0.94, 0.97, False),
  'Pedro':        ('pm_santa',1.02, 0.96, False),
  'Maria':        ('pf_dora', 1.04, 1.13, False),
  'José':         ('pm_santa',1.02, 1.05, False),
  'Anjo':         ('pm_alex', 0.96, 1.08, True),
}
LINES = json.load(open(sys.argv[1]))
OUT = sys.argv[2] if len(sys.argv)>2 else 'out'
out = {}
for key, who, text in LINES:
    voice, speed, pitch, echo = CAST[who]
    clean = re.sub(r'\([^)]*\)', '', text).replace('"','').replace('FÉ','fé').replace('SENHOR','Senhor').strip()
    samples, sr = k.create(clean, voice=voice, speed=speed, lang='pt-br')
    sf.write(f'/tmp/_{key}.wav', samples, sr)
    af = []
    if pitch != 1.0: af.append(f'asetrate={int(sr*pitch)},aresample={sr},atempo={1/pitch:.4f}')
    if echo: af.append('aecho=0.8:0.7:60|120:0.25|0.15')
    af.append('loudnorm=I=-16:TP=-1.5:LRA=11')
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'/tmp/_{key}.wav','-af',','.join(af),'-ac','1','-b:a','64k',f'{OUT}/{key}.mp3'],check=True)
    d = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{OUT}/{key}.mp3'],capture_output=True,text=True).stdout)
    out[key] = round(d,2); print(key, who, out[key], flush=True)
json.dump(out, open(f'{OUT}/dur.json','w'))
