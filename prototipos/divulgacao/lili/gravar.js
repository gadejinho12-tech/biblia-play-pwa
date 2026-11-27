// Grava o vídeo da Lili. Uso: node gravar.js ovelha   (antes: python3 gerar_audio.py ovelha)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const nome=process.argv[2];const aqui=__dirname;const d=JSON.parse(fs.readFileSync(path.join(aqui,nome+'.tempos.json')));
const raw=path.join(aqui,'tmp_'+nome,'raw');fs.rmSync(raw,{recursive:true,force:true});
const b=await chromium.launch();const c=await b.newContext({viewport:{width:720,height:1280},recordVideo:{dir:raw,size:{width:720,height:1280}}});
const t0=Date.now();const p=await c.newPage();await p.goto('file://'+path.join(aqui,'palco.html'));await p.waitForTimeout(1500);
const ini=(Date.now()-t0)/1000;await p.evaluate(d=>comecar(d),d);await p.waitForTimeout((d.total+0.5)*1000);
await c.close();await b.close();
const webm=path.join(raw,fs.readdirSync(raw)[0]);const out=path.join(aqui,'lili-'+nome+'.mp4');
require('child_process').execFileSync('ffmpeg',['-y','-v','error','-ss',String(ini),'-i',webm,'-i',path.join(aqui,nome+'.wav'),'-filter_complex','[0:v]scale=1080:1920:flags=lanczos,fps=30,format=yuv420p[v]','-map','[v]','-map','1:a','-t',String(d.total),'-c:v','libx264','-preset','medium','-crf','20','-c:a','aac','-b:a','160k','-movflags','+faststart',out]);
console.log('ok',out);})();
