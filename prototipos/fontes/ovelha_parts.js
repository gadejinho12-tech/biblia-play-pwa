//@@CAST
  jesus:{ robe:['#f6f0e0','#d2c6a6'], sash:'#c0483a', skin:['#e3ad79','#c48a5a'], hair:'#6b4423', beard:true, beardC:'#6b4423', longhair:true, s:1 },
  povo1:{ robe:['#c9b48a','#9a845a'], sash:'#6b4423', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.9 },
  povo2:{ robe:['#7fc4c0','#3f8a86'], sash:'#6b4423', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', s:.86 },
  crianca:{ robe:['#ffd27a','#d9a441'], sash:'#c0503a', skin:['#f6cfa6','#e2ab7c'], hair:'#6b4423', s:.62 },
  crianca2:{ robe:['#ff9db0','#d9607a'], sash:'#ffffff', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.58 },
//@@SCENES
/* ===== A Ovelha Perdida: cenário ===== */
function curral(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  ctx.fillStyle='#8a6a44'; for(let i=0;i<7;i++){ rr(-150+i*50,-70,10,72,3); ctx.fill(); } ctx.fillStyle='#a8845a'; rr(-155,-58,320,9,4); ctx.fill(); rr(-155,-30,320,9,4); ctx.fill(); ctx.restore(); }
function pedra(x,y,s){ shade(x,y-16*s,34*s,22*s,'#a8a49a','#6e6a62'); ell(x-10*s,y-26*s,9*s,5*s,'rgba(255,255,255,.3)'); }
function moita(x,y,s,escuro){ const c1=escuro?'#2f5a3a':'#5f9a4c', c2=escuro?'#1e3a26':'#3f7a38'; shade(x-26*s,y-18*s,28*s,22*s,c1,c2); shade(x+26*s,y-16*s,26*s,20*s,c1,c2); shade(x,y-34*s,32*s,26*s,c1,c2); }
function espinhos(x,y,s){ moita(x,y,s,true); ctx.strokeStyle='#6a4a2a'; ctx.lineWidth=2.5; for(let i=0;i<9;i++){ const a=-Math.PI*(.1+.8*i/8), r=44*s; ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*r*.6,y-24*s+Math.sin(a)*r*.6); ctx.lineTo(x+Math.cos(a)*r,y-24*s+Math.sin(a)*r); ctx.stroke(); } }
function riacho(x0,x1,y){ ctx.fillStyle=vgrad(y-6,y+18,[[0,'#7fc4e8'],[1,'#3f86b8']]); ctx.beginPath(); ctx.moveTo(x0,y); for(let x=x0;x<=x1;x+=30) ctx.lineTo(x,y+Math.sin(x*.03+G*2)*3); ctx.lineTo(x1,y+20); ctx.lineTo(x0,y+20); ctx.fill(); }
function lanterna(x,y){ glow(x,y,150,'#ffd27a',.5); ctx.fillStyle='#5a3a22'; rr(x-7,y-14,14,22,4); ctx.fill(); ctx.fillStyle='#ffe28a'; rr(x-5,y-11,10,15,3); ctx.fill(); }
function ovelhaNosOmbros(x,y,dir){ ctx.save(); ctx.translate(x,y); ctx.rotate(dir*.08); animal('ovelha',0,0,.72,dir,5); ctx.restore(); }
function comOvelha(id,x,y,o){ const sc=(CAST[id]&&CAST[id].s)||1; person(id,x,y,o); ctx.save(); ctx.translate(x-(o.dir||1)*20*sc,y-86*sc); ctx.rotate(-(o.dir||1)*.25); animal('ovelha',0,0,.66*sc,o.dir||1,5); ctx.restore(); }
function confete(n){ for(let i=0;i<n;i++){ const px=((i*97+G*40)%1100)-550, py=-420+((G*80+i*53)%460); ctx.fillStyle=['#ffd75e','#ff8fb3','#ffffff','#8fd0f2','#9fe08a'][i%5]; ctx.save(); ctx.translate(px,py); ctx.rotate(G*3+i); ctx.fillRect(-4,-2,8,4); ctx.restore(); } }
function campoDia(dayK){ layer(0,()=>{ meadowSky(dayK); if(dayK>.6) sunDisk2(380,-250); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9*dayK+.1); });
  layer(.5,()=>{ ridge(0,60,.008,4,mix('#4a5a48','#b8c890',dayK),mix('#5a6a58','#d0dca8',dayK)); for(let i=0;i<6;i++) tree(-900+i*330,10,.8,mix('#2f4a38','#7a9a58',dayK),mix('#1e3020','#4a6a38',dayK)); }); }
SC.jesus_conta = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-120,-170,1.0],[0,-150,1.35],t/8); campoDia(1);
  layer(1,()=>{ ground('#b8c878','#7a8a48'); pedra(0,6,1.4);
    person('jesus',0,-18,{pose:TALK==='jesus'?'open':'sit',dir:1});
    [['povo1',-260,1],['crianca',-170,1],['crianca2',-110,1],['povo2',200,-1],['crianca',150,-1],['povo1',290,-1]].forEach(([id,x,d],i)=>person(id,x,6+(i%2)*4,{pose:i%3===1?'sit':'stand',dir:d,ph:i}));
    animal('ovelha',-360,14,.8,1,1); });
};
SC.campo = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-240,-170,1.0],[120,-160,1.15],t/9); campoDia(1);
  layer(1,()=>{ ground('#b8d07a','#7a9a48'); riacho(150,1400,30);
    const px=lerp(-300,60,ss(0,8,t)); person('pastor1',px,0,{pose:'walk',dir:1});
    for(let i=0;i<12;i++){ const x=px-80-(i%6)*70+Math.sin(G+i)*6, y=8+Math.floor(i/6)*18; animal('ovelha',x,y,.78,1,i); }
    animal('ovelha',260,26,.8,-1,4); animal('ovelha',330,24,.8,1,7); });
};
SC.contagem = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.75; setCam([0,-160,1.15],[60,-150,1.35],t/8); campoDia(.45);
  layer(1,()=>{ ground('#9aa86a','#5a6a38'); curral(260,0,1);
    for(let i=0;i<7;i++){ const k=clamp((t-i*1.1)/1.1,0,1); const x=lerp(-420,230,k)+(i%2)*20; animal('ovelha',x,10+(i%3)*6,.78,1,i); }
    person('pastor1',40,0,{pose:'point',dir:1}); });
};
SC.falta = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffc890'; LIGHT.rimA=.8; setCam([60,-150,1.35],[80,-150,1.6],t/6); campoDia(.35);
  layer(1,()=>{ ground('#8a986a','#4a5a38'); curral(260,0,1); for(let i=0;i<8;i++) animal('ovelha',150+(i%4)*60,-6+Math.floor(i/4)*16,.7,i%2?1:-1,i);
    person('pastor1',40,0,{pose:t<2?'open':'lookup',dir:t<2?1:-1,up:t>=2}); });
};
SC.procura = t=>{ LIGHT.dx=1; LIGHT.rim='#cfd8ff'; LIGHT.rimA=.4; setCam([-300,-160,1.1],[300,-160,1.1],t/12);
  layer(0,()=>{ nightSky(1); glow(-330,-260,140,'#e8eeff',.3); ell(-330,-260,28,28,'#f4f1e2'); });
  layer(.5,()=>{ ridge(0,60,.008,4,'#2a3a48','#3a4a58',3000); });
  layer(1,()=>{ ground('#3a5a48','#1e3020'); riacho(-900,-500,26); [[-380,1.2],[-120,1],[200,1.3],[520,1.1]].forEach(([x,s])=>pedra(x,8,s)); [[-260,1],[60,1.2],[380,1],[700,1.1]].forEach(([x,s])=>moita(x,6,s,true));
    const px=lerp(-520,520,ss(0,12,t)); person('pastor1',px,0,{pose:'walk',dir:1}); lanterna(px+34,-70); });
};
SC.achou = t=>{ LIGHT.dx=1; LIGHT.rim='#ffd890'; LIGHT.rimA=.6; setCam([-60,-150,1.3],[40,-140,1.7],t/7);
  layer(0,()=>{ nightSky(1); });
  layer(1,()=>{ ground('#3a5a48','#1e3020'); espinhos(120,6,1.3); const b=Math.sin(G*7)*2; animal('ovelha',105,10+b,.8,-1,2); ctx.strokeStyle='#6a4a2a'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(70,-20); ctx.lineTo(140,-6); ctx.moveTo(80,0); ctx.lineTo(130,-30); ctx.stroke();
    const q=ss(0,2.5,t); person('pastor1',lerp(-200,30,q),0,{pose:q<1?'walk':'kneel',dir:1}); lanterna(lerp(-170,60,q),-60); });
};
SC.ombros = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.7; setCam([-200,-170,1.2],[120,-160,1.3],t/8); campoDia(lerp(.5,1,ss(0,6,t)));
  layer(1,()=>{ ground('#b8c878','#7a8a48'); const px=lerp(-300,160,ss(0,8,t)); comOvelha('pastor1',px,0,{pose:'armsup',dir:1}); });
};
SC.festa = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8; setCam([0,-170,1.3],[0,-170,1.0],t/7); campoDia(1);
  layer(1,()=>{ ground('#b8c878','#7a8a48'); curral(380,0,.8);
    comOvelha('pastor1',0,0,{pose:'armsup',dir:1});
    [['povo1',-220,1],['crianca',-140,1],['povo2',180,-1],['crianca2',250,-1]].forEach(([id,x,d],i)=>person(id,x,4,{pose:'armsup',dir:d,ph:i}));
    confete(26); });
};
SC.bompastor = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8; setCam([0,-160,1.25],[0,-170,1.5],t/9); campoDia(.6);
  layer(1,()=>{ ground('#a8b870','#6a7a40'); godRays(0,-700,700,.2,G,'#fff0c0');
    comOvelha('jesus',0,0,{pose:TALK==='jesus'?'open':'stand',dir:1});
    person('crianca',-120,4,{pose:'stand',dir:1}); person('crianca2',120,4,{pose:'stand',dir:-1,ph:2});
    for(let i=0;i<4;i++) animal('ovelha',-320+i*60+(i>1?460:0),14,.75,i<2?1:-1,i); });
};
//@@ROTEIRO
const CH=[ 'Jesus conta uma história', 'Cem ovelhinhas', 'Procurando a ovelhinha', 'Festa no céu' ];
const N=(t)=>({who:'Narrador',text:t}), JES=t=>({who:'Jesus',text:t,talk:'jesus'}), PAS=t=>({who:'Pastor',text:t,talk:'pastor1'});
const SCRIPT=[
  {card:0},
  {sc:'jesus_conta', ...N('Muitas pessoas vinham ouvir Jesus. Um dia, Ele sentou com todos e contou uma história. (Lucas 15:1-3)')},
  {sc:'jesus_conta', ...JES('Imaginem um pastor que tinha cem ovelhas. Ele cuidava de cada uma, e conhecia todas pelo nome.')},
  {card:1},
  {sc:'campo', ...N('Todo dia, o pastor levava as ovelhas para comer grama verdinha e beber água fresquinha.')},
  {sc:'contagem', ...N('No fim da tarde, ele contava: noventa e sete, noventa e oito, noventa e nove...')},
  {sc:'falta', ...PAS('Noventa e nove? Está faltando uma! A minha ovelhinha pequena sumiu!')},
  {card:2},
  {sc:'procura', ...N('O pastor deixou as noventa e nove em segurança, e saiu para procurar a que estava perdida. (Lucas 15:4)')},
  {sc:'procura', ...PAS('Ovelhinha! Onde você está? Eu vou te achar!')},
  {sc:'procura', ...N('Ele procurou atrás das pedras, no meio do mato, perto do riacho... e não desistiu.')},
  {sc:'achou', ...N('De repente, ele ouviu um béééé bem baixinho. Lá estava ela, presa nos espinhos, com frio e com medo.')},
  {card:3},
  {sc:'ombros', ...N('Com todo o carinho, o pastor soltou a ovelhinha e a colocou nos ombros, muito feliz. (Lucas 15:5)')},
  {sc:'festa', ...PAS('Amigos, venham comemorar comigo! Eu encontrei a minha ovelha perdida! (Lucas 15:6)')},
  {sc:'bompastor', ...JES('Assim também, há muita alegria no céu por uma pessoa que volta para Deus. (Lucas 15:7)')},
  {sc:'bompastor', ...JES('Eu sou o Bom Pastor. Eu conheço vocês, e cuido de cada um. (João 10:11, 14)')},
  {summary:true, sc:'bompastor', ...N('Hoje aprendemos: para Deus, você é muito importante. Ele nunca desiste de você!')},
];
//@@MOOD
const MOOD={ jesus_conta:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], campo:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]], contagem:[[57,60,64],[53,57,60],[55,59,62],[60,64,67]],
  falta:[[57,60,64],[52,55,59],[53,57,60],[55,59,62]], procura:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]], achou:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]],
  ombros:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]], festa:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], bompastor:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]],
  obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: Ache a Ovelhinha! (3 fases, cada uma de um jeito) =================
   Fase 1 · Conte as ovelhas: toque em cada ovelha que passa pela porteira (até 10).
   Fase 2 · Procure no escuro: arraste a lanterna para iluminar o campo e achar a ovelhinha.
   Fase 3 · De volta para casa: desenhe com o dedo o caminho do pastor até o curral, sem passar nos espinhos.
   Ninguém perde: a ovelha que passa sem ser contada dá a volta; o caminho errado só recomeça. */
let MODE='film';
const GS={};
const NPH=[
  { name:'Fase 1 · Conte as ovelhas', voice:['o1','Agora é a sua vez! Fase um: conte as ovelhas. Toque em cada ovelhinha que passar pela porteira!'] },
  { name:'Fase 2 · Procure no escuro', voice:['o2','Fase dois: está escuro! Arraste a lanterna e procure a ovelhinha perdida.'] },
  { name:'Fase 3 · De volta para casa', voice:['o3','Fase três: leve a ovelhinha para casa! Desenhe o caminho com o dedo, sem passar nos espinhos.'] },
];
function gameReset(){ GS.badBy=[0,0,0]; loadPhase(1); }
function loadPhase(n){ Object.assign(GS,{ phase:n, banner:2.8, finished:false, finT:0, ended:false, cool:GS.cool||0,
    ovs:[], nextOv:1.2, counted:0, GOAL:10, pops:[],
    lx:W/2, ly:H*.5, hold:0, achada:false, esconde:null, dicaT:5,
    path:[], drawing:false, walkT:-1, falhou:0 });
  camFor();
  if(n===2){ const lugares=[[-430,'pedra'],[-210,'moita'],[20,'pedra'],[240,'moita'],[450,'pedra']]; GS.lugares=lugares; GS.esconde=lugares[1+Math.floor(Math.random()*4)][0]; }
  if(n===3){ GS.esp=[[.36,.30],[.36,.70],[.55,.50],[.70,.22],[.72,.78]].map(([x,y])=>({x,y})); }
  $('gAn').textContent=NPH[n-1].name.split(' · ')[0]; hud(); gsay(NPH[n-1].voice[0],NPH[n-1].voice[1],true); }
function hud(){ const n=GS.phase; $('gGol').textContent = n===1? ('🐑 '+GS.counted+' / '+GS.GOAL) : (n===2? (GS.achada? '🐑 Achou!' : '🔦 Procure') : '🏠 Para casa'); }
function camFor(){ const narrow=W<700; cam.x=GS.phase===1? 40 : 0; cam.y=GS.phase===1? -120 : -150; cam.z=GS.phase===1? (narrow? 1 : 1.3) : (narrow? .8 : 1); }
let gsubT=0;
function gsay(key,text,force,who){ if(!force && GS.cool>0) return; GS.cool=5; speak({rec:key,text}); whoEl.textContent=who||'Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){ MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false;
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume(); gameReset(); }
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toWorld(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const lx=(e.clientX*dpr-offX)/K, ly=e.clientY*dpr/K; const z=ZOOM*cam.z*PZ(); return { x:(lx-W/2)/z+cam.x, y:(ly-H*CY)/z+cam.y, sx:lx, sy:ly }; }
function toScreen(x,y){ const z=ZOOM*cam.z*PZ(); return [ (x-cam.x)*z+W/2, (y-cam.y)*z+H*CY ]; }
function gameTap(e){ if(AC) AC.resume(); const w=toWorld(e); const g=GS; if(g.banner>1.6||g.finished) return;
  if(g.phase===1){ let best=null, bd=1e9; for(const o of g.ovs){ if(o.ok) continue; const d=Math.hypot(o.x-w.x,(-30)-w.y); if(d<bd){ bd=d; best=o; } }
    if(best && bd<95){ best.ok=true; best.hop=0; g.counted++; g.pops.push({x:best.x,y:-90,n:g.counted,t:0}); hud(); pluck(76+(g.counted%5)*2,.07); pluck(88,.04,.06);
      if(g.counted===5) gsay('o4','Muito bem!'); if(g.counted>=g.GOAL) finishPhase(); } }
  else if(g.phase===2){ g.drag=true; g.lx=w.sx; g.ly=w.sy; }
  else if(g.phase===3 && g.walkT<0){ const [px,py]=[W*.12,H*.5]; if(Math.hypot(w.sx-px,w.sy-py)<80){ g.drawing=true; g.path=[[px,py]]; pluck(74,.05); } } }
cv.addEventListener('pointermove',e=>{ if(MODE!=='game') return; const g=GS, w=toWorld(e);
  if(g.phase===2 && g.drag){ g.lx=w.sx; g.ly=w.sy; }
  if(g.phase===3 && g.drawing){ const last=g.path[g.path.length-1]; if(Math.hypot(w.sx-last[0],w.sy-last[1])<6) return; g.path.push([w.sx,w.sy]);
    const r=Math.min(W,H)*.075;
    for(const s of g.esp){ if(Math.hypot(w.sx-s.x*W,w.sy-s.y*H)<r){ g.drawing=false; g.path=[]; g.falhou=.6; g.badBy[2]+=.5; pluck(52,.07); gsay('o8','Cuidado com os espinhos! Tente outro caminho.'); return; } }
    if(Math.abs(w.sx-W*.88)<W*.07 && Math.abs(w.sy-H*.5)<H*.16){ g.drawing=false; g.walkT=0; pluck(79,.07); pluck(84,.06,.08); } } });
addEventListener('pointerup',()=>{ if(MODE!=='game') return; const g=GS; g.drag=false; if(g.phase===3 && g.drawing){ g.drawing=false; g.path=[]; } });
function finishPhase(){ const g=GS; g.finished=true; g.finT=0; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12));
  if(g.phase<3) gsay('o4','Muito bem!',true); else gsay('o9','Parabéns! A ovelhinha voltou para casa. Vamos fazer festa!',true); }
function gameUpdate(dt){ const g=GS; if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); } if(g.banner>0) g.banner-=dt; if(g.falhou>0) g.falhou-=dt;
  for(const p of g.pops) p.t+=dt; g.pops=g.pops.filter(p=>p.t<1.4);
  if(g.finished){ g.finT+=dt; if(g.phase<3 && g.finT>3){ loadPhase(g.phase+1); return; }
    if(g.phase===3 && g.finT>4.5 && !g.ended){ g.ended=true; const per=g.badBy.map(b=>b===0?3:(b<=2?2:1)); const st=Math.round(per.reduce((a,b)=>a+b,0)/3);
      $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent=NPH.map((P2,i)=>P2.name.split(' · ')[0]+': '+'⭐'.repeat(per[i])).join('  ·  '); $('gwin').hidden=false; try{ const k='bp_ovelha_estrelas'; localStorage.setItem(k, Math.max(+(localStorage.getItem(k)||0), st)); }catch(e){} if(window.bpAddCoins) setTimeout(()=>bpAddCoins(2*Math.round(st),'pelo jogo!'),900); } }
  if(g.phase===1){
    if(!g.finished && g.banner<1.4){ g.nextOv-=dt; const andando=g.ovs.filter(o=>!o.ok).length;
      if(g.nextOv<=0 && andando<2 && g.counted+andando<g.GOAL){ g.ovs.push({x:-560, ok:false, hop:-1, ph:Math.random()*6}); g.nextOv=1.5+Math.random()*.6; } }
    for(const o of g.ovs){ o.x+=(o.ok? 230 : 110)*dt; if(o.hop>=0) o.hop+=dt;
      if(!o.ok && o.x>250){ o.x=-620; g.badBy[0]+=.34; gsay('o5','Ops! Ela passou. Ela vai dar a volta.'); } }
    g.ovs=g.ovs.filter(o=>!(o.ok && o.x>520));
  }
  if(g.phase===2 && !g.finished && g.banner<1.4){ g.dicaT-=dt; if(g.dicaT<=0){ g.dicaT=7; gsay('o6','Estou ouvindo um béééé... continue procurando!'); pluck(67,.05); pluck(64,.04,.15); }
    const [sx,sy]=toScreen(g.esconde,-30); if(Math.hypot(g.lx-sx,g.ly-sy)<Math.min(W,H)*.13){ g.hold+=dt; if(g.hold>.7){ g.achada=true; hud(); gsay('o7','Achou! Ela estava aqui!',true); finishPhase(); } } else g.hold=Math.max(0,g.hold-dt); }
  if(g.phase===3 && g.walkT>=0 && !g.finished){ g.walkT+=dt; if(g.walkT>2.6) finishPhase(); }
}
function pastorNoMapa(x,y,s,anda){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); comOvelha('pastor1',0,40,{pose:anda?'walk':'stand',dir:1}); ctx.restore(); }
function gameDraw(){ const g=GS; LIGHT.dx=1; LIGHT.rim='#ffd890'; LIGHT.rimA=.6;
  if(g.phase===1){ campoDia(.6);
    layer(1,()=>{ ground('#a8b870','#6a7a40'); curral(420,0,1); ctx.fillStyle='#8a6a44'; rr(250,-90,14,92,4); ctx.fill(); rr(330,-90,14,92,4); ctx.fill();
      person('pastor1',300,0,{pose:'point',dir:-1});
      for(const o of g.ovs){ const hop=o.hop>=0? Math.max(0,Math.sin(Math.min(1,o.hop*2.2)*Math.PI))*40 : 0; if(!o.ok) glow(o.x,-30,60,'#fff7d0',.22+.12*Math.sin(G*6+o.ph)); animal('ovelha',o.x,10-hop,1.2,1,o.ph); }
      for(const p of g.pops){ ctx.save(); ctx.globalAlpha=1-p.t/1.4; ctx.font='800 46px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#FF8A3D'; ctx.strokeStyle='#fff'; ctx.lineWidth=6; ctx.strokeText(p.n,p.x,p.y-p.t*50); ctx.fillText(p.n,p.x,p.y-p.t*50); ctx.restore(); } }); }
  else if(g.phase===2){
    layer(0,()=>{ nightSky(1); ell(-330,-260,24,24,'#f4f1e2'); });
    layer(.5,()=>{ ridge(0,60,.008,4,'#2a3a48','#3a4a58',3000); });
    layer(1,()=>{ ground('#3a5a48','#1e3020'); riacho(-700,700,40);
      for(const [x,k] of g.lugares){ if(x===g.esconde){ animal('ovelha',x+(k==='pedra'?40:30),4,.62,-1,3); for(let i=1;i<=4;i++) ell(x-40*i,22+(i%2)*6,6,3,'rgba(240,230,210,.8)'); }
        if(k==='pedra') pedra(x,10,1.5); else moita(x,8,1.3,true); }
      if(g.finished) person('pastor1',g.esconde-120,0,{pose:'kneel',dir:1}); });
    // escuridão com o círculo da lanterna
    const off=gameDraw.off||(gameDraw.off=document.createElement('canvas')); if(off.width!==Math.round(W)||off.height!==H){ off.width=Math.round(W); off.height=H; }
    const o=off.getContext('2d'); o.globalCompositeOperation='source-over'; o.clearRect(0,0,off.width,off.height); o.fillStyle=`rgba(6,10,30,${g.finished? Math.max(0,.9-g.finT*.5) : .9})`; o.fillRect(0,0,off.width,off.height);
    o.globalCompositeOperation='destination-out'; const R=Math.min(W,H)*.2; const gr=o.createRadialGradient(g.lx,g.ly,R*.35,g.lx,g.ly,R); gr.addColorStop(0,'rgba(0,0,0,1)'); gr.addColorStop(1,'rgba(0,0,0,0)'); o.fillStyle=gr; o.beginPath(); o.arc(g.lx,g.ly,R,0,7); o.fill();
    ctx.drawImage(off,0,0,W,H); glow(g.lx,g.ly,R*.9,'#ffd27a',.18); ctx.fillStyle='#5a3a22'; rr(g.lx-9,g.ly+R*.55,18,26,5); ctx.fill(); ctx.fillStyle='#ffe28a'; rr(g.lx-6,g.ly+R*.55+3,12,16,4); ctx.fill(); }
  else {
    // mapa visto de cima: campo, espinhos, curral
    ctx.fillStyle=vgrad(0,H,[[0,'#b8d88a'],[1,'#8ab860']]); ctx.fillRect(0,0,W,H);
    for(let i=0;i<40;i++){ const x=(i*137)%W, y=(i*89)%H; ell(x,y,6,3,'rgba(255,255,255,.15)'); }
    const r=Math.min(W,H)*.075;
    for(const s of g.esp){ const x=s.x*W, y=s.y*H; ell(x,y+4,r*1.05,r*.9,'rgba(0,0,0,.12)'); ell(x,y,r,r*.85,'#3f6a3a'); ctx.strokeStyle='#6a4a2a'; ctx.lineWidth=3; for(let i=0;i<10;i++){ const a=i/10*Math.PI*2; ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.6); ctx.lineTo(x+Math.cos(a)*r*1.25,y+Math.sin(a)*r*1.05); ctx.stroke(); } }
    const cx=W*.88, cy=H*.5; ctx.fillStyle='#e8d8a8'; rr(cx-W*.07,cy-H*.16,W*.14,H*.32,14); ctx.fill(); ctx.strokeStyle='#8a6a44'; ctx.lineWidth=8; rr(cx-W*.07,cy-H*.16,W*.14,H*.32,14); ctx.stroke();
    for(let i=0;i<4;i++) animal('ovelha',cx-30+(i%2)*40,cy-30+Math.floor(i/2)*44,.45,1,i); ctx.save(); ctx.font='800 22px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#2B3A55'; ctx.fillText('🏠 Curral',cx,cy-H*.19); ctx.restore();
    if(g.path.length>1){ ctx.save(); ctx.strokeStyle=g.falhou>0?'#ff6f6f':'#fff4c8'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.globalAlpha=.9; ctx.beginPath(); g.path.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke(); ctx.setLineDash([2,16]); ctx.strokeStyle='#c8a060'; ctx.lineWidth=5; ctx.stroke(); ctx.restore(); }
    let px=W*.12, py=H*.5;
    if(g.walkT>=0 && g.path.length>1){ const k=Math.min(1,g.walkT/2.4), idx=k*(g.path.length-1), i0=Math.floor(idx), i1=Math.min(g.path.length-1,i0+1), f=idx-i0; px=lerp(g.path[i0][0],g.path[i1][0],f); py=lerp(g.path[i0][1],g.path[i1][1],f); }
    if(!g.drawing && g.walkT<0){ glow(px,py,70,'#fff7d0',.35+.15*Math.sin(G*5)); }
    pastorNoMapa(px,py,.95,g.walkT>=0&&!g.finished);
    if(g.finished){ ctx.save(); ctx.translate(W/2,H/2); ctx.scale(.6,.6); ctx.translate(-W/2,-H/2); ctx.restore(); for(let i=0;i<30;i++){ const x=((i*97+G*60)%W), y=((G*90+i*53)%H); ctx.fillStyle=['#ffd75e','#ff8fb3','#ffffff','#8fd0f2'][i%4]; ctx.fillRect(x,y,8,4); } } }
  if(g.banner<=0 && !g.finished){ const msg = g.phase===1? '👆 Toque em cada ovelha' : (g.phase===2? '👆 Arraste a lanterna' : (g.drawing? '' : '👆 Desenhe o caminho até o curral')); if(msg){ ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 22px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(30,40,60,.55)'; ctx.lineWidth=5; ctx.strokeText(msg,W/2,H*.94); ctx.fillText(msg,W/2,H*.94); ctx.restore(); } }
  if(g.banner>0){ const a=Math.min(1,g.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw2=Math.min(460,W-40); ctx.fillStyle='rgba(255,253,246,.97)'; rr(W/2-bw2/2,H*.24-36,bw2,64,32); ctx.fill();
    ctx.font='800 25px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#2B3A55'; ctx.fillText(NPH[g.phase-1].name,W/2,H*.24+8); ctx.restore(); }
}
function txt2(t,x,y,size,c){ ctx.save(); ctx.font='800 '+size+'px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle=c; ctx.fillText(t,x,y); ctx.restore(); }
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_ovelha_visto')) $('coverGame').hidden=false; }catch(e){}
try{ if(location.hash==='#jogo') $('coverGame').hidden=false; }catch(e){}
