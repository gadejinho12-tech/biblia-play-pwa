# Gera as falas com o ElevenLabs (mesma ideia do gerar.py, mas com vozes naturais).
# Uso: python3 gerar_el.py falas.json pasta_saida [so_quem]
# A chave é colocada pelo proxy no cabeçalho xi-api-key; aqui vai só um valor de enfeite.
import json, sys, re, subprocess, urllib.request, os, time
ELENCO = json.load(open(os.path.join(os.path.dirname(__file__) or '.', 'elenco_el.json')))  # quem -> {voice_id, stability, style, speed, echo}
LINES = json.load(open(sys.argv[1])); OUT = sys.argv[2]; ONLY = sys.argv[3].split(',') if len(sys.argv) > 3 else None
os.makedirs(OUT, exist_ok=True); dur = {}
for key, who, text in LINES:
    if ONLY and key not in ONLY and who not in ONLY: continue
    c = ELENCO.get(who) or ELENCO['Narrador']
    clean = re.sub(r'\([^)]*\)', '', text).replace('"', '').replace('SENHOR', 'Senhor').strip()
    body = json.dumps({'text': clean, 'model_id': c.get('model', 'eleven_multilingual_v2'), 'language_code': 'pt',
        'voice_settings': {'stability': c.get('stability', .5), 'similarity_boost': c.get('similarity', .8), 'style': c.get('style', .25), 'use_speaker_boost': True, 'speed': c.get('speed', 1.0)}}).encode()
    for tent in range(4):
        try:
            req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{c['voice_id']}?output_format=mp3_44100_128", data=body,
                headers={'xi-api-key': 'proxy-injected', 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'})
            raw = urllib.request.urlopen(req, timeout=90).read(); break
        except urllib.error.HTTPError as e:
            msg = e.read()[:300]; print('ERRO', key, e.code, msg, flush=True)
            if e.code in (401, 402, 403, 422): sys.exit(1)
            time.sleep(3 * (tent + 1))
    open(f'/tmp/_el_{key}.mp3', 'wb').write(raw)
    af = []
    if c.get('echo'): af.append('aecho=0.8:0.6:50|100:0.16|0.09')
    af.append('loudnorm=I=-16:TP=-1.5:LRA=11')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'/tmp/_el_{key}.mp3', '-af', ','.join(af), '-ac', '1', '-b:a', '64k', f'{OUT}/{key}.mp3'], check=True)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{OUT}/{key}.mp3'], capture_output=True, text=True).stdout)
    dur[key] = round(d, 2); print(key, who, dur[key], flush=True)
print('ok', len(dur))
