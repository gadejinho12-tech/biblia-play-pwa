import pathlib, base64, json, subprocess, glob, os
s=pathlib.Path('noe_src.html').read_text()
keys=[f'v{i:02d}' for i in range(1,21)]+['c1','c2','c3','c4']+[f'g{i}' for i in range(1,8)]+['n1','n2','n3']
rec,dur={},{}
for k in keys:
    f=('kokoro/fases/' if k[0]=='n' else 'kokoro/out/')+k+'.mp3'
    rec[k]='data:audio/mpeg;base64,'+base64.b64encode(open(f,'rb').read()).decode()
    dur[k]=round(float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout),2)
pathlib.Path('noe-filme.html').write_text(s.replace('%%REC%%',json.dumps(rec)).replace('%%RECDUR%%',json.dumps(dur)))
print('ok', os.path.getsize('noe-filme.html'))
