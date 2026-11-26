//@@CAST
  jesus:{ robe:['#f6f0e0','#d2c6a6'], sash:'#c0483a', skin:['#e3ad79','#c48a5a'], hair:'#6b4423', beard:true, beardC:'#6b4423', longhair:true, s:1 },
  filipe:{ robe:['#8fa86a','#5f7a42'], sash:'#6b4423', skin:['#e8b48a','#c98f62'], hair:'#3a2a1a', beard:true, beardC:'#3a2a1a', s:.98 },
  andre:{ robe:['#e0a060','#a8682a'], sash:'#4a6a8a', skin:['#d8a07a','#b07850'], hair:'#5a3a22', beard:true, beardC:'#5a3a22', s:1 },
  menino:{ robe:['#7fb4e0','#4a80b0'], sash:'#f2c24a', skin:['#e8b48a','#c98f62'], hair:'#3a2a1a', s:.6 },
  povo1:{ robe:['#c9b48a','#9a845a'], sash:'#6b4423', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.9 },
  povo2:{ robe:['#7fc4c0','#3f8a86'], sash:'#6b4423', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', s:.86 },
  mulher:{ robe:['#d890b0','#a85a80'], sash:'#ffffff', skin:['#e8b48a','#c98f62'], hair:'#3a2a1a', scarf:'#f4e8d0', s:.88 },
  crianca:{ robe:['#ffd27a','#d9a441'], sash:'#c0503a', skin:['#f6cfa6','#e2ab7c'], hair:'#6b4423', s:.62 },
  crianca2:{ robe:['#ff9db0','#d9607a'], sash:'#ffffff', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.58 },
//@@SCENES
/* ===== Pães e Peixes: cenário ===== */
function pao(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ell(0,4,30,10,'rgba(0,0,0,.12)'); ctx.fillStyle=vgrad(-22,10,[[0,'#f0c070'],[1,'#c08030']]); ctx.beginPath(); ctx.ellipse(0,-6,30,18,0,0,7); ctx.fill(); ctx.strokeStyle='#a86a28'; ctx.lineWidth=2.5; for(let i=-1;i<=1;i++){ ctx.beginPath(); ctx.moveTo(i*12-6,-16); ctx.lineTo(i*12+4,-2); ctx.stroke(); } ctx.restore(); }
function peixe(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#8fb8d8'; ctx.beginPath(); ctx.ellipse(0,-8,28,13,0,0,7); ctx.fill(); ctx.beginPath(); ctx.moveTo(24,-8); ctx.lineTo(42,-20); ctx.lineTo(42,4); ctx.closePath(); ctx.fill(); ell(-14,-11,3.5,3.5,'#2B3A55'); ctx.restore(); }
function maca(x,y,s){ ell(x,y-14*s,16*s,16*s,'#e0503a'); ell(x-5*s,y-19*s,4*s,4*s,'rgba(255,255,255,.4)'); ell(x+3*s,y-30*s,4*s,7*s,'#5f9a4c'); }
function pedrinha(x,y,s){ shade(x,y-10*s,20*s,13*s,'#b8b4aa','#7e7a72'); }
function concha(x,y,s){ ctx.fillStyle='#f4d8c8'; ctx.beginPath(); ctx.arc(x,y-4*s,16*s,Math.PI,0); ctx.fill(); ctx.strokeStyle='#d8a890'; ctx.lineWidth=2; for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(x,y-2*s); ctx.lineTo(x+i*7*s,y-18*s); ctx.stroke(); } }
function cesto(x,y,s,cheio){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); if(cheio){ pao(-14,-34,.7); pao(14,-36,.7); if(cheio>1) peixe(0,-44,.5); } ctx.fillStyle=vgrad(-40,0,[[0,'#c8915a'],[1,'#8a5a30']]); ctx.beginPath(); ctx.moveTo(-44,-40); ctx.lineTo(44,-40); ctx.lineTo(34,0); ctx.lineTo(-34,0); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#6a4426'; ctx.lineWidth=2; for(let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(-42+i*2,-30+i*9); ctx.lineTo(42-i*2,-30+i*9); ctx.stroke(); } ctx.restore(); }
function farelo(x,y,r){ ctx.save(); ctx.translate(x,y); ctx.rotate(r); ctx.fillStyle='#e0a858'; ctx.beginPath(); ctx.ellipse(0,0,12,8,0,0,7); ctx.fill(); ctx.fillStyle='rgba(255,255,255,.25)'; ctx.beginPath(); ctx.ellipse(-3,-2,5,3,0,0,7); ctx.fill(); ctx.restore(); }
function lago(){ ctx.fillStyle=vgrad(-10,40,[[0,'#8fd0f2'],[1,'#4a90c8']]); ctx.beginPath(); ctx.ellipse(0,-6,1500,26,0,0,7); ctx.fill(); }
function diaMonte(dayK){ layer(0,()=>{ meadowSky(dayK); sunDisk2(dayK>.7?380:300, dayK>.7?-250:-120); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); });
  layer(.3,()=>{ lago(); }); layer(.5,()=>{ ridge(0,70,.006,7,mix('#7a8a58','#a8c078',dayK),mix('#8a9a68','#c8dc98',dayK),3000); }); }
function multidaoLonge(n,t,sentados){ for(let i=0;i<n;i++){ const x=-700+((i*137)%1400), y=-6+(i%4)*6; person(['povo1','povo2','mulher','crianca','crianca2'][i%5],x,y,{pose:sentados?'sit':'walk',dir:i%2?1:-1,ph:i,s:.55}); } }
SC.multidao = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-260,-160,.95],[60,-170,1.15],t/9); diaMonte(1);
  layer(1,()=>{ ground('#b8d07a','#8ab060'); multidaoLonge(22,t,false); const jx=lerp(-120,120,ss(0,8,t)); person('jesus',jx,0,{pose:'walk',dir:1}); person('filipe',jx-110,4,{pose:'walk',dir:1,ph:1}); person('andre',jx-200,6,{pose:'walk',dir:1,ph:2}); });
};
SC.monte = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.7; setCam([0,-170,1.2],[60,-160,1.45],t/8); diaMonte(.75);
  layer(1,()=>{ ground('#b0c870','#80a050'); multidaoLonge(16,t,false); person('jesus',-40,0,{pose:TALK==='jesus'?'open':'stand',dir:1}); person('filipe',90,4,{pose:TALK==='filipe'?'open':'stand',dir:-1}); });
};
SC.menino = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.7; setCam([0,-150,1.35],[20,-140,1.6],t/8); diaMonte(.75);
  layer(1,()=>{ ground('#b0c870','#80a050'); person('jesus',-150,0,{pose:'stand',dir:1}); person('andre',150,0,{pose:TALK==='andre'?'point':'stand',dir:-1});
    const q=ss(0,3,t); person('menino',lerp(220,20,q),2,{pose:q<1?'walk':'open',dir:-1}); cesto(lerp(220,20,q)-18,-14,.38,2); });
};
SC.sentar = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.65; setCam([-200,-170,1.0],[150,-170,1.1],t/9); diaMonte(.7);
  layer(1,()=>{ ground('#a8d070','#70a840'); for(let g=0;g<6;g++){ const gx=-560+g*230; for(let i=0;i<4;i++) person(['povo1','mulher','crianca','povo2'][(g+i)%4],gx+i*42,6+(i%2)*8,{pose:'sit',dir:i%2?1:-1,ph:g*4+i,s:.8}); } });
};
SC.agradece = t=>{ LIGHT.dx=1; LIGHT.rim='#fff0c0'; LIGHT.rimA=.9; setCam([0,-150,1.5],[0,-180,1.25],t/8); diaMonte(.7);
  layer(1,()=>{ ground('#a8d070','#70a840'); godRays(0,-700,700,.25*ss(0,2,t),G,'#fff0c0'); person('jesus',0,0,{pose:'armsup',dir:1,up:true}); pao(-34,-160,.7); pao(34,-164,.7); glow(0,-170,90,'#fff2c0',.5*ss(0,2,t));
    person('menino',-140,2,{pose:'pray',dir:1}); person('andre',140,0,{pose:'pray',dir:-1}); });
};
SC.reparte = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.65; setCam([-120,-170,1.15],[120,-170,1.15],t/8); diaMonte(.65);
  layer(1,()=>{ ground('#a8d070','#70a840'); person('jesus',-20,0,{pose:'open',dir:1}); const k=Math.min(6,1+Math.floor(t*1.2)); for(let i=0;i<k;i++) cesto(-60+(i%3)*40,30+Math.floor(i/3)*16,.5,2);
    for(let g=0;g<3;g++){ const gx=200+g*220; for(let i=0;i<3;i++) person(['povo1','mulher','crianca'][(g+i)%3],gx+i*44,6,{pose:'sit',dir:-1,ph:g*3+i,s:.8}); }
    const dx=lerp(30,520,(t*.25)%1); person('filipe',dx,0,{pose:'walk',dir:1}); pao(dx+30,-70,.55); person('andre',-320,0,{pose:'open',dir:1}); });
};
SC.satisfeitos = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffc890'; LIGHT.rimA=.75; setCam([0,-170,1.1],[0,-170,1.3],t/8); diaMonte(.55);
  layer(1,()=>{ ground('#a0c868','#689838'); for(let g=0;g<6;g++){ const gx=-560+g*230; for(let i=0;i<3;i++){ const id=['povo1','mulher','crianca','povo2','crianca2'][(g+i)%5]; person(id,gx+i*44,6,{pose:(g+i)%3===0?'armsup':'sit',dir:i%2?1:-1,ph:g*3+i,s:.8}); } pao(gx+60,10,.4); } });
};
SC.sobras = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffc890'; LIGHT.rimA=.8; setCam([-150,-160,1.15],[150,-160,1.2],t/9); diaMonte(.45);
  layer(1,()=>{ ground('#98c060','#609030'); for(let i=0;i<22;i++) farelo(-500+((i*67)%1000),10+((i*37)%30),i);
    const n=Math.min(12,Math.floor(t*1.6)); for(let i=0;i<12;i++) cesto(-330+i*60,40,.55,i<n?1:0);
    person('filipe',-200,0,{pose:'walk',dir:1}); person('andre',200,0,{pose:'kneel',dir:-1}); person('jesus',0,-10,{pose:TALK==='jesus'?'open':'stand',dir:1}); });
};
SC.final = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8; setCam([0,-160,1.3],[0,-170,1.5],t/9); diaMonte(.5);
  layer(1,()=>{ ground('#a0c868','#689838'); godRays(0,-700,700,.18,G,'#fff0c0'); person('jesus',0,0,{pose:'open',dir:1}); person('menino',-120,2,{pose:'armsup',dir:1}); person('crianca2',120,2,{pose:'armsup',dir:-1,ph:2});
    for(let i=0;i<6;i++) cesto(-330+i*130+(i>2?140:0),40,.55,1); });
};
//@@ROTEIRO
const CH=[ 'Uma multidão com fome', 'O lanche do menino', 'Jesus agradece e reparte', 'Doze cestos de sobra' ];
const N=(t)=>({who:'Narrador',text:t}), JES=t=>({who:'Jesus',text:t,talk:'jesus'}), FIL=t=>({who:'Filipe',text:t,talk:'filipe'}), AND=t=>({who:'André',text:t,talk:'andre'}), MEN=t=>({who:'Menino',text:t,talk:'menino'});
const SCRIPT=[
  {card:0},
  {sc:'multidao', ...N('Uma multidão enorme seguia Jesus, porque viam as coisas maravilhosas que Ele fazia. (João 6:2)')},
  {sc:'multidao', ...N('Jesus subiu num monte com os discípulos. Quando olhou, viu muita gente chegando... e já estava ficando tarde.')},
  {sc:'monte', ...JES('Filipe, onde vamos comprar pão para toda essa gente comer? (João 6:5)')},
  {sc:'monte', ...FIL('Mestre, nem com muito dinheiro daria para cada um comer um pedacinho!')},
  {card:1},
  {sc:'menino', ...AND('Aqui tem um menino com cinco pães e dois peixinhos. Mas o que é isso para tanta gente? (João 6:9)')},
  {sc:'menino', ...MEN('Pode ficar com o meu lanche, Jesus!')},
  {sc:'menino', ...JES('Mandem todo mundo sentar na grama. (João 6:10)')},
  {sc:'sentar', ...N('Havia muita grama verde naquele lugar. E todos se sentaram: eram uns cinco mil homens, fora as mulheres e as crianças.')},
  {card:2},
  {sc:'agradece', ...N('Jesus pegou os pães, olhou para o céu e agradeceu a Deus. (João 6:11)')},
  {sc:'reparte', ...N('Depois, Ele repartiu os pães e os peixes. Os discípulos entregavam... e a comida não acabava!')},
  {sc:'satisfeitos', ...N('Todos comeram, comeram... até ficarem satisfeitos.')},
  {card:3},
  {sc:'sobras', ...JES('Juntem os pedaços que sobraram, para que nada se perca. (João 6:12)')},
  {sc:'sobras', ...N('Eles juntaram as sobras e encheram doze cestos! Mais do que tinham no começo. (João 6:13)')},
  {summary:true, sc:'final', ...N('Hoje aprendemos: o pouquinho que damos a Jesus, nas mãos dele vira muito. E Deus cuida de nós.')},
];
//@@MOOD
const MOOD={ multidao:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], monte:[[57,60,64],[53,57,60],[55,59,62],[60,64,67]], menino:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]],
  sentar:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]], agradece:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]], reparte:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]],
  satisfeitos:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]], sobras:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]], final:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]],
  obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: O Lanche que Não Acaba (3 fases, cada uma de um jeito) =================
   Fase 1 · O lanche do menino: toque só nos pães e nos peixes (5 pães e 2 peixes) para a cestinha.
   Fase 2 · Todos comem: arraste o pão e solte em quem está com a mão levantada.
   Fase 3 · Doze cestos: passe o dedo nos pedacinhos para juntar; cada cesto cheio vai para a fila (12).
   Ninguém perde: errar só faz o item voltar para o lugar. */
let MODE='film';
const GS={};
const NPH=[
  { name:'Fase 1 · O lanche do menino', voice:['p1','Agora é a sua vez! Fase um: o lanche do menino. Toque só nos pães e nos peixes: cinco pães e dois peixinhos!'] },
  { name:'Fase 2 · Todos comem', voice:['p2','Fase dois: todos comem! Arraste o pão e solte em quem está com a mão levantada.'] },
  { name:'Fase 3 · Doze cestos', voice:['p3','Fase três: doze cestos! Passe o dedo nos pedacinhos para juntar as sobras.'] },
];
function gameReset(){ GS.badBy=[0,0,0]; loadPhase(1); }
function loadPhase(n){ Object.assign(GS,{ phase:n, banner:2.8, finished:false, finT:0, ended:false, cool:GS.cool||0,
    itens:[], paes:0, peixes:0, voando:[],
    grupos:[], fome:-1, pao:null, drag:false, dados:0, META:8, solto:null,
    migalhas:[], noCesto:0, cestos:0, POR:5, rastro:[] });
  camFor();
  if(n===1){ const tipos=['pao','pao','pao','pao','pao','peixe','peixe','maca','maca','maca','pedrinha','pedrinha','concha','concha']; tipos.sort(()=>Math.random()-.5);
    GS.itens=tipos.map((k,i)=>({k, x:-300+(i%7)*105+(Math.floor(i/7)%2)*40, y:-70+Math.floor(i/7)*95, ph:Math.random()*6, ok:false, wob:0})); }
  if(n===2){ GS.grupos=[[-.42,'povo1'],[-.26,'crianca'],[.24,'mulher'],[.4,'povo2']].map(([fx,id])=>({fx,id,comeu:0,feliz:0})); novaFome(); novoPao(); }
  if(n===3){ espalhaMigalhas(16); }
  $('gAn').textContent=NPH[n-1].name.split(' · ')[0]; hud(); gsay(NPH[n-1].voice[0],NPH[n-1].voice[1],true); }
function hud(){ const n=GS.phase; $('gGol').textContent = n===1? ('🥖 '+GS.paes+'/5 · 🐟 '+GS.peixes+'/2') : (n===2? ('🙋 '+GS.dados+' / '+GS.META) : ('🧺 '+GS.cestos+' / 12')); }
function camFor(){ const narrow=W<700; cam.x=0; cam.y=-130; cam.z=narrow? .85 : 1.15; }
function novaFome(){ const g=GS; const op=g.grupos.map((_,i)=>i).filter(i=>i!==g.fome); g.fome=op[Math.floor(Math.random()*op.length)]; }
function novoPao(){ GS.pao={x:W*.5, y:H*.84, vx:0, vy:0, voa:false}; }
function espalhaMigalhas(n){ for(let i=0;i<n;i++) GS.migalhas.push({x:W*(.08+Math.random()*.66), y:H*(.5+Math.random()*.34), r:Math.random()*6, ok:false, t:0}); }
let gsubT=0;
function gsay(key,text,force,who){ if(!force && GS.cool>0) return; GS.cool=5; speak({rec:key,text}); whoEl.textContent=who||'Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){ MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false;
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume(); gameReset(); }
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toWorld(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const lx=(e.clientX*dpr-offX)/K, ly=e.clientY*dpr/K; const z=ZOOM*cam.z*PZ(); return { x:(lx-W/2)/z+cam.x, y:(ly-H*CY)/z+cam.y, sx:lx, sy:ly }; }
function toScreen(x,y){ const z=ZOOM*cam.z*PZ(); return [ (x-cam.x)*z+W/2, (y-cam.y)*z+H*CY ]; }
function cestoTela(){ return [W*.86, H*.66]; }
function gameTap(e){ if(AC) AC.resume(); const w=toWorld(e); const g=GS; if(g.banner>1.6||g.finished) return;
  if(g.phase===1){ let best=null, bd=1e9; for(const it of g.itens){ if(it.ok) continue; const d=Math.hypot(it.x-w.x,(it.y-12)-w.y); if(d<bd){ bd=d; best=it; } }
    if(!best || bd>60) return;
    const bom = (best.k==='pao' && g.paes<5) || (best.k==='peixe' && g.peixes<2);
    if(bom){ best.ok=true; if(best.k==='pao') g.paes++; else g.peixes++; const [sx,sy]=toScreen(best.x,best.y); g.voando.push({k:best.k,x:sx,y:sy,t:0}); hud(); pluck(76+(g.paes+g.peixes)*2,.07);
      if(g.paes>=5 && g.peixes>=2) finishPhase(); else if(g.paes+g.peixes===4) gsay('o4','Muito bem!'); }
    else { best.wob=.5; g.badBy[0]+=.34; pluck(52,.07); gsay('p5','Isso não é pão nem peixe!'); } }
  else if(g.phase===2){ const p=g.pao; if(p && !p.voa && Math.hypot(w.sx-p.x,w.sy-p.y)<70){ g.drag=true; } }
  else if(g.phase===3){ g.drag=true; g.rastro=[[w.sx,w.sy,0]]; varre(w.sx,w.sy); } }
function varre(x,y){ const g=GS; for(const m of g.migalhas){ if(!m.ok && Math.hypot(m.x-x,m.y-y)<48){ m.ok=true; m.t=0; m.x0=m.x; m.y0=m.y; pluck(84+(g.noCesto%4)*2,.035); } } }
cv.addEventListener('pointermove',e=>{ if(MODE!=='game'||!GS.drag) return; const g=GS, w=toWorld(e);
  if(g.phase===2 && g.pao && !g.pao.voa){ g.pao.x=w.sx; g.pao.y=w.sy; }
  if(g.phase===3){ g.rastro.push([w.sx,w.sy,0]); varre(w.sx,w.sy); } });
addEventListener('pointerup',()=>{ if(MODE!=='game') return; const g=GS; if(!g.drag) return; g.drag=false;
  if(g.phase===2 && g.pao && !g.pao.voa){ let alvo=-1, bd=1e9; g.grupos.forEach((gr,i)=>{ const [sx,sy]=toScreen(gr.fx*W/(ZOOM*cam.z*PZ()),-60); const d=Math.hypot(g.pao.x-sx,g.pao.y-sy); if(d<bd){ bd=d; alvo=i; } });
    if(alvo===g.fome && bd<150){ const gr=g.grupos[alvo]; gr.comeu++; gr.feliz=1.6; g.dados++; hud(); pluck(79,.07); pluck(86,.05,.08); g.pao.voa=true;
      if(g.dados>=g.META) finishPhase(); else { if(g.dados===4) gsay('o4','Muito bem!'); setTimeout(()=>{ if(MODE==='game' && GS.phase===2){ novaFome(); novoPao(); } },500); } }
    else if(bd<150){ g.badBy[1]+=.34; pluck(55,.06); gsay('p6','Esse já comeu! Dê para quem está com a mão levantada.'); novoPao(); }
    else novoPao(); } });
function finishPhase(){ const g=GS; g.finished=true; g.finT=0; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12));
  if(g.phase<3) gsay('o4','Muito bem!',true); else gsay('p7','Parabéns! Doze cestos cheios! O lanche do menino virou um banquete!',true); }
function gameUpdate(dt){ const g=GS; if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); } if(g.banner>0) g.banner-=dt;
  if(g.finished){ g.finT+=dt; if(g.phase<3 && g.finT>3){ loadPhase(g.phase+1); return; }
    if(g.phase===3 && g.finT>4.5 && !g.ended){ g.ended=true; const per=g.badBy.map(b=>b===0?3:(b<=2?2:1)); const st=Math.round(per.reduce((a,b)=>a+b,0)/3);
      $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent=NPH.map((P2,i)=>P2.name.split(' · ')[0]+': '+'⭐'.repeat(per[i])).join('  ·  '); $('gwin').hidden=false; try{ const k='bp_paes_estrelas'; localStorage.setItem(k, Math.max(+(localStorage.getItem(k)||0), st)); }catch(e){} if(window.bpAddCoins) setTimeout(()=>bpAddCoins(2*Math.round(st),'pelo jogo!'),900); } }
  for(const it of g.itens) if(it.wob>0) it.wob-=dt;
  for(const v of g.voando) v.t+=dt; g.voando=g.voando.filter(v=>v.t<.7);
  if(g.phase===2){ for(const gr of g.grupos) if(gr.feliz>0) gr.feliz-=dt; if(g.pao && g.pao.voa){ g.pao.y-=500*dt; g.pao.s=(g.pao.s||1)-dt*1.5; } }
  if(g.phase===3){ for(const r of g.rastro) r[2]+=dt; g.rastro=g.rastro.filter(r=>r[2]<.35);
    const [cx,cy]=cestoTela();
    for(const m of g.migalhas){ if(m.ok){ m.t+=dt; m.x=lerp(m.x0,cx,Math.min(1,m.t/.45)); m.y=lerp(m.y0,cy-40,Math.min(1,m.t/.45))-Math.sin(Math.min(1,m.t/.45)*Math.PI)*60; if(m.t>=.45 && !m.dentro){ m.dentro=true; g.noCesto++; if(g.noCesto>=g.POR && !g.finished){ g.noCesto=0; g.cestos++; hud(); pluck(79,.07); pluck(84,.06,.08); if(g.cestos>=12) finishPhase(); else if(g.cestos===6) gsay('o4','Muito bem!'); } } } }
    g.migalhas=g.migalhas.filter(m=>!m.dentro);
    if(!g.finished && g.migalhas.filter(m=>!m.ok).length<6) espalhaMigalhas(10); }
}
function gameDraw(){ const g=GS; LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.65;
  if(g.phase===1){ diaMonte(1);
    layer(1,()=>{ ground('#b8d07a','#8ab060'); person('menino',-430,0,{pose:'open',dir:1}); cesto(420,30,1.1,(g.paes>0)+(g.peixes>0));
      for(const it of g.itens){ if(it.ok) continue; const sh=it.wob>0? Math.sin(G*50)*6 : 0, x=it.x+sh, y=it.y+Math.sin(G*2+it.ph)*3; glow(x,y-10,40,'#fff7d0',.18); ({pao,peixe,maca,pedrinha,concha})[it.k](x,y,1.15); } });
    for(const v of g.voando){ const [cx,cy]=toScreen(420,-10), k=v.t/.7; ctx.save(); ctx.globalAlpha=1-k*.4; (v.k==='pao'?pao:peixe)(lerp(v.x,cx,k),lerp(v.y,cy,k)-Math.sin(k*Math.PI)*80,.9); ctx.restore(); } }
  else if(g.phase===2){ diaMonte(.85); const z=ZOOM*cam.z*PZ();
    layer(1,()=>{ ground('#a8d070','#70a840'); person('jesus',0,60,{pose:'open',dir:1}); cesto(60,80,.9,2);
      g.grupos.forEach((gr,i)=>{ const x=gr.fx*W/z; const fome=i===g.fome; person(gr.id,x,-40,{pose: fome? 'armsup' : (gr.feliz>0? 'armsup' : 'sit'),dir:x<0?1:-1,ph:i});
        if(fome){ glow(x,-120,70,'#fff2c0',.45+.15*Math.sin(G*5)); } if(gr.comeu) pao(x+26,-30,.35); }); });
    g.grupos.forEach((gr,i)=>{ if(i!==g.fome) return; const [sx,sy]=toScreen(gr.fx*W/z,-40); ctx.save(); ctx.font='800 34px sans-serif'; ctx.textAlign='center'; ctx.fillText('🙋',sx+34,sy-150+Math.sin(G*5)*4); ctx.restore(); });
    const p=g.pao; if(p){ if(!g.drag && !p.voa) glow(p.x,p.y,70,'#fff7d0',.3+.15*Math.sin(G*5)); pao(p.x,p.y,1.2*Math.max(.1,p.s||1)); } }
  else { diaMonte(.55);
    layer(1,()=>{ ground('#98c060','#609030'); person('filipe',-430,-30,{pose:'kneel',dir:1}); });
    for(const m of g.migalhas) farelo(m.x,m.y,m.r);
    if(g.rastro.length>1){ ctx.save(); ctx.strokeStyle='rgba(255,247,200,.55)'; ctx.lineWidth=40; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); g.rastro.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke(); ctx.restore(); }
    const [cx,cy]=cestoTela(); cesto(cx,cy,1.3,0); ctx.save(); ctx.fillStyle='#e0a858'; for(let i=0;i<g.noCesto;i++) ell(cx-30+i*15,cy-52,9,6,'#e0a858'); ctx.restore();
    for(let i=0;i<12;i++){ const x=W*.06+i*Math.min(52,W*.05), y=H*.36; ctx.save(); ctx.globalAlpha=i<g.cestos?1:.25; cesto(x,y,.42,i<g.cestos?1:0); ctx.restore(); } }
  if(g.banner<=0 && !g.finished){ const msg = g.phase===1? '👆 Toque só nos pães e nos peixes' : (g.phase===2? (g.drag? '' : '👆 Arraste o pão para quem levantou a mão') : (g.drag? '' : '👆 Passe o dedo nos pedacinhos')); if(msg){ ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 22px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(30,40,60,.55)'; ctx.lineWidth=5; ctx.strokeText(msg,W/2,H*.95); ctx.fillText(msg,W/2,H*.95); ctx.restore(); } }
  if(g.banner>0){ const a=Math.min(1,g.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw2=Math.min(460,W-40); ctx.fillStyle='rgba(255,253,246,.97)'; rr(W/2-bw2/2,H*.24-36,bw2,64,32); ctx.fill();
    ctx.font='800 25px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#2B3A55'; ctx.fillText(NPH[g.phase-1].name,W/2,H*.24+8); ctx.restore(); }
}
function txt2(t,x,y,size,c){ ctx.save(); ctx.font='800 '+size+'px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle=c; ctx.fillText(t,x,y); ctx.restore(); }
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_paes_visto')) $('coverGame').hidden=false; }catch(e){}
try{ if(location.hash==='#jogo') $('coverGame').hidden=false; }catch(e){}
