//@@CAST
const CAST={
  jonas:{ robe:['#e3b27a','#a8703f'], sash:'#5f9a4c', skin:['#e8b48a','#c98f62'], hair:'#4a3320', beard:true, beardC:'#4a3320', s:1 },
  marinheiro:{ robe:['#d0745a','#8a3e2a'], sash:'#3a2a1a', skin:['#d8a07a','#b07850'], hair:'#2a1a10', cap:'#3e6fa8', beard:true, beardC:'#3a2a1a', s:1 },
  marinheiro2:{ robe:['#7fa8c8','#4a7090'], sash:'#3a2a1a', skin:['#e2ab7c','#c48a5a'], hair:'#5a3a22', cap:'#c0503a', s:.95 },
  rei:{ robe:['#9a6ac8','#5a3a8a'], sash:'#e8b860', skin:['#d8a07a','#b07850'], hair:'#2a1a10', beard:true, beardC:'#2a1a10', crown:true, s:1 },
  povo1:{ robe:['#c9b48a','#9a845a'], sash:'#6b4423', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.9 },
  povo2:{ robe:['#7fc4c0','#3f8a86'], sash:'#6b4423', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', s:.86 },
  povo3:{ robe:['#ec9fa6','#b8687a'], sash:'#c98a3a', skin:['#e2ab7c','#c48a5a'], hair:'#3a2a1a', longhair:true, s:.84 },
  crianca:{ robe:['#ffd27a','#d9a441'], sash:'#c0503a', skin:['#f6cfa6','#e2ab7c'], hair:'#6b4423', s:.62 },
};
//@@SCENES
/* ===== peças de Jonas ===== */
function smallFish(x,y,s,c,dir,ph){ s=s||1; dir=dir||1; const w=Math.sin(G*8+(ph||0))*.25; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  ctx.save(); ctx.translate(-14,0); ctx.rotate(w); ctx.fillStyle=mix(c,'#000000',.15); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-12,-9); ctx.lineTo(-12,9); ctx.closePath(); ctx.fill(); ctx.restore();
  shade(0,0,17,10,mix(c,'#ffffff',.25),c); ell(8,-3,3,3,'#ffffff'); ell(9,-3,1.6,1.6,'#2c2340'); ctx.restore(); }
function jelly(x,y,s,ph){ s=s||1; const p=Math.sin(G*3+(ph||0)); ctx.save(); ctx.translate(x,y); ctx.scale(s,s*(1+p*.06));
  ctx.strokeStyle='rgba(220,150,230,.75)'; ctx.lineWidth=3; ctx.lineCap='round'; for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(i*7,6); ctx.quadraticCurveTo(i*7+Math.sin(G*4+i)*6,22,i*7+Math.sin(G*3+i)*4,38); ctx.stroke(); }
  glow(0,-4,40,'#e8a8ff',.25); shade(0,0,22,16,'#f2c0ff','#b878d8'); ell(0,6,22,5,'#b878d8'); ell(-7,-6,6,3,'rgba(255,255,255,.55)'); ell(-6,0,2,2,'#5a2a6a'); ell(6,0,2,2,'#5a2a6a'); ctx.restore(); }
function bubble(x,y,r,a){ ctx.save(); ctx.globalAlpha=a==null?1:a; ctx.strokeStyle='rgba(230,250,255,.85)'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.stroke(); ell(x-r*.35,y-r*.35,r*.3,r*.22,'rgba(255,255,255,.8)'); ctx.restore(); }
function seaweed(x,y,h,c){ ctx.strokeStyle=c||'#3f8a5a'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,y); for(let k=1;k<=6;k++) ctx.lineTo(x+Math.sin(G*1.5+k*.8+x)*8*k/6, y-h*k/6); ctx.stroke(); }
// o grande peixe: enorme, mas simpático
function bigFish(x,y,s,mouth,dir){ s=s||1; dir=dir||1; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  const tw=Math.sin(G*2)*.15; ctx.save(); ctx.translate(-190,0); ctx.rotate(tw); ctx.fillStyle=vgrad(-90,90,[[0,'#5a7fa8'],[1,'#34507a']]); ctx.beginPath(); ctx.moveTo(20,0); ctx.quadraticCurveTo(-60,-40,-110,-100); ctx.quadraticCurveTo(-70,0,-110,100); ctx.quadraticCurveTo(-60,40,20,0); ctx.fill(); ctx.restore();
  ctx.fillStyle=vgrad(-110,110,[[0,'#6f97c0'],[.6,'#4a6f98'],[1,'#34507a']]); ctx.beginPath(); ctx.ellipse(0,0,220,110,0,0,7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0,0,220,110,0,0,7); ctx.clip(); ell(20,70,200,60,'#c8d8e4'); for(let i=0;i<7;i++){ ctx.strokeStyle='rgba(120,140,160,.35)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-120+i*40,40); ctx.lineTo(-120+i*40,110); ctx.stroke(); } ctx.restore();
  shade(-20,-30,40,22,'#5a7fa8','#34507a',-.4);
  if(mouth>0){ ctx.fillStyle='#5a1f2a'; ctx.beginPath(); ctx.moveTo(220,8); ctx.lineTo(140,8+mouth*6); ctx.quadraticCurveTo(160,8+mouth*60,222,20+mouth*44); ctx.closePath(); ctx.fill(); }
  else { ctx.strokeStyle='#2a3a52'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(214,18); ctx.quadraticCurveTo(170,40,140,24); ctx.stroke(); }
  ell(130,-36,20,20,'#ffffff'); ell(136,-36,10,11,'#1e2a3a'); ell(140,-40,3.5,3.5,'#ffffff'); ell(110,10,10,6,'rgba(255,150,150,.35)');
  ctx.strokeStyle=rgba('#ffffff',.35); ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(0,0,212,102,0,-2.6,-1.2); ctx.stroke(); ctx.restore(); }
function ship(x,y,s,rock,o){ o=o||{}; ctx.save(); ctx.translate(x,y); ctx.rotate(rock||0); ctx.scale(s,s);
  ctx.strokeStyle='#6b4a2a'; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(0,-30); ctx.lineTo(0,-250); ctx.stroke();
  const fl=Math.sin(G*(o.storm?9:2))*(o.storm?14:4); ctx.fillStyle=vgrad(-240,-60,[[0,'#fffaf0'],[1,'#e8dcc0']]); ctx.beginPath(); ctx.moveTo(6,-240); ctx.quadraticCurveTo(110+fl,-160,6,-70); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#c0503a'; ctx.beginPath(); ctx.moveTo(0,-250); ctx.lineTo(40,-240+fl*.3); ctx.lineTo(0,-232); ctx.fill();
  if(o.crew) o.crew();
  ctx.fillStyle=vgrad(-40,40,[[0,'#b97c47'],[1,'#6e4527']]); ctx.beginPath(); ctx.moveTo(-200,-34); ctx.lineTo(210,-34); ctx.quadraticCurveTo(190,30,120,40); ctx.lineTo(-130,40); ctx.quadraticCurveTo(-200,20,-200,-34); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(60,30,12,.4)'; ctx.lineWidth=2.5; for(const yy of [-12,10,28]){ ctx.beginPath(); ctx.moveTo(-190,yy); ctx.lineTo(195,yy); ctx.stroke(); }
  for(let i=0;i<5;i++) ell(-120+i*55,-8,7,7,'#5a3a22'); ctx.strokeStyle=rgba('#fff1c8',.4); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-198,-32); ctx.lineTo(208,-32); ctx.stroke(); ctx.restore(); }
function townHouse(x,y,w,h,c){ ctx.fillStyle=vgrad(y-h,y,[[0,c],[1,mix(c,'#000000',.2)]]); rr(x,y-h,w,h,4); ctx.fill(); ctx.fillStyle=mix(c,'#000000',.25); rr(x-4,y-h-8,w+8,10,3); ctx.fill(); ctx.fillStyle='rgba(60,40,30,.55)'; rr(x+w*.4,y-h*.45,w*.2,h*.45,6); ctx.fill(); ctx.fillStyle='rgba(60,40,30,.35)'; rr(x+w*.15,y-h*.8,w*.15,h*.18,3); ctx.fill(); rr(x+w*.7,y-h*.8,w*.15,h*.18,3); ctx.fill(); }
function cityWall(x0,x1,y,h){ ctx.fillStyle=vgrad(y-h,y,[[0,'#e2c48e'],[1,'#b8945a']]); ctx.fillRect(x0,y-h,x1-x0,h); for(let x=x0;x<x1;x+=36){ ctx.fillRect(x,y-h-16,20,16); } ctx.strokeStyle='rgba(120,80,40,.25)'; ctx.lineWidth=2; for(let yy=y-h+16;yy<y;yy+=18){ ctx.beginPath(); ctx.moveTo(x0,yy); ctx.lineTo(x1,yy); ctx.stroke(); } }
function stormSky(k){ sky(mix('#7cc6ec','#2c3448',k),mix('#cfeaf4','#4a5268',k),mix('#fbe7c4','#6a7080',k)); for(let i=0;i<7;i++) cloud(((i*280+G*(8+k*20))%1600)-800,-290+(i%3)*44,1.2,mix('#ffffff','#4a5268',k),mix('#dfe6ee','#262c3c',k),.95); }

SC.chamado_j = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6;
  if(t<6) setCam([-160,-170,1.05],[-20,-140,1.5],t/6); else setCam([-20,-140,1.5],[60,-150,1.35],(t-6)/4);
  layer(0,()=>{ meadowSky(1); sunDisk2(380,-250); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); godRays(0,-700,700,(TALK===null && t<6)?.2:.08,G,'#fff0c0'); });
  layer(.5,()=>{ ridge(0,60,.008,4,'#b8c890','#d0dca8'); for(const [hx,hw,hh,c] of [[-560,90,80,'#e8d0a8'],[-450,70,64,'#dcc49a'],[-360,100,90,'#f0dcb8'],[300,90,70,'#e8d0a8'],[410,80,86,'#dcc49a']]) townHouse(hx,10,hw,hh,c); });
  layer(1,()=>{ ground('#b8c87a','#7a8a4a'); townHouse(-260,0,150,120,'#ecd6ae');
    const away = t>11.5; person('jonas', away? lerp(-40,260,ss(11.5,14,t)) : -40, 0, {pose: away? 'walk' : (t<6? 'lookup':'open'), dir: away?1:1, up:t<6}); });
};
function sunDisk2(x,y){ glow(x,y,200,'#fff4cc',.55); ell(x,y,34,34,'#fff4d0'); }
SC.porto = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.55; setCam([-260,-180,1.0],[40,-200,1.1],t/5);
  layer(0,()=>{ sky('#7cc6ec','#cfeaf4','#fbe7c4'); sunDisk2(-380,-240); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); });
  layer(.3,()=>{ ridge(-10,70,.006,2,'#a8c0b8','#c8d8d0'); });
  layer(1,()=>{ waves(10,8,'#5aa0d0','#24507a',.8); ship(160,30+Math.sin(G*1.2)*4,1,Math.sin(G)*.02,{crew:()=>{ person('marinheiro',60,-34,{pose:'stand',dir:-1}); }});
    ctx.fillStyle=vgrad(-10,30,[[0,'#a8743e'],[1,'#6e4527']]); rr(-700,-12,620,24,6); ctx.fill(); for(let x=-680;x<-90;x+=60){ ctx.fillStyle='#5a3a22'; ctx.fillRect(x,8,10,90); }
    ctx.fillStyle='#8a5a34'; ctx.save(); ctx.translate(-90,-12); ctx.rotate(-.12); ctx.fillRect(0,-6,150,10); ctx.restore();
    const jx=lerp(-460,40,ss(.5,4.5,t)); person('jonas',jx, jx>-90? -12-(jx+90)*.12 : -12, {pose:'walk',dir:1}); waves(40,10,'#5aa8d8','#1e4a7a',1.1,true); });
};
SC.tempestade_j = t=>{ LIGHT.dx=1; LIGHT.rim='#cfe0ff'; LIGHT.rimA=.3; const k=ss(0,2.5,t);
  const tx = TALK==='marinheiro'? 80 : (TALK==='jonas'? -40 : 0), tz = TALK? 1.5 : .85; cam.x=lerp(cam.x,tx,.04); cam.y=lerp(cam.y,TALK?-210:-190,.04); cam.z=lerp(cam.z,tz,.04);
  const flash=(Math.sin(G*1.7)>.985 || Math.sin(G*2.3+1)>.99)&&k>.5; if(flash && !SC._thj){ thunder(); SC._thj=1; } if(!flash) SC._thj=0;
  layer(0,()=>stormSky(k));
  layer(.3,()=>waves(-20,10+26*k,mix('#5aa0d0','#2a4a6a',k),mix('#24507a','#14263a',k),1.1));
  layer(1,()=>{ const rock=Math.sin(G*1.4)*.1*k, by=Math.sin(G*1.6)*12*k; ship(0,by+20,1,rock,{storm:k>.4,crew:()=>{ person('marinheiro',90,-34,{pose:k>.5&&TALK!=='marinheiro'?'armsup':'open',dir:-1}); person('marinheiro2',150,-34,{pose:'armsup',dir:-1,ph:1}); person('jonas',-40,-34,{pose:TALK==='jonas'?'open':'stand',dir:1}); }});
    waves(40,14+30*k,mix('#5aa8d8','#2e5a80',k),mix('#1e4a7a','#10223a',k),1.6,true); });
  rain(k,2); if(flash){ ctx.fillStyle='rgba(255,255,255,.35)'; ctx.fillRect(-W,-H,W*3,H*3); }
};
SC.mergulho = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.5; const k=ss(.5,3,t); setCam([0,-190,.95],[-60,-170,1.15],t/4);
  layer(0,()=>{ stormSky(1-k); if(k>.4) godRays(-200,-500,700,.25*k,G,'#fff0c0'); });
  layer(.3,()=>waves(-20,26*(1-k)+6,'#4a7aa0','#1e3a5a',1.1));
  layer(1,()=>{ ship(240,20+Math.sin(G*1.6)*12*(1-k),1,Math.sin(G*1.4)*.08*(1-k),{crew:()=>{ person('marinheiro',90,-34,{pose:k>.6?'pray':'armsup',dir:-1}); person('marinheiro2',150,-34,{pose:k>.6?'pray':'armsup',dir:-1,ph:1}); }});
    const q=clamp(t/1.2,0,1); if(q<1){ person('jonas',lerp(170,-120,q),lerp(-60,40,q)-Math.sin(q*Math.PI)*120,{pose:'armsup',dir:-1}); }
    else for(let i=0;i<3;i++){ const r=((t-1.2)*60+i*40)%140; ctx.strokeStyle=`rgba(255,255,255,${.7*(1-r/140)})`; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(-120,44,r,r*.25,0,0,7); ctx.stroke(); }
    waves(40,14*(1-k)+5,'#5aa8d8','#1e4a7a',1.2,true); });
};
function underwater(dark){ sky(mix('#3a8ac0','#123a5a',dark),mix('#1e5f8a','#0a2238',dark),mix('#0e3a5a','#05121e',dark)); godRays(0,-H*.5,H*1.2,.18*(1-dark),G,'#bfe8ff');
  for(let i=0;i<20;i++){ const bx=((i*97)%1400)-700, by=300-((G*30+i*67)%700); bubble(bx,by,3+(i%4)*2,.5); } }
SC.peixe = t=>{ LIGHT.dx=1; LIGHT.rim='#bfe8ff'; LIGHT.rimA=.4; setCam([0,-160,.9],[40,-150,1.0],t/8);
  layer(0,()=>underwater(.2));
  layer(.5,()=>{ for(let i=0;i<10;i++) seaweed(-700+i*150,240,120+(i%3)*40,i%2?'#3f8a5a':'#2f7a6a'); });
  layer(1,()=>{ ctx.fillStyle=vgrad(200,400,[[0,'#d8c08a'],[1,'#a8905a']]); ctx.fillRect(-2000,220,4000,400);
    for(let i=0;i<6;i++) smallFish(((i*230+G*50)%1400)-700,-80+(i%3)*90,1,['#f2a65e','#ffd75e','#7fd0c8'][i%3],1,i);
    const sinkY=lerp(-260,-40,ss(0,3,t)); const fx=lerp(-900,-60,ss(1.5,4.5,t)); const mouth= t<4.2? ss(2.5,3.6,t) : 1-ss(4.4,5,t);
    if(t<4.6) person('jonas',40+Math.sin(G)*6,sinkY,{pose:'armsup',dir:-1});
    bigFish(fx,-60,1.05,mouth,1);
    if(t>5) for(let i=0;i<4;i++) bubble(fx+200+i*12,-120-((G*40+i*20)%120),4+i,.7); });
};
SC.barriga = t=>{ LIGHT.dx=1; LIGHT.rim='#ffe0b0'; LIGHT.rimA=.7; setCam([0,-130,1.2],[0,-120,1.7],t/8);
  layer(0,()=>{ ctx.fillStyle=vgrad(-H,H,[[0,'#4a1a26'],[.5,'#7a2e3a'],[1,'#3a121c']]); ctx.fillRect(-W,-H,W*2,H*2);
    ctx.strokeStyle='rgba(255,170,180,.25)'; ctx.lineWidth=14; for(let i=-4;i<=4;i++){ ctx.beginPath(); ctx.ellipse(i*170,40,90,330,0,Math.PI*1.1,Math.PI*1.9); ctx.stroke(); } });
  layer(1,()=>{ ctx.fillStyle=vgrad(0,200,[[0,'#8a3a46'],[1,'#4a1a26']]); ctx.beginPath(); ctx.moveTo(-1400,300); ctx.lineTo(-1400,10); ctx.quadraticCurveTo(0,-30,1400,10); ctx.lineTo(1400,300); ctx.fill();
    ell(-150,6,40,10,'rgba(120,200,255,.25)'); ell(170,10,60,12,'rgba(120,200,255,.25)');
    const k=ss(1,5,t); glow(0,-80,260*k+60,'#fff0c0',.45*k+.1); godRays(0,-600,600,.18*k,G,'#fff0c0');
    person('jonas',0,-10,{pose:'pray',dir:1}); for(let i=0;i<5;i++) bubble(-60+i*30,-160-((G*30+i*40)%200),3+i%3,.6); });
};
SC.praia = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6;
  if(t<5) setCam([120,-170,.95],[0,-160,1.1],t/5); else setCam([0,-160,1.1],[-60,-150,1.45],(t-5)/3);
  layer(0,()=>{ sky('#7cc6ec','#cfeaf4','#fff0d0'); sunDisk2(380,-240); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-270+(i%2)*40,.9,'#ffffff','#dfe6ee',.9); if(TALK===null && t>4.8) godRays(-60,-700,700,.2,G,'#fff0c0'); });
  layer(.3,()=>{ ridge(-10,60,.006,6,'#a8c8a0','#c8e0c0'); });
  layer(1,()=>{ ctx.fillStyle=vgrad(-20,200,[[0,'#f2dca8'],[1,'#d8b878']]); ctx.beginPath(); ctx.moveTo(-1400,300); ctx.lineTo(-1400,0); ctx.lineTo(120,0); ctx.quadraticCurveTo(200,10,260,40); ctx.lineTo(260,300); ctx.fill();
    ctx.fillStyle=vgrad(20,300,[[0,'#5aa8d8'],[1,'#1e4a7a']]); ctx.beginPath(); ctx.moveTo(180,20); for(let x=180;x<=1400;x+=30) ctx.lineTo(x,20+Math.sin(x*.02+G*1.5)*5); ctx.lineTo(1400,300); ctx.lineTo(240,300); ctx.fill();
    const fx=lerp(520,700,ss(2.5,5,t)); bigFish(fx,60,.8,t<2.6? ss(.4,1.2,t) : 1-ss(2.6,3.2,t),-1);
    const q=clamp((t-.9)/1.2,0,1); const jx = q<1? lerp(380,-20,q) : -20, jy = q<1? -Math.sin(q*Math.PI)*160 : 0;
    if(t>.9) person('jonas',jx,jy,{pose: q<1? 'armsup' : (t>5? 'lookup' : 'stand'), dir:-1, up:t>5});
    for(let i=0;i<5;i++){ ell(-500+i*170,6,10,4,'rgba(255,255,255,.5)'); } });
};
function ninive(t,party){
  layer(0,()=>{ party? sky('#6a7ac0','#f2a878','#ffd08a') : sky('#7cc6ec','#cfeaf4','#fff0d0'); sunDisk2(party?-380:380, party?-80:-240); for(let i=0;i<4;i++) cloud(((i*340+G*6)%1600)-800,-270+(i%2)*40,.9,party?'#ffd0b0':'#ffffff',party?'#d08a80':'#dfe6ee',.85); });
  layer(.5,()=>{ cityWall(-900,900,-20,120); for(const [hx,hw,hh,c] of [[-700,120,180,'#e8d0a8'],[-520,100,220,'#d8b88a'],[-380,140,160,'#8fb0c8'],[-160,120,250,'#e8d0a8'],[80,160,200,'#d8b88a'],[300,110,230,'#8fb0c8'],[480,140,170,'#e8d0a8'],[660,120,210,'#d8b88a']]) townHouse(hx,-120,hw,hh,c);
    ctx.fillStyle=vgrad(-360,-120,[[0,'#7aa0c0'],[1,'#4a7090']]); ctx.beginPath(); ctx.moveTo(-60,-380); ctx.lineTo(60,-380); ctx.lineTo(90,-120); ctx.lineTo(-90,-120); ctx.closePath(); ctx.fill(); });
  layer(1,()=>{ ctx.fillStyle=vgrad(0,300,[[0,'#d8c08a'],[1,'#a8905a']]); ctx.fillRect(-2000,0,4000,800);
    const crowd=[['povo1',-330],['povo3',-250],['crianca',-190],['rei',-110],['povo2',140],['povo1',220],['crianca',280],['povo3',350],['povo2',420]];
    crowd.forEach(([id,x],i)=>person(id,x,6+(i%2)*6,{pose: party? 'armsup' : 'pray', dir: x<0?1:-1, ph:i}));
    person('jonas',0,0,{pose: party? 'armsup' : 'open', dir:1});
    if(party) for(let i=0;i<18;i++){ const px=((i*97+G*40)%900)-450, py=-380+((G*70+i*53)%420); ctx.fillStyle=['#ffd75e','#ff8fb3','#ffffff','#8fd0f2'][i%4]; ctx.save(); ctx.translate(px,py); ctx.rotate(G*3+i); ctx.fillRect(-4,-2,8,4); ctx.restore(); } });
}
SC.ninive = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.55; setCam([0,-200,.85],[0,-160,1.2],t/7); ninive(t,false); };
SC.ninive_festa = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8; setCam([0,-150,1.4],[0,-190,.9],t/9); ninive(t,true); };
//@@ROTEIRO
const CH=[ 'Fugindo de Deus', 'A tempestade', 'Dentro do grande peixe', 'Uma segunda chance' ];
const N=(t)=>({who:'Narrador',text:t}), DEUS=t=>({who:'Deus',text:t}), JON=t=>({who:'Jonas',text:t,talk:'jonas'}), MAR=t=>({who:'Marinheiro',text:t,talk:'marinheiro'});
const SCRIPT=[
  {card:0},
  {sc:'chamado_j', ...N('Jonas era um profeta. Um dia, Deus falou com ele.')},
  {sc:'chamado_j', ...DEUS('Jonas, vá até a grande cidade de Nínive, e avise o povo para deixar o mal. (Jonas 1:2)')},
  {sc:'chamado_j', ...JON('Nínive? Aquele povo é muito mau! Eu não quero ir... vou fugir para bem longe!')},
  {sc:'porto', ...N('Jonas entrou num navio que ia para o lado contrário: para Társis. (Jonas 1:3)')},
  {card:1},
  {sc:'tempestade_j', ...N('Mas Deus mandou um vento muito forte, e uma grande tempestade sacudiu o navio. (Jonas 1:4)')},
  {sc:'tempestade_j', ...MAR('Quem é você? Por que essa tempestade está acontecendo?')},
  {sc:'tempestade_j', ...JON('A culpa é minha. Eu fugi de Deus. Joguem-me no mar, e o mar vai se acalmar. (Jonas 1:12)')},
  {sc:'mergulho', ...N('Assim que Jonas caiu na água, o mar ficou calminho. (Jonas 1:15)')},
  {card:2},
  {sc:'peixe', ...N('E Deus mandou um grande peixe, que engoliu Jonas! Ele ficou três dias e três noites dentro do peixe. (Jonas 1:17)')},
  {sc:'barriga', ...JON('Senhor, me perdoa! Na minha angústia eu clamei a ti, e tu me ouviste. Eu vou obedecer! (Jonas 2:2)')},
  {sc:'praia', ...N('Então Deus falou com o peixe, e o peixe devolveu Jonas na praia. (Jonas 2:10)')},
  {card:3},
  {sc:'praia', ...DEUS('Jonas, vá a Nínive, e entregue a minha mensagem. (Jonas 3:2)')},
  {sc:'ninive', ...N('Dessa vez, Jonas obedeceu. Ele avisou o povo de Nínive, e todos se arrependeram, do rei até as crianças. (Jonas 3:5)')},
  {sc:'ninive_festa', ...N('E Deus perdoou a cidade inteira, porque Ele ama todas as pessoas. (Jonas 4:11)')},
  {summary:true, sc:'ninive_festa', ...N('Hoje aprendemos com Jonas: Deus dá uma segunda chance, e ama todas as pessoas.')},
];
let vi=0; SCRIPT.forEach(l=>{ if(l.card==null){ vi++; l.rec='v'+String(vi).padStart(2,'0'); } else l.rec='c'+(l.card+1); });
function lineDur(l){ if(l.card!=null) return Math.max(3.4,(REC_DUR[l.rec]||2)+1.2); if(l.rec && REC_DUR[l.rec]) return REC_DUR[l.rec]+.7; return Math.max(4, l.text.replace(/\(.*?\)/g,'').length*.068)+.8; }
SCRIPT.forEach(l=>{ if(l.card==null && (l.sc==='porto'||l.sc==='mergulho'||l.sc==='peixe'||l.sc==='barriga')) l.dur=Math.max(lineDur(l),6.2); });
let T0=0; SCRIPT.forEach(l=>{ l.start=T0; if(!l.dur) l.dur=lineDur(l); T0+=l.dur; }); const TOTAL=T0;
SCRIPT.forEach((l,i)=>{ if(l.card!=null){ const nx=SCRIPT[i+1]; l.sc=nx.sc; } });
const chapterStarts=SCRIPT.map((l,i)=>l.card!=null?i:-1).filter(i=>i>=0);
//@@MOOD
const MOOD={ chamado_j:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]], porto:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]], tempestade_j:[[45,52,57,60],[41,48,53,57],[43,50,55,58],[40,47,52,56]],
  mergulho:[[57,60,64],[53,57,60],[60,64,67],[55,59,62]], peixe:[[50,57,62],[48,55,60],[46,53,58],[45,52,57]], barriga:[[57,60,64],[53,57,60],[55,59,62],[60,64,67]],
  praia:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[60,64,67,72]], ninive:[[57,60,64],[60,64,67],[62,65,69],[64,67,71]], ninive_festa:[[62,66,69,74],[67,71,74,79],[64,67,71,76],[62,66,69,74]], obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: Nade, Jonas! (3 fases) =================
   Segure o dedo (ou espaço) para Jonas nadar para cima; solte para descer.
   Pegue as bolhas de ar e desvie das águas-vivas. Ninguém perde: encostar numa
   água-viva só faz Jonas tomar um sustinho e ir mais devagar um pouquinho. */
let MODE='film';
const GS={};
const JPH=[
  { name:'Fase 1 · Mergulho calmo', speed:150, END:2400, jellies:7, bubbles:12, move:0, voice:['j7','Fase um: mergulho calmo.'] },
  { name:'Fase 2 · Correnteza forte', speed:200, END:3400, jellies:13, bubbles:16, move:40, voice:['j2','Fase dois: a corrente está mais forte! Cuidado com as águas-vivas.'] },
  { name:'Fase 3 · Siga a luz', speed:240, END:4400, jellies:20, bubbles:20, move:70, voice:['j3','Fase três: siga a luz até a praia!'] },
];
const SURF=-400, FLOOR=40;
function rnd(seed){ let s=seed; return ()=>{ s=(s*16807)%2147483647; return s/2147483647; }; }
function buildLevel(n){ const L=JPH[n-1], r=rnd(7+n*13); const obj=[];
  for(let i=0;i<L.jellies;i++){ const x=500+i*(L.END-700)/L.jellies+r()*80; obj.push({k:'jelly',x,y:lerp(SURF+70,FLOOR-70,r()),ph:r()*6,amp:L.move*(r()<.5?1:-1)}); }
  for(let i=0;i<L.bubbles;i++){ const x=380+i*(L.END-500)/L.bubbles+r()*60; obj.push({k:'bub',x,y:lerp(SURF+60,FLOOR-60,r()),ph:r()*6,got:false}); }
  return obj; }
function gameReset(){ GS.hitsBy=[0,0,0]; loadPhase(1,false); }
function loadPhase(n,talk){ const L=JPH[n-1];
  Object.assign(GS,{ phase:n, x:0, y:-200, vy:0, hold:false, objs:buildLevel(n), hurt:0, slow:0, got:0, done:false, doneT:0, banner:2.8, ended:false, cool:GS.cool||0 });
  cam.x=W/2; cam.y=-180; cam.z=1; $('gAn').textContent=L.name.split(' · ')[0]; $('gGol').textContent='🫧 0'; if(talk!==false) gsay(L.voice[0],L.voice[1],true); }
let gsubT=0;
function gsay(key,text,force){ if(!force && GS.cool>0) return; GS.cool=1.2; speak({rec:key,text}); whoEl.textContent='Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2.2,(REC_DUR[key]||2)+.6); }
function startGame(){
  MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false; gameReset();
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume();
  gsay('j1','Agora é a sua vez! Segure o dedo para Jonas nadar para cima, e solte para descer. Pegue as bolhas, e desvie das águas-vivas!',true);
}
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function gameTap(e){ if(AC) AC.resume(); GS.hold=true; }
addEventListener('pointerup',()=>{ if(MODE==='game') GS.hold=false; });
addEventListener('keydown',e=>{ if(MODE==='game' && (e.key===' '||e.key==='ArrowUp')){ e.preventDefault(); GS.hold=true; } });
addEventListener('keyup',e=>{ if(MODE==='game' && (e.key===' '||e.key==='ArrowUp')) GS.hold=false; });
function gameUpdate(dt){
  const g=GS, L=JPH[g.phase-1]; if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); }
  if(g.banner>0) g.banner-=dt; if(g.hurt>0) g.hurt-=dt; if(g.slow>0) g.slow-=dt;
  if(!g.done){
    const sp = L.speed*(g.slow>0? .5 : 1)*(g.banner>1.6? .3 : 1);
    g.x+=sp*dt; g.vy += (g.hold? -900 : 520)*dt; g.vy=clamp(g.vy,-320,300); g.y+=g.vy*dt;
    if(g.y<SURF+30){ g.y=SURF+30; g.vy=Math.max(0,g.vy); } if(g.y>FLOOR-30){ g.y=FLOOR-30; g.vy=Math.min(0,g.vy); }
    for(const o of g.objs){ const oy=o.k==='jelly'? o.y+Math.sin(G*1.4+o.ph)*o.amp : o.y;
      if(o.k==='bub' && !o.got && Math.hypot(o.x-g.x,oy-g.y)<46){ o.got=true; g.got++; $('gGol').textContent='🫧 '+g.got; pluck(84,.06); pluck(91,.04,.06); if(g.got%5===0) gsay('j5','Muito bem!'); }
      if(o.k==='jelly' && g.hurt<=0 && Math.abs(o.x-g.x)<30 && Math.abs(oy-g.y)<34){ g.hurt=1.4; g.slow=.9; g.hitsBy[g.phase-1]++; g.vy=g.y<oy? -200 : 200; pluck(50,.08); pluck(47,.06,.1); gsay('j4','Ai! Cuidado com a água-viva!'); } }
    if(g.x>=L.END){ g.done=true; g.doneT=0; [72,76,79,84].forEach((m,i)=>pluck(m,.08,i*.12));
      if(g.phase<3){ const nx=JPH[g.phase]; setTimeout(()=>{ if(MODE==='game') loadPhase(g.phase+1); },2600); gsay('j5','Muito bem!',true); }
      else gsay('j6','Parabéns! Jonas chegou na praia. Deus dá uma segunda chance!',true); }
  } else { g.doneT+=dt; g.y=lerp(g.y, g.phase===3? SURF-30 : g.y, .03); g.x+=60*dt;
    if(g.phase===3 && g.doneT>4.6 && !g.ended){ g.ended=true; const per=g.hitsBy.map(h=>h===0?3:(h<=2?2:1)); const st=Math.round(per.reduce((a,b)=>a+b,0)/3);
      $('gStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st); $('gRes').textContent=JPH.map((P2,i)=>P2.name.split(' · ')[0]+': '+'⭐'.repeat(per[i])).join('  ·  '); $('gwin').hidden=false; } }
  const narrow=W<700; cam.z = narrow? .9 : 1; cam.x = g.x + (narrow? 120 : 260); cam.y = -180;
}
function gameDraw(){
  const g=GS, L=JPH[g.phase-1], prog=clamp(g.x/L.END,0,1);
  LIGHT.dx=1; LIGHT.rim='#bfe8ff'; LIGHT.rimA=.45;
  layer(0,()=>{ underwater(.35-prog*.3); });
  layer(.4,()=>{ for(let i=-2;i<40;i++) seaweed(i*180,240,90+(i%3)*50,i%2?'#3f8a5a':'#2f7a6a'); for(let i=0;i<8;i++) smallFish(((i*260+G*30)%2200)-400+cam.x*.4,-120+(i%3)*80,.9,['#f2a65e','#ffd75e','#7fd0c8'][i%3],1,i); });
  layer(1,()=>{ ctx.fillStyle=vgrad(FLOOR,FLOOR+200,[[0,'#d8c08a'],[1,'#a8905a']]); ctx.fillRect(cam.x-2000,FLOOR,4000,600);
    ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fillRect(cam.x-2000,SURF-600,4000,600); ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=3; ctx.beginPath(); for(let x=cam.x-1400;x<cam.x+1400;x+=24) ctx.lineTo(x,SURF+Math.sin(x*.02+G*2)*5); ctx.stroke();
    // luz no fim da fase (a praia / o caminho)
    glow(L.END+300,SURF+80,420,'#fff3c8',.55); godRays(L.END+300,SURF-200,700,.25,G,'#fff3c8');
    if(g.phase===3){ ctx.fillStyle=vgrad(SURF-120,SURF+40,[[0,'#f2dca8'],[1,'#d8b878']]); ctx.beginPath(); ctx.moveTo(L.END+150,SURF+30); ctx.quadraticCurveTo(L.END+400,SURF-60,L.END+1400,SURF-80); ctx.lineTo(L.END+1400,SURF+60); ctx.fill(); }
    for(const o of g.objs){ if(Math.abs(o.x-cam.x)>W/(ZOOM*cam.z*PZ())) continue; const oy=o.k==='jelly'? o.y+Math.sin(G*1.4+o.ph)*o.amp : o.y;
      if(o.k==='jelly') jelly(o.x,oy,1.1,o.ph); else if(!o.got){ glow(o.x,oy,30,'#dff6ff',.3); bubble(o.x,oy+Math.sin(G*2+o.ph)*5,13,1); } }
    // Jonas nadando (deitado, braços para frente)
    ctx.save(); ctx.translate(g.x,g.y); ctx.rotate(1.25+clamp(g.vy/600,-.35,.35)); if(g.hurt>0 && Math.floor(G*12)%2) ctx.globalAlpha=.5; person('jonas',0,50,{pose:'armsup',dir:1,walk:G*8}); ctx.restore();
    if(g.hold) for(let i=0;i<3;i++) bubble(g.x-40-i*14,g.y+10-((G*80+i*20)%40),3+i,.7);
  });
  // barra de progresso
  const bw=Math.min(320,W-140), bx=W/2-bw/2, by=74; ctx.fillStyle='rgba(251,243,227,.85)'; rr(bx,by,bw,12,6); ctx.fill(); ctx.fillStyle='#e8b65a'; rr(bx,by,Math.max(12,bw*prog),12,6); ctx.fill(); ctx.font='16px sans-serif'; ctx.textAlign='left'; ctx.fillText('🏖️',bx+bw+6,by+12);
  if(!g.done && g.banner<=0 && !g.hold && g.x<300){ ctx.save(); ctx.globalAlpha=.75+.25*Math.sin(G*4); ctx.font='800 20px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(30,40,60,.55)'; ctx.lineWidth=5; ctx.strokeText('👆 Segure para subir',W/2,H*.92); ctx.fillText('👆 Segure para subir',W/2,H*.92); ctx.restore(); }
  if(g.banner>0){ const a=Math.min(1,g.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw2=Math.min(440,W-40); ctx.fillStyle='rgba(251,243,227,.96)'; rr(W/2-bw2/2,H*.24-36,bw2,64,14); ctx.fill();
    ctx.font='800 25px Fraunces, Georgia, serif'; ctx.textAlign='center'; ctx.fillStyle='#3a2c24'; ctx.fillText(L.name,W/2,H*.24+6); ctx.restore(); }
}
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_jonas_visto')) $('coverGame').hidden=false; }catch(e){}
