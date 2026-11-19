# Versão "contador de histórias": fala frase por frase, com pausas de respiração naturais.
import json, subprocess, re, sys, soundfile as sf, numpy as np
from kokoro_onnx import Kokoro
src=open('gerar.py').read(); exec(src[src.index('CAST = {'):src.index('LINES =')])
k = Kokoro('kokoro-v1.0.onnx','voices-v1.0.bin')
NARR_SPEED = float(sys.argv[3]) if len(sys.argv)>3 else 0.94   # narradora um pouco mais calma
def trim(x, thr=0.004):
    idx=np.where(np.abs(x)>thr)[0]
    return x if not len(idx) else x[max(0,idx[0]-360):idx[-1]+2400]
def chunks(text):
    # quebra em frases, guardando a pontuação final para escolher a pausa
    parts=re.findall(r'.+?(?:\.\.\.|[.!?…]|$)(?:\s+|$)', text)
    return [p.strip() for p in parts if p.strip()]
PAUSE={'...':0.55,'…':0.55,'.':0.38,'!':0.34,'?':0.40}
LINES=json.load(open(sys.argv[1])); OUT=sys.argv[2]; out={}
for key, who, text in LINES:
    voice, speed, pitch, echo = CAST[who]
    if who=='Narrador': speed=NARR_SPEED
    clean = re.sub(r'\([^)]*\)', '', text).replace('"','').strip()
    sr=24000; pieces=[]
    cs=chunks(clean)
    for i,c in enumerate(cs):
        s, sr = k.create(c, voice=voice, speed=speed, lang='pt-br'); pieces.append(trim(s))
        if i<len(cs)-1:
            end='...' if c.endswith('...') else c[-1]
            pieces.append(np.zeros(int(sr*PAUSE.get(end,0.3)),dtype=np.float32))
    pieces=[np.zeros(int(sr*.08),dtype=np.float32)]+pieces+[np.zeros(int(sr*.15),dtype=np.float32)]
    sf.write(f'/tmp/_{key}.wav', np.concatenate(pieces), sr)
    af=[]
    if pitch!=1.0: af.append(f'asetrate={int(sr*pitch)},aresample={sr},atempo={1/pitch:.4f}')
    if echo: af.append('aecho=0.8:0.6:50|100:0.18|0.10')
    af.append('loudnorm=I=-16:TP=-1.5:LRA=11')
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'/tmp/_{key}.wav','-af',','.join(af),'-ac','1','-b:a','64k',f'{OUT}/{key}.mp3'],check=True)
    d=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'{OUT}/{key}.mp3'],capture_output=True,text=True).stdout)
    out[key]=round(d,2); print(key, who, out[key], len(cs),'frases', flush=True)
json.dump(out, open(f'{OUT}/dur.json','w'))
