//@@CAST
const CAST={
  davi:{ robe:['#e8d9a8','#b8a070'], sash:'#8a5a34', skin:['#f6cfa6','#e2ab7c'], hair:'#b4582a', curly:true, s:.8 },
  golias:{ robe:['#e6b862','#94621f'], armor:true, sash:'#5a2a1a', skin:['#d8a07a','#b07850'], hair:'#2a1a10', beard:true, beardC:'#2e1e12', helmet:true, s:2.3 },
  saul:{ robe:['#9a6ac8','#5a3a8a'], sash:'#e8b860', skin:['#e8b88a','#c8946a'], hair:'#3a2a1a', beard:true, beardC:'#3a2a1a', crown:true, s:1.02 },
  soldado:{ robe:['#a8805a','#6e4e32'], sash:'#5a3a22', skin:['#e2ab7c','#c48a5a'], hair:'#3a2a1a', cap:'#8a6a48', s:.95 },
  irmao:{ robe:['#7a9ac0','#4a6a90'], sash:'#5a3a22', skin:['#f0c39a','#d69b6c'], hair:'#4a3320', cap:'#7a5a3a', s:.97 },
};
//@@SCENES
/* ===== peças das cenas de Davi ===== */
function harp(){ ctx.save(); ctx.translate(16,-52); ctx.strokeStyle='#b8782e'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,22); ctx.quadraticCurveTo(-4,-6,12,-18); ctx.lineTo(18,20); ctx.closePath(); ctx.stroke();
  ctx.strokeStyle='rgba(255,240,200,.8)'; ctx.lineWidth=1; for(let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(3+i*4,18); ctx.lineTo(3+i*4,-8+i*2); ctx.stroke(); } ctx.restore(); }
function bush(x,y,s){ shade(x,y-16*s,34*s,22*s,'#6fa858','#3f7034'); shade(x-24*s,y-8*s,22*s,16*s,'#6fa858','#3f7034'); shade(x+24*s,y-8*s,22*s,16*s,'#6fa858','#3f7034'); }
function tent(x,y,s,c1,c2){ ctx.fillStyle=vgrad(y-80*s,y,[[0,c1],[1,c2]]); ctx.beginPath(); ctx.moveTo(x-60*s,y); ctx.lineTo(x,y-80*s); ctx.lineTo(x+60*s,y); ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(40,25,15,.35)'; ctx.beginPath(); ctx.moveTo(x-12*s,y); ctx.lineTo(x,y-40*s); ctx.lineTo(x+12*s,y); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#6b4a2a'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y-80*s); ctx.lineTo(x,y-96*s); ctx.stroke(); }
function flag(x,y,c){ ctx.strokeStyle='#5a3a22'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-70); ctx.stroke(); const w=Math.sin(G*4+x)*4; ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(x,y-70); ctx.quadraticCurveTo(x+20,y-66+w,x+38,y-62); ctx.lineTo(x+36,y-46); ctx.quadraticCurveTo(x+18,y-50+w,x,y-48); ctx.closePath(); ctx.fill(); }
function crowd(cx,cy,n,spread,cols,helm,mode){ // soldadinhos ao longe
  for(let i=0;i<n;i++){ const x=cx+((i*53.7)%spread)-spread/2, y=cy+((i*17)%30); let hop=0, dx=0;
    if(mode==='cheer') hop=Math.max(0,Math.sin(G*9+i))*8; if(mode==='fear') dx=Math.sin(G*30+i)*1.2; if(mode==='flee') dx=((G*60+i*13)%400);
    shade(x+dx,y-12-hop,7,11,cols[i%cols.length],mix(cols[i%cols.length],'#000000',.3)); ell(x+dx,y-27-hop,5.5,5.5,'#e2ab7c'); if(helm) shade(x+dx,y-30-hop,6,3.5,helm,mix(helm,'#000000',.3)); } }
function hills(r){ // os dois montes com o vale no meio
  ctx.fillStyle=vgrad(-200,120,[[0,mix('#b8c47a','#8a8a5a',r)],[1,mix('#8aa058','#5a6a3a',r)]]);
  ctx.beginPath(); ctx.moveTo(-1500,200); ctx.lineTo(-1500,-60); ctx.quadraticCurveTo(-560,-230,-200,-20); ctx.lineTo(200,-20); ctx.quadraticCurveTo(560,-230,1500,-60); ctx.lineTo(1500,200); ctx.fill(); }
function valleyBack(warm,people){
  layer(0,()=>{ sky(mix('#7cc6ec','#6a8ac0',warm),mix('#cfeaf4','#f2c8a0',warm),mix('#fbe7c4','#f6b878',warm)); glow(-300,-180,260,'#ffe0a8',.6); ell(-300,-180,38,38,'#fff0c8');
    for(let i=0;i<5;i++) cloud(((i*330+G*6)%1600)-800,-280+(i%2)*40,.9,'#ffffff',mix('#e6e0ea','#f0c0a0',warm),.85); });
  layer(.2,()=>ridge(-40,110,.004,7,mix('#b9cfe0','#c8a8a8',warm),'#d8c8c0'));
  layer(.5,()=>{ hills(0); if(people!==false){ crowd(-560,-150,26,300,['#a8805a','#7a9ac0','#c9b48a'],null,people==='cheer'?'cheer':(people==='fear'?'fear':null)); crowd(560,-150,26,300,['#8a3a2a','#6b4a3a','#a5562f'],'#d4a052',people==='cheer'?'flee':null);
    tent(-760,-130,1,'#e8dcc0','#b8a080'); tent(-640,-170,.8,'#e8dcc0','#b8a080'); tent(740,-130,1,'#b05a3a','#7a3a22'); tent(640,-170,.8,'#b05a3a','#7a3a22'); flag(-470,-190,'#3a6fb0'); flag(470,-190,'#9a2a1a'); } });
}
function valleyFloor(){ ctx.fillStyle=vgrad(0,300,[[0,'#c9b070'],[.12,'#b89a5a'],[1,'#7a6036']]); ctx.fillRect(-2000,0,4000,800);
  ctx.fillStyle='rgba(120,90,50,.25)'; for(let i=0;i<40;i++){ ell(((i*97)%2400)-1200, 14+((i*31)%80), 10+(i%4)*4, 3, 'rgba(120,90,50,.22)'); }
  ctx.strokeStyle=rgba('#6a7a3a',.35); ctx.lineWidth=2; ctx.lineCap='round'; for(let x=-1200;x<1200;x+=34){ ctx.beginPath(); ctx.moveTo(x,6); ctx.lineTo(x-3,-4); ctx.stroke(); } }
function dizzyStars(x,y,r){ for(let i=0;i<5;i++){ const a=G*3+i*1.256; const sx=x+Math.cos(a)*r, sy=y+Math.sin(a)*r*.35; ctx.fillStyle='#ffe08a'; ctx.beginPath(); for(let k=0;k<10;k++){ const rr2=k%2?3:8, an=-Math.PI/2+k*Math.PI/5; k?ctx.lineTo(sx+Math.cos(an)*rr2,sy+Math.sin(an)*rr2):ctx.moveTo(sx+Math.cos(an)*rr2,sy+Math.sin(an)*rr2); } ctx.closePath(); ctx.fill(); } }
// Golias: em pé, rindo, ou caindo de costas (sem violência: cai e fica zonzo)
function goliath(x,fall,o){ o=o||{}; ctx.save(); ctx.translate(x,0); const a=ease(clamp(fall,0,1))*1.5; ctx.rotate(a);
  person('golias',0,0,{pose: fall>0? 'open' : (o.pose||'spear'), dir:-1});
  if(fall>=1) dizzyStars(0,-205,46);
  ctx.restore();
  if(fall>.9 && fall<1.6){ const q=(fall-.9)/.7; for(let i=0;i<9;i++){ const ang=i/9*Math.PI; ctx.fillStyle=`rgba(210,180,130,${.55*(1-q)})`; ell(x+130+Math.cos(ang)*(60+q*160), -10-Math.sin(ang)*q*60, 30+q*30, 18+q*14, ctx.fillStyle); } } }
function davi(x,y,o){ o=o||{}; person('davi',x,y,o); }
const BROOK_STONES=[[-230,62,1],[-160,88,0],[-90,58,1],[-20,92,0],[50,66,1],[120,94,0],[180,56,0],[240,84,1],[-280,96,0],[300,64,1]];
function brook(picked,glowIdx){
  ctx.fillStyle=vgrad(0,40,[[0,'#8fcc6e'],[1,'#6aa653']]); ctx.fillRect(-2000,0,4000,40);
  ctx.fillStyle=vgrad(30,130,[[0,'#7cc4e4'],[1,'#3a86b8']]); ctx.beginPath(); ctx.moveTo(-2000,34); for(let x=-2000;x<=2000;x+=40) ctx.lineTo(x,34+Math.sin(x*.01+G)*3); ctx.lineTo(2000,128); ctx.lineTo(-2000,128); ctx.fill();
  ctx.fillStyle=vgrad(120,400,[[0,'#8fcc6e'],[1,'#4f8a3e']]); ctx.fillRect(-2000,124,4000,600);
  ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=2.5; for(let i=0;i<14;i++){ const xx=((i*137+G*30)%1400)-700, yy=48+(i%4)*18; ctx.beginPath(); ctx.moveTo(xx,yy); ctx.lineTo(xx+26,yy); ctx.stroke(); }
  BROOK_STONES.forEach(([sx,sy,smooth],i)=>{ if(picked && picked[i]) return; const wob = (GS && GS.wob && GS.wob[i]>0)? Math.sin(G*60)*3 : 0;
    if(smooth){ shade(sx+wob,sy,15,10,'#e8e4dc','#9a958c'); ell(sx-5+wob,sy-4,5,2.5,'rgba(255,255,255,.7)'); if(glowIdx) glow(sx,sy,30,'#fff6c8',.25+.15*Math.sin(G*4+i)); }
    else { ctx.fillStyle=vgrad(sy-14,sy+10,[[0,'#8a8278'],[1,'#4e4840']]); ctx.beginPath(); ctx.moveTo(sx-15+wob,sy+8); ctx.lineTo(sx-10+wob,sy-8); ctx.lineTo(sx-2+wob,sy-15); ctx.lineTo(sx+6+wob,sy-6); ctx.lineTo(sx+14+wob,sy-10); ctx.lineTo(sx+16+wob,sy+8); ctx.closePath(); ctx.fill(); } }); }

SC.pasto = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6;
  if(t<7) setCam([-160,-150,1.35],[-60,-130,1.8],t/7); else if(t<14) setCam([-60,-130,1.8],[140,-150,1.35],(t-7)/3); else setCam([140,-150,1.35],[40,-120,2.0],(t-14)/3);
  layer(0,()=>{ meadowSky(1); glow(380,-250,220,'#fff4cc',.55); ell(380,-250,36,36,'#fff4d0'); for(let i=0;i<5;i++) cloud(((i*300+G*8)%1600)-800,-250+(i%2)*50,.8+(i%3)*.2,'#ffffff','#dfe6ee',.9); });
  layer(.2,()=>ridge(-30,110,.004,2,'#b9cfe0','#d7e4ea'));
  layer(.5,()=>{ ridge(0,60,.008,4,'#9fcf8c','#bfe0a4'); for(let i=0;i<9;i++) tree(-900+i*230,10,.7+(i%3)*.12,'#6fb35c','#3f7d3a'); });
  layer(1,()=>{ ground('#8fcc6e','#5a8a46'); shade(-50,-10,40,16,'#a8a49a','#7a766e');
    [[-260,0],[-180,14],[150,6],[230,18],[-330,22],[90,24]].forEach(([sx,sy],i)=>animal('ovelha',sx,sy,.9,i%2?1:-1,i*.3));
    const lionX = t<8.5? 520 : (t<11.5? lerp(520,400,ss(8.5,9.5,t)) : 400+(t-11.5)*260);
    bush(470,0,1); if(t>8 && t<16) animal('leao',lionX,0,1, t<11.5? -1 : 1, 0);
    if(t<7.5) { person('davi',-50,-22,{pose:'sit'}); ctx.save(); ctx.translate(-50,-22); ctx.scale(.8,.8); ctx.translate(0,26); harp(); ctx.restore(); }
    else davi(40,0,{pose: t<14? 'sling' : 'open', up: t>=14}); });
};
SC.vale = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.5; setCam([0,-230,.62],[0,-210,.78],t/8);
  valleyBack(.5,'idle'); layer(1,()=>{ valleyFloor(); }); };
SC.golias = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.6;
  if(t<6) setCam([-40,-160,.9],[60,-250,1.15],t/6); else setCam([60,-250,1.15],[-160,-170,1.3],(t-6)/5);
  valleyBack(.5,'fear');
  layer(1,()=>{ valleyFloor(); goliath(180,0,{pose: TALK==='golias'? 'laugh':'spear'});
    for(let i=0;i<4;i++){ const sx=-360+i*60+Math.sin(G*28+i)*1.6; person(i%2?'soldado':'irmao',sx,4+i*3,{pose:'stand',dir:1,ph:i}); } });
};
SC.acampamento = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.55;
  if(t<6) setCam([-420,-150,1.45],[-150,-140,1.65],t/6); else setCam([-150,-140,1.65],[-110,-130,1.9],(t-6)/4);
  valleyBack(.5,'fear');
  layer(1,()=>{ valleyFloor(); tent(-480,0,1.3,'#e8dcc0','#b8a080'); tent(-330,0,1.1,'#efe2c8','#c0a888'); flag(-240,0,'#3a6fb0');
    person('irmao',-60,0,{pose:'stand',dir:-1}); person('soldado',10,4,{pose:'stand',dir:-1,ph:1});
    const dx = t<5? lerp(-520,-170,ss(0,5,t)) : -170; davi(dx,0,{pose: t<5? 'walk' : (TALK==='davi'? 'point':'stand'), dir: t<5? 1 : 1});
    if(t<5.5){ ctx.save(); ctx.translate(dx+18,-46); ctx.scale(.7,.7); ctx.fillStyle=vgrad(-10,14,[[0,'#c98a4b'],[1,'#8a5a2e']]); rr(-22,-8,44,22,8); ctx.fill(); ell(-8,-10,9,6,'#e8b86a'); ell(8,-12,9,6,'#dda956'); ctx.restore(); } });
};
SC.saul = t=>{ LIGHT.dx=1; LIGHT.rim='#ffcf8a'; LIGHT.rimA=.6;
  const armorT=t-8.2;
  if(t<3.6) setCam([120,-140,1.7],[130,-140,1.85],t/3.6); else if(t<8.2) setCam([130,-140,1.85],[-80,-130,1.9],(t-3.6)/1.2); else setCam([-80,-130,1.9],[-30,-150,1.55],(t-8.2)/3);
  layer(0,()=>{ ctx.fillStyle=vgrad(-H,H,[[0,'#7a2e22'],[.5,'#a8483a'],[1,'#5a1f18']]); ctx.fillRect(-W,-H,W*2,H*2);
    ctx.fillStyle='rgba(255,200,140,.08)'; for(let i=-8;i<8;i++){ ctx.fillRect(i*90,-H,40,H*2); } glow(260,-220,260,'#ffb860',.5); });
  layer(1,()=>{ ctx.fillStyle=vgrad(0,300,[[0,'#6a3a2a'],[1,'#3a1e14']]); ctx.fillRect(-2000,0,4000,800); ctx.fillStyle=vgrad(0,60,[[0,'#c0503a'],[1,'#8a2e22']]); rr(-360,6,720,46,10); ctx.fill();
    ctx.strokeStyle='#e8b860'; ctx.lineWidth=3; ctx.strokeRect(-350,12,700,34);
    ctx.fillStyle='#8a5a34'; ctx.fillRect(250,-130,8,130); glow(254,-140,60,'#ffc070',.8); ell(254,-140,9,12,'#ffe0a0');
    person('saul',150,0,{pose: TALK==='saul'? 'open':'stand', dir:-1});
    const heavy = armorT>0 && armorT<5.5; const wob = heavy? Math.sin(G*5)*10 : 0;
    davi(-110+wob,0,{pose: heavy? 'walk' : (armorT>=5.5? 'armsup' : 'stand'), dir:1});
    if(heavy){ ctx.save(); ctx.translate(-110+wob,0); ctx.scale(.8,.8); ctx.rotate(Math.sin(G*5)*.06);
      ctx.fillStyle=vgrad(-80,-8,[[0,'#f0c070'],[1,'#9a6a28']]); rr(-36,-82,72,74,16); ctx.fill(); ctx.strokeStyle='rgba(90,50,10,.4)'; ctx.lineWidth=2; for(let yy=-74;yy<-12;yy+=10){ ctx.beginPath(); ctx.moveTo(-34,yy); ctx.lineTo(34,yy); ctx.stroke(); }
      shade(0,-96,30,26,'#f2c878','#a87028'); ctx.fillStyle='#9a2a1a'; rr(-4,-138,8,26,4); ctx.fill(); ctx.restore(); } });
};
SC.riacho = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-120,-80,1.9],[-40,-70,2.15],t/7);
  layer(0,()=>{ meadowSky(1); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-260+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); });
  layer(.5,()=>{ ridge(0,60,.008,4,'#9fcf8c','#bfe0a4'); for(let i=0;i<9;i++) tree(-900+i*230,10,.7+(i%3)*.12,'#6fb35c','#3f7d3a'); });
  layer(1,()=>{ const picked={}; let n=0; BROOK_STONES.forEach((s,i)=>{ if(s[2]){ if(t>1.2+n*.9) picked[i]=true; n++; } }); brook(picked,false);
    davi(-120,6,{pose:'kneel',dir:1}); shade(-150,-14,10,12,'#8a5a2e','#5a3a1e'); });
};
SC.duelo = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.65;
  const tx = TALK==='golias'? 150 : (TALK==='davi'? -180 : 0), tz = TALK==='davi'? 1.6 : (TALK? 1.15 : .95), ty = TALK==='golias'? -230 : (TALK==='davi'? -120 : -160);
  cam.x=lerp(cam.x,tx,.035); cam.y=lerp(cam.y,ty,.035); cam.z=lerp(cam.z,tz,.035);
  valleyBack(.6,'idle');
  layer(1,()=>{ valleyFloor(); goliath(200,0,{pose: TALK==='golias'? 'laugh':'spear'}); davi(-200,0,{pose: TALK==='davi'? 'open' : 'sling', dir:1}); });
};
SC.funda = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.7;
  const hitT=3.4, fall = t<hitT? 0 : (t-hitT)/1.3;
  let sx=-200+26*.8, sy=-104*.8, flying = t>2.2 && t<hitT;
  if(flying){ const q=(t-2.2)/(hitT-2.2); sx=lerp(-180,180,q); sy=lerp(-84,-200,q)-Math.sin(q*Math.PI)*50; }
  if(t<2.2) setCam([-80,-170,.95],[-170,-130,1.4],t/2.2); else if(flying){ cam.x=lerp(cam.x,sx,.12); cam.y=lerp(cam.y,sy,.12); cam.z=lerp(cam.z,1.7,.05); } else setCam([150,-200,1.5],[60,-180,.85],(t-hitT)/2);
  valleyBack(.6,'fear');
  layer(1,()=>{ valleyFloor(); goliath(200,fall); davi(-200,0,{pose: t<2.4? 'sling' : 'point', dir:1, fast:true});
    if(flying){ glow(sx,sy,26,'#fff2c0',.7); shade(sx,sy,6,5,'#e8e4dc','#9a958c'); for(let k=1;k<6;k++) ell(sx-k*9,sy+k*2,4-k*.5,3-k*.4,'rgba(255,240,200,.5)'); } });
  if(t>hitT && t<hitT+.25){ ctx.fillStyle=`rgba(255,250,235,${.7*(1-(t-hitT)/.25)})`; ctx.fillRect(-W,-H,W*3,H*3); }
  if(t>hitT && t<hitT+1.4){ const q=(t-hitT)/1.4; ctx.save(); ctx.globalAlpha=1-q; ctx.font='800 '+(70+q*30)+'px Fraunces, Georgia, serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(58,44,36,.6)'; ctx.lineWidth=6; ctx.strokeText('POC!',W/2,H*.3); ctx.fillText('POC!',W/2,H*.3); ctx.restore(); }
};
SC.vitoria = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8;
  setCam([0,-150,1.45],[0,-200,.85],t/10);
  layer(0,()=>{ sky('#6a7ac0','#f2a878','#ffd08a'); glow(-380,-60,320,'#ffd08a',.75); ell(-380,-60,46,46,'#ffe2a8'); godRays(-380,-60,900,.0,G);
    for(let i=0;i<4;i++) cloud(((i*340+G*6)%1600)-800,-260+(i%2)*40,.9,'#ffd0b0','#d08a80',.85); });
  layer(.2,()=>ridge(-40,110,.004,7,'#c89a9a','#e0b8a8'));
  layer(.5,()=>{ hills(0); crowd(-560,-150,26,300,['#a8805a','#7a9ac0','#c9b48a'],null,'cheer'); crowd(560,-150,14,300,['#8a3a2a','#6b4a3a','#a5562f'],'#d4a052','flee'); flag(-470,-190,'#3a6fb0'); });
  layer(1,()=>{ valleyFloor();
    for(let i=0;i<6;i++){ const sx=-330+i*110+(i>2?120:0); person(i%2?'soldado':'irmao',sx,6+(i%2)*6,{pose:'armsup',ph:i,dir: sx<0?1:-1}); }
    davi(0,0,{pose:'armsup',dir:1});
    for(let i=0;i<18;i++){ const px=((i*97+G*40)%900)-450, py=-380+((G*70+i*53)%420); ctx.fillStyle=['#ffd75e','#ff8fb3','#ffffff','#8fd0f2'][i%4]; ctx.save(); ctx.translate(px,py); ctx.rotate(G*3+i); ctx.fillRect(-4,-2,8,4); ctx.restore(); } });
};
//@@ROTEIRO
const CH=[ 'O pastorzinho corajoso', 'O gigante', 'Coragem que vem de Deus', 'A batalha é do Senhor' ];
const N=(t)=>({who:'Narrador',text:t}), DAVI=t=>({who:'Davi',text:t,talk:'davi'}), GOL=t=>({who:'Golias',text:t,talk:'golias'}), SAUL=t=>({who:'Rei Saul',text:t,talk:'saul'});
const SCRIPT=[
  {card:0},
  {sc:'pasto', ...N('Em Belém vivia um menino chamado Davi. Ele era o mais novo da família, e cuidava das ovelhas do seu pai.')},
  {sc:'pasto', ...N('Davi tocava harpa, cantava para Deus e treinava com a sua funda. Quando um leão aparecia, ele protegia as ovelhas com coragem.')},
  {sc:'pasto', ...DAVI('O Senhor é o meu pastor! Com Ele, eu não tenho medo de nada. (Salmo 23:1)')},
  {card:1},
  {sc:'vale', ...N('Um dia, o exército de Israel e o exército dos filisteus ficaram frente a frente, cada um num monte, com um vale no meio. (1 Samuel 17:3)')},
  {sc:'golias', ...GOL('Eu sou Golias! Mandem alguém lutar comigo! Se ele vencer, nós seremos seus servos! (1 Samuel 17:9)')},
  {sc:'golias', ...N('Golias era um gigante de quase três metros. Durante quarenta dias ele gritava, e todos os soldados tremiam de medo.')},
  {sc:'acampamento', ...N('Davi foi levar comida para os seus irmãos, que eram soldados. E ouviu o gigante desafiando o povo de Deus.')},
  {sc:'acampamento', ...DAVI('Quem é esse gigante, para desafiar o exército do Deus vivo? Eu vou lutar com ele! (1 Samuel 17:26)')},
  {card:2},
  {sc:'saul', ...SAUL('Você é só um menino! Ele é um guerreiro desde jovem. (1 Samuel 17:33)')},
  {sc:'saul', ...DAVI('O Senhor me livrou do leão e do urso. Ele também vai me livrar desse gigante! (1 Samuel 17:37)')},
  {sc:'saul', ...N('O rei deu a sua armadura para Davi... mas ela era grande e pesada demais! Davi preferiu ir do jeito que era: com a sua funda e a sua fé.')},
  {sc:'riacho', ...N('No riacho, Davi escolheu cinco pedras bem lisinhas, e guardou na sua bolsa de pastor. (1 Samuel 17:40)')},
  {sc:'duelo', ...GOL('Ha ha ha! Você vem me enfrentar com um pedaço de pau? Venha cá, menino!')},
  {sc:'duelo', ...DAVI('Você vem com espada e lança, mas eu vou em nome do Senhor dos Exércitos! (1 Samuel 17:45)')},
  {card:3},
  {sc:'funda', ...N('Davi correu, girou a funda e lançou uma pedra. Ela acertou bem na testa do gigante... e Golias caiu no chão! (1 Samuel 17:49)')},
  {sc:'vitoria', ...N('Os filisteus fugiram, e o povo de Israel comemorou! Deus deu a vitória ao menino que confiou nele.')},
  {sc:'vitoria', ...DAVI('Não foi a minha força. A batalha é do Senhor! (1 Samuel 17:47)')},
  {summary:true, sc:'vitoria', ...N('Hoje aprendemos com Davi: Deus é maior que qualquer gigante, e quem confia nele tem coragem.')},
];
// elenco fixo: todas as falas usam as vozes geradas (narradora sempre a mesma)
let vi=0; SCRIPT.forEach(l=>{ if(l.card==null){ vi++; l.rec='v'+String(vi).padStart(2,'0'); } else l.rec='c'+(l.card+1); });
function lineDur(l){ if(l.card!=null) return Math.max(3.4,(REC_DUR[l.rec]||2)+1.2); if(l.rec && REC_DUR[l.rec]) return REC_DUR[l.rec]+.7; return Math.max(4, l.text.replace(/\(.*?\)/g,'').length*.068)+.8; }
let T0=0; SCRIPT.forEach(l=>{ l.start=T0; l.dur=lineDur(l); T0+=l.dur; }); const TOTAL=T0;
SCRIPT.forEach((l,i)=>{ if(l.card!=null){ const nx=SCRIPT[i+1]; l.sc=nx.sc; } });
// a cena da funda precisa de tempo pra pedra voar e o gigante cair
SCRIPT.forEach(l=>{ if(l.sc==='funda' && l.card==null) l.dur=Math.max(l.dur,7.5); });
const chapterStarts=SCRIPT.map((l,i)=>l.card!=null?i:-1).filter(i=>i>=0);
//@@MOOD
const MOOD={ pasto:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], vale:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]], golias:[[45,52,57],[44,51,56],[41,48,53],[40,47,52]],
  acampamento:[[57,60,64],[55,59,62],[53,57,60],[52,56,59]], saul:[[57,60,64],[60,64,67],[53,57,60],[55,59,62]], riacho:[[60,64,67],[57,60,64],[65,69,72],[67,71,74]],
  duelo:[[45,52,57,60],[44,51,56,60],[41,48,53,57],[43,50,55,59]], funda:[[45,52,57,60],[47,54,59,62],[48,55,60,64],[50,57,62,66]], vitoria:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: A Funda de Davi =================
   Mesmo cenário, mesmos personagens e mesma narradora do filme.
   1) Toque nas 5 pedras LISINHAS do riacho.  2) Segure para girar a funda e solte no verde.
   Ninguém perde: na última pedra, a área verde fica bem grande. */
let MODE='film';
const GS={};
function gameReset(){
  Object.assign(GS,{ stage:'stones', picked:{}, nPicked:0, wrong:0, wob:{}, throws:0, golX:640, hold:false, holdT:0, ph:0, power:0, stone:null, hit:false, hitT:0, ended:false, cool:0, endT:0, stepT:0 });
  cam.x=0; cam.y=-70; cam.z=W<700? .78 : 1.6;
}
let gsubT=0;
function gsay(key,text,force,who){ if(!force && GS.cool>0) return; GS.cool=1.2; speak({rec:key,text}); whoEl.textContent=who||'Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){
  MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false; gameReset();
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on');
  $('ghud').hidden=false; $('gAn').textContent='🪨 0 / 5'; $('gGol').textContent='Golias: de pé';
  if(!AC) audioInit(); if(AC) AC.resume();
  setTimeout(()=>gsay('g1','Agora é a sua vez! Toque nas cinco pedras lisinhas do riacho.',true),400);
}
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toWorld(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; const lx=(e.clientX*dpr-offX)/K, ly=e.clientY*dpr/K; const z=ZOOM*cam.z*PZ(); return { x:(lx-W/2)/z+cam.x, y:(ly-H*CY)/z+cam.y }; }
function gameTap(e){
  if(AC) AC.resume();
  if(GS.stage==='stones'){ const w=toWorld(e); let best=-1, bd=1e9;
    BROOK_STONES.forEach(([sx,sy],i)=>{ if(GS.picked[i]) return; const d=Math.hypot(sx-w.x,sy-w.y); if(d<bd){ bd=d; best=i; } });
    if(best<0 || bd>55) return; const s=BROOK_STONES[best];
    if(s[2]){ GS.picked[best]=true; GS.nPicked++; pluck(72+GS.nPicked*2,.08); $('gAn').textContent='🪨 '+GS.nPicked+' / 5';
      if(GS.nPicked>=5){ gsay('g8','Muito bem! Cinco pedras na bolsa!',true); setTimeout(()=>{ if(MODE!=='game') return; GS.stage='sling'; $('gAn').textContent='🪨 5 pedras na bolsa'; gsay('g3','Agora, segure o dedo para girar a funda... e solte no verde!',true); },2600); } }
    else { GS.wrong++; GS.wob[best]=.5; gsay('g2','Essa tem pontas! Escolha as lisinhas.'); }
    return; }
  if(GS.stage==='sling' && !GS.stone && !GS.hit){ GS.hold=true; GS.holdT=0; }
}
function zone(){ return GS.throws>=4? [.3,.97] : [.58,.86]; }
function gameRelease(){
  if(GS.stage!=='sling' || !GS.hold) return; GS.hold=false;
  if(GS.holdT<.45) return;
  const [lo,hi]=zone(), p=GS.power; GS.throws++;
  const res = p<lo? 'short' : (p>hi? 'over' : 'hit');
  const to = res==='hit'? {x:GS.golX-22, y:-200} : (res==='short'? {x:GS.golX-160, y:0} : {x:GS.golX+120, y:-460});
  GS.stone={ fx:-182, fy:-84, tx:to.x, ty:to.y, t:0, res };
  $('gAn').textContent='🪨 '+Math.max(0,5-GS.throws)+' pedras na bolsa';
  if(AC){ const t0=AC.currentTime, s=AC.createBufferSource(); s.buffer=noiseBuf; const f=AC.createBiquadFilter(); f.type='bandpass'; f.frequency.setValueAtTime(1800,t0); f.frequency.exponentialRampToValueAtTime(400,t0+.4); const g=AC.createGain(); g.gain.setValueAtTime(.25,t0); g.gain.exponentialRampToValueAtTime(.001,t0+.4); s.connect(f); f.connect(g); g.connect(musicGain); s.start(t0); s.stop(t0+.45); }
}
addEventListener('pointerup',()=>{ if(MODE==='game') gameRelease(); });
addEventListener('keydown',e=>{ if(MODE==='game' && e.key===' ' && GS.stage==='sling' && !GS.hold && !GS.stone && !GS.hit){ e.preventDefault(); GS.hold=true; GS.holdT=0; } });
addEventListener('keyup',e=>{ if(MODE==='game' && e.key===' ') gameRelease(); });
function gameUpdate(dt){
  const g=GS; if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); }
  for(const k in g.wob) g.wob[k]-=dt;
  if(g.stage==='stones'){ cam.x=lerp(cam.x,20,.05); cam.y=lerp(cam.y,-70,.05); cam.z=lerp(cam.z,W<700?.78:1.6,.05); return; }
  const narrow=W<700; cam.x=lerp(cam.x, g.stone&&g.stone.res==='hit'? lerp(-182,g.golX,g.stone.t) : (narrow? (g.golX-240)/2 : 0), .06); cam.y=lerp(cam.y,narrow?-300:-200,.05); cam.z=lerp(cam.z, g.stone&&g.stone.res==='hit'? (narrow? .9 : 1.2) : (narrow? .44 : .82), .05);
  if(!g.hit){ g.stepT+=dt; if(g.golX>360) g.golX-=dt*14; }
  if(g.hold){ g.holdT+=dt; g.ph+=dt*(6+Math.min(1,g.holdT/.45)*10); g.power=.5-.5*Math.cos(Math.max(0,g.holdT-.3)*2*Math.PI/1.6); }
  if(g.stone){ const s=g.stone; s.t+=dt/(s.res==='hit'? 1.3 : .8); if(s.t>=1){ g.stone=null;
      if(s.res==='hit'){ g.hit=true; g.hitT=0; $('gGol').textContent='Golias: zonzo 💫'; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12)); gsay('g6','Acertou! A batalha é do Senhor!',true); }
      else { gsay('g7','Ha ha! Errou!',true,'Golias'); setTimeout(()=>{ if(MODE==='game' && !GS.hit) gsay(s.res==='short'?'g4':'g5', s.res==='short'?'Fraquinho! Solte quando a seta chegar no verde.':'Forte demais! Solte um pouquinho antes.',true); },1500);
        if(g.throws>=5) g.throws=4; } } }
  if(g.hit){ g.hitT+=dt; if(g.hitT>4.5 && !g.ended){ g.ended=true; const st=g.throws<=1?3:(g.throws<=3?2:1);
    $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent='Pedras usadas: '+g.throws+' · Escolhas certas no riacho: 5 de '+(5+g.wrong)+' toques'; $('gwin').hidden=false; } }
}
function gaugeDraw(){ const [lo,hi]=zone(); const cx=W/2, cy=H*.9, R=72;
  ctx.save(); ctx.lineCap='round';
  ctx.strokeStyle='rgba(58,44,36,.45)'; ctx.lineWidth=22; ctx.beginPath(); ctx.arc(cx,cy,R,Math.PI,2*Math.PI); ctx.stroke();
  ctx.strokeStyle='rgba(251,243,227,.9)'; ctx.lineWidth=14; ctx.beginPath(); ctx.arc(cx,cy,R,Math.PI,2*Math.PI); ctx.stroke();
  ctx.strokeStyle='#7fc46a'; ctx.beginPath(); ctx.arc(cx,cy,R,Math.PI*(1+lo),Math.PI*(1+hi)); ctx.stroke();
  const a=Math.PI*(1+GS.power); ctx.strokeStyle=GS.power>=lo&&GS.power<=hi? '#3f8a2e':'#3a2c24'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*(R-6),cy+Math.sin(a)*(R-6)); ctx.stroke();
  ell(cx,cy,9,9,'#3a2c24'); ctx.restore(); }
function gameDraw(){
  const g=GS;
  if(g.stage==='stones'){ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6;
    layer(0,()=>{ meadowSky(1); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-260+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); });
    layer(.5,()=>{ ridge(0,60,.008,4,'#9fcf8c','#bfe0a4'); for(let i=0;i<9;i++) tree(-900+i*230,10,.7+(i%3)*.12,'#6fb35c','#3f7d3a'); });
    layer(1,()=>{ brook(g.picked,true); davi(-330,6,{pose:'kneel',dir:1}); shade(-360,-14,10,12,'#8a5a2e','#5a3a1e'); });
    return; }
  LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.65;
  valleyBack(.6, g.hit? 'cheer' : 'fear');
  let sx=0, sy=0; if(g.stone){ const s=g.stone, q=Math.min(1,s.t); sx=lerp(s.fx,s.tx,q); sy=lerp(s.fy,s.ty,q)-Math.sin(q*Math.PI)*(s.res==='short'?40:70); }
  layer(1,()=>{ valleyFloor();
    goliath(g.golX, g.hit? g.hitT/1.3 : 0, {pose: (g.stone && g.stone.res!=='hit')||(!g.hit && Math.sin(G*.7)>.6)? 'laugh':'spear'});
    davi(-200,0,{pose: g.hold? 'sling' : (g.hit? 'armsup' : 'stand'), dir:1, fast:g.hold});
    if(g.stone){ glow(sx,sy,24,'#fff2c0',.6); shade(sx,sy,6,5,'#e8e4dc','#9a958c'); } });
  if(g.hit && g.hitT<.25){ ctx.fillStyle=`rgba(255,250,235,${.7*(1-g.hitT/.25)})`; ctx.fillRect(-W,-H,W*3,H*3); }
  if(g.hit && g.hitT<1.4){ const q=g.hitT/1.4; ctx.save(); ctx.globalAlpha=1-q; ctx.font='800 '+(70+q*30)+'px Fraunces, Georgia, serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(58,44,36,.6)'; ctx.lineWidth=6; ctx.strokeText('POC!',W/2,H*.3); ctx.fillText('POC!',W/2,H*.3); ctx.restore(); }
  if(g.hold && g.holdT>.3) gaugeDraw();
  if(!g.hold && !g.stone && !g.hit){ ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 20px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(58,44,36,.55)'; ctx.lineWidth=5; ctx.strokeText('👆 Segure e solte no verde',W/2,H*.92); ctx.fillText('👆 Segure e solte no verde',W/2,H*.92); ctx.restore(); }
}
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_davi_visto')) $('coverGame').hidden=false; }catch(e){}
