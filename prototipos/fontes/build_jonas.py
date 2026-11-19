import pathlib, re, base64, json, subprocess, os
src=pathlib.Path('noe_src.html').read_text()
parts=pathlib.Path('jonas_parts.js').read_text()
P={}
for m in re.finditer(r'//@@(\w+)\n(.*?)(?=//@@|\Z)', parts, re.S): P[m.group(1)]=m.group(2)
lines=src.split('\n')
def between(a,b):
    i=next(k for k,l in enumerate(lines) if l.startswith(a)); j=next(k for k,l in enumerate(lines) if k>i and l.startswith(b)); return i,j
s=src
def R(a,b,cnt=1):
    global s
    assert s.count(a)==cnt, (s.count(a), a[:80]); s=s.replace(a,b)
# --- elenco
i,j=between('const CAST={','let TALK=null'); s='\n'.join(lines[:i])+'\n'+P['CAST']+'\n'.join(lines[j:])
# --- cenas: mantém G, SC e meadowSky; troca as cenas de Noé pelas de Davi
lines=s.split('\n'); i,j=between('/* ================= CENAS','/* ================= ROTEIRO')
keep=[l for l in lines[i:j] if l.startswith('let G=') or l.startswith('const SC=') or l.startswith('function meadowSky') or l.startswith('/* ================= CENAS')]
s='\n'.join(lines[:i]+keep)+'\n'+P['SCENES']+'\n'.join(lines[j:])
# --- roteiro
lines=s.split('\n'); i,j=between('/* ================= ROTEIRO','/* ================= VOZ'); s='\n'.join(lines[:i+1])+'\n'+P['ROTEIRO']+'\n'.join(lines[j:])
# --- trilha
lines=s.split('\n'); i,j=between('const MOOD=','let chordT'); s='\n'.join(lines[:i])+'\n'+P['MOOD']+'\n'.join(lines[j:])
# --- jogo
lines=s.split('\n'); i,j=between('/* ================= JOGO DE RECOMPENSA','/* ================= LOOP'); s='\n'.join(lines[:i])+'\n'+P['GAME']+'\n'.join(lines[j:])
# --- personagem: poses e figurinos novos
R("  ctx.strokeStyle=C.sash; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-18,-36);",
  """  if(C.armor){ ctx.save(); ctx.beginPath(); ctx.moveTo(0,-70+breathe); ctx.quadraticCurveTo(30,-56,24,-14); ctx.quadraticCurveTo(0,-4,-24,-14); ctx.quadraticCurveTo(-30,-56,0,-70+breathe); ctx.closePath(); ctx.clip();
    ctx.strokeStyle='rgba(90,50,12,.45)'; ctx.lineWidth=1.4; for(let yy=-66;yy<-8;yy+=7) for(let xx=-30+((yy/7)%2?4:0);xx<32;xx+=8){ ctx.beginPath(); ctx.arc(xx,yy,4,0,Math.PI); ctx.stroke(); }
    ctx.fillStyle='rgba(255,240,190,.18)'; ctx.fillRect(4,-70,8,62); ctx.restore(); }
  ctx.strokeStyle=C.sash; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-18,-36);""")
R("  else if(pose==='laugh'){ const b=Math.sin(t*14)*3; h1=[-12,-40+b]; h2=[40,-74]; }",
  """  else if(pose==='laugh'){ const b=Math.sin(t*14)*3; h1=[-12,-40+b]; h2=[40,-74]; }
  else if(pose==='spear'){ h1=[-24,-34]; h2=[30,-48]; }
  else if(pose==='harp'){ h1=[8,-44]; h2=[22,-52]; }
  else if(pose==='sling'){ h2=[22,-104]; h1=[-22,-34]; }
  else if(pose==='kneel'){ h1=[22,-24]; h2=[30,-20]; }""")
R("  if(pose==='carry'){ ctx.fillStyle=vgrad(-104,-92",
  """  if(pose==='spear'||(id==='golias' && pose==='laugh')){ ctx.strokeStyle='#6b4a2a'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(h2[0],h2[1]+50); ctx.lineTo(h2[0],h2[1]-90); ctx.stroke(); ctx.fillStyle='#d4a052'; ctx.beginPath(); ctx.moveTo(h2[0]-6,h2[1]-88); ctx.lineTo(h2[0],h2[1]-108); ctx.lineTo(h2[0]+6,h2[1]-88); ctx.closePath(); ctx.fill();
    shade(-30,-40,10,26,'#e0aa58','#94621f'); }
  if(pose==='harp') harp();
  if(pose==='sling'){ const sp=o.fast? 16 : 9; const a=t*sp; const px=h2[0]+Math.cos(a)*26, py=h2[1]-12+Math.sin(a)*9; ctx.strokeStyle='#6b4a2a'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(h2[0],h2[1]); ctx.lineTo(px,py); ctx.stroke(); ell(px,py,5,4,'#8a5a34'); if(o.fast){ ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(h2[0],h2[1]-12,26,9,0,0,7); ctx.stroke(); } }
  if(pose==='carry'){ ctx.fillStyle=vgrad(-104,-92""")
R("  if(C.beard){ shade(0,12,15,13,'#ffffff','#e4dfd4'); shade(-2,-15,17,7,C.hair,'#d8d3c8'); }\n  else if(!C.scarf){ shade(0,-12,18,9,C.hair,mix(C.hair,'#000000',.3)); ell(-14,-6,6,8,C.hair); }",
  """  if(C.beard){ const bc=C.beardC||'#ffffff'; shade(0,12,15,13,bc,mix(bc,'#000000',.15)); if(!C.helmet) shade(-2,-15,17,7,C.hair,mix(C.hair,'#000000',.15)); }
  else if(!C.scarf && !C.helmet){ shade(0,-12,18,9,C.hair,mix(C.hair,'#000000',.3)); ell(-14,-6,6,8,C.hair); }
  if(C.curly){ for(let i=0;i<7;i++) shade(-15+i*5,-15-Math.abs(Math.sin(i*1.3))*4,6,6,C.hair,mix(C.hair,'#000000',.25)); ell(-16,-4,5,7,C.hair); }
  if(C.cap){ shade(0,-12,19,9,C.cap,mix(C.cap,'#000000',.3)); }
  if(C.helmet){ shade(0,-9,21,14,'#f0c070','#a87028'); ctx.fillStyle='#9a2a1a'; rr(-3,-36,6,16,3); ctx.fill(); ctx.fillStyle='#c9902e'; rr(2,-6,4,14,2); ctx.fill(); ctx.strokeStyle=rgba('#fff1c8',.5); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,-9,18,-2.6,-1.4); ctx.stroke(); }
  if(C.crown){ ctx.fillStyle='#f2c24a'; ctx.beginPath(); ctx.moveTo(-14,-14); ctx.lineTo(-14,-26); ctx.lineTo(-7,-19); ctx.lineTo(0,-29); ctx.lineTo(7,-19); ctx.lineTo(14,-26); ctx.lineTo(14,-14); ctx.closePath(); ctx.fill(); ell(0,-21,2,2,'#e85d6c'); }""")
R("if(mo>.08){ ell(3,C.beard?8:8,4.5,1.5+mo*4.5,'#7a3a2e'); }","if(mo>.08){ ell(3,8,4.5,1.5+mo*4.5,'#5a2a22'); }")
R("function layer(f,fn){ ctx.save(); const z=1+(cam.z*ZOOM-1)*f;","const PZ=()=>W<700? .7 : 1; // celular em pé: afasta a câmera pra caber a cena\nfunction layer(f,fn){ ctx.save(); const z=1+(cam.z*ZOOM*PZ()-1)*f;")
# --- textos da página
R('<title>Noé e a Arca</title>','<title>Jonas e o Grande Peixe</title>')
R('aria-label="Filme ilustrado: Noé e a Arca"','aria-label="Filme ilustrado: Jonas e o grande peixe"')
R('<h1>Noé e a Arca</h1>\n    <p>Uma história de fé, coragem e de uma promessa colorida no céu. Com narração, para assistir em família.</p>',
  '<h1>Jonas e o Grande Peixe</h1>\n    <p>Um profeta que fugiu, uma tempestade no mar, um peixe gigante... e um Deus que sempre dá uma segunda chance. Com narração, para assistir em família.</p>')
R('Cerca de 2 minutos · 4 capítulos · Gênesis 6 a 9<br>Depois do filme: o jogo <b>Corrida para a Arca</b> 🎁','Cerca de 2 minutos · 4 capítulos · Jonas 1 a 4<br>Depois do filme: o jogo <b>Nade, Jonas!</b>, com 3 fases 🎁')
R('🎮 Jogar a Corrida para a Arca','🎮 Jogar Nade, Jonas!')
R("""    <h3>O que aprendemos com Noé</h3>
    <ul>
      <li><span class="ic">🙏</span><div><b>Obedecer</b>Noé fez tudo o que Deus pediu, mesmo sem entender tudo.</div></li>
      <li><span class="ic">🔨</span><div><b>Perseverar</b>Riram dele, mas ele não desistiu: terminou o que começou.</div></li>
      <li><span class="ic">🌈</span><div><b>Confiar</b>Deus cuidou de Noé na tempestade e cumpre as suas promessas.</div></li>
    </ul>
    <div class="verse"><q>Pela fé, Noé construiu a arca.</q><span>Hebreus 11:7</span></div>
    <div class="talk"><b>Para conversar em família</b>Teve alguma vez que foi difícil obedecer? O que ajudou você a continuar?</div>""",
"""    <h3>O que aprendemos com Jonas</h3>
    <ul>
      <li><span class="ic">🙋</span><div><b>Obedecer de primeira</b>Fugir de Deus só trouxe tempestade. Obedecer é sempre o melhor caminho.</div></li>
      <li><span class="ic">🔄</span><div><b>Segunda chance</b>Quando Jonas orou e pediu perdão, Deus o ouviu e deu uma nova chance.</div></li>
      <li><span class="ic">🌍</span><div><b>Deus ama todos</b>Até o povo de Nínive, que Jonas achava muito mau. Deus quer perdoar todo mundo.</div></li>
    </ul>
    <div class="verse"><q>Na minha angústia clamei ao Senhor, e ele me respondeu.</q><span>Jonas 2:2</span></div>
    <div class="talk"><b>Para conversar em família</b>Já fugiu de alguma coisa que devia fazer? Como é bom pedir perdão e recomeçar?</div>""")
R('<div id="ghud" hidden><span class="chip" id="gAn">🐾 0 / 8</span><span class="chip">🌧️ <span class="rbar"><i id="gRain"></i></span></span></div>',
  '<div id="ghud" hidden><span class="chip" id="gAn">Fase 1</span><span class="chip" id="gGol">🫧 0</span></div>')
R('<div class="eyebrow">Corrida para a Arca</div>\n    <h1>Todos a salvo! 🌈</h1>','<div class="eyebrow">Nade, Jonas!</div>\n    <h1>Chegou na praia! 🏖️</h1>')
R('<div class="verse"><q>Fez Noé tudo o que Deus lhe ordenara.</q><span>Gênesis 6:22</span></div>','<div class="verse"><q>E o Senhor falou ao peixe, e este vomitou Jonas na terra seca.</q><span>Jonas 2:10</span></div>')
R("try{ localStorage.setItem('bp_noe_visto','1'); }","try{ localStorage.setItem('bp_jonas_visto','1'); }")
R("  if(MODE==='game'){ music(dt, GS.rain>.6?'nuvens':'animais'); rainSound(GS.rain>.3?GS.rain*.6:0); }","  if(MODE==='game'){ music(dt, GS.done&&GS.phase===3?'praia':'mergulho'); }")
R("const scName=P.started? l.sc : 'arcoiris';","const scName=P.started? l.sc : 'praia';")
R("(SC[scName]||SC.arcoiris)(P.started? P.scT : 6+G*.2)","(SC[scName]||SC.praia)(P.started? P.scT : 1.5+G*.0)")
R("rainSound(sc==='diluvio'?1:(sc==='porta'?.7:0)); }","rainSound(sc==='tempestade_j'?1:0); }")
R("if(sc!=='diluvio'&&sc!=='noite') ch.forEach","if(sc!=='tempestade_j'&&sc!=='peixe') ch.forEach")
R("pad(ch,4.6,sc==='diluvio'?.06:.05,sc==='diluvio'?700:1500);","pad(ch,4.6,sc==='tempestade_j'?.06:.05,(sc==='tempestade_j'||sc==='peixe')?700:1500);")
R("window.__P=P; window.__GS=GS;","window.__P=P; window.__GS=GS; window.__cam=cam;")
R("if(P.started && l.card==null && (l.who==='Deus'||l.who==='Narrador')) TALK=null;","if(P.started && l.card==null && (l.who==='Deus'||l.who==='Narrador')) TALK=null;")
R("  if(C.scarf){ shade(0,-4,24,23,C.scarf,'#d9c7a0'); }","  if(C.scarf){ shade(0,-4,24,23,C.scarf,'#d9c7a0'); }\n  if(C.longhair){ shade(0,6,22,27,C.hair,mix(C.hair,'#000000',.3)); }")
pathlib.Path('jonas_film_src.html').write_text(s)
keys=[f'v{i:02d}' for i in range(1,16)]+['c1','c2','c3','c4']+[f'j{i}' for i in range(1,8)]
rec,dur={},{}
for k in keys:
    f='kokoro/jonas/'+k+'.mp3'; rec[k]='data:audio/mpeg;base64,'+base64.b64encode(open(f,'rb').read()).decode()
    dur[k]=round(float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout),2)
pathlib.Path('jonas-filme.html').write_text(s.replace('%%REC%%',json.dumps(rec)).replace('%%RECDUR%%',json.dumps(dur)))
print('ok', os.path.getsize('jonas-filme.html'))
