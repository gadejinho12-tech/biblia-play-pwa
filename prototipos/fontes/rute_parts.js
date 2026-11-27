//@@CAST
  rute:{ robe:['#e8896a','#b8573e'], sash:'#f2c24a', skin:['#e8b48a','#c98f62'], hair:'#3a2a1a', scarf:'#8fcfc9', s:.9 },
  noemi:{ robe:['#8f7cb4','#5c4a84'], sash:'#e8d8b0', skin:['#e2b08a','#c08c66'], hair:'#cfcac2', scarf:'#e4dcec', fringe:'#d6d2ca', s:.88 },
  boaz:{ robe:['#5486c6','#2c548e'], sash:'#e8b860', skin:['#d8a07a','#b07850'], hair:'#8a6440', beard:true, beardC:'#9a7450', cap:'#f0e2bf', s:1.04 },
  trab1:{ robe:['#c9a46a','#8a6a3a'], sash:'#6b4423', skin:['#c98f62','#a8714a'], hair:'#241b14', cap:'#a87848', beard:true, beardC:'#2a1e14', s:.98 },
  trab2:{ robe:['#8fa86a','#5f7a42'], sash:'#6b4423', skin:['#e8b48a','#c98f62'], hair:'#5a3a22', s:.9 },
  trab3:{ robe:['#d8b04a','#a07a2a'], sash:'#7a4a2a', skin:['#c98f62','#a8714a'], hair:'#241b14', scarf:'#b8805a', s:.86 },
//@@SCENES
/* ===== Rute e Boaz: cenário ===== */
// câmera: afasta só o necessário para caber hw unidades de cada lado (celular em pé)
const zc=(z,hw)=>Math.min(z,(W/2-16)/(ZOOM*PZ()*hw));
function cevada(x,y,s,ph,c,c2){ const sw=Math.sin(G*1.6+ph)*4*s; c=c||'#f0c64a'; c2=c2||'#d6a42e';
  ctx.strokeStyle='#c09a3a'; ctx.lineWidth=2.2*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+sw*.3,y-30*s,x+sw,y-52*s); ctx.stroke();
  const tx=x+sw, ty=y-52*s; ctx.strokeStyle='rgba(244,220,140,.75)'; ctx.lineWidth=1*s; ctx.beginPath(); for(let i=0;i<4;i++){ ctx.moveTo(tx+(i-1.5)*2*s,ty-6*s-i*4*s); ctx.lineTo(tx+(i-1.5)*5*s+sw*.4,ty-22*s-i*4*s); } ctx.stroke();
  for(let i=0;i<5;i++){ const gy=ty-i*4.2*s; ell(tx-2.4*s,gy,2.8*s,4*s,c,-.35); ell(tx+2.4*s,gy-2*s,2.8*s,4*s,c2,.35); } }
// fileira de cevada: só desenha o pedaço que aparece na tela
function fileira(y,s,step,c,c2){ const hw=(W/2)/(ZOOM*cam.z*PZ())+60, a=Math.floor((cam.x-hw)/step)*step; for(let x=a;x<cam.x+hw;x+=step) cevada(x+((x*7919)%11),y+((x*31)%9),s*(.9+(Math.abs(x*13)%5)*.05),x*.07,c,c2); }
function faixaCampo(y,h,c1,c2,seed){ ctx.fillStyle=vgrad(y-h,y+60,[[0,c1],[1,c2]]); ctx.beginPath(); ctx.moveTo(-3000,y+500); for(let x=-3000;x<=3000;x+=40) ctx.lineTo(x,y-h+Math.sin(x*.01+seed)*6+Math.sin(x*.037+seed*2)*3); ctx.lineTo(3000,y+500); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(255,238,176,.4)'; ctx.lineWidth=2; ctx.beginPath(); for(let x=-1800;x<1800;x+=13){ const yy=y-h+12+Math.abs((x*13)%30); const sw=Math.sin(G*1.4+x*.02)*3; ctx.moveTo(x,yy+12); ctx.lineTo(x+sw,yy); } ctx.stroke(); }
function chaoCampo(){ ground('#e4c86c','#b8944a'); }
function chaoFlor(){ ground('#b8d07a','#8ab060'); for(let i=0;i<40;i++){ const x=-1000+((i*173)%2000), y=8+((i*37)%60); ell(x,y,4,4,['#ffffff','#ffd0e0','#ffe680'][i%3]); ell(x,y,1.6,1.6,'#e8a030'); } }
function estrada(){ ctx.fillStyle='rgba(246,228,182,.75)'; ctx.beginPath(); ctx.moveTo(-3000,14); ctx.quadraticCurveTo(0,-8,3000,14); ctx.lineTo(3000,46); ctx.quadraticCurveTo(0,26,-3000,46); ctx.closePath(); ctx.fill(); }
function feixe(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); softShadow(0,2,30,.25); for(let i=-4;i<=4;i++){ ctx.strokeStyle=i%2?'#d8a83a':'#e8bf52'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(i*3,0); ctx.quadraticCurveTo(i*2,-30,i*7,-64); ctx.stroke(); ell(i*7,-70,4.5,10,'#f2c94c',i*.12); } ctx.fillStyle='#8a5a2a'; rr(-15,-36,30,8,3); ctx.fill(); ctx.restore(); }
function jarro(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); softShadow(0,2,26,.28);
  ctx.fillStyle=vgrad(-64,0,[[0,'#de9260'],[1,'#a2552e']]); ctx.beginPath(); ctx.moveTo(-10,-58); ctx.quadraticCurveTo(-32,-46,-27,-22); ctx.quadraticCurveTo(-22,0,0,0); ctx.quadraticCurveTo(22,0,27,-22); ctx.quadraticCurveTo(32,-46,10,-58); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#8a4422'; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(-26,-32); ctx.quadraticCurveTo(0,-26,26,-32); ctx.stroke();
  ctx.fillStyle='#b8643a'; rr(-14,-68,28,11,5); ctx.fill(); ell(0,-67,10,3.4,'#5aa8e8');
  ctx.strokeStyle='rgba(255,240,210,.55)'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-15,-44); ctx.quadraticCurveTo(-19,-28,-12,-12); ctx.stroke(); ctx.restore(); }
function cesta(x,y,s,k){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); softShadow(0,2,38,.28);
  ctx.fillStyle=vgrad(-36,0,[[0,'#c8904a'],[1,'#8a5a2a']]); ctx.beginPath(); ctx.moveTo(-34,-34); ctx.lineTo(34,-34); ctx.lineTo(26,0); ctx.lineTo(-26,0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(90,50,20,.45)'; ctx.lineWidth=2; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(-31+i*2.5,-25+i*9); ctx.lineTo(31-i*2.5,-25+i*9); ctx.stroke(); }
  if(k>0){ const n=Math.max(1,Math.round(k*16)), alto=k*16; for(let i=0;i<n;i++){ const px=-26+((i*19)%52), py=-36-(i%3)*4-alto*(1-Math.abs(px)/34); ell(px,py,7,5,i%2?'#f2c94c':'#dcaa30',(i%3-1)*.4); } if(k>=1) glow(0,-48,70,'#fff2b0',.35+.1*Math.sin(G*4)); }
  ctx.fillStyle='#a8703a'; rr(-36,-38,72,7,3); ctx.fill(); ctx.restore(); }
function espigaChao(x,y,s,br){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.rotate(-.25); if(br){ glow(0,0,42,'#fff4b0',.5+.2*Math.sin(G*6)); brilhos(4,-6,26,3,x); }
  ctx.strokeStyle='#c09a3a'; ctx.lineWidth=2.4; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-24,0); ctx.lineTo(0,0); ctx.stroke(); for(let i=0;i<5;i++){ ell(3+i*5,-2.4,4.4,2.8,'#f2c94c',.3); ell(3+i*5,2.4,4.4,2.8,'#d6a42e',-.3); } ctx.restore(); }
function brilho4(x,y,r,a){ if(a<=0) return; ctx.save(); ctx.globalAlpha=Math.min(1,a); ctx.fillStyle='#fffbe0'; ctx.beginPath(); ctx.moveTo(x,y-r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.quadraticCurveTo(x,y,x,y+r); ctx.quadraticCurveTo(x,y,x-r,y); ctx.quadraticCurveTo(x,y,x,y-r); ctx.fill(); ctx.restore(); }
function brilhos(x,y,R,n,ph){ for(let i=0;i<n;i++){ const a=i*2.4+(ph||0), d=R*(.45+.55*((i*.37)%1)); brilho4(x+Math.cos(a+G*.6)*d,y+Math.sin(a+G*.6)*d*.75,4+3*Math.abs(Math.sin(G*4+i)),.4+.6*Math.abs(Math.sin(G*3+i*1.7))); } }
function coracao(x,y,r,c){ ctx.fillStyle=c||'#f07a8a'; ctx.beginPath(); ctx.moveTo(x,y+r*.9); ctx.bezierCurveTo(x-r*1.6,y-r*.2,x-r*.7,y-r*1.4,x,y-r*.5); ctx.bezierCurveTo(x+r*.7,y-r*1.4,x+r*1.6,y-r*.2,x,y+r*.9); ctx.fill(); }
function coracoes(x,y,n){ for(let i=0;i<n;i++){ const k=((G*.45+i/n)%1); ctx.save(); ctx.globalAlpha=Math.sin(k*Math.PI)*.85; coracao(x+Math.sin(G*2+i*2)*18+(i-(n-1)/2)*26,y-k*90,7+(i%2)*3,i%2?'#f07a8a':'#ff9fb0'); ctx.restore(); } }
function bebe(x,y,s,dir){ s=s||1; dir=dir||1; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); glow(0,-2,46,'#fff4c8',.45);
  shade(5,0,21,11,'#fffaf0','#e6dcc4'); ctx.strokeStyle='rgba(200,180,140,.6)'; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(-2,-8); ctx.quadraticCurveTo(4,0,-2,9); ctx.stroke();
  shade(-14,-3,10,9.5,'#f6cfa6','#e2ab7c'); ell(-15,-11,7,3.2,'#6b4423');
  ctx.strokeStyle='#5a3a2a'; ctx.lineWidth=1.3; ctx.beginPath(); ctx.arc(-18,-3,1.8,.1*Math.PI,.9*Math.PI); ctx.moveTo(-9.2,-3); ctx.arc(-11,-3,1.8,.1*Math.PI,.9*Math.PI); ctx.stroke(); ell(-14.5,2.4,1.6,1,'#d07a6a'); ell(-20,1,2.2,1.4,'rgba(240,120,100,.3)'); ctx.restore(); }
// alguém segurando o bebê Obede no colo
function colo(id,x,y,o){ o=o||{}; person(id,x,y,{...o,pose:'cradle'}); const s=(o.s||1)*CAST[id].s, d=o.dir||1; bebe(x+d*8*s,y-50*s,s*1.02,-d); }
function casinha(x,y,s,lit){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); softShadow(0,4,160,.25);
  ctx.fillStyle=vgrad(-150,0,[[0,'#ecd8b2'],[1,'#c8ac80']]); ctx.fillRect(-120,-150,240,150); ctx.fillStyle='#a88a62'; ctx.fillRect(-132,-162,264,16); ctx.fillStyle='#8a6a44'; for(let i=0;i<7;i++) ctx.fillRect(-118+i*38,-150,8,8);
  ctx.fillStyle=lit? '#ffd27a' : '#6a4a32'; rr(-24,-92,48,92,22); ctx.fill(); if(lit) glow(0,-46,100,'#ffb860',.45);
  ctx.fillStyle=lit? '#ffd27a' : '#5a3e2a'; rr(56,-112,34,30,6); ctx.fill(); rr(-90,-112,34,30,6); ctx.fill(); ell(-92,-4,16,8,'#7aa858'); ell(92,-4,18,9,'#6a9a48'); ctx.restore(); }
function arco(x,y){ ctx.save(); ctx.translate(x,y); ctx.strokeStyle='#8a6a44'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-135,0); ctx.lineTo(-135,-170); ctx.quadraticCurveTo(0,-275,135,-170); ctx.lineTo(135,0); ctx.stroke();
  const flor=(fx,fy,c,r)=>{ for(let k=0;k<5;k++){ const a=k*1.2566+G*.2; ell(fx+Math.cos(a)*r*.6,fy+Math.sin(a)*r*.6,r*.55,r*.55,c); } ell(fx,fy,r*.4,r*.4,'#f2c24a'); };
  for(let i=0;i<=14;i++){ const u=i/14, px=(1-u)*(1-u)*-135+u*u*135, py=(1-u)*(1-u)*-170+2*(1-u)*u*-275+u*u*-170; ell(px+6,py+8,10,6,'#6aa653',.6); flor(px,py,['#ffffff','#ffb0c8','#ffd27a'][i%3],11); }
  for(let k=0;k<4;k++) for(const sx of [-135,135]){ ell(sx+5,-30-k*40,9,5,'#6aa653',.5); flor(sx,-20-k*40,['#ffb0c8','#ffffff'][k%2],9); } ctx.restore(); }
function petalas(n){ for(let i=0;i<n;i++){ const x=((i*97+G*26)%900)-450, y=((i*53+G*48)%460)-420; ctx.save(); ctx.translate(x,y); ctx.rotate(G*2+i); ell(0,0,5,3,i%2?'#ffc0d4':'#ffffff'); ctx.restore(); } }
function cochicho(x,y,a){ if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(255,253,246,.95)'; ctx.beginPath(); ctx.ellipse(x,y,30,20,0,0,7); ctx.fill(); ctx.beginPath(); ctx.moveTo(x-14,y+14); ctx.lineTo(x-24,y+30); ctx.lineTo(x-2,y+18); ctx.fill();
  for(let i=0;i<3;i++) ell(x-12+i*12,y,3.4,3.4,rgba('#2B3A55',.4+.6*Math.abs(Math.sin(G*4-i)))); ctx.restore(); }
function fundoMoabe(){ layer(0,()=>{ sky('#a898c0','#e6c4b4','#f2d8b8'); sunDisk2(-380,-170,30); for(let i=0;i<3;i++) cloud(((i*420+G*6)%1600)-800,-280+(i%2)*40,.9,'#f4ece8','#d8c8d0',.8); });
  layer(.2,()=>ridge(-30,110,.004,2,'#a898b8','#c0b0c8',3000)); layer(.5,()=>{ ridge(0,50,.008,4,'#c8b090','#d8c0a0',3000); tree(-700,10,.7,'#8a9a6a','#5a6a48'); tree(640,10,.8,'#8a9a6a','#5a6a48'); }); }
function fundoBelem(k){ k=k==null?1:k; layer(0,()=>{ meadowSky(k); sunDisk2(380,-250); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); });
  layer(.2,()=>ridge(-30,90,.004,2,'#c8c890','#d8d8a8',3000));
  layer(.5,()=>{ ridge(0,40,.008,4,'#d6c070','#e6d088',3000); ctx.save(); ctx.translate(120,-24); ctx.scale(.55,.55); townBelem(0); ctx.restore(); faixaCampo(16,40,'#f2cf62','#d8a840',1); }); }
SC.moabe = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6c0'; LIGHT.rimA=.5; setCam([-40,-150,zc(1.15,260)],[-20,-150,zc(1.45,170)],t/9); fundoMoabe();
  layer(1,()=>{ ground('#c8b890','#9a8a64'); casinha(-340,0,1); ell(-70,10,64,12,'#a8645a'); ell(-70,8,56,9,'#c27a6a');
    person('noemi',-80,0,{pose:'sit',dir:1,sad:true}); person('rute',40,2,{pose:'kneel',dir:-1}); }); };
SC.despedida = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffe0b0'; LIGHT.rimA=.55; const tx=W<700? 0 : (TALK==='rute'? 30 : (TALK==='noemi'? -30 : 0));
  cam.x=lerp(cam.x,tx,.04); cam.y=lerp(cam.y,-155,.04); cam.z=lerp(cam.z,zc(1.6,170),.04); fundoMoabe();
  layer(1,()=>{ ground('#d0bc90','#a08a60'); estrada(); tree(-330,8,1.1,'#8aa86a','#5a7a48');
    person('noemi',-75,0,{pose:TALK==='noemi'?'open':'stand',dir:1,staff:true}); person('rute',75,2,{pose:TALK==='rute'?'open':'stand',dir:-1});
    if(TALK==='rute') coracoes(0,-150,3); }); };
SC.viagem = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; const x=lerp(-440,220,t/8.5); cam.x=W<700? x+45 : lerp(-260,140,t/8.5); cam.y=-160; cam.z=zc(1.25,240);
  fundoBelem(.95);
  layer(1,()=>{ ground('#dcc890','#aa986a'); estrada(); fileira(-34,1,24); person('noemi',x,0,{pose:'walk',dir:1,staff:true}); person('rute',x+90,4,{pose:'walk',dir:1,ph:1}); }); };
SC.campo = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; const ep=W<700; if(ep) setCam([10,-150,zc(1.2,250)],[30,-150,zc(1.25,245)],t/9); else setCam([-60,-150,zc(1.2,330)],[30,-150,zc(1.35,320)],t/9); fundoBelem(1);
  layer(1,()=>{ chaoCampo(); fileira(-26,1.1,20); feixe(295,0,1); feixe(345,6,.9);
    person('trab1',135,0,{pose:'reap',dir:1}); person('trab2',220,4,{pose:'reap',dir:1,ph:1.5});
    person('rute',-150,2,{pose:'kneel',dir:1}); cesta(-212,6,.7,.3); for(const [ex,ey] of [[-85,12],[-30,16],[30,10],[85,18]]) espigaChao(ex,ey,1); fileira(74,.75,52); }); };
SC.boaz_chega = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.65; const ep=W<700, bx=lerp(-430,-170,ss(0,3.5,t));
  const tx=ep? 60 : (TALK==='trab1'? -40 : (TALK==='boaz'? -80 : -10)); cam.x=lerp(cam.x,tx,.035); cam.y=lerp(cam.y,-150,.035); cam.z=lerp(cam.z,ep? zc(1.25,250) : zc(1.4,340),.035); fundoBelem(1);
  layer(1,()=>{ chaoCampo(); fileira(-26,1.1,20); feixe(-340,4,.9);
    person('rute',220,2,{pose:'kneel',dir:1}); cesta(285,6,.7,.4); espigaChao(170,12,1);
    person('boaz',bx,0,{pose: t<3.5? 'walk' : (TALK==='boaz'? 'point' : 'stand'),dir:1}); person('trab1',-40,2,{pose: TALK==='trab1'? 'open' : (TALK==='boaz'? 'stand' : 'reap'),dir: t<3.5? 1 : -1}); fileira(74,.75,52); }); };
SC.conversa = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.7; const ep=W<700, tx=ep? 0 : (TALK==='rute'? 35 : (TALK==='boaz'? -30 : 0));
  cam.x=lerp(cam.x,tx,.04); cam.y=lerp(cam.y,-150,.04); cam.z=lerp(cam.z,zc(TALK? 1.65 : 1.45,180),.04); fundoBelem(1);
  const bencao=SCRIPT[P.idx] && SCRIPT[P.idx].rec==='v11';
  layer(1,()=>{ chaoCampo(); fileira(-26,1.1,20); tree(-330,6,1.7,'#7aa858','#4a7a38'); jarro(-175,6,1); jarro(-140,12,.85); jarro(-205,14,.8);
    if(bencao) godRays(60,-560,640,.22*ss(0,1.5,P.lt),G,'#fff0c0');
    person('boaz',-60,0,{pose: TALK==='boaz'? 'open' : 'stand',dir:1}); person('rute',65,2,{pose: TALK==='rute'? 'kneel' : 'stand',dir:-1}); cesta(130,8,.6,.45); }); };
SC.proposito = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.65; const ep=W<700; if(ep) setCam([30,-150,zc(1.3,255)],[30,-150,zc(1.2,255)],t/8); else setCam([-60,-150,zc(1.45,300)],[30,-150,zc(1.3,300)],t/8); fundoBelem(1);
  layer(1,()=>{ chaoCampo(); fileira(-26,1.1,20);
    person('boaz',-190,0,{pose: t<3.6? 'point':'stand',dir:1}); cochicho(-140,-128,clamp(1-(t-3.4)*2,0,1)*clamp(t*2,0,1));
    person('trab1',-95,2,{pose: t<3.6? 'stand':'reap',dir: t<3.6? -1 : 1}); person('trab2',10,4,{pose:'reap',dir:1,ph:1.2});
    [[-70,70],[30,115],[-70,150],[30,92],[-70,180],[30,60]].forEach(([sx,lx],i)=>{ const k=clamp((t-3.8-i*.7)/.6,0,1); if(k<=0) return; espigaChao(lerp(sx+24,lx,k),lerp(-70,10+(i%3)*5,k)-Math.sin(k*Math.PI)*40,1,true); });
    person('rute',205,2,{pose:'kneel',dir:-1}); cesta(258,6,.7,.55); fileira(74,.75,52); }); };
SC.casa = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd890'; LIGHT.rimA=.8; setCam([0,-150,zc(1.3,190)],[0,-150,zc(1.5,165)],t/8);
  layer(0,()=>{ ctx.fillStyle=vgrad(-H,H,[[0,'#e8d4ac'],[1,'#c8ac80']]); ctx.fillRect(-W*2,-H*2,W*4,H*4); ctx.fillStyle='#a8845a'; ctx.fillRect(-W*2,-2,W*4,H*4);
    ctx.fillStyle=vgrad(-250,-120,[[0,'#f0a060'],[1,'#f8d090']]); rr(140,-250,120,120,14); ctx.fill(); ctx.strokeStyle='#8a6a44'; ctx.lineWidth=8; rr(140,-250,120,120,14); ctx.stroke(); ell(220,-200,12,12,'#fff4c8'); });
  layer(1,()=>{ glow(-200,-210,190,'#ffd27a',.45); ctx.fillStyle='#5a3a22'; rr(-208,-230,16,22,4); ctx.fill(); ell(-200,-234,5,7,'#ffb030');
    person('noemi',-85,0,{pose:'armsup',dir:1}); person('rute',85,2,{pose:'open',dir:-1}); cesta(5,8,1.15,1); brilhos(5,-70,60,6); }); };
SC.familia = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.7; setCam([0,-165,zc(1.25,220)],[0,-165,zc(1.5,165)],t/9); fundoBelem(1);
  layer(1,()=>{ chaoFlor(); arco(0,0); const bb=ss(3.2,4.8,t); person('boaz',-55,0,{pose:'stand',dir:1});
    if(bb>0){ ctx.save(); ctx.globalAlpha=bb; colo('rute',55,2,{dir:-1}); ctx.restore(); ctx.save(); ctx.globalAlpha=1-bb; person('rute',55,2,{pose:'stand',dir:-1}); ctx.restore(); } else person('rute',55,2,{pose:'stand',dir:-1});
    petalas(16); if(bb>0) coracoes(0,-190,3); }); };
SC.neto = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.75; setCam([45,-160,zc(1.4,175)],[45,-160,zc(1.6,165)],t/8); fundoBelem(1);
  layer(1,()=>{ chaoFlor(); casinha(-360,0,1); colo('noemi',-60,0,{dir:1}); person('boaz',70,0,{pose:'stand',dir:-1}); person('rute',150,2,{pose:'armsup',dir:-1,ph:1}); coracoes(-55,-150,3); brilhos(-50,-60,50,4); }); };
SC.estrela = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8; setCam([0,-175,zc(1.15,200)],[0,-190,zc(1.3,180)],t/9);
  layer(0,()=>{ nightSky(.65); bigStar(0,-390,1); });
  layer(.5,()=>{ ridge(0,40,.008,4,'#8a7a6a','#6a5a50',3000); ctx.save(); ctx.translate(120,-24); ctx.scale(.55,.55); townBelem(.8); ctx.restore(); });
  layer(1,()=>{ ground('#9a8a5a','#6a5a3a'); fileira(-26,1.1,22,'#e8c060','#c09030'); person('boaz',-115,0,{pose:'stand',dir:1}); colo('rute',-20,2,{dir:1}); person('noemi',90,0,{pose:'armsup',dir:-1}); }); };
//@@ROTEIRO
const CH=[ 'Aonde você for, eu irei', 'No campo de Boaz', 'Um homem bondoso', 'Uma família abençoada' ];
const N=(t)=>({who:'Narrador',text:t}), NOE=t=>({who:'Noemi',text:t,talk:'noemi'}), RUT=t=>({who:'Rute',text:t,talk:'rute'}), BOA=t=>({who:'Boaz',text:t,talk:'boaz'}), TRA=t=>({who:'Trabalhador',text:t,talk:'trab1'});
const SCRIPT=[
  {intro:true, sc:'abertura', who:'', text:'', dur:6.6},
  {card:0},
  {sc:'moabe', ...N('Noemi era uma senhora que morava longe da sua terra. Ela tinha perdido o marido e os dois filhos, e ficou muito triste. (Rute 1:3-5)')},
  {sc:'despedida', ...NOE('Vou voltar para Belém, a minha cidade. Rute, minha nora, volte para a sua família.')},
  {sc:'despedida', ...RUT('Não, Noemi! Aonde você for, eu irei. O seu povo será o meu povo, e o seu Deus será o meu Deus! (Rute 1:16)')},
  {sc:'viagem', ...N('E as duas viajaram juntas até Belém, bem no tempo da colheita. (Rute 1:22)')},
  {card:1},
  {sc:'campo', ...N('Para ter o que comer, Rute foi ao campo pegar as espigas que ficavam no chão, depois dos trabalhadores. (Rute 2:2-3)')},
  {sc:'boaz_chega', ...N('O campo era de Boaz, um homem bom, parente de Noemi.')},
  {sc:'boaz_chega', ...BOA('Quem é aquela moça? (Rute 2:5)')},
  {sc:'boaz_chega', ...TRA('É Rute, a que veio com Noemi. Ela está trabalhando desde cedinho!')},
  {card:2},
  {sc:'conversa', ...BOA('Rute, fique aqui no meu campo. Quando tiver sede, beba da nossa água. (Rute 2:8-9)')},
  {sc:'conversa', ...RUT('Por que o senhor é tão bondoso comigo?')},
  {sc:'conversa', ...BOA('Porque eu soube de tudo o que você fez pela Noemi. Que o Senhor Deus abençoe você! (Rute 2:11-12)')},
  {sc:'proposito', ...N('E Boaz pediu, baixinho, aos trabalhadores: deixem cair umas espigas a mais, de propósito, para ela pegar! (Rute 2:16)')},
  {card:3},
  {sc:'casa', ...N('Rute voltou para casa com a cesta cheinha, e Noemi ficou muito feliz! (Rute 2:17-20)')},
  {sc:'familia', ...N('Depois, Boaz e Rute se casaram, e Deus deu a eles um filhinho chamado Obede. (Rute 4:13)')},
  {sc:'neto', ...NOE('Deus não se esqueceu de mim! Agora eu tenho um netinho! (Rute 4:14-16)')},
  {summary:true, sc:'estrela', ...N('E sabe quem veio dessa família? O rei Davi... e, muito tempo depois, Jesus! (Rute 4:17; Mateus 1:5)')},
];
//@@MOOD
const MOOD={ abertura:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[72,76,79,84]], moabe:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]], despedida:[[57,60,64,69],[53,57,60,65],[60,64,67,72],[55,59,62,67]],
  viagem:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], campo:[[62,66,69],[67,71,74],[64,67,71],[62,66,69]], boaz_chega:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]],
  conversa:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]], proposito:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], casa:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]],
  familia:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]], neto:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], estrela:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]], obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: O Campo de Boaz (3 fases, cada uma de um jeito) =================
   Fase 1 · Pegue as espigas: toque nas espigas douradas escondidas na grama verde, até juntar 10 na cesta de Rute.
            De vez em quando um trabalhador deixa cair uma espiga de propósito, com brilho (como Boaz mandou).
   Fase 2 · Água para Rute: arraste um jarro de água até cada pessoa com sede (4 pessoas, um jarro para cada).
   Fase 3 · A família de Rute: quebra-cabeça de 4 pedaços (Boaz, Rute, o bebê Obede e Noemi): arraste cada pedaço para o seu lugar.
   Ninguém perde: errar só faz repetir. Tudo em coordenadas da tela (W x H virtuais); se a tela girar, reencaixa. */
let MODE='film';
const GS={};
const NPH=[
  { name:'Fase 1 · Pegue as espigas', voice:['r1','Agora é a sua vez! Fase um: toque nas espigas douradas escondidas na grama, para encher a cesta de Rute. Junte dez!'] },
  { name:'Fase 2 · Água para Rute', voice:['r2','Fase dois: que calor! Arraste um jarro de água para cada pessoa com sede.'] },
  { name:'Fase 3 · A família de Rute', voice:['r3','Fase três: monte o quadro da família de Rute! Arraste cada pedaço para o seu lugar.'] },
];
const U=()=>Math.max(1,.6*720/innerHeight); // alvos com pelo menos ~44px de verdade, mesmo em tela baixa
const META1=10;
function gameReset(){ GS.badBy=[0,0,0]; loadPhase(1); }
function loadPhase(n){ Object.assign(GS,{ phase:n, banner:2.8, finished:false, finT:0, ended:false, lw:W, cool:GS.cool||0, fimFala:3.2,
    tufos:[], espigas:[], voando:[], n1:0, dropT:0, drops:0,
    pessoas:[], jarros:[], n2:0,
    pecas:[], n3:0, drag:null });
  cam.x=0; cam.y=-150; cam.z=1;
  if(n===1){ campo1(); GS.dropT=(REC_DUR.r1||7)+1.2; }
  if(n===2){ const ids=['rute','trab1','trab2','trab3'].sort(()=>Math.random()-.5); GS.pessoas=ids.map(id=>({id,bebeu:false,feliz:0})); GS.jarros=[0,1,2,3].map(i=>({i,dono:-1,x:0,y:0})); jarrosEmCasa(); }
  if(n===3){ const h=[0,1,2,3].sort(()=>Math.random()-.5); GS.pecas=[0,1,2,3].map(i=>({i,home:h[i],ok:false,x:0,y:0,wob:0,sc:0})); pecasEmCasa(); }
  $('gAn').textContent=NPH[n-1].name.split(' · ')[0]; hud(); gsay(NPH[n-1].voice[0],NPH[n-1].voice[1],true); }
function hud(){ const g=GS, n=g.phase; $('gGol').textContent = n===1? ('🌾 '+g.n1+' / '+META1) : (n===2? ('🏺 '+g.n2+' / 4') : ('🧩 '+g.n3+' / 4')); }
let gsubT=0;
function gsay(key,text,force,who){ if(!force && GS.cool>0) return; GS.cool=5; speak({rec:key,text}); whoEl.textContent=who||'Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){ MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false; TALK=null;
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume(); gameReset(); }
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toWorld(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const lx=(e.clientX*dpr-offX)/K, ly=e.clientY*dpr/K; const z=ZOOM*cam.z*PZ(); return { x:(lx-W/2)/z+cam.x, y:(ly-H*CY)/z+cam.y, sx:lx, sy:ly }; }
function toScreen(x,y){ const z=ZOOM*cam.z*PZ(); return [ (x-cam.x)*z+W/2, (y-cam.y)*z+H*CY ]; }

/* ----- fase 1: espigas na grama ----- */
const HZ=()=>H*.42;
function rutePos(){ return [W*(W<700? .8 : .88), H*.5]; }
function cestaPos(){ const [rx,ry]=rutePos(); return [rx-62*U(), ry+4]; }
function campo1(){ const g=GS, cols=W<700? 3 : Math.max(4,Math.min(7,Math.floor(W/210))), rows=3;
  g.tufos=[]; for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) g.tufos.push({fx:lerp(.09,.91,(c+.5+(r%2? .2 : -.2))/cols), fy:lerp(.63,.87,r/(rows-1)), wob:0});
  const quantas=Math.round(g.tufos.length*.45), ficam=g.espigas.filter(e=>e.cai && !e.ok);
  const ix=[...g.tufos.keys()].sort(()=>Math.random()-.5).slice(0,quantas);
  g.espigas=ficam.concat(ix.map(i=>({fx:g.tufos[i].fx+8/W, fy:g.tufos[i].fy+2/H, ok:false, cai:false, t:9}))); }
const ESP_Y=62; // centro da cabeça da espiga, acima do pé
function espigaG(x,y,s,br){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); if(br){ glow(0,-62,52,'#fff4b0',.55+.2*Math.sin(G*6)); brilhos(0,-62,40,5,x); }
  ctx.strokeStyle='#a8862a'; ctx.lineWidth=3.5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(3,-20,0,-38); ctx.stroke();
  ctx.strokeStyle='rgba(250,226,140,.95)'; ctx.lineWidth=1.6; ctx.beginPath(); for(let i=0;i<6;i++){ const yy=-42-i*8; ctx.moveTo(-5,yy); ctx.lineTo(-14,yy-16); ctx.moveTo(5,yy-3); ctx.lineTo(14,yy-19); } ctx.moveTo(0,-88); ctx.lineTo(0,-104); ctx.stroke();
  for(let i=0;i<6;i++){ const yy=-42-i*8; ell(-5,yy,6.2,8.4,'#f8d250',-.35); ell(5,yy-3,6.2,8.4,'#e2aa2c',.35); }
  ell(-4,-70,2.4,11,'rgba(255,255,255,.4)'); ctx.restore(); }
function tufo(x,y,s,wob){ const sh=wob>0? Math.sin(G*40)*4 : 0; ctx.save(); ctx.translate(x+sh,y); ctx.scale(s,s); softShadow(0,2,46,.18);
  for(let i=-5;i<=5;i++){ const h=42+Math.abs((i*37+50)%22), sw=Math.sin(G*1.8+i+x*.01)*3; ctx.fillStyle=i%2? '#5c9844' : '#78b454'; ctx.beginPath(); ctx.moveTo(i*7-7,2); ctx.quadraticCurveTo(i*8+sw*.5,-h*.5,i*10+sw,-h); ctx.quadraticCurveTo(i*8+4,-h*.45,i*7+7,2); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
function posE(e){ if(e.t>=.9) return [e.fx*W, e.fy*H]; const k=e.t/.9, [wx,wy]=trabPos(); return [lerp(wx+30*U(),e.fx*W,k), lerp(wy-80*U(),e.fy*H,k)-Math.sin(k*Math.PI)*90]; }
function trabPos(){ return [W*.13, H*.47]; }
function soltaEspiga(){ const g=GS, u=U(); let best=null, bd=-1;
  for(let k=0;k<24;k++){ const fx=.1+Math.random()*.8, fy=.64+Math.random()*.23, x=fx*W, y=fy*H; let d=1e9;
    for(const e of g.espigas) if(!e.ok) d=Math.min(d,Math.hypot(e.fx*W-x,e.fy*H-y)); for(const t of g.tufos) d=Math.min(d,Math.hypot(t.fx*W-x,t.fy*H-y)*1.3);
    const [rx,ry]=rutePos(); if(Math.abs(x-rx)<90*u && y<ry+120*u) d=0; if(d>bd){ bd=d; best={fx,fy}; } }
  g.espigas.push({...best, ok:false, cai:true, t:0}); g.drops++; pluck(84,.05); pluck(88,.04,.1);
  if(g.drops===1) gsay('r6','Olha! Boaz mandou deixar cair umas espigas de propósito!',true); }
/* ----- fase 2: jarros de água ----- */
function FX2(){ return W<700? [.14,.38,.62,.86] : [.2,.4,.6,.8]; }
const S2=()=>1.1*U();
function pessoaPos(i){ return [FX2()[i]*W, H*.62]; }
function alvoPessoa(i){ const [x,y]=pessoaPos(i); return [x, y-62*S2()*CAST[GS.pessoas[i].id].s]; }
function jarroCasa(j){ return [FX2()[j]*W, H*.88]; }
function jarrosEmCasa(){ for(const j of GS.jarros) if(j.dono<0){ const [x,y]=jarroCasa(j.i); j.x=x; j.y=y; } }
function gota(x,y,r){ ctx.fillStyle='#4f9ee0'; ctx.beginPath(); ctx.moveTo(x,y-r*1.6); ctx.quadraticCurveTo(x+r*.95,y-r*.4,x+r,y+r*.15); ctx.arc(x,y+r*.15,r,0,Math.PI); ctx.quadraticCurveTo(x-r*.95,y-r*.4,x,y-r*1.6); ctx.fill(); ell(x-r*.35,y,r*.22,r*.36,'rgba(255,255,255,.75)'); }
/* ----- fase 3: o quadro da família ----- */
function quadroLayout(){ if(W<700){ const P=Math.min(W*.4,H*.24); return {P, cx:W/2, cy:H*.36, home:[[.14,.76],[.38,.76],[.62,.76],[.86,.76]].map(([a,b])=>[a*W,b*H]), hs:Math.min(.62,W*.22/P)}; }
  const P=Math.min(H*.3,W*.2); return {P, cx:W/2, cy:H*.46, home:[[.14,.3],[.14,.68],[.86,.3],[.86,.68]].map(([a,b])=>[a*W,b*H]), hs:Math.min(.8,(W*.27-20)/P)}; }
function slotPos(i,L){ L=L||quadroLayout(); return [L.cx+(i%2? L.P/2 : -L.P/2), L.cy+(i<2? -L.P/2 : L.P/2)]; }
function pecasEmCasa(){ const L=quadroLayout(); for(const p of GS.pecas){ if(p.ok){ [p.x,p.y]=slotPos(p.i,L); p.sc=1; } else { [p.x,p.y]=L.home[p.home]; p.sc=L.hs; } } }
// a pintura inteira (os 4 pedaços juntos formam uma cena só), em coordenadas 0..2P
function pintura(P){ ctx.save(); ctx.scale(P/200,P/200);
  ctx.fillStyle=vgrad(0,150,[[0,'#8fd0f0'],[1,'#fbe7c4']]); ctx.fillRect(0,0,400,160); sunDisk2(200,70,24); cloud(70,40,.5,'#ffffff','#e6eef4',.9); cloud(335,48,.45,'#ffffff','#e6eef4',.9);
  ctx.fillStyle=vgrad(140,400,[[0,'#f2cf62'],[1,'#c89a3a']]); ctx.fillRect(0,140,400,260);
  ctx.fillStyle='#e6c25a'; ctx.beginPath(); ctx.moveTo(0,152); ctx.quadraticCurveTo(100,132,200,148); ctx.quadraticCurveTo(300,166,400,142); ctx.lineTo(400,176); ctx.lineTo(0,176); ctx.closePath(); ctx.fill();
  for(let i=0;i<14;i++) cevada(12+i*29,402,1,i);
  person('boaz',100,192,{pose:'open',dir:1,s:1.25}); person('rute',300,194,{pose:'open',dir:-1,s:1.3});
  cesta(100,340,1.25,0); bebe(102,300,1.7,1); person('noemi',300,388,{pose:'armsup',dir:-1,s:1.3}); coracoes(200,250,2);
  ctx.restore(); }
function peca(i,x,y,P,sc,a){ const s=P*sc; ctx.save(); ctx.globalAlpha=a==null?1:a; ctx.translate(x-s/2,y-s/2); softShadow(s/2,s+4,s*.5,.25); rr(0,0,s,s,Math.max(6,s*.06)); ctx.save(); ctx.clip(); ctx.scale(sc,sc); ctx.translate(-(i%2)*P,-(i>>1)*P); pintura(P); ctx.restore();
  ctx.lineWidth=3; ctx.strokeStyle='rgba(255,253,246,.9)'; rr(0,0,s,s,Math.max(6,s*.06)); ctx.stroke(); ctx.restore(); }
function alvosJogo(){ const g=GS, u=U(); // (para os testes) onde tocar/arrastar agora, em coordenadas da tela virtual
  if(g.phase===1) return { tap:g.espigas.filter(e=>!e.ok && e.t>=.9).map(e=>{ const [x,y]=posE(e); return [x,y-ESP_Y*u]; }), r:52*u };
  if(g.phase===2){ const livres=g.pessoas.map((p,i)=>i).filter(i=>!g.pessoas[i].bebeu); return { drag:g.jarros.filter(j=>j.dono<0).slice(0,livres.length).map((j,k)=>[[j.x,j.y-34*S2()],alvoPessoa(livres[k])]), r:46*u }; }
  const L=quadroLayout(); return { drag:g.pecas.filter(p=>!p.ok).map(p=>[[p.x,p.y],slotPos(p.i,L)]), r:L.P*L.hs/2 }; }

function gameTap(e){ if(AC) AC.resume(); const w=toWorld(e), g=GS, u=U(); if(g.banner>1.6||g.finished) return;
  if(g.phase===1){ let best=null, bd=52*u; for(const es of g.espigas){ if(es.ok || es.t<.9) continue; const [x,y]=posE(es); const d=Math.hypot(w.sx-x,w.sy-(y-ESP_Y*u)); if(d<bd){ bd=d; best=es; } }
    if(best){ best.ok=true; const [x,y]=posE(best); g.voando.push({x,y:y-ESP_Y*u,t:0}); g.n1++; hud(); pluck(76+(g.n1%5)*2,.07); pluck(88,.04,.08);
      if(g.n1>=META1) finishPhase(); else if(g.n1===5) gsay('o4','Muito bem!'); return; }
    let tf=null, td=58*u; for(const t of g.tufos){ const d=Math.hypot(w.sx-t.fx*W,w.sy-(t.fy*H-26*u)); if(d<td){ td=d; tf=t; } }
    if(tf){ tf.wob=.4; g.badBy[0]+=.25; pluck(55,.05); gsay('r5','Isso é grama verde. Procure as espigas douradas!'); } }
  else if(g.phase===2){ let best=null, bd=56*u; for(const j of g.jarros){ if(j.dono>=0) continue; const d=Math.hypot(w.sx-j.x,w.sy-(j.y-34*S2())); if(d<bd){ bd=d; best=j; } }
    if(best){ g.drag={j:best, ox:best.x-w.sx, oy:best.y-w.sy}; pluck(72,.04); } }
  else { const L=quadroLayout(); let best=null; for(const p of g.pecas){ if(p.ok) continue; const h=L.P*p.sc/2+8; if(Math.abs(w.sx-p.x)<h && Math.abs(w.sy-p.y)<h) best=p; }
    if(best){ g.drag={p:best, ox:best.x-w.sx, oy:best.y-w.sy}; g.pecas=g.pecas.filter(q=>q!==best).concat([best]); pluck(72,.04); } } }
cv.addEventListener('pointermove',e=>{ if(MODE!=='game'||!GS.drag) return; const w=toWorld(e), d=GS.drag;
  if(d.j){ d.j.x=w.sx+d.ox; d.j.y=w.sy+d.oy; } if(d.p){ d.p.x=w.sx+d.ox; d.p.y=w.sy+d.oy; } });
const fimToque=()=>{ if(MODE!=='game') return; const g=GS, d=g.drag; if(!d) return; g.drag=null; const u=U();
  if(d.j){ const j=d.j, jx=j.x, jy=j.y-34*S2(); let alvo=-1, bd=120*u; g.pessoas.forEach((p,i)=>{ const [x,y]=alvoPessoa(i); const dd=Math.hypot(jx-x,jy-y); if(dd<bd){ bd=dd; alvo=i; } });
    if(alvo<0) return; const p=g.pessoas[alvo];
    if(p.bebeu){ g.badBy[1]+=.34; pluck(55,.06); gsay('r7','Essa pessoa já bebeu! Leve o jarro para quem está com sede.'); return; }
    p.bebeu=true; p.feliz=2; j.dono=alvo; g.n2++; hud(); pluck(79,.07); pluck(86,.05,.1);
    if(g.n2>=4) finishPhase(); else if(g.n2===2) gsay('o4','Muito bem!'); }
  if(d.p){ const p=d.p, L=quadroLayout(); let alvo=-1, bd=L.P*.6; for(let i=0;i<4;i++){ const [x,y]=slotPos(i,L); const dd=Math.hypot(p.x-x,p.y-y); if(dd<bd){ bd=dd; alvo=i; } }
    if(alvo<0) return; if(g.pecas.some(q=>q.ok && q.i===alvo)) return;
    if(alvo===p.i){ p.ok=true; g.n3++; hud(); pluck(79,.07); pluck(84,.05,.1); if(g.n3>=4) finishPhase(); else if(g.n3===2) gsay('o4','Muito bem!'); }
    else { p.wob=.5; g.badBy[2]+=.34; pluck(52,.07); gsay('r8','Esse pedaço é de outro lugar. Tente de novo!'); } } };
addEventListener('pointerup',fimToque); addEventListener('pointercancel',fimToque); // pointercancel (o navegador tomou o toque) conta como soltar
function finishPhase(){ const g=GS; g.finished=true; g.finT=0; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12));
  if(g.phase===1){ gsay('r10','Que cesta cheinha! Rute vai levar para Noemi.',true); g.fimFala=Math.max(3.2,(REC_DUR.r10||3)+.8); }
  else if(g.phase===2){ gsay('r11','Todos beberam água fresquinha!',true); g.fimFala=Math.max(3.2,(REC_DUR.r11||2.5)+.8); }
  else gsay('r9','Dessa família veio o rei Davi, e depois Jesus!',true); }
function gameUpdate(dt){ const g=GS, u=U(); if(g.lw!==W){ g.lw=W; g.drag=null; if(g.phase===1) campo1(); if(g.phase===2) jarrosEmCasa(); if(g.phase===3) pecasEmCasa(); } /* a tela girou: reencaixa */
  if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); } if(g.banner>0) g.banner-=dt;
  if(g.finished){ g.finT+=dt; if(g.phase<3 && g.finT>g.fimFala){ loadPhase(g.phase+1); return; }
    if(g.phase===3 && g.finT>Math.max(5,(REC_DUR.r9||3.5)+1.6) && !g.ended){ g.ended=true; const per=g.badBy.map(b=>b===0?3:(b<=2?2:1)); const st=Math.round(per.reduce((a,b)=>a+b,0)/3);
      $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent=NPH.map((P2,i)=>P2.name.split(' · ')[0]+': '+'⭐'.repeat(per[i])).join('  ·  '); $('gwin').hidden=false; try{ const k='bp_rute_estrelas'; localStorage.setItem(k, Math.max(+(localStorage.getItem(k)||0), st)); }catch(e){} if(window.bpAddCoins) setTimeout(()=>bpAddCoins(2*Math.round(st),'pelo jogo!'),900); } }
  if(g.phase===1){ for(const t of g.tufos) if(t.wob>0) t.wob-=dt; for(const e of g.espigas) if(e.t<.9) e.t=Math.min(.9,e.t+dt);
    for(const v of g.voando) v.t+=dt; g.voando=g.voando.filter(v=>v.t<.6);
    if(!g.finished && g.banner<1.2){ g.dropT-=dt; if(g.dropT<=0){ const vivas=g.espigas.filter(e=>!e.ok).length; if(vivas<4 || g.drops<2){ soltaEspiga(); g.dropT=3+Math.random()*1.5; } else g.dropT=1; } } }
  if(g.phase===2){ for(const p of g.pessoas) if(p.feliz>0) p.feliz-=dt; for(const j of g.jarros) if(j.dono<0 && (!g.drag || g.drag.j!==j)){ const [x,y]=jarroCasa(j.i); j.x=lerp(j.x,x,.25); j.y=lerp(j.y,y,.25); } }
  if(g.phase===3){ const L=quadroLayout(); for(const p of g.pecas){ if(p.wob>0) p.wob-=dt; const arr=g.drag && g.drag.p===p; const [hx,hy]=p.ok? slotPos(p.i,L) : L.home[p.home];
      if(!arr){ p.x=lerp(p.x,hx,.25); p.y=lerp(p.y,hy,.25); } p.sc=lerp(p.sc, p.ok? 1 : (arr? .92 : L.hs), .25); } }
}
// fundo das fases: céu, morros e o campo dourado lá atrás (coordenadas da tela)
function fundoJogo(chao1,chao2){ const hz=HZ(); ctx.fillStyle=vgrad(0,hz,[[0,'#7cc6ec'],[1,'#fbe7c4']]); ctx.fillRect(0,0,W,hz+10);
  sunDisk2(W*.84,H*.1,28); cloud(W*.22,H*.1,.9,'#ffffff','#dfe6ee',.9); cloud(W*.58,H*.17,.7,'#ffffff','#dfe6ee',.85);
  ctx.save(); ctx.translate(W/2,hz); ridge(-6,46,.01,3,'#c8c890','#d8d8a8',W/2+40); ctx.translate(W*.18,-6); ctx.scale(.45,.45); townBelem(0); ctx.restore();
  ctx.save(); ctx.translate(W/2,hz+26); faixaCampo(0,26,'#f2cf62','#d8a840',1); ctx.restore();
  ctx.fillStyle=vgrad(hz+40,H,[[0,chao1],[1,chao2]]); ctx.beginPath(); ctx.moveTo(0,H); ctx.lineTo(0,hz+52); for(let x=0;x<=W+20;x+=20) ctx.lineTo(x,hz+46+Math.sin(x*.02)*5); ctx.lineTo(W,H); ctx.closePath(); ctx.fill(); }
function gameDraw(){ const g=GS, u=U(); LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6;
  if(g.phase===1){ fundoJogo('#9cc86a','#5f9440');
    const [wx,wy]=trabPos(); person('trab1',wx,wy,{pose:'reap',dir:1,s:.8*u}); person('boaz',wx+W*.11+30,wy-4,{pose:'stand',dir:1,s:.72*u}); feixe(wx-52*u,wy,.6*u);
    const [rx,ry]=rutePos(), [bx,by]=cestaPos(); person('rute',rx,ry,{pose: g.finished? 'armsup' : 'stand',dir:-1,s:.85*u}); cesta(bx,by,.78*u,g.n1/META1);
    const lista=[]; g.tufos.forEach(t=>lista.push({y:t.fy*H, f:()=>tufo(t.fx*W,t.fy*H,u,t.wob)}));
    for(const e of g.espigas){ if(e.ok) continue; const [x,y]=posE(e); lista.push({y:e.cai? y : y-.5, f:()=>espigaG(x,y,u,e.cai)}); }
    lista.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
    for(const v of g.voando){ const k=v.t/.6; ctx.save(); ctx.globalAlpha=1-k*.3; espigaG(lerp(v.x,bx,k),lerp(v.y,by-40*u,k)-Math.sin(k*Math.PI)*90+ESP_Y*u*.6,u*(1-k*.4),false); ctx.restore(); } }
  else if(g.phase===2){ fundoJogo('#e4c86c','#c0984a'); tree(W*.04,H*.6,1.5*u,'#7aa858','#4a7a38'); feixe(W*.96,H*.58,.8*u);
    const s2=S2(); g.pessoas.forEach((p,i)=>{ const [x,y]=pessoaPos(i), C=CAST[p.id], S=s2*C.s; person(p.id,x,y,{pose: p.bebeu? 'hold' : 'stand',dir: x<W/2? 1 : -1,s:s2,ph:i});
      if(p.bebeu){ const d=x<W/2? 1 : -1; jarro(x+d*30*S,y-62*S,.5*S); if(p.feliz>0) brilhos(x,y-120*S,40*S,4,i); const bx2=Math.min(W-24*u,Math.max(24*u,x+d*34*S)); ctx.save(); ctx.fillStyle='#62BD45'; ctx.beginPath(); ctx.arc(bx2,y-140*S,17*u,0,7); ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=4*u; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(bx2-7*u,y-140*S); ctx.lineTo(bx2-2*u,y-134*S); ctx.lineTo(bx2+8*u,y-147*S); ctx.stroke(); ctx.restore(); }
      else { const d=x<W/2? 1 : -1, bx2=Math.min(W-30*u,Math.max(30*u,x+d*34*S)), by2=y-142*S+Math.sin(G*3+i)*3; ctx.save(); ctx.fillStyle='rgba(255,253,246,.95)'; ctx.beginPath(); ctx.ellipse(bx2,by2,24*u,22*u,0,0,7); ctx.fill(); ctx.restore(); gota(bx2,by2+3*u,9*u); } });
    ctx.save(); ctx.fillStyle='#9a7a52'; const xs=FX2(); rr(xs[0]*W-50*u,H*.88-6,(xs[3]-xs[0])*W+100*u,18,8); ctx.fill(); ctx.restore();
    for(const j of g.jarros){ if(j.dono>=0) continue; const arr=g.drag && g.drag.j===j; if(!arr) glow(j.x,j.y-34*S2(),60*u,'#fff7d0',.18+.12*Math.sin(G*4+j.i)); }
    for(const j of g.jarros){ if(j.dono>=0 || (g.drag && g.drag.j===j)) continue; jarro(j.x,j.y,S2()); }
    if(g.drag && g.drag.j) jarro(g.drag.j.x,g.drag.j.y,S2()*1.08); }
  else { const L=quadroLayout(), P=L.P;
    ctx.fillStyle=vgrad(0,H,[[0,'#f2e2c2'],[1,'#dcc49a']]); ctx.fillRect(0,0,W,H); ctx.fillStyle='#b8946a'; ctx.fillRect(0,H*.9,W,H*.1); glow(W*.1,H*.12,160,'#ffd27a',.25);
    ctx.save(); ctx.fillStyle='#8a5a30'; rr(L.cx-P-16,L.cy-P-16,2*P+32,2*P+32,12); ctx.fill(); ctx.fillStyle='#c8904a'; rr(L.cx-P-9,L.cy-P-9,2*P+18,2*P+18,8); ctx.fill(); ctx.fillStyle='#fbf3e3'; ctx.fillRect(L.cx-P,L.cy-P,2*P,2*P);
    ctx.globalAlpha=.24; ctx.translate(L.cx-P,L.cy-P); ctx.beginPath(); ctx.rect(0,0,2*P,2*P); ctx.clip(); pintura(P); ctx.restore();
    ctx.save(); ctx.setLineDash([10,8]); ctx.lineWidth=3; ctx.strokeStyle='rgba(138,90,48,.55)'; for(let i=0;i<4;i++){ const [x,y]=slotPos(i,L); ctx.strokeRect(x-P/2+4,y-P/2+4,P-8,P-8); } ctx.restore();
    for(const p of g.pecas) if(p.ok) peca(p.i,p.x,p.y,P,p.sc);
    if(g.finished){ const k=Math.min(1,g.finT*.8); glow(L.cx,L.cy,P*2,'#fff2c0',.35*k); bigStar(L.cx,L.cy-P-6,.38*k+.05); }
    for(const p of g.pecas) if(!p.ok){ const arr=g.drag && g.drag.p===p, sh=p.wob>0? Math.sin(G*50)*6 : 0; if(!arr) glow(p.x,p.y,P*p.sc*.8,'#fff7d0',.15+.1*Math.sin(G*4+p.i)); peca(p.i,p.x+sh,p.y,P,p.sc); } }
  if(g.banner<=0 && !g.finished){ const msg = g.phase===1? '👆 Toque nas espigas douradas' : (g.drag? '' : (g.phase===2? '👆 Arraste um jarro até quem tem sede' : '👆 Arraste cada pedaço para o quadro')); if(msg){ ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 '+Math.round(Math.max(20,14*720/innerHeight))+'px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(30,40,60,.55)'; ctx.lineWidth=5; ctx.strokeText(msg,W/2,H*.96); ctx.fillText(msg,W/2,H*.96); ctx.restore(); } }
  if(g.banner>0){ const a=Math.min(1,g.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw2=Math.min(460,W-40), by=innerHeight<=520? H*.56 : H*.24; /* celular deitado: a legenda fica no alto, então o título da fase desce */ ctx.fillStyle='rgba(255,253,246,.97)'; rr(W/2-bw2/2,by-36,bw2,64,32); ctx.fill();
    ctx.font='800 25px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#2B3A55'; ctx.fillText(NPH[g.phase-1].name,W/2,by+8); ctx.restore(); }
}
function txt2(t,x,y,size,c){ ctx.save(); ctx.font='800 '+size+'px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle=c; ctx.fillText(t,x,y); ctx.restore(); }
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_rute_visto')) $('coverGame').hidden=false; }catch(e){}
try{ if(location.hash==='#jogo') $('coverGame').hidden=false; }catch(e){}
window.__alvos=alvosJogo;
