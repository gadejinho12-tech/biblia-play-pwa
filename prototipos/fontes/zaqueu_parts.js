//@@CAST
  jesus:{ robe:['#f6f0e0','#d2c6a6'], sash:'#c0483a', skin:['#e3ad79','#c48a5a'], hair:'#6b4423', beard:true, beardC:'#6b4423', longhair:true, s:1 },
  zaqueu:{ robe:['#a86ac8','#6a3a8a'], sash:'#f2c24a', skin:['#e2ab7c','#c48a5a'], hair:'#3a2a1a', beard:true, beardC:'#3a2a1a', cap:'#f2c24a', s:.72 },
  filipe:{ robe:['#8fa86a','#5f7a42'], sash:'#6b4423', skin:['#e8b48a','#c98f62'], hair:'#3a2a1a', beard:true, beardC:'#3a2a1a', s:.98 },
  povo1:{ robe:['#c9b48a','#9a845a'], sash:'#6b4423', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.9 },
  povo2:{ robe:['#7fc4c0','#3f8a86'], sash:'#6b4423', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', s:.86 },
  mulher:{ robe:['#d890b0','#a85a80'], sash:'#ffffff', skin:['#e8b48a','#c98f62'], hair:'#3a2a1a', scarf:'#f4e8d0', s:.88 },
  alto:{ robe:['#b0745a','#7a4a34'], sash:'#4a6a8a', skin:['#d8a07a','#b07850'], hair:'#241b14', beard:true, beardC:'#241b14', s:1.08 },
  crianca:{ robe:['#ffd27a','#d9a441'], sash:'#c0503a', skin:['#f6cfa6','#e2ab7c'], hair:'#6b4423', s:.62 },
  crianca2:{ robe:['#ff9db0','#d9607a'], sash:'#ffffff', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.58 },
//@@SCENES
/* ===== Zaqueu: cenário ===== */
function arvore(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); softShadow(0,4,120,.25); ctx.fillStyle=vgrad(-300,0,[[0,'#8a6a44'],[1,'#5a3e24']]); ctx.beginPath(); ctx.moveTo(-34,0); ctx.quadraticCurveTo(-20,-150,-30,-300); ctx.lineTo(30,-300); ctx.quadraticCurveTo(20,-150,34,0); ctx.fill();
  for(const [bx,by] of [[-1,-120],[1,-170],[-1,-220],[1,-260]]){ ctx.strokeStyle='#6a4a2a'; ctx.lineWidth=14; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,by); ctx.lineTo(bx*110,by-40); ctx.stroke(); }
  ctx.restore(); }
function copa(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); for(const [cx,cy,r] of [[-130,-340,90],[0,-390,110],[130,-340,90],[-70,-300,70],[80,-290,70]]) shade(cx,cy,r,r*.8,'#6aa84a','#3f7a30'); for(let i=0;i<8;i++) ell(-120+i*34,-330+(i%3)*24,7,7,'#e0c060'); ctx.restore(); }
function moeda(x,y,s){ ell(x,y,16*s,16*s,'#d8a018'); ell(x,y,12*s,12*s,'#ffd75e'); ell(x-4*s,y-4*s,4*s,3*s,'rgba(255,255,255,.5)'); }
function bau(x,y,s,n){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#8a5a30'; rr(-50,-54,100,54,8); ctx.fill(); ctx.fillStyle='#6a4426'; rr(-50,-62,100,14,6); ctx.fill(); ctx.fillStyle='#e8b020'; rr(-8,-44,16,14,3); ctx.fill(); for(let i=0;i<(n||0);i++) moeda(-30+(i%4)*20,-66-Math.floor(i/4)*10,1); ctx.restore(); }
function mesa(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#a8784a'; rr(-90,-60,180,14,5); ctx.fill(); ctx.fillStyle='#7a5432'; rr(-80,-48,12,48,3); ctx.fill(); rr(68,-48,12,48,3); ctx.fill(); ctx.restore(); }
function jerico(dayK){ layer(0,()=>{ meadowSky(dayK); sunDisk2(380,-250); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); });
  layer(.5,()=>{ ridge(0,50,.008,4,'#d8c898','#e8d8a8',3000); townBelem(0); for(let i=0;i<5;i++) tree(-1000+i*500,10,.7,'#7a9a58','#4a6a38'); }); }
function chaoRua(){ ground('#d8c08a','#a8905a'); }
SC.abertura = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; const k=ss(0,6.2,t); cam.x=lerp(0,-200,k); cam.y=lerp(-420,-160,k); cam.z=lerp(.45,1.0,ease(k)); jerico(1);
  layer(.15,()=>{ for(let i=0;i<4;i++){ const bx=((i*260+G*40)%1600)-800, by=-380+(i%2)*30+Math.sin(G*3+i)*6; ctx.strokeStyle='#4a5a6a'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(bx-10,by); ctx.quadraticCurveTo(bx-5,by-6+Math.sin(G*9+i)*4,bx,by); ctx.quadraticCurveTo(bx+5,by-6+Math.sin(G*9+i)*4,bx+10,by); ctx.stroke(); } });
  layer(1,()=>{ chaoRua(); mesa(0,0,1); for(let i=0;i<9;i++) moeda(-60+(i%5)*26,-66-Math.floor(i/5)*8,1); person('zaqueu',-130,2,{pose:'hold',dir:1}); person('povo1',220,4,{pose:'stand',dir:-1}); person('mulher',300,4,{pose:'stand',dir:-1,ph:2}); });
  const a=clamp(t/1.2,0,1)*clamp((6.4-t)/1,0,1); if(a>0){ ctx.save(); ctx.setTransform(K,0,0,K,(cv.width-W*K)/2,0); ctx.globalAlpha=a; ctx.font='800 52px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.lineWidth=8; ctx.strokeStyle='rgba(43,58,85,.55)'; ctx.fillStyle='#fffdf6'; ctx.strokeText('Jericó',W/2,H*.3); ctx.fillText('Jericó',W/2,H*.3); ctx.restore(); }
};
SC.jerico = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-200,-160,1.0],[0,-150,1.3],t/9); jerico(1);
  layer(1,()=>{ chaoRua(); mesa(0,0,1); for(let i=0;i<9;i++) moeda(-60+(i%5)*26,-66-Math.floor(i/5)*8,1); person('zaqueu',-130,2,{pose:'hold',dir:1}); person('povo1',220,4,{pose:'stand',dir:-1}); person('mulher',300,4,{pose:'stand',dir:-1,ph:2}); });
};
SC.cobra = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([0,-150,1.3],[60,-150,1.5],t/8); jerico(1);
  layer(1,()=>{ chaoRua(); mesa(0,0,1); const n=6+Math.floor(t*2)%6; for(let i=0;i<n;i++) moeda(-60+(i%5)*26,-66-Math.floor(i/5)*8,1); person('zaqueu',-130,2,{pose:TALK==='zaqueu'?'open':'point',dir:1}); person('povo2',150,4,{pose:'open',dir:-1}); person('povo1',250,4,{pose:'stand',dir:-1,ph:1}); });
};
SC.rua = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-120,-160,1.15],[60,-160,1.3],t/9); jerico(1);
  layer(1,()=>{ chaoRua(); [['alto',-200],['povo1',-130],['mulher',-60],['alto',10],['povo2',80],['povo1',150],['alto',220]].forEach(([id,x],i)=>person(id,x,6,{pose:'stand',dir:1,ph:i}));
    const pulo=Math.abs(Math.sin(G*5))*26; person('zaqueu',-280+((t*30)%120),-pulo,{pose:TALK==='zaqueu'?'open':'armsup',dir:1}); });
};
SC.sobe = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; const k=ss(0,6,t); setCam([0,-150,1.1],[0,-260,1.1],k); jerico(1);
  layer(1,()=>{ chaoRua(); arvore(0,0,1); person('zaqueu',-6,lerp(0,-170,k),{pose:'armsup',dir:1}); copa(0,0,1); });
};
SC.olha = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.7; setCam([160,-170,1.0],[60,-210,1.05],t/8); jerico(1);
  layer(1,()=>{ chaoRua(); arvore(0,0,1); person('zaqueu',-6,-170,{pose:TALK==='zaqueu'?'open':'stand',dir:1}); copa(0,0,1);
    const jx=lerp(420,140,ss(0,4,t)); person('jesus',jx,0,{pose:t>4?'lookup':'walk',dir:-1,up:t>4}); person('filipe',jx+110,4,{pose:'walk',dir:-1,ph:1}); [['povo1',jx+200],['mulher',jx+270],['crianca',jx+330]].forEach(([id,x],i)=>person(id,x,6,{pose:'walk',dir:-1,ph:i})); });
};
SC.chama = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.8; setCam([80,-190,1.2],[40,-200,1.35],t/7); jerico(1);
  layer(1,()=>{ chaoRua(); arvore(0,0,1); const desce=ss(4,6,t); person('zaqueu',lerp(-6,60,desce),lerp(-170,0,desce),{pose:'armsup',dir:1}); copa(0,0,1); person('jesus',140,0,{pose:'lookup',dir:-1,up:true}); });
};
SC.desce = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.7; setCam([0,-160,1.2],[200,-160,1.2],t/8); jerico(1);
  layer(1,()=>{ chaoRua(); const q=ss(0,7,t); person('zaqueu',lerp(-60,300,q),0,{pose:'walk',dir:1}); person('jesus',lerp(-160,200,q),0,{pose:'walk',dir:1,ph:1}); });
};
SC.murmura = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([0,-160,1.3],[-40,-160,1.45],t/8); jerico(.9);
  layer(1,()=>{ chaoRua(); person('povo1',-160,4,{pose:'point',dir:1}); person('mulher',-60,4,{pose:'open',dir:1}); person('povo2',40,4,{pose:'point',dir:1,ph:2}); person('alto',140,4,{pose:'stand',dir:-1}); });
};
SC.casa = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd890'; LIGHT.rimA=.8; setCam([0,-150,1.4],[0,-150,1.6],t/8);
  layer(0,()=>{ ctx.fillStyle=vgrad(-H,H,[[0,'#e8d4ac'],[1,'#c8ac80']]); ctx.fillRect(-W*2,-H*2,W*4,H*4); ctx.fillStyle='#a8845a'; ctx.fillRect(-W*2,-2,W*4,H*4); });
  layer(1,()=>{ glow(-200,-220,180,'#ffd27a',.45); ctx.fillStyle='#5a3a22'; rr(-208,-240,16,22,4); ctx.fill(); ell(-200,-244,5,7,'#ffb030');
    mesa(0,0,1.1); ell(-30,-74,20,8,'#e0a858'); ell(30,-74,16,10,'#7a3a8a'); person('jesus',-120,0,{pose:'open',dir:1}); person('zaqueu',120,2,{pose:'armsup',dir:-1}); });
};
SC.coracao = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.8; setCam([0,-160,1.2],[60,-160,1.3],t/8); jerico(1);
  layer(1,()=>{ chaoRua(); bau(-200,0,1,8); person('zaqueu',-120,2,{pose:'open',dir:1});
    [['povo1',80],['mulher',170],['crianca',240],['povo2',320]].forEach(([id,x],i)=>{ person(id,x,4,{pose:'armsup',dir:-1,ph:i}); moeda(x-10,14,.7); });
    for(let i=0;i<5;i++){ const k=((t*.6+i*.2)%1); moeda(lerp(-120,80+i*60,k),-90-Math.sin(k*Math.PI)*80,.8); } person('jesus',-320,0,{pose:'stand',dir:1}); });
};
SC.final = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8; setCam([0,-160,1.3],[0,-170,1.5],t/9); jerico(.7);
  layer(1,()=>{ chaoRua(); godRays(0,-700,700,.18,G,'#fff0c0'); person('jesus',0,0,{pose:TALK==='jesus'?'open':'stand',dir:1}); person('zaqueu',120,2,{pose:'armsup',dir:-1}); person('crianca',-120,2,{pose:'armsup',dir:1}); person('crianca2',-190,2,{pose:'stand',dir:1,ph:2}); });
};
//@@ROTEIRO
const CH=[ 'Um homem baixinho', 'Lá em cima da árvore', 'Jesus na casa de Zaqueu', 'Um coração novo' ];
const N=(t)=>({who:'Narrador',text:t}), JES=t=>({who:'Jesus',text:t,talk:'jesus'}), ZAQ=t=>({who:'Zaqueu',text:t,talk:'zaqueu'}), POV=t=>({who:'Povo',text:t,talk:'povo1'});
const SCRIPT=[
  {intro:true, sc:'abertura', who:'', text:'', dur:6.6},
  {card:0},
  {sc:'jerico', ...N('Na cidade de Jericó, morava um homem chamado Zaqueu. Ele era chefe dos cobradores de impostos, e era muito rico. (Lucas 19:1-2)')},
  {sc:'cobra', ...N('Mas Zaqueu não era amigo de ninguém, porque cobrava mais do que devia.')},
  {sc:'rua', ...N('Um dia, Jesus ia passar por Jericó. Zaqueu queria muito ver quem era Jesus... mas ele era baixinho, e havia gente demais! (Lucas 19:3)')},
  {sc:'rua', ...ZAQ('Ai, não consigo ver nada! Só vejo as costas das pessoas!')},
  {card:1},
  {sc:'sobe', ...N('Então Zaqueu correu na frente, e subiu numa árvore bem alta, o sicômoro. (Lucas 19:4)')},
  {sc:'olha', ...ZAQ('Daqui de cima eu vou ver Jesus passar!')},
  {sc:'olha', ...N('Quando Jesus chegou bem ali, parou, olhou para cima... e chamou Zaqueu pelo nome!')},
  {sc:'chama', ...JES('Zaqueu, desça depressa! Hoje eu preciso ficar na sua casa. (Lucas 19:5)')},
  {card:2},
  {sc:'desce', ...N('Zaqueu desceu correndo, e recebeu Jesus com muita alegria. (Lucas 19:6)')},
  {sc:'murmura', ...POV('Olha só! Jesus foi para a casa daquele homem que faz coisas erradas! (Lucas 19:7)')},
  {sc:'casa', ...N('Mas na casa de Zaqueu, com Jesus por perto, o coração dele começou a mudar.')},
  {card:3},
  {sc:'coracao', ...ZAQ('Senhor, vou dar metade do que eu tenho aos pobres. E se cobrei demais de alguém, vou devolver quatro vezes mais! (Lucas 19:8)')},
  {sc:'final', ...JES('Hoje a salvação entrou nesta casa! Eu vim buscar e salvar quem estava perdido. (Lucas 19:9-10)')},
  {summary:true, sc:'final', ...N('Hoje aprendemos: Jesus conhece você pelo nome, e o amor dele muda o nosso coração.')},
];
//@@MOOD
const MOOD={ abertura:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[72,76,79,84]], jerico:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], cobra:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]], rua:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]],
  sobe:[[62,66,69],[67,71,74],[64,67,71],[62,66,69]], olha:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]], chama:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]],
  desce:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], murmura:[[57,60,64],[52,55,59],[53,57,60],[55,59,62]], casa:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]],
  coracao:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], final:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]], obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: Suba, Zaqueu! (3 fases, cada uma de um jeito) =================
   Fase 1 · Suba na árvore: toque alternando o botão da esquerda e o da direita para Zaqueu subir.
   Fase 2 · A casa do Zaqueu: as coisas acendem numa ordem; repita a ordem (2, depois 3, depois 4).
   Fase 3 · Devolver com alegria: arraste moedas do baú até as pessoas; cada uma recebe 4.
   Ninguém perde: errar só faz repetir. */
let MODE='film';
const GS={};
const NPH=[
  { name:'Fase 1 · Suba na árvore', voice:['z1','Agora é a sua vez! Fase um: ajude Zaqueu a subir na árvore. Toque na esquerda, depois na direita, sem parar!'] },
  { name:'Fase 2 · A casa do Zaqueu', voice:['z2','Fase dois: vamos arrumar a casa para Jesus! Olhe as coisas que acendem, e toque nelas na mesma ordem.'] },
  { name:'Fase 3 · Devolver com alegria', voice:['z3','Fase três: Zaqueu vai devolver! Arraste as moedas do baú, e dê quatro moedas para cada pessoa.'] },
];
const COISAS=[['🍞','pão',.18,.5],['🏺','jarro',.39,.46],['🍇','uvas',.61,.5],['🪔','lamparina',.82,.46],['🪑','banco',.3,.78],['🧺','cesto',.7,.78]];
const NOTAS=[72,74,76,79,81,84];
function gameReset(){ GS.badBy=[0,0,0]; loadPhase(1); }
function loadPhase(n){ Object.assign(GS,{ phase:n, banner:2.8, finished:false, finT:0, ended:false, cool:GS.cool||0,
    alt:0, lado:0, wob:0, aperta:[0,0],
    seq:[], rodada:0, mostra:-1, mostraT:0, entrada:0, luz:-1, luzT:0, espera:0,
    pessoas:[], moeda:null, drag:false });
  camFor();
  if(n===2){ GS.rodada=0; novaRodada(); }
  if(n===3){ GS.pessoas=[[-.24,'povo1'],[.06,'mulher'],[.34,'povo2']].map(([fx,id])=>({fx,id,n:0,feliz:0})); novaMoeda(); }
  $('gAn').textContent=NPH[n-1].name.split(' · ')[0]; hud(); gsay(NPH[n-1].voice[0],NPH[n-1].voice[1],true); }
function hud(){ const n=GS.phase; $('gGol').textContent = n===1? ('🌳 '+Math.round(GS.alt*100)+'%') : (n===2? ('🏠 '+GS.rodada+' / 3') : ('🪙 '+GS.pessoas.filter(p=>p.n>=4).length+' / '+GS.pessoas.length)); }
function camFor(){ const narrow=W<700; cam.x=0; cam.y=-150; cam.z=narrow? .8 : 1; }
function novaRodada(){ const g=GS; const tam=2+g.rodada; g.seq=[]; while(g.seq.length<tam){ const i=Math.floor(Math.random()*COISAS.length); if(g.seq[g.seq.length-1]!==i) g.seq.push(i); } g.mostra=0; g.mostraT=-.9; g.entrada=0; g.idx=-1; }
function novaMoeda(){ GS.moeda={x:W*.14, y:H*.62, volta:false}; }
let gsubT=0;
function gsay(key,text,force,who){ if(!force && GS.cool>0) return; GS.cool=5; speak({rec:key,text}); whoEl.textContent=who||'Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){ MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false;
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume(); gameReset(); }
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toWorld(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const lx=(e.clientX*dpr-offX)/K, ly=e.clientY*dpr/K; const z=ZOOM*cam.z*PZ(); return { x:(lx-W/2)/z+cam.x, y:(ly-H*CY)/z+cam.y, sx:lx, sy:ly }; }
function toScreen(x,y){ const z=ZOOM*cam.z*PZ(); return [ (x-cam.x)*z+W/2, (y-cam.y)*z+H*CY ]; }
function botoes(){ return [[W*.1,H*.74],[W*.9,H*.74]]; }
function gameTap(e){ if(AC) AC.resume(); const w=toWorld(e); const g=GS; if(g.banner>1.6||g.finished) return;
  if(g.phase===1){ const B=botoes(); const lado=w.sx<W/2? 0 : 1; if(Math.hypot(w.sx-B[lado][0],w.sy-B[lado][1])>Math.min(W,H)*.22) return; g.aperta[lado]=.18;
    if(lado===g.lado){ g.alt=Math.min(1,g.alt+1/16); g.lado=1-g.lado; pluck(64+Math.round(g.alt*20),.05); hud(); if(g.alt>=1) finishPhase(); else if(Math.abs(g.alt-.5)<.03) gsay('o4','Muito bem!'); }
    else { g.wob=.35; g.badBy[0]+=.15; pluck(50,.05); } }
  else if(g.phase===2){ if(g.mostra>=0) return; let best=-1, bd=1e9; COISAS.forEach((c,i)=>{ const d=Math.hypot(w.sx-c[2]*W,w.sy-c[3]*H); if(d<bd){ bd=d; best=i; } }); if(bd>Math.min(W,H)*.13) return;
    g.luz=best; g.luzT=.35; pluck(NOTAS[best],.08);
    if(best===g.seq[g.entrada]){ g.entrada++; if(g.entrada>=g.seq.length){ g.rodada++; hud(); if(g.rodada>=3) finishPhase(); else { gsay('o4','Muito bem!'); g.espera=1.4; } } }
    else { g.badBy[1]+=.5; pluck(50,.07); gsay('z5','Quase! Olhe de novo.',true); g.mostra=0; g.mostraT=-1.4; g.entrada=0; g.idx=-1; } }
  else if(g.phase===3){ const m=g.moeda; if(m && Math.hypot(w.sx-m.x,w.sy-m.y)<Math.min(W,H)*.12){ g.drag=true; } } }
cv.addEventListener('pointermove',e=>{ if(MODE!=='game'||!GS.drag) return; const w=toWorld(e); if(GS.phase===3 && GS.moeda){ GS.moeda.x=w.sx; GS.moeda.y=w.sy; } });
addEventListener('pointerup',()=>{ if(MODE!=='game') return; const g=GS; if(!g.drag) return; g.drag=false;
  if(g.phase===3 && g.moeda){ const z=ZOOM*cam.z*PZ(); let alvo=null, bd=1e9; for(const p of g.pessoas){ const [sx,sy]=toScreen(p.fx*W/z,-70); const d=Math.hypot(g.moeda.x-sx,g.moeda.y-sy); if(d<bd){ bd=d; alvo=p; } }
    if(alvo && bd<Math.min(W,H)*.2){ if(alvo.n<4){ alvo.n++; pluck(79+alvo.n*2,.07); if(alvo.n===4){ alvo.feliz=2; pluck(88,.06,.1); hud(); if(g.pessoas.every(p=>p.n>=4)){ g.moeda=null; finishPhase(); return; } else gsay('o4','Muito bem!'); } novaMoeda(); }
      else { g.badBy[2]+=.34; gsay('z6','Essa pessoa já recebeu as quatro moedas!'); novaMoeda(); } }
    else novaMoeda(); } });
function finishPhase(){ const g=GS; g.finished=true; g.finT=0; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12));
  if(g.phase===1) gsay('z4','Lá de cima, Zaqueu viu Jesus!',true); else if(g.phase<3) gsay('o4','Muito bem!',true); else gsay('z7','Parabéns! Zaqueu devolveu tudo com alegria. Jesus mudou o coração dele!',true); }
function gameUpdate(dt){ const g=GS; if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); } if(g.banner>0) g.banner-=dt; if(g.wob>0) g.wob-=dt; g.aperta=g.aperta.map(a=>Math.max(0,a-dt));
  if(g.finished){ g.finT+=dt; if(g.phase<3 && g.finT>3.2){ loadPhase(g.phase+1); return; }
    if(g.phase===3 && g.finT>4.5 && !g.ended){ g.ended=true; const per=g.badBy.map(b=>b===0?3:(b<=2?2:1)); const st=Math.round(per.reduce((a,b)=>a+b,0)/3);
      $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent=NPH.map((P2,i)=>P2.name.split(' · ')[0]+': '+'⭐'.repeat(per[i])).join('  ·  '); $('gwin').hidden=false; try{ const k='bp_zaqueu_estrelas'; localStorage.setItem(k, Math.max(+(localStorage.getItem(k)||0), st)); }catch(e){} if(window.bpAddCoins) setTimeout(()=>bpAddCoins(2*Math.round(st),'pelo jogo!'),900); } }
  if(g.phase===1){ const narrow=W<700; cam.x=0; cam.z=narrow? .8 : 1; cam.y=lerp(cam.y,-150-g.alt*150,.08); }
  if(g.phase===2){ if(g.luzT>0) g.luzT-=dt; if(g.espera>0){ g.espera-=dt; if(g.espera<=0 && !g.finished) novaRodada(); }
    if(g.mostra>=0 && g.banner<1.2){ g.mostraT+=dt; if(g.mostraT>=0){ const i=Math.floor(g.mostraT/.85); if(i>=g.seq.length){ g.mostra=-1; g.luz=-1; g.idx=-1; } else if(i!==g.idx){ g.idx=i; g.luz=g.seq[i]; g.luzT=.6; pluck(NOTAS[g.seq[i]],.08); } } } }
  if(g.phase===3) for(const p of g.pessoas) if(p.feliz>0) p.feliz-=dt;
}
function gameDraw(){ const g=GS; LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6;
  if(g.phase===1){ jerico(1);
    layer(1,()=>{ chaoRua(); arvore(0,0,1); const sh=g.wob>0? Math.sin(G*50)*5 : 0; person('zaqueu',-6+sh,-g.alt*230,{pose:'armsup',dir:1}); copa(0,0,1);
      for(let i=0;i<5;i++) person(['alto','povo1','mulher','alto','povo2'][i],-420+i*70,6,{pose:'stand',dir:1,ph:i});
      if(g.finished){ person('jesus',300,0,{pose:'lookup',dir:-1,up:true}); } });
    const B=botoes(); B.forEach(([x,y],i)=>{ const ativo=i===g.lado && !g.finished, r=Math.min(W,H)*.1*(1-g.aperta[i]*.8); glow(x,y,r*1.6,'#fff7d0',ativo?.5+.2*Math.sin(G*8):.12);
      ctx.save(); ctx.fillStyle=ativo?'#FFC93C':'#fffdf6'; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); ctx.lineWidth=5; ctx.strokeStyle='#E0A21B'; ctx.stroke();
      ctx.fillStyle='#2B3A55'; ctx.beginPath(); const d=i? 1 : -1; ctx.moveTo(x+d*r*.45,y); ctx.lineTo(x-d*r*.25,y-r*.4); ctx.lineTo(x-d*r*.25,y+r*.4); ctx.closePath(); ctx.fill(); ctx.restore(); });
    ctx.save(); const bx=W*.5-8, by=H*.2, bh=H*.42; ctx.fillStyle='rgba(255,253,246,.9)'; rr(bx-W*.36,by-10,16,bh+20,8); ctx.fill(); ctx.fillStyle='#62BD45'; rr(bx-W*.36+3,by+bh*(1-g.alt),10,bh*g.alt+4,5); ctx.fill(); ctx.restore(); }
  else if(g.phase===2){ ctx.fillStyle=vgrad(0,H,[[0,'#f4e4c4'],[1,'#d8c098']]); ctx.fillRect(0,0,W,H); ctx.fillStyle='#b8946a'; ctx.fillRect(0,H*.62,W,H*.38);
    glow(W*.08,H*.15,120,'#ffd27a',.25);
    COISAS.forEach(([e,nome,fx,fy],i)=>{ const x=fx*W, y=fy*H, ac=g.luz===i && g.luzT>0, r=Math.min(W,H)*.1*(ac?1.12:1); glow(x,y,r*1.7,'#fff2c0',ac?.75:.1);
      ctx.save(); ctx.fillStyle=ac?'#FFC93C':'#fffdf6'; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle=ac?'#E0A21B':'#e8dcc4'; ctx.stroke(); ctx.font=Math.round(r*1.05)+'px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(e,x,y+3); ctx.restore(); });
    ctx.save(); ctx.font='800 24px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#2B3A55'; ctx.fillText(g.mostra>=0? '👀 Olhe a ordem...' : ('👆 Sua vez: '+g.entrada+' / '+g.seq.length),W*.5,H*.96); ctx.restore();
    if(g.finished){ ctx.save(); ctx.translate(W*.5,H*.9); person('jesus',-60,0,{pose:'open',dir:1,s:.6}); person('zaqueu',40,0,{pose:'armsup',dir:-1,s:.6}); ctx.restore(); } }
  else { jerico(.85); const z=ZOOM*cam.z*PZ();
    layer(1,()=>{ chaoRua(); const [bx]=[-.36*W/z]; person('zaqueu',bx-40,2,{pose:'open',dir:1}); bau(bx+40,0,1,8);
      for(const p of g.pessoas){ const x=p.fx*W/z; person(p.id,x,4,{pose:p.n>=4? 'armsup' : 'stand',dir:-1}); for(let k=0;k<p.n;k++) moeda(x-24+k*16,14,.8); } });
    for(const p of g.pessoas){ const [sx,sy]=toScreen(p.fx*W/z,-190); ctx.save(); ctx.fillStyle=p.n>=4?'#62BD45':'#fff'; ctx.beginPath(); ctx.ellipse(sx+30,sy,34,26,0,0,7); ctx.fill(); ctx.font='800 26px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle=p.n>=4?'#fff':'#2B3A55'; ctx.fillText(p.n+'/4',sx+30,sy+9); ctx.restore(); }
    if(g.moeda){ if(!g.drag) glow(g.moeda.x,g.moeda.y,60,'#fff7d0',.3+.15*Math.sin(G*5)); moeda(g.moeda.x,g.moeda.y,1.5); } }
  if(g.banner<=0 && !g.finished){ const msg = g.phase===1? '👆 Toque no botão que brilha: esquerda, direita...' : (g.phase===2? '' : (g.drag? '' : '👆 Arraste a moeda até uma pessoa')); if(msg){ ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 22px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(30,40,60,.55)'; ctx.lineWidth=5; ctx.strokeText(msg,W/2,H*.95); ctx.fillText(msg,W/2,H*.95); ctx.restore(); } }
  if(g.banner>0){ const a=Math.min(1,g.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw2=Math.min(460,W-40); ctx.fillStyle='rgba(255,253,246,.97)'; rr(W/2-bw2/2,H*.24-36,bw2,64,32); ctx.fill();
    ctx.font='800 25px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#2B3A55'; ctx.fillText(NPH[g.phase-1].name,W/2,H*.24+8); ctx.restore(); }
}
function txt2(t,x,y,size,c){ ctx.save(); ctx.font='800 '+size+'px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle=c; ctx.fillText(t,x,y); ctx.restore(); }
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_zaqueu_visto')) $('coverGame').hidden=false; }catch(e){}
try{ if(location.hash==='#jogo') $('coverGame').hidden=false; }catch(e){}
