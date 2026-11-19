/* arte.js — o mesmo desenho dos personagens dos filmes do Bíblia Play */
let ctx=null; let G=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), lerp=(a,b,t)=>a+(b-a)*t;
const ss=(a,b,x)=>{ const t=clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const hex=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));
const mix=(a,b,t)=>{ const A=hex(a),B=hex(b); return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')+')'; };
const rgba=(h,a)=>{ const c=hex(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };

/* ===== luz da cena (todas as cenas usam o mesmo sistema) ===== */
const LIGHT={dx:1, rim:'#fff1c8', rimA:.55};
function vgrad(y0,y1,stops){ const g=ctx.createLinearGradient(0,y0,0,y1); stops.forEach(([o,c])=>g.addColorStop(o,c)); return g; }
function ell(x,y,rx,ry,fill,rot){ ctx.beginPath(); ctx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),rot||0,0,7); ctx.fillStyle=fill; ctx.fill(); }
function shade(x,y,rx,ry,top,bot,rot){ ell(x,y,rx,ry,vgrad(y-ry,y+ry,[[0,top],[1,bot]]),rot); }
function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function softShadow(x,y,rx,a){ const g=ctx.createRadialGradient(x,y,1,x,y,rx); g.addColorStop(0,`rgba(40,25,20,${a||.3})`); g.addColorStop(1,'rgba(40,25,20,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(x,y,rx,rx*.25,0,0,7); ctx.fill(); }
function rim(x,y,rx,ry,a0,a1){ ctx.save(); ctx.strokeStyle=rgba(LIGHT.rim.startsWith('#')?LIGHT.rim:'#fff1c8', LIGHT.rimA); ctx.lineWidth=2.6; ctx.lineCap='round'; ctx.beginPath();
  const s=LIGHT.dx>0?0:Math.PI; ctx.ellipse(x,y,rx-1,ry-1,0,s+(a0||-1.1),s+(a1||1.1)); ctx.stroke(); ctx.restore(); }
function glow(x,y,r,color,a){ const g=ctx.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,rgba(color,a)); g.addColorStop(1,rgba(color,0)); ctx.fillStyle=g; ctx.fillRect(x-r,y-r,r*2,r*2); }

const CAST={
noe:{ robe:['#6fa8e0','#3a6fae'], sash:'#c98a3a', skin:['#f6cfa6','#e2ab7c'], hair:'#f2efe8', beard:true, s:1 },
  filho:{ robe:['#9cc77a','#5f9a4c'], sash:'#8a5a34', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', s:.86 },
  vizinho:{ robe:['#eeb07a','#b96f3e'], sash:'#7a4a2a', skin:['#e2b088','#c08060'], hair:'#3a2a1a', s:.95 },
  vizinho2:{ robe:['#c79ad8','#8a5aa8'], sash:'#5a3a6a', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.9 },
  esposa:{ robe:['#ec9fa6','#b8687a'], sash:'#c98a3a', skin:['#f3c8a0','#dca07a'], hair:'#9a8a80', scarf:'#f4e6c8', s:.92 },
  sem:{ robe:['#e8c46a','#b8903a'], sash:'#6b4423', skin:['#e2ab7c','#c48a5a'], hair:'#3a2a1a', s:.86 },
  jafe:{ robe:['#7fc4c0','#3f8a86'], sash:'#6b4423', skin:['#f6cfa6','#e2ab7c'], hair:'#a5652f', s:.84 },
davi:{ robe:['#e8d9a8','#b8a070'], sash:'#8a5a34', skin:['#f6cfa6','#e2ab7c'], hair:'#b4582a', curly:true, s:.8 },
  golias:{ robe:['#e6b862','#94621f'], armor:true, sash:'#5a2a1a', skin:['#d8a07a','#b07850'], hair:'#2a1a10', beard:true, beardC:'#2e1e12', helmet:true, s:2.3 },
  saul:{ robe:['#9a6ac8','#5a3a8a'], sash:'#e8b860', skin:['#e8b88a','#c8946a'], hair:'#3a2a1a', beard:true, beardC:'#3a2a1a', crown:true, s:1.02 },
  soldado:{ robe:['#a8805a','#6e4e32'], sash:'#5a3a22', skin:['#e2ab7c','#c48a5a'], hair:'#3a2a1a', cap:'#8a6a48', s:.95 },
  irmao:{ robe:['#7a9ac0','#4a6a90'], sash:'#5a3a22', skin:['#f0c39a','#d69b6c'], hair:'#4a3320', cap:'#7a5a3a', s:.97 },
adao:{ robe:['#8fbf6a','#557f3a'], sash:'#7a5a2a', skin:['#e8b48a','#c98f62'], hair:'#5a3a22', s:1 },
  eva:{ robe:['#b4d47e','#6f9a48'], sash:'#e8a0a8', skin:['#f3c8a0','#dca07a'], hair:'#8a4a26', longhair:true, s:.94 },
jonas:{ robe:['#e3b27a','#a8703f'], sash:'#5f9a4c', skin:['#e8b48a','#c98f62'], hair:'#4a3320', beard:true, beardC:'#4a3320', s:1 },
  marinheiro:{ robe:['#d0745a','#8a3e2a'], sash:'#3a2a1a', skin:['#d8a07a','#b07850'], hair:'#2a1a10', cap:'#3e6fa8', beard:true, beardC:'#3a2a1a', s:1 },
  marinheiro2:{ robe:['#7fa8c8','#4a7090'], sash:'#3a2a1a', skin:['#e2ab7c','#c48a5a'], hair:'#5a3a22', cap:'#c0503a', s:.95 },
  rei:{ robe:['#9a6ac8','#5a3a8a'], sash:'#e8b860', skin:['#d8a07a','#b07850'], hair:'#2a1a10', beard:true, beardC:'#2a1a10', crown:true, s:1 },
  povo1:{ robe:['#c9b48a','#9a845a'], sash:'#6b4423', skin:['#c98f62','#a8714a'], hair:'#241b14', s:.9 },
  povo2:{ robe:['#7fc4c0','#3f8a86'], sash:'#6b4423', skin:['#f0c39a','#d69b6c'], hair:'#6b4423', s:.86 },
  povo3:{ robe:['#ec9fa6','#b8687a'], sash:'#c98a3a', skin:['#e2ab7c','#c48a5a'], hair:'#3a2a1a', longhair:true, s:.84 },
  crianca:{ robe:['#ffd27a','#d9a441'], sash:'#c0503a', skin:['#f6cfa6','#e2ab7c'], hair:'#6b4423', s:.62 },
jesus:{ robe:['#f6f0e0','#d2c6a6'], sash:'#c0483a', skin:['#e3ad79','#c48a5a'], hair:'#6b4423', beard:true, beardC:'#6b4423', longhair:true, s:1 },
  pedro:{ robe:['#6f9ac8','#3e6a98'], sash:'#7a5a3a', skin:['#e2ab7c','#c48a5a'], hair:'#6a5a4a', beard:true, beardC:'#7a6a5a', s:1 },
  joao:{ robe:['#9cc77a','#5f9a4c'], sash:'#7a5a3a', skin:['#f0c39a','#d69b6c'], hair:'#4a3320', s:.9 },
  andre:{ robe:['#eeb07a','#b96f3e'], sash:'#5a3a22', skin:['#d8a07a','#b07850'], hair:'#3a2a1a', beard:true, beardC:'#3a2a1a', s:.96 },
};
function harp(){ ctx.save(); ctx.translate(16,-52); ctx.strokeStyle='#b8782e'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,22); ctx.quadraticCurveTo(-4,-6,12,-18); ctx.lineTo(18,20); ctx.closePath(); ctx.stroke(); ctx.restore(); }
let TALK=null, MOUTH=0; // quem está falando e quanto a boca abre (do áudio)
function person(id,x,y,o){
  o=o||{}; const C=CAST[id], s=(o.s||1)*C.s, t=G+(o.ph||0), pose=o.pose||'stand', dir=o.dir||1;
  const talk = TALK===id ? MOUTH : 0;
  ctx.save(); ctx.translate(x,y); softShadow(0,2,30*s,.28);
  ctx.scale(dir*s,s);
  let by=0, lean=0; if(pose==='pray'||pose==='kneel') by=22; if(pose==='sit') by=26;
  const breathe=Math.sin(t*2)*1.2; const walk=pose==='walk'? t*7 : 0;
  // pernas
  ctx.strokeStyle='#4a3a32'; ctx.lineWidth=8; ctx.lineCap='round';
  if(pose==='sit'){ ctx.beginPath(); ctx.moveTo(-6,-22); ctx.lineTo(18,-14); ctx.lineTo(20,0); ctx.moveTo(6,-22); ctx.lineTo(26,-16); ctx.lineTo(28,0); ctx.stroke(); }
  else if(pose==='pray'||pose==='kneel'){ ctx.beginPath(); ctx.moveTo(-6,-14); ctx.lineTo(-14,0); ctx.lineTo(8,0); ctx.stroke(); }
  else { const sw=Math.sin(walk)*10; ctx.beginPath(); ctx.moveTo(-6,-18); ctx.lineTo(-6+sw,0); ctx.moveTo(6,-18); ctx.lineTo(6-sw,0); ctx.stroke(); }
  ctx.translate(0,by);
  // túnica
  ctx.beginPath(); ctx.moveTo(0,-70+breathe); ctx.quadraticCurveTo(30,-56,24,-14); ctx.quadraticCurveTo(0,-4,-24,-14); ctx.quadraticCurveTo(-30,-56,0,-70+breathe); ctx.closePath();
  ctx.fillStyle=vgrad(-70,-8,[[0,C.robe[0]],[1,C.robe[1]]]); ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle='rgba(0,0,0,.12)'; ctx.beginPath(); ctx.ellipse(-dir*LIGHT.dx*20,-30,22,46,0,0,7); ctx.fill(); ctx.restore();
  if(C.armor){ ctx.save(); ctx.beginPath(); ctx.moveTo(0,-70+breathe); ctx.quadraticCurveTo(30,-56,24,-14); ctx.quadraticCurveTo(0,-4,-24,-14); ctx.quadraticCurveTo(-30,-56,0,-70+breathe); ctx.closePath(); ctx.clip();
    ctx.strokeStyle='rgba(90,50,12,.45)'; ctx.lineWidth=1.4; for(let yy=-66;yy<-8;yy+=7) for(let xx=-30+((yy/7)%2?4:0);xx<32;xx+=8){ ctx.beginPath(); ctx.arc(xx,yy,4,0,Math.PI); ctx.stroke(); }
    ctx.fillStyle='rgba(255,240,190,.18)'; ctx.fillRect(4,-70,8,62); ctx.restore(); }
  ctx.strokeStyle=C.sash; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-18,-36); ctx.quadraticCurveTo(0,-29,18,-36); ctx.stroke();
  rim(0,-40,26,32,-1.3,1.3);
  // braços
  const sh=[-15,-58], sh2=[15,-58]; let h1=[-22,-30], h2=[22,-30];
  if(pose==='pray'){ h1=[4,-50]; h2=[8,-50]; }
  else if(pose==='lookup'||pose==='open'){ h1=[-34,-62]; h2=[34,-62]; }
  else if(pose==='armsup'){ h1=[-28,-100]; h2=[28,-100]; }
  else if(pose==='hammer'){ const a=Math.sin(t*6); h2=[30+a*4,-62-a*24]; }
  else if(pose==='point'){ h2=[44,-70]; }
  else if(pose==='hold'){ h2=[30,-80]; }
  else if(pose==='carry'){ h1=[-14,-92]; h2=[14,-92]; }
  else if(pose==='walk'){ const sw=Math.sin(walk)*8; h1=[-22+sw,-30]; h2=[22-sw,-30]; }
  else if(pose==='sit'){ h1=[-4,-34]; h2=[22,-34]; }
  else if(pose==='laugh'){ const b=Math.sin(t*14)*3; h1=[-12,-40+b]; h2=[40,-74]; }
  else if(pose==='spear'){ h1=[-24,-34]; h2=[30,-48]; }
  else if(pose==='harp'){ h1=[8,-44]; h2=[22,-52]; }
  else if(pose==='sling'){ h2=[22,-104]; h1=[-22,-34]; }
  else if(pose==='kneel'){ h1=[22,-24]; h2=[30,-20]; }
  ctx.strokeStyle=C.skin[1]; ctx.lineWidth=8;
  ctx.beginPath(); ctx.moveTo(...sh); ctx.lineTo(...h1); ctx.moveTo(...sh2); ctx.lineTo(...h2); ctx.stroke();
  ell(h1[0],h1[1],5,5,C.skin[0]); ell(h2[0],h2[1],5,5,C.skin[0]);
  if(pose==='hammer'){ ctx.save(); ctx.translate(h2[0],h2[1]); ctx.rotate(-.6+Math.sin(t*6)*.9); ctx.fillStyle='#7a5236'; ctx.fillRect(-2,-22,4,24); ctx.fillStyle='#8c8c8c'; ctx.fillRect(-8,-26,16,8); ctx.restore(); }
  if(pose==='spear'||(id==='golias' && pose==='laugh')){ ctx.strokeStyle='#6b4a2a'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(h2[0],h2[1]+50); ctx.lineTo(h2[0],h2[1]-90); ctx.stroke(); ctx.fillStyle='#d4a052'; ctx.beginPath(); ctx.moveTo(h2[0]-6,h2[1]-88); ctx.lineTo(h2[0],h2[1]-108); ctx.lineTo(h2[0]+6,h2[1]-88); ctx.closePath(); ctx.fill();
    shade(-30,-40,10,26,'#e0aa58','#94621f'); }
  if(pose==='harp') harp();
  if(pose==='sling'){ const sp=o.fast? 16 : 9; const a=t*sp; const px=h2[0]+Math.cos(a)*26, py=h2[1]-12+Math.sin(a)*9; ctx.strokeStyle='#6b4a2a'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(h2[0],h2[1]); ctx.lineTo(px,py); ctx.stroke(); ell(px,py,5,4,'#8a5a34'); if(o.fast){ ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(h2[0],h2[1]-12,26,9,0,0,7); ctx.stroke(); } }
  if(pose==='carry'){ ctx.fillStyle=vgrad(-104,-92,[[0,'#d9a46c'],[1,'#a8703f']]); rr(-46,-104,92,12,4); ctx.fill(); }
  // cabeça
  const hy=-86+breathe+(pose==='lookup'?-2:0), look=(pose==='lookup'||o.up)?-3:0;
  ctx.save(); ctx.translate(0,hy); if(pose==='lookup') ctx.rotate(-.08*dir); if(pose==='laugh') ctx.rotate(Math.sin(t*14)*.06);
  if(C.scarf){ shade(0,-4,24,23,C.scarf,'#d9c7a0'); }
  if(C.longhair){ shade(0,6,22,27,C.hair,mix(C.hair,'#000000',.3)); }
  shade(0,0,19,18,C.skin[0],C.skin[1]);
  rim(0,0,19,18,-1.2,.9);
  if(C.beard){ const bc=C.beardC||'#ffffff'; shade(0,12,15,13,bc,mix(bc,'#000000',.15)); if(!C.helmet) shade(-2,-15,17,7,C.hair,mix(C.hair,'#000000',.15)); }
  else if(!C.scarf && !C.helmet){ shade(0,-12,18,9,C.hair,mix(C.hair,'#000000',.3)); ell(-14,-6,6,8,C.hair); }
  if(C.curly){ for(let i=0;i<7;i++) shade(-15+i*5,-15-Math.abs(Math.sin(i*1.3))*4,6,6,C.hair,mix(C.hair,'#000000',.25)); ell(-16,-4,5,7,C.hair); }
  if(C.cap){ shade(0,-12,19,9,C.cap,mix(C.cap,'#000000',.3)); }
  if(C.helmet){ shade(0,-9,21,14,'#f0c070','#a87028'); ctx.fillStyle='#9a2a1a'; rr(-3,-36,6,16,3); ctx.fill(); ctx.fillStyle='#c9902e'; rr(2,-6,4,14,2); ctx.fill(); ctx.strokeStyle=rgba('#fff1c8',.5); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,-9,18,-2.6,-1.4); ctx.stroke(); }
  if(C.crown){ ctx.fillStyle='#f2c24a'; ctx.beginPath(); ctx.moveTo(-14,-14); ctx.lineTo(-14,-26); ctx.lineTo(-7,-19); ctx.lineTo(0,-29); ctx.lineTo(7,-19); ctx.lineTo(14,-26); ctx.lineTo(14,-14); ctx.closePath(); ctx.fill(); ell(0,-21,2,2,'#e85d6c'); }
  // olhos (piscam)
  const blink = (Math.sin(t*.9+x*.01)>.985)?.15:1;
  if(pose==='sleep'){ ctx.strokeStyle='#2c2018'; ctx.lineWidth=1.8; ctx.beginPath(); ctx.arc(6,-2,2.6,.1*Math.PI,.9*Math.PI); ctx.moveTo(-1.4,-1.2); ctx.arc(-4,-2,2.6,.1*Math.PI,.9*Math.PI); ctx.stroke(); }
  else { ctx.fillStyle='#2c2018'; ell(6,-2+look,2.6,2.8*blink,'#2c2018'); ell(-4,-2+look,2.6,2.8*blink,'#2c2018');
  ell(7,-3+look,.9,.9,'rgba(255,255,255,.9)'); }
  ctx.fillStyle='rgba(240,120,100,.28)'; ell(11,6,4,2.6,'rgba(240,120,100,.3)'); ell(-9,6,4,2.6,'rgba(240,120,100,.25)');
  // boca (abre conforme a voz)
  const mo = Math.max(talk, pose==='laugh'? .5+.5*Math.abs(Math.sin(t*14)) : 0);
  if(mo>.08){ ell(3,8,4.5,1.5+mo*4.5,'#5a2a22'); }
  else { ctx.strokeStyle='#7a3a2e'; ctx.lineWidth=1.8; ctx.beginPath(); ctx.arc(3,6,4.5,.2*Math.PI,.8*Math.PI); ctx.stroke(); }
  ctx.restore();
  if(id==='noe' && o.staff){ ctx.strokeStyle='#8a5a34'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-26,0); ctx.lineTo(-26,-104); ctx.arc(-20,-104,6,Math.PI,0); ctx.stroke(); }
  ctx.restore();
}
/* ===== animais ===== */
function animal(type,x,y,s,dir,ph){
  s=s||1; dir=dir||1; const t=G+(ph||0), hop=Math.abs(Math.sin(t*6))*3;
  ctx.save(); ctx.translate(x,y); softShadow(0,2,26*s,.25); ctx.scale(dir*s,s); ctx.translate(0,-hop);
  if(type==='ovelha'){ for(const [dx,dy] of [[-12,-24],[0,-30],[12,-24],[-6,-18],[8,-18]]) shade(dx,dy,13,12,'#ffffff','#ddd6cb'); shade(18,-30,9,10,'#5b4a46','#3d302d'); ell(21,-32,1.5,1.5,'#fff'); }
  else if(type==='coelho'){ shade(0,-16,16,14,'#f3ece6','#d4c8bc'); shade(12,-28,10,10,'#f3ece6','#d4c8bc'); ell(9,-46,4,12,'#f3ece6'); ell(16,-46,4,12,'#efe2da'); ell(15,-29,1.6,1.6,'#2c2340'); }
  else if(type==='leao'){ ctx.strokeStyle='#c98a36'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-18,-20); ctx.quadraticCurveTo(-34,-30,-30,-40); ctx.stroke(); shade(-2,-20,20,15,'#f0b65c','#c98a36'); shade(16,-34,17,17,'#c77f22','#9a5f18'); shade(18,-33,11,11,'#f2be62','#d79a44'); ell(22,-35,1.8,1.8,'#2c2340'); }
  else if(type==='elefante'){ shade(0,-30,30,22,'#aeb6c0','#7d8894'); shade(26,-40,16,16,'#aeb6c0','#7d8894'); shade(16,-40,10,14,'#9aa3ae','#7d8894'); ctx.strokeStyle='#8e98a4'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(38,-36); ctx.quadraticCurveTo(46,-18,40,-8); ctx.stroke(); ell(30,-44,1.8,1.8,'#2c2340');
    ctx.strokeStyle='#7d8894'; ctx.lineWidth=9; for(const lx of [-16,-4,10,20]){ ctx.beginPath(); ctx.moveTo(lx,-14); ctx.lineTo(lx,0); ctx.stroke(); } }
  else if(type==='girafa'){ ctx.strokeStyle='#d9a441'; ctx.lineWidth=10; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(14,-34); ctx.lineTo(24,-86); ctx.stroke(); shade(0,-30,24,14,'#f2c25a','#c9952e'); shade(28,-92,10,8,'#f2c25a','#c9952e');
    for(const [dx,dy] of [[-8,-30],[6,-26],[18,-50],[20,-68]]) ell(dx,dy,3.5,3,'#b0702a'); ctx.lineWidth=5; ctx.strokeStyle='#c9952e'; for(const lx of [-14,-4,8,16]){ ctx.beginPath(); ctx.moveTo(lx,-20); ctx.lineTo(lx,0); ctx.stroke(); } ell(31,-94,1.5,1.5,'#2c2340'); }
  else if(type==='pomba'){ const f=Math.sin(t*14); shade(0,-8,10,7,'#ffffff','#e0dcd4'); shade(9,-13,6,6,'#ffffff','#e6e2da'); ell(15,-13,3,1.5,'#e6974d'); ell(10,-14,1,1,'#2c2340');
    ctx.save(); ctx.translate(-2,-10); ctx.rotate(-.4-f*.7); shade(-8,0,12,4,'#ffffff','#e0dcd4'); ctx.restore(); if(o_leaf) { ctx.strokeStyle='#6a8a3a'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(16,-12); ctx.lineTo(24,-8); ctx.stroke(); ell(24,-9,5,2,'#8fb05a',.4); } }
  ctx.restore();
}
let o_leaf=false;
/* ===== a arca (cresce conforme o capítulo) ===== */
function ark(x,y,stage,o){
  o=o||{}; ctx.save(); ctx.translate(x,y); if(o.rock) ctx.rotate(o.rock);
  const L=360, Ht=150;
  softShadow(0,4,240,.35);
  const kS=ss(0,.12,stage), ribS=ss(.08,.38,stage), hullS=ss(.35,.72,stage), houseS=ss(.7,.9,stage), doneS=ss(.9,1,stage);
  // quilha
  ctx.fillStyle='#5a3a22'; rr(-L/2*kS,-12,L*kS,12,5); ctx.fill();
  const hull=()=>{ ctx.beginPath(); ctx.moveTo(-L/2-20,-Ht); ctx.lineTo(L/2+20,-Ht); ctx.quadraticCurveTo(L/2+10,-20,L/2-60,0); ctx.lineTo(-L/2+60,0); ctx.quadraticCurveTo(-L/2-10,-20,-L/2-20,-Ht); ctx.closePath(); };
  // costelas
  ctx.strokeStyle='#7a4a2a'; ctx.lineWidth=7; ctx.lineCap='round';
  const nr=Math.floor(ribS*12); for(let i=0;i<nr;i++){ const rx=-L/2+20+i*(L-40)/11; ctx.beginPath(); ctx.moveTo(rx,0); ctx.quadraticCurveTo(rx+(rx<0?-14:14),-Ht*.5,rx+(rx<0?-22:22),-Ht); ctx.stroke(); }
  // casco (tábuas de baixo para cima)
  if(hullS>0){ ctx.save(); hull(); ctx.clip(); const top=lerp(0,-Ht-4,hullS);
    ctx.fillStyle=vgrad(-Ht,0,[[0,'#c88a52'],[1,'#7a4a28']]); ctx.fillRect(-L,top,L*2,-top+4);
    ctx.strokeStyle='rgba(60,30,12,.4)'; ctx.lineWidth=2.5; for(let yy=-6;yy>top;yy-=17){ ctx.beginPath(); ctx.moveTo(-L,yy); ctx.lineTo(L,yy); ctx.stroke(); }
    ctx.fillStyle='rgba(0,0,0,.18)'; ctx.fillRect(-L, top, L*2, 8);
    ctx.restore(); if(hullS>=1){ ctx.strokeStyle=rgba('#fff1c8',.35); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-L/2-18,-Ht+2); ctx.lineTo(L/2+18,-Ht+2); ctx.stroke(); } }
  // casa no convés
  if(houseS>0){ ctx.save(); ctx.globalAlpha=houseS; const hy=-Ht, hh=90*houseS;
    ctx.fillStyle=vgrad(hy-hh,hy,[[0,'#d9a46c'],[1,'#a8703f']]); rr(-130,hy-hh,240,hh,8); ctx.fill();
    ctx.fillStyle=vgrad(hy-hh-60,hy-hh,[[0,'#a5563f'],[1,'#7a3a2a']]); ctx.beginPath(); ctx.moveTo(-152,hy-hh+4); ctx.lineTo(-10,hy-hh-58); ctx.lineTo(132,hy-hh+4); ctx.closePath(); ctx.fill();
    if(doneS>0){ const lit=o.lit==null?.6:o.lit; for(const wx of [-100,-60,40,80]){ ctx.fillStyle=mix('#4a2f22','#ffd27a',lit); rr(wx,hy-60,24,22,5); ctx.fill(); if(lit>.3) glow(wx+12,hy-49,38,'#ffc060',lit*.45); }
      ctx.fillStyle=mix('#3a2418','#ffc870',o.doorLit||0); rr(-24,hy-74,38,74,14); ctx.fill(); }
    ctx.restore(); }
  // rampa
  if(o.ramp!=null && o.ramp>0){ ctx.save(); ctx.translate(-5,-Ht+2); ctx.rotate(lerp(Math.PI,.62,o.ramp)); ctx.fillStyle=vgrad(0,10,[[0,'#b97c47'],[1,'#7a4a28']]); rr(-10,0,26,Ht*1.25,4); ctx.fill(); ctx.restore(); }
  // andaime
  if(stage<.97 && stage>.2){ ctx.strokeStyle='#8a6a48'; ctx.lineWidth=4; for(const sx of [-L/2-40, L/2+40]){ ctx.beginPath(); ctx.moveTo(sx,0); ctx.lineTo(sx,-Ht-30); ctx.stroke(); for(let k=0;k<4;k++){ ctx.beginPath(); ctx.moveTo(sx-14,-k*44-10); ctx.lineTo(sx+14,-k*44-10); ctx.stroke(); } } }
  ctx.restore();
}
function waves(y,amp,c1,c2,speed,front){ ctx.beginPath(); ctx.moveTo(-1600,700); for(let x=-1600;x<=1600;x+=16){ ctx.lineTo(x, y+Math.sin(x*.012+G*speed)*amp+Math.sin(x*.031-G*speed*1.4)*amp*.4); } ctx.lineTo(1600,700); ctx.closePath();
  ctx.fillStyle=vgrad(y-amp,y+260,[[0,c1],[1,c2]]); ctx.fill(); ctx.strokeStyle=rgba('#ffffff',front?.45:.25); ctx.lineWidth=front?4:2.5; ctx.stroke(); }
function rain(a,slant){ if(a<=0) return; ctx.save(); ctx.strokeStyle=`rgba(210,225,245,${.45*a})`; ctx.lineWidth=1.6; ctx.beginPath(); const n=Math.floor(160*a);
  for(let i=0;i<n;i++){ const x=((i*61.7+G*140*(slant||1))%(W+80))-40, y=((i*113.1+G*900)%(H+60))-30; ctx.moveTo(x,y); ctx.lineTo(x-(slant||1)*6,y+20); } ctx.stroke(); ctx.restore(); }

