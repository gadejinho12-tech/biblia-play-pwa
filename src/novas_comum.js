'use strict';
/* =====================================================================
   HISTÓRIAS NOVAS DO NT — peças compartilhadas
   "Jesus Acalma a Tempestade" (Marcos 4:35-41) e "Pães e Peixes"
   (João 6:1-14) deixam de ser "em breve" e ganham 3 fases cada, com
   6 mecânicas inéditas no jogo:
     Tempestade F1 pilotar o barco  · F2 equilibrar + tirar água
     Tempestade F3 deslizar o dedo pra acalmar as ondas
     Pães F1 achar o menino numa multidão em movimento
     Pães F2 arremessar com o dedo  · F3 pegar as sobras com o cesto
   ===================================================================== */
PHASE_KEYS.push('tempestade1','tempestade2','tempestade3','paes1','paes2','paes3');

MUSIC_TRACKS.tempestade = { wave:'triangle', vol:.04, notes:[ // mar aberto, menor e ondulante
  {n:'A3',d:.3},{n:'C4',d:.3},{n:'E4',d:.3},{n:'A4',d:.3},
  {n:'G4',d:.3},{n:'E4',d:.3},{n:'F4',d:.3},{n:'E4',d:.45},
]};
MUSIC_TRACKS.tempestade2 = { wave:'sawtooth', vol:.022, notes:[ // tempestade: rápido e tenso
  {n:'A3',d:.16},{n:'A3',d:.16},{n:'C4',d:.16},{n:'A3',d:.16},
  {n:'Eb4',d:.16},{n:'D4',d:.16},{n:'C4',d:.16},{n:'B3',d:.24},
]};
MUSIC_TRACKS.calma = { wave:'sine', vol:.045, notes:[ // bonança: aberto e luminoso
  {n:'C5',d:.45},{n:'G4',d:.45},{n:'E5',d:.45},{n:'D5',d:.45},
  {n:'C5',d:.45},{n:'A4',d:.45},{n:'G4',d:.45},{n:'C5',d:.7},
]};
MUSIC_TRACKS.paes = { wave:'triangle', vol:.045, notes:[ // festa no campo, alegre
  {n:'D5',d:.22},{n:'B4',d:.22},{n:'G4',d:.22},{n:'B4',d:.22},
  {n:'C5',d:.22},{n:'A4',d:.22},{n:'D5',d:.22},{n:'G5',d:.34},
]};

const NT_LINE = {
  narr:  t=>({who:'Narrador', face:'narrador', color:'#BBD8FF', text:t}),
  jesus: t=>({who:'Jesus', face:'jesus', color:'#FFE9B0', text:t}),
  pedro: t=>({who:'Pedro', face:'marinheiro', color:'#9FC8F0', text:t}),
  andre: t=>({who:'André', face:'filho', color:'#B8E0A8', text:t}),
  filipe:t=>({who:'Filipe', face:'daniel', color:'#F2D59A', text:t}),
  menino:t=>({who:'Menino', face:'davi', color:'#FFD3A8', text:t}),
};

/* ---------- personagens ---------- */
function drawJesus(x,y,s,dir,walk,arms){
  drawPerson({x,y,s, skin:'#E3AD79', robe:'#F4EEDD', hairC:'#6B4423', beard:false, dir:dir||1, walk:walk||0, carry:arms?'up':null});
  const b = Math.abs(Math.sin(walk||0))*5*s;
  ctx.save(); ctx.translate(x, y-b);
  // faixa vermelha (manto)
  ctx.strokeStyle='#C0483A'; ctx.lineWidth=6*s; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(-14*s,-54*s); ctx.quadraticCurveTo(2*s,-36*s,14*s,-16*s); ctx.stroke(); ctx.lineCap='butt';
  // cabelo comprido + barba castanha
  blob(-15*s,-68*s,6*s,12*s,'#6B4423',2.5*s); blob(15*s,-68*s,6*s,12*s,'#6B4423',2.5*s);
  blob(0,-61*s,11*s,7*s,'#7A5232',2.5*s);
  ctx.strokeStyle=OUT; ctx.lineWidth=2.2*s; ctx.lineCap='round';
  ctx.beginPath(); ctx.arc(0,-66*s,4*s,0.2*Math.PI,0.8*Math.PI); ctx.stroke(); ctx.lineCap='butt';
  ctx.restore();
}
const DISCIPLE_LOOKS = [
  { robe:'#4E8FD1', hairC:'#3A2A1A', skin:'#E3AD79' },
  { robe:'#6BBF59', hairC:'#6B4423', skin:'#D9A06B' },
  { robe:'#E8A33C', hairC:'#241B14', skin:'#C98A5B' },
  { robe:'#B07ACC', hairC:'#4A3320', skin:'#E8B98A' },
];
function drawDisciple(i,x,y,s,dir,walk,carry){
  const L = DISCIPLE_LOOKS[i%DISCIPLE_LOOKS.length];
  drawPerson({x,y,s,skin:L.skin,robe:L.robe,hairC:L.hairC,beard:false,dir:dir||1,walk:walk||0,carry:carry||null});
  ctx.save(); ctx.translate(x, y-Math.abs(Math.sin(walk||0))*5*s);
  blob(0,-60*s,10*s,6*s,L.hairC,2*s); // barbinha
  ctx.restore();
}
function drawWicker(x,y,s,fill){ // cesto de vime
  ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  if(fill){
    blob(-10,-12,11,8,'#E8B86A',2.5); blob(8,-14,11,8,'#DDA956',2.5);
    if(fill>1){ blob(0,-20,12,5,'#9FC8E8',2.5); blob(13,-20,4,4,'#9FC8E8',2); }
  }
  ctx.beginPath(); ctx.moveTo(-26,-12); ctx.lineTo(26,-12); ctx.lineTo(20,14); ctx.lineTo(-20,14); ctx.closePath();
  ctx.fillStyle='#C98A4B'; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=3.5; ctx.stroke();
  ctx.strokeStyle='rgba(90,50,20,.45)'; ctx.lineWidth=2;
  for(let i=-1;i<=1;i++){ ctx.beginPath(); ctx.moveTo(-24+2,i*7); ctx.lineTo(24-2,i*7); ctx.stroke(); }
  for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(i*9,-12); ctx.lineTo(i*7.5,14); ctx.stroke(); }
  panel(-28,-16,56,8,4,'#A5652F',OUT,2.5);
  ctx.restore();
}
function drawBread(x,y,s,rot){
  ctx.save(); ctx.translate(x,y); ctx.rotate(rot||0); ctx.scale(s,s);
  blob(0,0,16,11,'#E8B86A',3);
  ctx.strokeStyle='rgba(140,80,30,.6)'; ctx.lineWidth=2.2;
  for(const dx of [-6,0,6]){ ctx.beginPath(); ctx.moveTo(dx-2,-6); ctx.lineTo(dx+2,4); ctx.stroke(); }
  blob(-5,-5,4,2,'rgba(255,255,255,.45)',0);
  ctx.restore();
}
function drawFishItem(x,y,s,rot){
  ctx.save(); ctx.translate(x,y); ctx.rotate(rot||0); ctx.scale(s,s);
  ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(24,-9); ctx.lineTo(24,9); ctx.closePath();
  ctx.fillStyle='#7FB0D8'; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=2.5; ctx.stroke();
  blob(0,0,16,9,'#9FC8E8',2.8);
  ctx.fillStyle=OUT; ctx.beginPath(); ctx.arc(-8,-2,2,0,7); ctx.fill();
  ctx.restore();
}

/* ---------- barco (vista lateral) ---------- */
function drawBoatSide(x,y,s,tilt,o){
  o = o||{};
  ctx.save(); ctx.translate(x,y); ctx.rotate(tilt||0); ctx.scale(s,s);
  // mastro + vela
  ctx.fillStyle='#8B5A2B'; ctx.strokeStyle=OUT; ctx.lineWidth=3;
  ctx.fillRect(-4,-170,8,170); ctx.strokeRect(-4,-170,8,170);
  const fl = Math.sin(T*(o.storm?9:3))*(o.storm?14:5);
  ctx.beginPath(); ctx.moveTo(6,-160); ctx.quadraticCurveTo(70+fl,-110,8,-40); ctx.closePath();
  ctx.fillStyle = o.torn? '#E8DFC8' : '#FFF9EC'; ctx.fill(); ctx.lineWidth=3.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-6,-150); ctx.quadraticCurveTo(-58+fl*.6,-100,-6,-46); ctx.closePath();
  ctx.fillStyle='#F2E6C8'; ctx.fill(); ctx.stroke();
  // pessoas a bordo (atrás do casco)
  if(o.crew) o.crew();
  // casco
  ctx.beginPath(); ctx.moveTo(-150,-20); ctx.lineTo(150,-20); ctx.quadraticCurveTo(140,30,90,42); ctx.lineTo(-90,42); ctx.quadraticCurveTo(-140,30,-150,-20); ctx.closePath();
  const hg = ctx.createLinearGradient(0,-20,0,42); hg.addColorStop(0,'#B8763C'); hg.addColorStop(1,'#7A4A22');
  ctx.fillStyle=hg; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=5; ctx.stroke();
  ctx.strokeStyle='rgba(60,30,10,.45)'; ctx.lineWidth=2.5;
  for(const yy of [0,20]){ ctx.beginPath(); ctx.moveTo(-138+(yy?14:0),yy); ctx.lineTo(138-(yy?14:0),yy); ctx.stroke(); }
  panel(-156,-28,312,12,6,'#D99A5B',OUT,3);
  blob(-100,8,9,9,'#5E9FD8',2.5); blob(-100,8,4,4,'#FFF9EC',0); // olho de proa decorativo
  ctx.restore();
}
function drawSleepingJesus(x,y,s,wake){
  ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  blob(-34,4,22,12,'#E8DFC8',3); // travesseiro (Marcos 4:38)
  blob(18,8,50,15,'#F4EEDD',3.5); // corpo deitado
  ctx.strokeStyle='#C0483A'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-2,-4); ctx.lineTo(30,18); ctx.stroke();
  blob(-34,-8,17,16,'#E3AD79',3.5);
  blob(-36,-20,16,8,'#6B4423',3); blob(-48,-8,6,12,'#6B4423',2.5);
  blob(-32,2,9,6,'#7A5232',2.5);
  ctx.strokeStyle=OUT; ctx.lineWidth=2.5; ctx.lineCap='round';
  if(wake>0.5){ eyes(-30,-10,6,3.6); }
  else { for(const ex of [-36,-24]){ ctx.beginPath(); ctx.arc(ex,-10,3.5,0.1*Math.PI,0.9*Math.PI); ctx.stroke(); } }
  ctx.lineCap='butt';
  ctx.restore();
  if(wake<=0.5){
    for(let i=0;i<3;i++){ const q=((T*.6+i/3)%1);
      txt('z', x-10*s+q*30, y-30*s-q*50, 14+q*10, 'rgba(255,255,255,'+(1-q)+')', 'center', true); }
  }
}

/* ---------- ícones do lobby / seleção de fases ---------- */
const NT_ICONS = {
  barcoT(){ // barquinho no mar
    ctx.beginPath(); ctx.moveTo(-34,8); ctx.lineTo(34,8); ctx.lineTo(24,24); ctx.lineTo(-24,24); ctx.closePath();
    ctx.fillStyle='#A5652F'; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=3.5; ctx.stroke();
    ctx.fillStyle='#8B5A2B'; ctx.fillRect(-2,-32,4,40);
    ctx.beginPath(); ctx.moveTo(3,-30); ctx.quadraticCurveTo(30,-12,3,4); ctx.closePath(); ctx.fillStyle='#FFF9EC'; ctx.fill(); ctx.lineWidth=3; ctx.stroke();
    ctx.strokeStyle='#4E9FD8'; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath(); for(let i=-40;i<=40;i+=4) ctx.lineTo(i,28+Math.sin(i*.25+T*3)*3); ctx.stroke(); ctx.lineCap='butt';
  },
  raio(){ // nuvem de tempestade com raio
    blob(-12,-8,20,15,'#6E7A8C',3); blob(12,-10,18,14,'#7E8A9C',3); blob(0,-18,16,13,'#8E9AAC',3);
    ctx.beginPath(); ctx.moveTo(2,2); ctx.lineTo(-8,20); ctx.lineTo(2,18); ctx.lineTo(-4,36); ctx.lineTo(14,12); ctx.lineTo(4,14); ctx.lineTo(10,2); ctx.closePath();
    ctx.fillStyle='#FFD75E'; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=2.5; ctx.stroke();
  },
  calma(){ // mar calmo com sol
    blob(0,-10,18,18,'#FFD75E',3);
    ctx.strokeStyle='#4E9FD8'; ctx.lineWidth=4; ctx.lineCap='round';
    for(const yy of [14,26]){ ctx.beginPath(); ctx.moveTo(-34,yy); ctx.quadraticCurveTo(-17,yy-4,0,yy); ctx.quadraticCurveTo(17,yy+4,34,yy); ctx.stroke(); }
    ctx.lineCap='butt';
  },
  paesPeixes(){ drawWicker(0,10,.9,0); drawBread(-12,-6,.8,-.2); drawBread(10,-8,.8,.25); drawFishItem(0,-20,.7,.1); },
  menino(){ blob(0,-14,14,14,'#E3AD79',3); blob(0,-24,13,7,'#6B4423',2.5); eyes(0,-14,5,3); drawWicker(14,18,.55,1); },
  arremesso(){ drawBread(-14,10,.8,0);
    ctx.strokeStyle='rgba(255,255,255,.9)'; ctx.setLineDash([4,5]); ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(-6,2); ctx.quadraticCurveTo(10,-30,26,-14); ctx.stroke(); ctx.setLineDash([]);
    blob(26,-14,9,9,'#FF8FB3',2.5); },
  cestos(){ for(let i=0;i<3;i++) drawWicker(-22+i*22, 8-(i===1?10:0), .55, 1); txt('12', 0, 34, 14, '#5A3A10', 'center', true); },
};
(function hookIcons(){
  const orig = scenes.lobby.drawIcon;
  scenes.lobby.drawIcon = function(icon,x,y,s){
    if(NT_ICONS[icon]){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); NT_ICONS[icon](); ctx.restore(); return; }
    return orig.call(this,icon,x,y,s);
  };
})();

/* ---------- liga as histórias no lobby (antes eram "em breve") ---------- */
(function wireStories(){
  const tp = STORIES.find(s=>s.id==='tempestade');
  if(tp) Object.assign(tp, { soon:false, color:'#3F6FB5', icon:'raio', phases:[
    { key:'tempestade1', name:'Fase 1 · Atravessando o Mar',  icon:'barcoT', go:()=>setScene('tempestade1_run'), locked:false },
    { key:'tempestade2', name:'Fase 2 · A Grande Tempestade', icon:'raio',   go:()=>setScene('tempestade2_run'), locked:()=>save.tempestade1===0 },
    { key:'tempestade3', name:'Fase 3 · Mestre, Salva-nos!',  icon:'calma',  go:()=>setScene('tempestade3_run'), locked:()=>save.tempestade2===0 },
  ]});
  const pp = STORIES.find(s=>s.id==='paes');
  if(pp) Object.assign(pp, { soon:false, color:'#D98C2B', icon:'paesPeixes', phases:[
    { key:'paes1', name:'Fase 1 · O Lanche do Menino', icon:'menino',    go:()=>setScene('paes1_run'), locked:false },
    { key:'paes2', name:'Fase 2 · Dá pra Todo Mundo!', icon:'arremesso', go:()=>setScene('paes2_run'), locked:()=>save.paes1===0 },
    { key:'paes3', name:'Fase 3 · Doze Cestos',        icon:'cestos',    go:()=>setScene('paes3_run'), locked:()=>save.paes2===0 },
  ]});
})();

/* ---------- utilitários das fases novas ---------- */
function segHitsCircle(x1,y1,x2,y2,cx,cy,r){
  const dx=x2-x1, dy=y2-y1, L=dx*dx+dy*dy||1;
  let t=((cx-x1)*dx+(cy-y1)*dy)/L; t=Math.max(0,Math.min(1,t));
  return Math.hypot(x1+dx*t-cx, y1+dy*t-cy) < r;
}
function hudPill(text, y, w){
  w = w||240;
  panel(W/2-w/2, y, w, 40, 14, 'rgba(255,249,236,.94)', OUT, 4);
  txt(text, W/2, y+26, 16.5, '#5A452A', 'center', true);
}
function hudBar(x,y,w,h,frac,color,label){
  panel(x,y,w,h,h/2,'rgba(255,249,236,.94)',OUT,4);
  if(frac>0){ panel(x+5,y+5,Math.max(h-10,(w-10)*Math.min(1,frac)),h-10,(h-10)/2,color,null); }
  if(label) txt(label, x+w/2, y+h/2+5, 13, '#3A2C22', 'center', true);
}

/* ---------- Modo Carreira com ROLAGEM ----------
   Com as histórias novas a trilha não cabe mais numa tela só (os nomes se
   sobrepunham). Agora as paradas têm espaçamento fixo e a criança arrasta
   o dedo pra rolar; ao abrir, a trilha já rola até a parada atual. */
(function scrollableCareer(){
  const C = scenes.career;
  const origInit = C.init;
  C.nodes = function(){
    const n = CAREER_TRAIL.length, topY = 190, gap = 112, afterCh = 40, beforeCh = 60;
    const rects = []; let y = topY;
    for(let i=0;i<n;i++){
      const t = CAREER_TRAIL[i];
      const x = t.kind==='chapter'? W/2 : (i%2===0? 175 : 365);
      rects.push({ x, y, t, i });
      const nextIsChapter = i+1<n && CAREER_TRAIL[i+1].kind==='chapter';
      y += gap + (t.kind==='chapter'? afterCh : 0) + (nextIsChapter? beforeCh : 0);
    }
    return rects;
  };
  C.maxScroll = function(){ const ns=this.nodes(); return Math.max(0, ns[ns.length-1].y + 110 - H); };
  C.init = function(){
    origInit.call(this);
    const ns = this.nodes(), cur = ns[this.currentIndex()];
    this.sy = Math.max(0, Math.min(this.maxScroll(), cur.y - H*.5));
    this.drag = null; this.vel = 0;
  };
  const origTap = C.tap;
  C.tap = function(x,y){
    if(topBarTap(x,y)) return;
    this.drag = { y0:y, sy0:this.sy, moved:false, x, y, last:y, t:T };
    this.vel = 0;
  };
  C.release = function(){
    const d = this.drag; this.drag = null;
    if(!d) return;
    if(!d.moved){
      const ns = this.nodes(), sy = this.sy;
      this.nodes = ()=>ns.map(r=>Object.assign({}, r, {y:r.y-sy}));
      try{ origTap.call(this, d.x, d.y); } finally { delete this.nodes; }
    }
  };
  C.update = function(dt){
    const d = this.drag;
    if(d && P.down){
      if(Math.abs(P.y-d.y0) > 10) d.moved = true;
      if(d.moved){ const ny = d.sy0 - (P.y - d.y0); this.vel = (ny - this.sy)/Math.max(dt,.001); this.sy = ny; }
    } else if(Math.abs(this.vel) > 5){ this.sy += this.vel*dt; this.vel *= Math.max(0, 1-dt*4); }
    const mx = this.maxScroll();
    if(this.sy < 0){ this.sy = 0; this.vel = 0; } else if(this.sy > mx){ this.sy = mx; this.vel = 0; }
  };
  const origDraw = C.draw;
  C.draw = function(dt){
    const sy = this.sy||0, ns = this.nodes().map(r=>Object.assign({}, r, {y:r.y-sy}));
    const realNodes = this.nodes, realCur = this.currentIndex;
    let curIdx = realCur.call(this);
    if(ns[curIdx] && (ns[curIdx].y < 230 || ns[curIdx].y > H+40)) curIdx = -1; // parada atual fora da tela: esconde o ajudante
    this.nodes = ()=>ns; this.currentIndex = ()=>curIdx;
    try{ origDraw.call(this, dt); } finally { this.nodes = realNodes; this.currentIndex = realCur; }
    // cabeçalho fixo por cima da trilha rolada
    if(sy > 4){
      const hg = ctx.createLinearGradient(0,0,0,140); hg.addColorStop(0,'#BFE3F5'); hg.addColorStop(.8,'#BFE3F5'); hg.addColorStop(1,'rgba(191,227,245,0)');
      ctx.fillStyle=hg; ctx.fillRect(0,0,W,140);
      drawTopBar('MODO CARREIRA','rgba(90,60,140,.92)');
      txt('Sua jornada pela Bíblia, em ordem ✦', W/2, 112, 13.5, 'rgba(50,40,30,.7)', 'center', true);
      if(this.ts) toastDraw(this.ts, 0, 128);
    }
    // dica de rolagem
    const mx = this.maxScroll();
    if(sy < mx-4){ const b=Math.sin(T*4)*5; blob(W/2, H-34+b, 22, 22, 'rgba(255,249,236,.92)', 3.5); txt('▼', W/2, H-27+b, 18, '#7A5A3A', 'center', true); }
    if(sy > 4){ blob(W-40, 150, 18, 18, 'rgba(255,249,236,.92)', 3); txt('▲', W-40, 156, 15, '#7A5A3A', 'center', true); }
  };
})();
