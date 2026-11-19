//@@CAST
const CAST={
  jesus:{ robe:['#f6f0e0','#d2c6a6'], sash:'#c0483a', skin:['#e3ad79','#c48a5a'], hair:'#6b4423', beard:true, beardC:'#6b4423', longhair:true, s:1 },
  pedro:{ robe:['#6f9ac8','#3e6a98'], sash:'#7a5a3a', skin:['#e2ab7c','#c48a5a'], hair:'#6a5a4a', beard:true, beardC:'#7a6a5a', s:1 },
  joao:{ robe:['#9cc77a','#5f9a4c'], sash:'#7a5a3a', skin:['#f0c39a','#d69b6c'], hair:'#4a3320', s:.9 },
  andre:{ robe:['#eeb07a','#b96f3e'], sash:'#5a3a22', skin:['#d8a07a','#b07850'], hair:'#3a2a1a', beard:true, beardC:'#3a2a1a', s:.96 },
  povo1:{ robe:['#c9b48a','#9a845a'], sash:'#6b4423', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.9 },
  povo2:{ robe:['#7fc4c0','#3f8a86'], sash:'#6b4423', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', s:.86 },
  povo3:{ robe:['#ec9fa6','#b8687a'], sash:'#c98a3a', skin:['#e2ab7c','#c48a5a'], hair:'#3a2a1a', longhair:true, s:.84 },
  crianca:{ robe:['#ffd27a','#d9a441'], sash:'#c0503a', skin:['#f6cfa6','#e2ab7c'], hair:'#6b4423', s:.62 },
};
//@@SCENES
/* ===== peças de "Jesus acalma a tempestade" ===== */
function sunDisk2(x,y,r){ r=r||34; glow(x,y,r*6,'#fff4cc',.55); ell(x,y,r,r,'#fff4d0'); }
function boat(x,y,s,rock,o){ o=o||{}; ctx.save(); ctx.translate(x,y); ctx.rotate(rock||0); ctx.scale(s,s);
  ctx.strokeStyle='#6b4a2a'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(10,-30); ctx.lineTo(10,-210); ctx.stroke();
  const fl=Math.sin(G*(o.storm?9:2))*(o.storm?14:4); ctx.fillStyle=vgrad(-200,-50,[[0,'#fffaf0'],[1,'#e8dcc0']]); ctx.beginPath(); ctx.moveTo(16,-200); ctx.quadraticCurveTo(100+fl,-130,16,-50); ctx.closePath(); ctx.fill();
  if(o.crew) o.crew();
  ctx.fillStyle=vgrad(-30,36,[[0,'#c08048'],[1,'#6e4527']]); ctx.beginPath(); ctx.moveTo(-210,-30); ctx.lineTo(210,-30); ctx.quadraticCurveTo(190,24,120,36); ctx.lineTo(-120,36); ctx.quadraticCurveTo(-190,24,-210,-30); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(60,30,12,.4)'; ctx.lineWidth=2.5; for(const yy of [-10,12]){ ctx.beginPath(); ctx.moveTo(-196,yy); ctx.lineTo(196,yy); ctx.stroke(); }
  ctx.strokeStyle=rgba('#fff1c8',.4); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-208,-28); ctx.lineTo(208,-28); ctx.stroke();
  if(o.oars){ ctx.strokeStyle='#8a5a34'; ctx.lineWidth=5; for(const ox of [-80,40]){ const a=Math.sin(G*2.5+ox)*.3; ctx.beginPath(); ctx.moveTo(ox,-20); ctx.lineTo(ox+Math.cos(1.2+a)*90,-20+Math.sin(1.2+a)*90); ctx.stroke(); } }
  ctx.restore(); }
// Jesus dormindo na popa, num travesseiro (Marcos 4:38)
function sleepingJesus(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); shade(-40,-8,24,12,'#efe2c4','#c8b48a');
  ctx.save(); ctx.translate(-34,-14); ctx.rotate(-1.52); person('jesus',0,64,{pose:'sleep',dir:1}); ctx.restore();
  ctx.restore(); for(let i=0;i<3;i++){ const q=((G*.5+i/3)%1); txt2('z', x-40*s+q*30, y-40*s-q*50, 14+q*10, `rgba(255,255,255,${1-q})`); } }
function txt2(t,x,y,size,c){ ctx.save(); ctx.font='800 '+size+'px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle=c; ctx.fillText(t,x,y); ctx.restore(); }
function lakeSky(storm,night){ const dayTop=night? '#0e1638':'#f2a878', dayMid=night? '#2a3466':'#f6c890', dayBot=night? '#4a4a7a':'#ffe0b0';
  sky(mix(dayTop,'#2c3448',storm),mix(dayMid,'#4a5268',storm),mix(dayBot,'#6a7080',storm));
  if(night && storm<.5){ ctx.save(); ctx.globalAlpha=1-storm*2; for(let i=0;i<70;i++){ const sx=((i*137.5)%1400)-700, sy=-360+((i*71.3)%320); const tw=.5+.5*Math.sin(G*2+i); ell(sx,sy,1.2+(i%3)*.5,1.2+(i%3)*.5,`rgba(255,248,220,${.5+.5*tw})`); } glow(-300,-250,140,'#e8eeff',.35); ell(-300,-250,30,30,'#f4f1e2'); ctx.restore(); }
  for(let i=0;i<7;i++) cloud(((i*280+G*(6+storm*24))%1600)-800,-290+(i%3)*44,1.2,mix(night?'#4a5080':'#ffd0b0','#4a5268',storm),mix(night?'#2a3058':'#d08a80','#262c3c',storm),.25+.7*storm); }
function lake(y,storm,front){ waves(y,4+(front?30:22)*storm,mix(front?'#5aa8d8':'#4a8ab8','#2e5a80',storm),mix('#1e4a7a','#10223a',storm),front?1.6:1.1,front); }
function crew(storm,o){ o=o||{}; return ()=>{
  person('pedro',150,-30,{pose: storm>.5? (TALK==='pedro'?'open':'armsup') : (o.row?'sit':'stand'),dir:-1});
  person('joao',90,-30,{pose: storm>.5? 'armsup':'stand',dir:-1,ph:1}); person('andre',30,-30,{pose: storm>.5? 'armsup' : 'stand',dir:-1,ph:2}); }; }
function bolt(on){ if(!on) return; ctx.fillStyle='rgba(255,255,255,.35)'; ctx.fillRect(-W,-H,W*3,H*3); }

SC.praia_ensino = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.65;
  if(t<5) setCam([-260,-170,1.0],[-40,-150,1.25],t/5); else setCam([-40,-150,1.25],[160,-170,1.05],(t-5)/3);
  layer(0,()=>{ lakeSky(0,false); sunDisk2(-380,-120,40); });
  layer(.3,()=>{ ridge(-10,70,.006,2,'#c8a8a0','#e0c0b0'); });
  layer(1,()=>{ lake(10,0,false); ctx.fillStyle=vgrad(-10,200,[[0,'#e8d4a0'],[1,'#c8ac78']]); ctx.beginPath(); ctx.moveTo(-1400,300); ctx.lineTo(-1400,0); ctx.lineTo(60,0); ctx.quadraticCurveTo(120,6,160,30); ctx.lineTo(160,300); ctx.fill();
    boat(380,30+Math.sin(G*1.2)*3,.8,Math.sin(G)*.02,{});
    [['povo1',-520],['povo3',-450],['crianca',-400],['povo2',-340],['povo1',-280],['crianca',-230]].forEach(([id,x],i)=>person(id,x,6+(i%2)*8,{pose:'sit',dir:1,ph:i}));
    person('jesus',-80,0,{pose: TALK==='jesus'? 'point' : 'open', dir:-1}); person('pedro',20,4,{pose:'stand',dir:-1}); });
};
SC.barco_tarde = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.7; setCam([120,-150,1.0],[-60,-130,1.45],t/7);
  layer(0,()=>{ lakeSky(0,false); sunDisk2(-380,-80,44); });
  layer(.3,()=>{ ridge(-10,60,.006,2,'#b08aa0','#d0a8b0'); lake(-10,0,false); });
  layer(1,()=>{ boat(0,20+Math.sin(G*1.2)*4,1,Math.sin(G)*.02,{oars:true,crew:()=>{ person('pedro',150,-30,{pose:'sit',dir:-1}); person('joao',90,-30,{pose:'sit',dir:-1,ph:1}); person('andre',30,-30,{pose:'sit',dir:-1,ph:2}); sleepingJesus(-110,-34,1); }}); lake(40,0,true); });
};
SC.tempestade_n = t=>{ const k=ss(0,2.5,t); LIGHT.dx=1; LIGHT.rim='#cfe0ff'; LIGHT.rimA=.3;
  const tx = TALK==='pedro'? 120 : 0, tz = TALK? 1.45 : .9; cam.x=lerp(cam.x,tx,.04); cam.y=lerp(cam.y,TALK?-170:-170,.04); cam.z=lerp(cam.z,tz,.04);
  const flash=(Math.sin(G*1.7)>.985||Math.sin(G*2.3+1)>.99)&&k>.5; if(flash && !SC._thn){ thunder(); SC._thn=1; } if(!flash) SC._thn=0;
  layer(0,()=>lakeSky(k,false)); layer(.3,()=>lake(-10,k,false));
  layer(1,()=>{ boat(0,20+Math.sin(G*1.6)*12*k,1,Math.sin(G*1.4)*.1*k,{storm:k>.4,crew:()=>{ crew(k)(); sleepingJesus(-110,-34,1); }}); lake(40,k,true); });
  rain(k,2); bolt(flash);
};
SC.tempestade_dorme = t=>{ LIGHT.dx=1; LIGHT.rim='#ffe0b0'; LIGHT.rimA=.6; setCam([-60,-120,1.5],[-110,-80,2.3],t/5);
  const flash=(Math.sin(G*1.7)>.985); if(flash && !SC._thn2){ thunder(); SC._thn2=1; } if(!flash) SC._thn2=0;
  layer(0,()=>lakeSky(1,false)); layer(.3,()=>lake(-10,1,false));
  layer(1,()=>{ const rock=Math.sin(G*1.4)*.1, by=20+Math.sin(G*1.6)*12; boat(0,by,1,rock,{storm:true,crew:()=>{ crew(1)(); glow(-110,-40,120,'#fff0c0',.35); sleepingJesus(-110,-34,1); }}); lake(40,1,true); });
  rain(1,2); bolt(flash);
};
SC.acorda = t=>{ LIGHT.dx=1; LIGHT.rim='#ffe0b0'; LIGHT.rimA=.55;
  if(t<4) setCam([-40,-140,1.6],[-80,-130,1.7],t/4); else setCam([-80,-130,1.7],[-40,-170,1.2],(t-4)/2);
  layer(0,()=>lakeSky(1,false)); layer(.3,()=>lake(-10,1,false));
  layer(1,()=>{ const rock=Math.sin(G*1.4)*.08, by=20+Math.sin(G*1.6)*10; boat(0,by,1,rock,{storm:true,crew:()=>{
      person('pedro',-40,-30,{pose:'open',dir:-1}); person('joao',90,-30,{pose:'armsup',dir:-1,ph:1}); person('andre',150,-30,{pose:'armsup',dir:-1,ph:2});
      if(t<4.2){ const sh=t<3.6? Math.sin(G*30)*2 : 0; ctx.save(); ctx.translate(sh,0); sleepingJesus(-110,-34,1); ctx.restore(); } else person('jesus',-130,-30,{pose:'stand',dir:1}); }}); lake(40,1,true); });
  rain(1,2);
};
SC.acalma = t=>{ const k=ss(.3,3.2,t); LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-60,-160,1.5],[-20,-190,.95],t/4);
  layer(0,()=>{ lakeSky(1-k,true); godRays(-130,-600,700,.25*(1-k*.5),G,'#fff0c0'); });
  layer(.3,()=>lake(-10,1-k,false));
  layer(1,()=>{ const rock=Math.sin(G*1.4)*.08*(1-k), by=20+Math.sin(G*1.6)*10*(1-k); boat(0,by,1,rock,{storm:k<.5,crew:()=>{ crew(1-k)(); person('jesus',-130,-30,{pose:'armsup',dir:1}); glow(-130,-110,160+200*k,'#fff4c8',.35); }});
    const r=k*900; ctx.strokeStyle=`rgba(255,244,200,${.5*(1-k)})`; ctx.lineWidth=6; ctx.beginPath(); ctx.ellipse(-130,30,r,r*.22,0,0,7); ctx.stroke(); lake(40,1-k,true); });
  rain(1-k,2);
};
SC.calma_n = t=>{ LIGHT.dx=1; LIGHT.rim='#cfd8ff'; LIGHT.rimA=.55;
  const tx = TALK==='jesus'? -120 : 0, tz = TALK? 1.5 : .95; cam.x=lerp(cam.x,tx,.04); cam.y=lerp(cam.y,-150,.04); cam.z=lerp(cam.z,tz,.04);
  layer(0,()=>lakeSky(0,true)); layer(.3,()=>lake(-10,0,false));
  layer(1,()=>{ boat(0,20+Math.sin(G*1.2)*3,1,0,{crew:()=>{ person('pedro',150,-30,{pose:'open',dir:-1}); person('joao',90,-30,{pose:'open',dir:-1,ph:1}); person('andre',30,-30,{pose:'stand',dir:-1,ph:2}); person('jesus',-130,-30,{pose:TALK==='jesus'?'open':'stand',dir:1}); }});
    ctx.save(); ctx.globalAlpha=.25; ctx.scale(1,-.35); ctx.translate(0,-220); boat(0,-20,1,0,{}); ctx.restore(); lake(40,0,true); });
};
SC.estrelas_n = t=>{ LIGHT.dx=-1; LIGHT.rim='#cfd8ff'; LIGHT.rimA=.6; setCam([0,-170,1.4],[60,-220,.8],t/9);
  layer(0,()=>lakeSky(0,true)); layer(.3,()=>{ ridge(-10,60,.006,2,'#2a3466','#3a4478'); lake(-10,0,false); });
  layer(1,()=>{ boat(-60+t*14,20+Math.sin(G*1.2)*3,1,0,{oars:true,crew:()=>{ person('pedro',150,-30,{pose:TALK==='pedro'?'open':'sit',dir:-1}); person('joao',90,-30,{pose:'sit',dir:-1,ph:1}); person('andre',30,-30,{pose:'sit',dir:-1,ph:2}); person('jesus',-130,-30,{pose:'stand',dir:1}); }});
    for(let i=0;i<20;i++){ const sx=((i*137.5)%1400)-700; ell(sx,70+(i%5)*24,2,1,'rgba(255,248,220,.6)'); } lake(40,0,true); });
};
//@@ROTEIRO
const CH=[ 'Um dia de ensino', 'A grande tempestade', 'Mestre, salva-nos!', 'Quem é este?' ];
const N=(t)=>({who:'Narrador',text:t}), JES=t=>({who:'Jesus',text:t,talk:'jesus'}), PED=t=>({who:'Pedro',text:t,talk:'pedro'});
const SCRIPT=[
  {card:0},
  {sc:'praia_ensino', ...N('Jesus passou o dia inteiro ensinando uma multidão, na beira do mar da Galileia.')},
  {sc:'praia_ensino', ...JES('Vamos passar para o outro lado do lago. (Marcos 4:35)')},
  {sc:'barco_tarde', ...N('Os discípulos subiram no barco com Jesus. Ele estava tão cansado, que deitou num travesseiro... e dormiu. (Marcos 4:38)')},
  {card:1},
  {sc:'tempestade_n', ...N('De repente, veio uma ventania muito forte! As ondas batiam no barco, e ele começou a encher de água. (Marcos 4:37)')},
  {sc:'tempestade_n', ...PED('Segurem firme! Tirem a água! O barco vai afundar!')},
  {sc:'tempestade_dorme', ...N('E Jesus? Continuava dormindo, tranquilo, lá na parte de trás do barco.')},
  {card:2},
  {sc:'acorda', ...PED('Mestre! Acorda! O senhor não se importa que a gente afunde? (Marcos 4:38)')},
  {sc:'acorda', ...N('Jesus se levantou, falou com o vento, e disse ao mar:')},
  {sc:'acalma', ...JES('Silêncio! Aquiete-se! (Marcos 4:39)')},
  {sc:'acalma', ...N('E o vento parou. O mar ficou liso como um espelho, e houve uma grande calmaria.')},
  {card:3},
  {sc:'calma_n', ...JES('Por que vocês ficaram com tanto medo? Ainda não confiam em mim? (Marcos 4:40)')},
  {sc:'estrelas_n', ...PED('Quem é este, que até o vento e o mar lhe obedecem? (Marcos 4:41)')},
  {sc:'estrelas_n', ...N('Os discípulos entenderam: com Jesus no barco, não precisavam ter medo de nada.')},
  {summary:true, sc:'estrelas_n', ...N('Hoje aprendemos: Jesus tem poder sobre tudo, e quando temos medo, podemos chamar por Ele.')},
];
let vi=0; SCRIPT.forEach(l=>{ if(l.card==null){ vi++; l.rec='v'+String(vi).padStart(2,'0'); } else l.rec='c'+(l.card+1); });
function lineDur(l){ if(l.card!=null) return Math.max(3.4,(REC_DUR[l.rec]||2)+1.2); if(l.rec && REC_DUR[l.rec]) return REC_DUR[l.rec]+.7; return Math.max(4, l.text.replace(/\(.*?\)/g,'').length*.068)+.8; }
SCRIPT.forEach(l=>{ if(l.card==null && l.rec==='v09') l.dur=4.2; if(l.card==null && l.sc==='barco_tarde') l.dur=Math.max(lineDur(l),7); });
let T0=0; SCRIPT.forEach(l=>{ l.start=T0; if(!l.dur) l.dur=lineDur(l); T0+=l.dur; }); const TOTAL=T0;
SCRIPT.forEach((l,i)=>{ if(l.card!=null){ const nx=SCRIPT[i+1]; l.sc=nx.sc; } });
const chapterStarts=SCRIPT.map((l,i)=>l.card!=null?i:-1).filter(i=>i>=0);
//@@MOOD
const MOOD={ praia_ensino:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], barco_tarde:[[57,60,64],[60,64,67],[53,57,60],[55,59,62]], tempestade_n:[[45,52,57,60],[41,48,53,57],[43,50,55,58],[40,47,52,56]],
  tempestade_dorme:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]], acorda:[[45,52,57,60],[44,51,56,60],[41,48,53,57],[43,50,55,59]], acalma:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]],
  calma_n:[[57,60,64,69],[53,57,60,65],[55,59,62,67],[60,64,67,72]], estrelas_n:[[57,60,64,69],[53,57,60,65],[55,59,62,67],[60,64,67,72]], obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: Silêncio, Mar! (3 fases) =================
   Fase 1 · Tire a água: toque nas poças do barco.
   Fase 2 · Ondas grandes: deslize o dedo nas ondas para acalmá-las.
   Fase 3 · Silêncio, mar!: ondas e poças juntas; no final, Jesus acalma tudo.
   Ninguém perde: se o barco encher, a água baixa e a criança continua. */
let MODE='film';
const GS={};
const TPH=[
  { name:'Fase 1 · Tire a água', need:10, puddleEvery:1.5, waveEvery:0, voice:['t1','Agora é a sua vez! Fase um: toque nas poças para tirar a água do barco.'] },
  { name:'Fase 2 · Ondas grandes', need:8, puddleEvery:0, waveEvery:1.7, voice:['t2','Fase dois: ondas grandes! Deslize o dedo nas ondas para acalmá-las.'] },
  { name:'Fase 3 · Silêncio, mar!', need:12, puddleEvery:2.4, waveEvery:1.2, voice:['t3','Fase três: ondas e poças ao mesmo tempo! Segure firme!'] },
];
function gameReset(){ GS.badBy=[0,0,0]; loadPhase(1); }
function loadPhase(n){ const L=TPH[n-1];
  Object.assign(GS,{ phase:n, puddles:[], waves:[], water:.1, done:0, pT:.5, wT:1.2, calm:0, finished:false, finT:0, ended:false, banner:2.8, lastP:null, cool:GS.cool||0 });
  $('gAn').textContent=L.name.split(' · ')[0]; hud(); gsay(L.voice[0],L.voice[1],true);
  cam.x=0; cam.y=-120; cam.z=W<700? .82 : 1.0; }
function hud(){ const L=TPH[GS.phase-1]; $('gGol').textContent=(GS.phase===1?'💧 ':'🌊 ')+GS.done+' / '+L.need; }
let gsubT=0;
function gsay(key,text,force,who){ if(!force && GS.cool>0) return; GS.cool=1.2; speak({rec:key,text}); whoEl.textContent=who||'Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){
  MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false;
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume(); gameReset();
}
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toWorld(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const lx=(e.clientX*dpr-offX)/K, ly=e.clientY*dpr/K; const z=ZOOM*cam.z*PZ(); return { x:(lx-W/2)/z+cam.x, y:(ly-H*CY)/z+cam.y }; }
function boatRock(){ return GS.calm>0? 0 : Math.sin(G*1.4)*.07; }
function puddleWorld(p){ const r=boatRock(), by=20+Math.sin(G*1.6)*8*(1-GS.calm); return { x:Math.cos(r)*p.lx - Math.sin(r)*p.ly, y:by+Math.sin(r)*p.lx + Math.cos(r)*p.ly }; }
function gameTap(e){ if(AC) AC.resume(); const w=toWorld(e); GS.lastP=w;
  for(const p of GS.puddles){ const q=puddleWorld(p); if(Math.hypot(q.x-w.x,q.y-w.y)<52){ p.dead=true; GS.water=Math.max(0,GS.water-.08); pluck(79,.06); pluck(74,.05,.06); burstAt(q.x,q.y-10);
      if(GS.phase===1){ GS.done++; hud(); if(GS.done%4===0) gsay('t4','Muito bem!'); } return; } } }
const sparks=[]; function burstAt(x,y){ for(let i=0;i<10;i++){ const a=Math.random()*6.28; sparks.push({x,y,vx:Math.cos(a)*160,vy:Math.sin(a)*160-60,t:0}); } }
cv.addEventListener('pointermove',e=>{ if(MODE!=='game'||!GS.lastP) return; const w=toWorld(e); const a=GS.lastP; GS.lastP=w;
  for(const wv of GS.waves){ if(wv.state!=='up') continue; const cx=wv.x, cy=60-wv.h*.8; const dx=w.x-a.x, dy=w.y-a.y, L=dx*dx+dy*dy||1; let tt=((cx-a.x)*dx+(cy-a.y)*dy)/L; tt=clamp(tt,0,1);
    if(Math.hypot(a.x+dx*tt-cx,a.y+dy*tt-cy) < Math.max(60,wv.h*.5) && Math.hypot(dx,dy)>4){ wv.state='calm'; burstAt(cx,cy); pluck(88,.05); pluck(84,.05,.08); if(GS.phase>1){ GS.done++; hud(); if(GS.done%4===0) gsay('t4','Muito bem!'); } } } });
addEventListener('pointerup',()=>{ if(MODE==='game') GS.lastP=null; });
function gameUpdate(dt){ const g=GS, L=TPH[g.phase-1];
  if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); } if(g.banner>0) g.banner-=dt;
  for(const s of sparks){ s.t+=dt; s.x+=s.vx*dt; s.y+=s.vy*dt; s.vy+=400*dt; } for(let i=sparks.length-1;i>=0;i--) if(sparks[i].t>.8) sparks.splice(i,1);
  if(g.finished){ g.finT+=dt; g.calm=Math.min(1,g.calm+dt*.5);
    if(g.phase<3 && g.finT>3.2){ loadPhase(g.phase+1); return; }
    if(g.phase===3 && g.finT>6.5 && !g.ended){ g.ended=true; const per=g.badBy.map(b=>b===0?3:(b<=2?2:1)); const st=Math.round(per.reduce((a,b)=>a+b,0)/3);
      $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent=TPH.map((P2,i)=>P2.name.split(' · ')[0]+': '+'⭐'.repeat(per[i])).join('  ·  '); $('gwin').hidden=false; }
    return; }
  if(g.banner>1.6) return;
  // poças
  if(L.puddleEvery){ g.pT-=dt; if(g.pT<=0 && g.puddles.length<5){ g.pT=L.puddleEvery*(.7+Math.random()*.6); g.puddles.push({lx:-170+Math.random()*340, ly:-36, t:0}); } }
  for(const p of g.puddles){ p.t+=dt; g.water+=dt*.018; } g.puddles=g.puddles.filter(p=>!p.dead);
  // ondas
  if(L.waveEvery){ g.wT-=dt; const active=g.waves.filter(w=>w.state==='up').length; if(g.wT<=0 && active<3){ g.wT=L.waveEvery*(.8+Math.random()*.4); const side=Math.random()<.5?-1:1; g.waves.push({x:side*(420+Math.random()*120), side, h:0, max:120+Math.random()*80, state:'up', t:0}); } }
  for(const w of g.waves){ w.t+=dt; if(w.state==='up'){ w.h=Math.min(w.max,w.h+dt*160); w.x-=w.side*dt*(60+g.phase*15); if(Math.abs(w.x)<250){ w.state='crash'; g.water+=.14; g.badBy[g.phase-1]++; gsay('t5','Splash! A onda bateu no barco.'); } } else w.h*=Math.max(0,1-dt*4); }
  g.waves=g.waves.filter(w=>!(w.state!=='up' && w.h<4));
  if(g.water>=1){ g.water=.45; g.puddles=[]; g.badBy[g.phase-1]++; gsay('t8','Ufa! O barco encheu demais. Tire a água, rápido!',true); }
  if(g.done>=L.need){ g.finished=true; g.finT=0; g.waves.forEach(w=>w.state='calm'); g.puddles=[]; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12));
    if(g.phase<3) gsay('t4','Muito bem!',true); else { gsay('t6','Silêncio! Aquiete-se!',true,'Jesus'); setTimeout(()=>{ if(MODE==='game') gsay('t7','Parabéns! Com Jesus no barco, não precisamos ter medo!',true); },2400); } }
}
function gameDraw(){ const g=GS, storm=g.phase===3&&g.finished? 1-g.calm : (g.phase===1? .55 : 1)*(g.finished? 1-g.calm*.6 : 1);
  LIGHT.dx=1; LIGHT.rim='#cfe0ff'; LIGHT.rimA=.35;
  layer(0,()=>{ lakeSky(storm, g.phase===3&&g.finished); if(g.phase===3&&g.finished) godRays(-130,-600,700,.25,G,'#fff0c0'); });
  layer(.3,()=>lake(-10,storm,false));
  layer(1,()=>{ const r=boatRock(), by=20+Math.sin(G*1.6)*8*(1-g.calm);
    boat(0,by,1,r,{storm:storm>.4,crew:()=>{ crew(storm)();
      if(g.phase===3&&g.finished){ person('jesus',-150,-30,{pose:'armsup',dir:1}); glow(-150,-110,200,'#fff4c8',.4); } else sleepingJesus(-150,-34,1);
      if(g.water>0){ ctx.globalAlpha=.7; ctx.fillStyle='rgba(90,170,230,.8)'; rr(-200,-28-g.water*12,400,6+g.water*12,6); ctx.fill(); ctx.globalAlpha=1; }
      for(const p of g.puddles){ const pu=1+Math.sin(G*6+p.lx)*.08; ell(p.lx,p.ly,26*pu,11*pu,'#7cc4f0'); ell(p.lx-7,p.ly-3,7,3,'rgba(255,255,255,.7)'); txt2('💧',p.lx,p.ly-16,20,'#fff'); } }});
    for(const w of g.waves){ const top=60-w.h, hw=90+w.h*.4; ctx.save(); ctx.globalAlpha=w.state==='up'?1:Math.min(1,w.h/60);
      ctx.fillStyle=vgrad(top,60,[[0,mix('#5aa8d8','#2e5a80',storm)],[1,'#16344e']]); ctx.beginPath(); ctx.moveTo(w.x-hw,80); ctx.quadraticCurveTo(w.x-hw*.4,top,w.x,top); ctx.quadraticCurveTo(w.x+hw*.4,top,w.x+hw,80); ctx.closePath(); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.9)'; for(let i=0;i<5;i++) ell(w.x-24+i*12,top+4+Math.sin(G*6+i)*2,7-i*.6,5,'rgba(255,255,255,.9)');
      if(w.state==='up'){ const pulse=.5+.5*Math.sin(G*6); ctx.strokeStyle=`rgba(255,243,196,${.35+pulse*.4})`; ctx.lineWidth=4; ctx.setLineDash([10,8]); ctx.beginPath(); ctx.moveTo(w.x-60,top+w.h*.3); ctx.lineTo(w.x+60,top+w.h*.3); ctx.stroke(); ctx.setLineDash([]); }
      ctx.restore(); }
    for(const s of sparks){ ell(s.x,s.y,4*(1-s.t),4*(1-s.t),'rgba(255,250,220,.9)'); }
    lake(40,storm,true); });
  rain(storm>.3? storm : 0,2);
  // medidor de água
  const bw=Math.min(260,W-160), bx=W/2-bw/2, by2=74; ctx.fillStyle='rgba(251,243,227,.88)'; rr(bx,by2,bw,14,7); ctx.fill(); ctx.fillStyle=g.water>.7?'#e85d5d':'#5eb3f2'; rr(bx,by2,Math.max(14,bw*Math.min(1,g.water)),14,7); ctx.fill(); txt2('💧',bx-16,by2+13,16,'#fff');
  if(g.banner<=0 && !g.finished && g.done===0){ const msg = g.phase===1? '👆 Toque nas poças 💧' : '👆 Deslize o dedo nas ondas'; ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 20px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(30,40,60,.55)'; ctx.lineWidth=5; ctx.strokeText(msg,W/2,H*.92); ctx.fillText(msg,W/2,H*.92); ctx.restore(); }
  if(g.banner>0){ const a=Math.min(1,g.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw2=Math.min(440,W-40); ctx.fillStyle='rgba(251,243,227,.96)'; rr(W/2-bw2/2,H*.24-36,bw2,64,14); ctx.fill();
    ctx.font='800 25px Fraunces, Georgia, serif'; ctx.textAlign='center'; ctx.fillStyle='#3a2c24'; ctx.fillText(TPH[g.phase-1].name,W/2,H*.24+6); ctx.restore(); }
}
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_tempestade_visto')) $('coverGame').hidden=false; }catch(e){}
