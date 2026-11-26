//@@CAST
const CAST={
  maria:{ robe:['#7fa8d8','#4a76b0'], sash:'#f4f1e8', skin:['#f0c39a','#d69b6c'], hair:'#4a3320', scarf:'#f4f1e8', s:.92 },
  jose:{ robe:['#b08a5e','#765434'], sash:'#5f9a4c', skin:['#e2ab7c','#c48a5a'], hair:'#4a3320', beard:true, beardC:'#4a3320', s:1 },
  anjo:{ robe:['#ffffff','#e8e4f4'], sash:'#f2c24a', skin:['#f6d2ae','#e2ab7c'], hair:'#f2c868', longhair:true, s:1.05 },
  pastor1:{ robe:['#c9a46a','#8a6a3a'], sash:'#6b4423', skin:['#d8a07a','#b07850'], hair:'#3a2a1a', scarf:'#e8d4a8', beard:true, beardC:'#5a4a3a', s:.98 },
  pastor2:{ robe:['#8fa86a','#5f7a42'], sash:'#6b4423', skin:['#e8b48a','#c98f62'], hair:'#5a3a22', cap:'#a87848', s:.86 },
  mago1:{ robe:['#9a6ac8','#5a3a8a'], sash:'#f2c24a', skin:['#c98f62','#a8714a'], hair:'#241b14', beard:true, beardC:'#e8e4dc', crown:true, s:1 },
  mago2:{ robe:['#d0605a','#8a2e2a'], sash:'#f2c24a', skin:['#8a5a3a','#6a4028'], hair:'#1a120c', scarf:'#f2c24a', s:1 },
  mago3:{ robe:['#5fa88a','#2f7a5a'], sash:'#f2c24a', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', beard:true, beardC:'#6b4423', scarf:'#e8e0f4', s:1 },
};
//@@SCENES
/* ===== peças do Natal ===== */
function sunDisk2(x,y,r){ r=r||34; glow(x,y,r*6,'#fff4cc',.55); ell(x,y,r,r,'#fff4d0'); }
function starShape(x,y,r,c){ ctx.fillStyle=c||'#ffe88a'; ctx.beginPath(); for(let k=0;k<10;k++){ const rr2=k%2?r*.42:r, an=-Math.PI/2+k*Math.PI/5; k?ctx.lineTo(x+Math.cos(an)*rr2,y+Math.sin(an)*rr2):ctx.moveTo(x+Math.cos(an)*rr2,y+Math.sin(an)*rr2); } ctx.closePath(); ctx.fill(); }
function bigStar(x,y,s){ s=s||1; glow(x,y,260*s,'#fff2c0',.45); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let i=0;i<4;i++){ const a=i*Math.PI/4+G*.05; ctx.strokeStyle='rgba(255,244,200,.35)'; ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x-Math.cos(a)*120*s,y-Math.sin(a)*120*s); ctx.lineTo(x+Math.cos(a)*120*s,y+Math.sin(a)*120*s); ctx.stroke(); } ctx.restore();
  starShape(x,y,26*s*(1+.06*Math.sin(G*3)),'#fff6c8'); ell(x,y,8*s,8*s,'#ffffff'); }
function nightSky(k){ sky(mix('#7cc6ec','#0e1638',k),mix('#cfeaf4','#2a3466',k),mix('#fff0d0','#4a4a7a',k)); if(k>.3){ ctx.save(); ctx.globalAlpha=(k-.3)/.7; for(let i=0;i<80;i++){ const sx=((i*137.5)%1500)-750, sy=-380+((i*71.3)%340); const tw=.5+.5*Math.sin(G*2+i); ell(sx,sy,1.1+(i%3)*.5,1.1+(i%3)*.5,`rgba(255,248,220,${.4+.6*tw})`); } ctx.restore(); } }
function wings(x,y,s,flap){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const f=Math.sin(G*2.5)*(flap==null?.15:flap);
  for(const d of [-1,1]){ ctx.save(); ctx.translate(d*10,-62); ctx.rotate(d*(.5+f)); ctx.fillStyle=vgrad(-60,10,[[0,'#ffffff'],[1,'#e6e0f4']]); ctx.beginPath(); ctx.ellipse(d*34,-14,40,18,d*.3,0,7); ctx.fill(); ctx.beginPath(); ctx.ellipse(d*46,0,30,12,d*.4,0,7); ctx.fill(); ctx.restore(); } ctx.restore(); }
function angel(x,y,s,pose){ s=s||1; glow(x,y-70*s,180*s,'#fff4c8',.45); wings(x,y,s*1.05); person('anjo',x,y,{pose:pose||'open',dir:1,s:s}); ctx.strokeStyle='rgba(255,226,120,.85)'; ctx.lineWidth=3*s; ctx.beginPath(); ctx.ellipse(x,y-118*s,16*s,5*s,0,0,7); ctx.stroke(); }
function donkey(x,y,s,dir,walk){ s=s||1; dir=dir||1; const w=walk? Math.sin(G*6)*6 : 0; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); softShadow(0,2,40,.25);
  ctx.strokeStyle='#7d7066'; ctx.lineWidth=7; ctx.lineCap='round'; for(const [lx,ph] of [[-22,0],[-12,1],[14,1],[24,0]]){ ctx.beginPath(); ctx.moveTo(lx,-24); ctx.lineTo(lx+(ph?w:-w),0); ctx.stroke(); }
  shade(0,-34,32,16,'#a8998c','#7d7066'); ctx.strokeStyle='#8e8278'; ctx.lineWidth=11; ctx.beginPath(); ctx.moveTo(24,-40); ctx.lineTo(36,-62); ctx.stroke(); shade(42,-66,13,10,'#a8998c','#7d7066'); ell(52,-62,6,5,'#5a4e46');
  ell(36,-80,3.5,11,'#8e8278'); ell(42,-82,3.5,11,'#8e8278'); ell(44,-69,1.8,1.8,'#2c2340'); ctx.restore(); }
function ox(x,y,s,dir){ s=s||1; dir=dir||1; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); softShadow(0,2,46,.25);
  ctx.strokeStyle='#6b4a32'; ctx.lineWidth=10; ctx.lineCap='round'; for(const lx of [-26,-12,14,26]){ ctx.beginPath(); ctx.moveTo(lx,-24); ctx.lineTo(lx,0); ctx.stroke(); }
  shade(0,-38,40,22,'#b08060','#7a5236'); shade(40,-48,18,16,'#b08060','#7a5236'); ell(52,-42,9,7,'#e0b8a0'); ctx.strokeStyle='#e8dcc0'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(34,-60); ctx.quadraticCurveTo(28,-72,24,-70); ctx.moveTo(46,-60); ctx.quadraticCurveTo(52,-72,58,-70); ctx.stroke(); ell(44,-52,2,2,'#2c2340'); ctx.restore(); }
function camel(x,y,s,dir,walk,rider){ s=s||1; dir=dir||1; const w=walk? Math.sin(G*7)*9 : 0; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s); softShadow(0,2,50,.25);
  ctx.strokeStyle='#b0884e'; ctx.lineWidth=8; ctx.lineCap='round'; for(const [lx,ph] of [[-30,0],[-18,1],[20,1],[32,0]]){ ctx.beginPath(); ctx.moveTo(lx,-44); ctx.lineTo(lx+(ph?w:-w),0); ctx.stroke(); }
  shade(0,-56,46,20,'#d8b07a','#a87c44'); shade(-6,-78,22,16,'#d8b07a','#a87c44'); ctx.strokeStyle='#c49a5e'; ctx.lineWidth=13; ctx.beginPath(); ctx.moveTo(38,-62); ctx.quadraticCurveTo(58,-80,56,-104); ctx.stroke(); shade(62,-108,16,10,'#d8b07a','#a87c44'); ell(66,-111,2,2,'#2c2340');
  ctx.fillStyle='#c0503a'; rr(-30,-74,40,10,4); ctx.fill(); ctx.fillStyle='#f2c24a'; for(let i=0;i<4;i++) ell(-26+i*11,-62,2.5,2.5,'#f2c24a');
  ctx.restore(); if(rider){ person(rider,x-6*s*dir,y-82*s,{pose:'sit',dir,s:s*.82}); } }
function manger(x,y,s,baby){ s=s||1; ctx.save(); ctx.translate(x,y); ctx.scale(s,s); softShadow(0,2,60,.3);
  ctx.strokeStyle='#7a5236'; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(-46,0); ctx.lineTo(-30,-40); ctx.moveTo(46,0); ctx.lineTo(30,-40); ctx.moveTo(-30,0); ctx.lineTo(-46,-40); ctx.moveTo(30,0); ctx.lineTo(46,-40); ctx.stroke();
  ctx.fillStyle=vgrad(-50,-30,[[0,'#b07c48'],[1,'#7a5236']]); ctx.beginPath(); ctx.moveTo(-52,-44); ctx.lineTo(52,-44); ctx.lineTo(40,-26); ctx.lineTo(-40,-26); ctx.closePath(); ctx.fill();
  for(let i=0;i<9;i++){ ctx.strokeStyle='#e8c870'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-44+i*11,-44); ctx.lineTo(-48+i*11+Math.sin(i)*6,-54); ctx.stroke(); }
  if(baby){ glow(0,-56,90,'#fff4c8',.55); shade(0,-54,26,11,'#fffaf0','#e8dcc0'); shade(-20,-58,10,9,'#f6cfa6','#e2ab7c'); ctx.strokeStyle='#5a3a2a'; ctx.lineWidth=1.4; ctx.beginPath(); ctx.arc(-22,-58,2,.1*Math.PI,.9*Math.PI); ctx.arc(-16,-58,2,.1*Math.PI,.9*Math.PI); ctx.stroke(); ell(-19,-53,1.6,1,'#d07a6a'); }
  ctx.restore(); }
function stable(x,y,s){ s=s||1; ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  ctx.fillStyle=vgrad(-260,0,[[0,'#8a5a34'],[1,'#5a3a22']]); ctx.fillRect(-300,-230,600,230);
  ctx.fillStyle=vgrad(-230,0,[[0,'#4a2e1c'],[1,'#2e1c12']]); ctx.fillRect(-270,-210,540,210);
  ctx.fillStyle=vgrad(-300,-210,[[0,'#a87a4a'],[1,'#7a5236']]); ctx.beginPath(); ctx.moveTo(-340,-210); ctx.lineTo(0,-310); ctx.lineTo(340,-210); ctx.lineTo(320,-196); ctx.lineTo(0,-290); ctx.lineTo(-320,-196); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(30,18,10,.5)'; ctx.lineWidth=3; for(let i=-4;i<=4;i++){ ctx.beginPath(); ctx.moveTo(i*60,-210); ctx.lineTo(i*60,0); ctx.stroke(); }
  ctx.fillStyle=vgrad(-10,30,[[0,'#d8b870'],[1,'#a8884a']]); ctx.fillRect(-300,-6,600,40); glow(0,-80,280,'#ffd890',.35); ctx.restore(); }
function townBelem(night){ for(const [hx,hw,hh,c] of [[-700,120,160,'#d8c4a0'],[-540,100,200,'#cfb890'],[-400,140,150,'#e0cca8'],[260,120,180,'#d8c4a0'],[420,110,210,'#cfb890'],[570,140,160,'#e0cca8']]){
  ctx.fillStyle=vgrad(-hh,0,[[0,mix(c,'#2a3466',night*.55)],[1,mix(c,'#1a1e3a',night*.65)]]); ctx.fillRect(hx,-hh,hw,hh); ctx.fillStyle=mix(c,'#000000',.3); ctx.fillRect(hx-6,-hh-10,hw+12,12);
  if(night>.5){ ctx.fillStyle='#ffd27a'; ctx.fillRect(hx+hw*.2,-hh*.6,16,16); ctx.fillRect(hx+hw*.65,-hh*.6,16,16); glow(hx+hw*.2+8,-hh*.6+8,30,'#ffb860',.4); } } }

SC.nazare = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-200,-170,1.0],[-20,-150,1.45],t/7);
  layer(0,()=>{ meadowSky(1); sunDisk2(380,-250); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); });
  layer(.5,()=>{ ridge(0,60,.008,4,'#b8c890','#d0dca8'); townBelem(0); for(let i=0;i<6;i++) tree(-900+i*330,10,.8,'#7a9a58','#4a6a38'); });
  layer(1,()=>{ ground('#c8c87a','#8a8a4a'); ctx.fillStyle=vgrad(-60,0,[[0,'#c8b89a'],[1,'#9a8a6a']]); rr(-300,-46,70,46,10); ctx.fill(); ell(-265,-46,35,8,'#5a7aa0');
    person('maria',-80,0,{pose:'stand',dir:1}); person('jose',90,0,{pose:'hammer',dir:-1}); ctx.fillStyle=vgrad(-30,0,[[0,'#c8915a'],[1,'#8a5a30']]); rr(130,-24,100,20,6); ctx.fill(); });
};
SC.anjo_maria = t=>{ const k=ss(0,2,t); LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.75;
  const ep=W<700, tx = ep? 10 : (TALK==='maria'? -80 : 40), tz = ep? 1.15 : 1.45; cam.x=lerp(cam.x,tx,.04); // em pé: Maria e o anjo juntos na tela cam.y=lerp(cam.y,-160,.04); cam.z=lerp(cam.z,tz,.04);
  layer(0,()=>{ ctx.fillStyle=vgrad(-H,H,[[0,'#e8d8b8'],[1,'#c8a878']]); ctx.fillRect(-W,-H,W*2,H*2); ctx.fillStyle='rgba(255,240,200,.25)'; rr(-180,-320,120,170,60); ctx.fill(); godRays(80,-700,800,.3*k,G,'#fff0c0'); });
  layer(1,()=>{ ctx.fillStyle=vgrad(0,300,[[0,'#b89870'],[1,'#7a5a3a']]); ctx.fillRect(-2000,0,4000,800);
    person('maria',-110,0,{pose: TALK==='maria'? 'pray' : 'lookup', dir:1, up:true});
    ctx.save(); ctx.globalAlpha=k; angel(130,-20-Math.sin(G*1.4)*8,1,'open'); ctx.restore(); });
};
SC.viagem = t=>{ const k=ss(0,6,t); LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.7; setCam([-300,-170,1.1],[100,-170,1.15],t/7);
  layer(0,()=>{ nightSky(k*.8); sunDisk2(-380,lerp(-120,40,k),44); });
  layer(.2,()=>ridge(-30,110,.004,2,mix('#e0b890','#4a4a7a',k*.8),mix('#f0d0a8','#5a5a8a',k*.8)));
  layer(.5,()=>{ ridge(0,50,.008,4,mix('#d8c08a','#3a4060',k*.8),mix('#e8d4a0','#4a5070',k*.8)); });
  layer(1,()=>{ ground(mix('#d8c08a','#4a5070',k*.7),mix('#a8905a','#2a3048',k*.7)); const x=lerp(-420,260,t/8); donkey(x,0,1.15,1,true); person('maria',x+6,-46,{pose:'sit',dir:1,s:.9}); person('jose',x+80,0,{pose:'walk',dir:1}); });
};
SC.belem = t=>{ LIGHT.dx=1; LIGHT.rim='#ffd890'; LIGHT.rimA=.6; setCam([-120,-180,1.15],[60,-160,1.45],t/7);
  layer(0,()=>{ nightSky(1); });
  layer(.5,()=>{ ridge(0,40,.008,4,'#2a3048','#3a4060'); townBelem(1); });
  layer(1,()=>{ ground('#4a5070','#2a3048'); ctx.fillStyle='#6a5040'; ctx.fillRect(140,-200,160,200); ctx.fillStyle='#ffd27a'; rr(190,-110,60,110,8); ctx.fill(); glow(220,-60,120,'#ffb860',.5);
    donkey(-160,0,1,1,false); person('maria',-150,-46,{pose:'sit',dir:1,s:.9}); person('jose',40,0,{pose: TALK==='jose'? 'open':'stand',dir:-1}); });
};
SC.estabulo = t=>{ LIGHT.dx=1; LIGHT.rim='#ffd890'; LIGHT.rimA=.8; setCam([0,-200,.85],[0,-120,1.5],t/7);
  layer(0,()=>{ nightSky(1); bigStar(0,-420,1); });
  layer(1,()=>{ ground('#4a5070','#2a3048'); stable(0,0,1); ox(-200,0,.95,1); donkey(210,0,.95,-1,false); animal('ovelha',-90,12,.9,1,1); animal('ovelha',120,16,.85,-1,2);
    manger(0,0,1.1,true); person('maria',-90,0,{pose:'kneel',dir:1}); person('jose',90,0,{pose:'stand',dir:-1}); });
};
SC.pastores = t=>{ LIGHT.dx=1; LIGHT.rim='#cfd8ff'; LIGHT.rimA=.4; setCam([-160,-170,1.05],[40,-160,1.3],t/5);
  layer(0,()=>{ nightSky(1); glow(-330,-260,140,'#e8eeff',.3); ell(-330,-260,28,28,'#f4f1e2'); });
  layer(.5,()=>{ ridge(0,60,.008,4,'#2a3a48','#3a4a58'); });
  layer(1,()=>{ ground('#3a5a48','#1e3020'); [[-360,10],[-260,20],[220,8],[320,18],[400,4]].forEach(([x,y],i)=>animal('ovelha',x,y,.85,i%2?1:-1,i));
    ell(0,6,34,8,'#3a2a1a'); for(let i=0;i<5;i++){ const fl=Math.sin(G*12+i)*4; ctx.fillStyle=['#ffb030','#ff7a20','#ffe060'][i%3]; ctx.beginPath(); ctx.moveTo(-14+i*7,0); ctx.quadraticCurveTo(-10+i*7+fl,-34-i%2*10,-6+i*7,0); ctx.fill(); } glow(0,-20,160,'#ffb050',.45);
    person('pastor1',-100,0,{pose:'sit',dir:1}); person('pastor2',100,0,{pose:'sit',dir:-1,ph:1}); });
};
SC.anjos_ceu = t=>{ const k=ss(0,1.5,t); LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.8; setCam([0,-200,1.1],[0,-260,.75],t/10);
  layer(0,()=>{ nightSky(1); glow(0,-300,lerp(100,700,k),'#fff4c8',.55*k); godRays(0,-700,800,.3*k,G,'#fff0c0'); });
  layer(.5,()=>{ ridge(0,60,.008,4,'#2a3a48','#3a4a58'); });
  layer(1,()=>{ ground('#3a5a48','#1e3020'); [[-360,10],[-260,20],[220,8],[320,18]].forEach(([x,y],i)=>animal('ovelha',x,y,.85,i%2?1:-1,i));
    person('pastor1',-120,0,{pose:'lookup',dir:1,up:true}); person('pastor2',110,0,{pose:'lookup',dir:-1,up:true,ph:1});
    ctx.save(); ctx.globalAlpha=k; angel(0,-230+Math.sin(G*1.3)*8,1.15,'armsup'); ctx.restore();
    const many=ss(5,8,t); if(many>0){ ctx.save(); ctx.globalAlpha=many; for(let i=0;i<8;i++){ const ax=-560+i*160+(i>3?40:-40), ay=-330-((i*53)%120)+Math.sin(G*1.5+i)*10; angel(ax,ay,.55,'armsup'); } ctx.restore(); } });
};
SC.estabulo2 = t=>{ LIGHT.dx=1; LIGHT.rim='#ffd890'; LIGHT.rimA=.8; setCam([0,-150,1.3],[0,-170,1.0],t/6);
  layer(0,()=>{ nightSky(1); bigStar(0,-420,1); });
  layer(1,()=>{ ground('#4a5070','#2a3048'); stable(0,0,1); ox(-230,0,.9,1); donkey(240,0,.9,-1,false); manger(0,0,1.1,true); person('maria',-90,0,{pose:'kneel',dir:1}); person('jose',90,0,{pose:'stand',dir:-1});
    const q=ss(0,3,t); person('pastor1',lerp(-420,-170,q),0,{pose: q<1? 'walk':'kneel',dir:1}); person('pastor2',lerp(420,170,q),0,{pose: q<1? 'walk':'kneel',dir:-1,ph:1}); animal('ovelha',lerp(-500,-240,q),14,.8,1,3); });
};
SC.magos = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.6; setCam([-300,-220,.9],[200,-220,.95],t/7); if(W<700){ cam.x=lerp(-600,240,t/7.5)-60; cam.z=.75; } // em pé: a câmera acompanha os 3 camelos
  layer(0,()=>{ nightSky(.85); bigStar(W<700? 110 : 380,-380,1.2); });
  layer(.2,()=>ridge(-30,110,.004,2,'#3a3a6a','#4a4a7a')); layer(.5,()=>{ ridge(0,40,.008,5,'#4a4060','#5a5070'); });
  layer(1,()=>{ ground('#7a6a5a','#4a3e34'); const x=lerp(-600,240,t/7.5); camel(x-200,0,1,1,true,'mago3'); camel(x-60,0,1,1,true,'mago2'); camel(x+80,0,1,1,true,'mago1'); });
};
SC.presentes = t=>{ LIGHT.dx=1; LIGHT.rim='#ffd890'; LIGHT.rimA=.8; const ep=W<700, tx = ep? 30 : (TALK==='maria'? -90 : 40); cam.x=lerp(cam.x,tx,.03); cam.y=lerp(cam.y,-140,.03); cam.z=lerp(cam.z,ep? .9 : (TALK?1.5:1.1),.03); // em pé: José, Maria e os 3 sábios na tela
  layer(0,()=>{ nightSky(1); bigStar(0,-420,1); });
  layer(1,()=>{ ground('#4a5070','#2a3048'); stable(0,0,1); manger(-20,0,1.05,true); person('maria',-110,0,{pose: TALK==='maria'?'open':'kneel',dir:1}); person('jose',-200,0,{pose:'stand',dir:1});
    const gifts=[['mago1',80,'#f2c24a'],['mago2',170,'#c0a0e8'],['mago3',260,'#a8d8a0']];
    gifts.forEach(([id,x,c],i)=>{ person(id,x,0,{pose:'kneel',dir:-1,ph:i}); ctx.fillStyle=vgrad(-30,-6,[[0,c],[1,mix(c,'#000000',.3)]]); rr(x-44,-30,24,22,5); ctx.fill(); glow(x-32,-20,26,'#fff2c0',.5); }); });
};
//@@ROTEIRO
const CH=[ 'O anúncio', 'A viagem até Belém', 'Os pastores', 'A estrela e os presentes' ];
const N=(t)=>({who:'Narrador',text:t}), ANJ=t=>({who:'Anjo',text:t}), MAR=t=>({who:'Maria',text:t,talk:'maria'}), JOS=t=>({who:'José',text:t,talk:'jose'});
const SCRIPT=[
  {card:0},
  {sc:'nazare', ...N('Em Nazaré, vivia uma jovem chamada Maria. Ela amava a Deus, e ia se casar com José, um carpinteiro.')},
  {sc:'anjo_maria', ...ANJ('Alegre-se, Maria! Você vai ter um filho, e vai chamá-lo Jesus. Ele é o Filho de Deus! (Lucas 1:31-35)')},
  {sc:'anjo_maria', ...MAR('Eu sou serva do Senhor. Que aconteça comigo como você disse. (Lucas 1:38)')},
  {card:1},
  {sc:'viagem', ...N('O imperador mandou todos se registrarem na sua cidade. Então José e Maria viajaram até Belém. (Lucas 2:4)')},
  {sc:'belem', ...JOS('Não tem lugar nas casas... mas o dono nos ofereceu um estábulo. Lá, pelo menos, fica quentinho.')},
  {sc:'estabulo', ...N('E foi ali, num estábulo simples, entre os animais, que Jesus nasceu. Maria o deitou numa manjedoura. (Lucas 2:7)')},
  {card:2},
  {sc:'pastores', ...N('Naquela noite, uns pastores cuidavam das ovelhas no campo. (Lucas 2:8)')},
  {sc:'anjos_ceu', ...ANJ('Não tenham medo! Hoje nasceu o Salvador, que é Cristo, o Senhor! Vocês vão encontrá-lo numa manjedoura. (Lucas 2:10-12)')},
  {sc:'anjos_ceu', ...N('E o céu se encheu de anjos, cantando: Glória a Deus nas alturas, e paz na terra! (Lucas 2:14)')},
  {sc:'estabulo2', ...N('Os pastores correram até Belém, e encontraram o bebê, do jeitinho que o anjo falou. (Lucas 2:16)')},
  {card:3},
  {sc:'magos', ...N('Do Oriente, uns sábios viram uma estrela diferente no céu, e seguiram a estrela até encontrar Jesus. (Mateus 2:2)')},
  {sc:'presentes', ...N('Eles se ajoelharam, e deram presentes: ouro, incenso e mirra. (Mateus 2:11)')},
  {sc:'presentes', ...MAR('Deus nos deu o melhor presente de todos: o seu próprio Filho.')},
  {summary:true, sc:'presentes', ...N('Hoje aprendemos: Jesus é o maior presente de Deus para o mundo, porque Deus ama você.')},
];
let vi=0; SCRIPT.forEach(l=>{ if(l.card==null){ vi++; l.rec='v'+String(vi).padStart(2,'0'); } else l.rec='c'+(l.card+1); });
function lineDur(l){ if(l.card!=null) return Math.max(3.4,(REC_DUR[l.rec]||2)+1.2); if(l.rec && REC_DUR[l.rec]) return REC_DUR[l.rec]+.7; return Math.max(4, l.text.replace(/\(.*?\)/g,'').length*.068)+.8; }
SCRIPT.forEach(l=>{ if(l.card==null && (l.sc==='viagem'||l.sc==='magos'||l.sc==='estabulo')) l.dur=Math.max(lineDur(l),7.4); });
let T0=0; SCRIPT.forEach(l=>{ l.start=T0; if(!l.dur) l.dur=lineDur(l); T0+=l.dur; }); const TOTAL=T0;
SCRIPT.forEach((l,i)=>{ if(l.card!=null){ const nx=SCRIPT[i+1]; l.sc=nx.sc; } });
const chapterStarts=SCRIPT.map((l,i)=>l.card!=null?i:-1).filter(i=>i>=0);
//@@MOOD
const MOOD={ nazare:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], anjo_maria:[[64,67,71,76],[60,64,67,72],[65,69,72,77],[67,71,74,79]], viagem:[[57,60,64],[53,57,60],[55,59,62],[60,64,67]],
  belem:[[57,60,64],[52,55,59],[53,57,60],[55,59,62]], estabulo:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]], pastores:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]],
  anjos_ceu:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]], estabulo2:[[60,64,67,72],[65,69,72,76],[67,71,74,79],[60,64,67,72]], magos:[[57,60,64,69],[55,59,62,67],[53,57,60,65],[52,56,59,64]],
  presentes:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: A Estrela de Belém (3 fases) =================
   Fase 1 · Monte o presépio: arraste cada um para o seu lugar (contorno brilhante).
   Fase 2 · As ovelhinhas perdidas: toque nos arbustos para achar 5 ovelhinhas.
   Fase 3 · Siga a estrela: toque na tela para o camelo pular as pedras até Belém.
   Ninguém perde: errar só faz a peça voltar ou o camelo tropeçar. */
let MODE='film';
const GS={};
const NPH=[
  { name:'Fase 1 · Monte o presépio', voice:['n1','Agora é a sua vez! Fase um: arrume o presépio. Arraste cada um para o seu lugar.'] },
  { name:'Fase 2 · As ovelhinhas perdidas', voice:['n2','Fase dois: os pastores perderam umas ovelhinhas na noite. Toque nos arbustos para encontrá-las!'] },
  { name:'Fase 3 · Siga a estrela', voice:['n3','Fase três: siga a estrela! Toque na tela para o camelo pular as pedras.'] },
];
const SLOTS=[ {id:'manjedoura',x:0,y:0}, {id:'maria',x:-100,y:0}, {id:'jose',x:100,y:0}, {id:'boi',x:-230,y:0}, {id:'burro',x:235,y:0}, {id:'ovelha',x:-150,y:16}, {id:'estrela',x:0,y:-370} ];
const BUSHES=[[-460,-6],[-330,10],[-200,-4],[-70,12],[60,-2],[190,10],[320,-4],[450,8]];
function gameReset(){ GS.badBy=[0,0,0]; loadPhase(1); }
function loadPhase(n){ Object.assign(GS,{ phase:n, banner:2.8, finished:false, finT:0, ended:false, cool:GS.cool||0,
    queue: n===1? ['manjedoura','maria','jose','boi','burro','ovelha','estrela'] : [], placed:[], cur:null, drag:false, px:0, py:0, wrongT:0,
    bush: n===2? (()=>{ const ix=[...Array(8).keys()].sort(()=>Math.random()-.5).slice(0,5); return BUSHES.map((b,i)=>({x:b[0],y:b[1],has:ix.includes(i),open:false,t:0})); })() : [], got:0,
    cx:0, cy:0, vy:0, ground:true, rocks:[], sparks:[], hurt:0, slow:0, dist:0, END:2600, items:0 });
  camFor(); if(n===1) nextItem(); if(n===3){ const r=[]; for(let i=0;i<9;i++) r.push({x:500+i*250+Math.random()*80, hit:false}); GS.rocks=r; const s=[]; for(let i=0;i<14;i++) s.push({x:420+i*160, y:-110-Math.random()*90, got:false}); GS.sparks=s; }
  $('gAn').textContent=NPH[n-1].name.split(' · ')[0]; hud(); gsay(NPH[n-1].voice[0],NPH[n-1].voice[1],true); }
function hud(){ const n=GS.phase; $('gGol').textContent = n===1? ('⭐ '+GS.placed.length+' / 7') : (n===2? ('🐑 '+GS.got+' / 5') : ('✨ '+GS.items)); }
function camFor(){ const narrow=W<700; if(GS.phase===1){ cam.x=0; cam.y=-170; cam.z=narrow? .72 : .9; } else if(GS.phase===2){ cam.x=0; cam.y=-120; cam.z=narrow? .7 : 1.05; } }
function nextItem(){ GS.cur=GS.queue.shift()||null; GS.idle=0; const sp=spawnWorld(); GS.px=sp.x; GS.py=sp.y; }
function spawnWorld(){ return { x:cam.x, y: cam.y+ (H*(.70-CY))/(ZOOM*cam.z*PZ()) }; }
let gsubT=0;
function gsay(key,text,force,who){ if(!force && GS.cool>0) return; GS.cool=1.2; speak({rec:key,text}); whoEl.textContent=who||'Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){ MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false;
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume(); gameReset(); }
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toWorld(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const lx=(e.clientX*dpr-offX)/K, ly=e.clientY*dpr/K; const z=ZOOM*cam.z*PZ(); return { x:(lx-W/2)/z+cam.x, y:(ly-H*CY)/z+cam.y }; }
function slotOf(id){ return SLOTS.find(s=>s.id===id); }
function gameTap(e){ if(AC) AC.resume(); const w=toWorld(e); const g=GS; if(g.banner>1.6||g.finished) return;
  if(g.phase===1 && g.cur){ const off=g.cur==='estrela'? 0 : 60; if(Math.hypot(w.x-g.px,w.y-(g.py-off))<120){ g.drag=true; g.ox=g.px-w.x; g.oy=g.py-w.y; pluck(74,.05); } }
  else if(g.phase===2){ for(const b of g.bush){ if(b.open) continue; if(Math.hypot(w.x-b.x,w.y-(b.y-30))<70){ b.open=true; b.t=0;
        if(b.has){ g.got++; hud(); pluck(79,.07); pluck(84,.06,.08); if(g.got>=5){ finishPhase(); } else gsay('n6','Achou uma ovelhinha!',true); }
        else { g.badBy[1]++; pluck(52,.07); gsay('n7','Aqui não tem nada... tente outro arbusto.'); } return; } } }
  else if(g.phase===3){ if(g.ground){ g.vy=-640; g.ground=false; pluck(72,.05); } } }
cv.addEventListener('pointermove',e=>{ if(MODE!=='game'||!GS.drag) return; const w=toWorld(e); GS.px=w.x+GS.ox; GS.py=w.y+GS.oy; });
addEventListener('pointerup',()=>{ if(MODE!=='game'||!GS.drag) return; GS.drag=false; const g=GS, s=slotOf(g.cur);
  if(Math.hypot(g.px-s.x,g.py-s.y)<90){ g.placed.push(g.cur); pluck(79,.07); pluck(84,.06,.08); hud(); if(g.placed.length%3===0) gsay('n4','Muito bem!'); if(g.queue.length) nextItem(); else { g.cur=null; finishPhase(); } }
  else { g.badBy[0]++; g.wrongT=.5; gsay('n5','Ops! Esse lugar é de outro.'); const sp=spawnWorld(); g.px=sp.x; g.py=sp.y; pluck(52,.07); } });
addEventListener('keydown',e=>{ if(MODE==='game' && GS.phase===3 && (e.key===' '||e.key==='ArrowUp')){ e.preventDefault(); if(GS.ground){ GS.vy=-640; GS.ground=false; } } });
function finishPhase(){ const g=GS; g.finished=true; g.finT=0; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12));
  if(g.phase<3) gsay('n4','Muito bem!',true); else gsay('n8','Parabéns! Vocês chegaram até Jesus, o maior presente de Deus!',true); }
function gameUpdate(dt){ const g=GS; if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); } if(g.banner>0) g.banner-=dt; if(g.wrongT>0) g.wrongT-=dt;
  for(const b of g.bush) if(b.open) b.t+=dt;
  if(g.finished){ g.finT+=dt; if(g.phase<3 && g.finT>3){ loadPhase(g.phase+1); return; }
    if(g.phase===3 && g.finT>5 && !g.ended){ g.ended=true; const per=g.badBy.map(b=>b===0?3:(b<=2?2:1)); const st=Math.round(per.reduce((a,b)=>a+b,0)/3);
      $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent=NPH.map((P2,i)=>P2.name.split(' · ')[0]+': '+'⭐'.repeat(per[i])).join('  ·  '); $('gwin').hidden=false; } }
  if(g.phase===1 && g.cur && !g.drag){ g.idle+=dt; const sp=spawnWorld(); g.px=lerp(g.px,sp.x,.2); g.py=lerp(g.py,sp.y,.2); }
  if(g.phase===3){ const narrow=W<700;
    if(!g.finished && g.banner<1.4){ const sp=(g.slow>0?110:220); g.cx+=sp*dt; g.dist=g.cx; }
    else if(g.finished) g.cx+=60*dt;
    g.vy+=1700*dt; g.cy+=g.vy*dt; if(g.cy>=0){ g.cy=0; g.vy=0; g.ground=true; }
    if(g.hurt>0) g.hurt-=dt; if(g.slow>0) g.slow-=dt;
    for(const r of g.rocks){ if(!r.hit && Math.abs(r.x-(g.cx+30))<44 && g.cy>-40){ r.hit=true; g.hurt=1; g.slow=.8; g.badBy[2]++; pluck(50,.08); gsay('n9','Ai! Cuidado com a pedra!'); } }
    for(const s of g.sparks){ if(!s.got && Math.abs(s.x-(g.cx+30))<50 && Math.abs(s.y-(g.cy-110))<70){ s.got=true; g.items++; hud(); pluck(88,.05); } }
    if(!g.finished && g.cx>=g.END) finishPhase();
    cam.z=narrow? .62 : .9; cam.x=g.cx+(narrow? 140 : 260); cam.y=-200; }
}
function drawSlotItem(id,x,y,a){ ctx.save(); ctx.globalAlpha=a;
  if(id==='manjedoura') manger(x,y,1.1,true); else if(id==='maria') person('maria',x,y,{pose:'kneel',dir:1}); else if(id==='jose') person('jose',x,y,{pose:'stand',dir:-1});
  else if(id==='boi') ox(x,y,.95,1); else if(id==='burro') donkey(x,y,.95,-1,false); else if(id==='ovelha') animal('ovelha',x,y,.9,1,1); else if(id==='estrela') bigStar(x,y,.8);
  ctx.restore(); }
function gameDraw(){ const g=GS; LIGHT.dx=1; LIGHT.rim='#ffd890'; LIGHT.rimA=.7;
  if(g.phase===1){
    layer(0,()=>{ nightSky(1); if(g.placed.includes('estrela')) bigStar(0,-370,1); });
    layer(1,()=>{ ground('#4a5070','#2a3048'); stable(0,0,1);
      for(const s of SLOTS){ if(g.placed.includes(s.id)) continue; const pulse=.5+.5*Math.sin(G*4); ctx.save(); ctx.globalAlpha=.18+.12*pulse; drawSlotItem(s.id,s.x,s.y,1); ctx.restore(); ctx.strokeStyle=`rgba(255,236,160,${.35+.3*pulse})`; ctx.lineWidth=3; ctx.setLineDash([8,7]); ctx.beginPath(); ctx.ellipse(s.x,s.y-(s.id==='estrela'?0:40),70,s.id==='estrela'?40:60,0,0,7); ctx.stroke(); ctx.setLineDash([]); }
      for(const id of ['boi','burro','ovelha','manjedoura','maria','jose']) if(g.placed.includes(id)){ const s=slotOf(id); drawSlotItem(id,s.x,s.y,1); }
      if(g.cur){ const sh=g.wrongT>0? Math.sin(G*50)*6 : 0; if(!g.drag){ ell(g.px,g.py-50,80,70,'rgba(251,243,227,.18)'); } drawSlotItem(g.cur,g.px+sh,g.py,1); } }); }
  else if(g.phase===2){
    layer(0,()=>{ nightSky(1); glow(-330,-260,140,'#e8eeff',.3); ell(-330,-260,28,28,'#f4f1e2'); });
    layer(.5,()=>{ ridge(0,60,.008,4,'#2a3a48','#3a4a58'); });
    layer(1,()=>{ ground('#3a5a48','#1e3020'); person('pastor1',-560,0,{pose:'stand',dir:1}); ell(-470,6,26,6,'#3a2a1a'); glow(-470,-14,120,'#ffb050',.4);
      for(const b of g.bush){ const sh=b.open? 0 : Math.sin(G*1.4+b.x)*2; if(b.open && b.has){ const k=Math.min(1,b.t*3); animal('ovelha',b.x,b.y+4-k*20,.9*k,1,b.x); }
        ctx.save(); if(b.open) ctx.globalAlpha=b.has? .45 : .6; shade(b.x-24+sh,b.y-18,26,22,'#3f7a48','#264a2e'); shade(b.x+24+sh,b.y-16,24,20,'#3f7a48','#264a2e'); shade(b.x+sh,b.y-34,30,26,'#4f8a58','#2f5a38'); ctx.restore();
        if(b.open && !b.has) txt2('🍃',b.x+30,b.y-60,18,'#fff'); } }); }
  else {
    layer(0,()=>{ nightSky(.9); bigStar(W*.3,-380,1.1); });
    layer(.2,()=>ridge(-30,110,.004,2,'#3a3a6a','#4a4a7a',8000)); layer(.5,()=>{ ridge(0,40,.008,5,'#4a4060','#5a5070',8000); });
    layer(1,()=>{ ground('#7a6a5a','#4a3e34'); ctx.save(); ctx.translate(g.END+420,0); stable(0,0,.7); ctx.restore(); bigStar(g.END+420,-330,.8);
      for(const r of g.rocks){ shade(r.x,-16,30,20,'#a8a49a','#6e6a62'); ell(r.x-8,-24,8,4,'rgba(255,255,255,.35)'); }
      for(const s of g.sparks) if(!s.got){ glow(s.x,s.y,30,'#fff2c0',.5); starShape(s.x,s.y+Math.sin(G*3+s.x)*5,10,'#ffe88a'); }
      ctx.save(); if(g.hurt>0 && Math.floor(G*12)%2) ctx.globalAlpha=.5; camel(g.cx,g.cy,1,1,g.ground && !g.finished,'mago1'); ctx.restore(); }); }
  if(g.banner<=0 && !g.finished){ const msg = g.phase===1? '👆 Arraste para o lugar que brilha' : (g.phase===2? '👆 Toque nos arbustos' : (g.cx<300? '👆 Toque para pular' : '')); if(msg){ ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 20px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(30,40,60,.55)'; ctx.lineWidth=5; ctx.strokeText(msg,W/2,H*.94); ctx.fillText(msg,W/2,H*.94); ctx.restore(); } }
  if(g.banner>0){ const a=Math.min(1,g.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw2=Math.min(460,W-40); ctx.fillStyle='rgba(251,243,227,.96)'; rr(W/2-bw2/2,H*.24-36,bw2,64,14); ctx.fill();
    ctx.font='800 24px Fraunces, Georgia, serif'; ctx.textAlign='center'; ctx.fillStyle='#3a2c24'; ctx.fillText(NPH[g.phase-1].name,W/2,H*.24+6); ctx.restore(); }
}
function txt2(t,x,y,size,c){ ctx.save(); ctx.font='800 '+size+'px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle=c; ctx.fillText(t,x,y); ctx.restore(); }
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_natal_visto')) $('coverGame').hidden=false; }catch(e){}
