'use strict';
/* =====================================================================
   FX — camada gráfica global (melhoria visual de TODAS as fases)
   - Renderização HD (usa devicePixelRatio: traço nítido em celular/tablet)
   - Cenário automático: detecta o horizonte do degradê de fundo de cada
     cena e desenha morros/dunas em camadas, névoa do horizonte, textura
     de chão, estrelas em céu noturno e raios de luz debaixo d'água
   - Partículas ambientes (pólen, vaga-lumes, bolhas), vinheta suave
   - "Suco" de jogo: brilhos ao pegar/encaixar, tremidinha ao bater,
     anel de toque, transição circular entre telas e confete na vitória
   Tudo aqui é só visual — nenhuma regra de jogo muda.
   ===================================================================== */
const FX = {
  k:1, bgDone:false, sceneName:'', bg:null, parts:[], ambient:[], ripples:[], confetti:[],
  shakeT:0, shakeA:0, trans:null, lastPtrT:-9, colorCache:{},
};

/* ---------- cores ---------- */
FX.rgb = function(c){
  if(FX.colorCache[c]) return FX.colorCache[c];
  let r=0,g=0,b=0;
  if(typeof c==='string' && c[0]==='#'){
    let h=c.slice(1); if(h.length===3) h=h.split('').map(x=>x+x).join('');
    r=parseInt(h.slice(0,2),16); g=parseInt(h.slice(2,4),16); b=parseInt(h.slice(4,6),16);
  } else if(typeof c==='string'){
    const m=c.match(/[\d.]+/g); if(m){ r=+m[0]; g=+m[1]; b=+m[2]; }
  }
  return FX.colorCache[c]=[r,g,b];
};
FX.mix = function(a,b,t){ const A=FX.rgb(a),B=FX.rgb(b);
  return 'rgb('+Math.round(A[0]+(B[0]-A[0])*t)+','+Math.round(A[1]+(B[1]-A[1])*t)+','+Math.round(A[2]+(B[2]-A[2])*t)+')'; };
FX.lum = function(c){ const [r,g,b]=FX.rgb(c); return (0.299*r+0.587*g+0.114*b)/255; };
FX.dist = function(a,b){ const A=FX.rgb(a),B=FX.rgb(b); return Math.abs(A[0]-B[0])+Math.abs(A[1]-B[1])+Math.abs(A[2]-B[2]); };

/* ---------- texturas pré-renderizadas ---------- */
FX.makeCanvas = function(w,h){ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; };
(function buildTextures(){
  // textura de chão: pinceladinhas claras/escuras, repete sem emenda
  const t = FX.makeCanvas(180,180), g = t.getContext('2d');
  let seed = 7; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
  for(let i=0;i<70;i++){
    const x=rnd()*180, y=rnd()*180, r=2+rnd()*5;
    g.fillStyle = rnd()<.55? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.10)';
    g.beginPath(); g.ellipse(x,y,r*1.6,r*.7,0,0,7); g.fill();
  }
  for(let i=0;i<26;i++){ // tufinhos
    const x=rnd()*180, y=rnd()*180;
    g.strokeStyle='rgba(0,0,0,.09)'; g.lineWidth=1.6; g.lineCap='round';
    g.beginPath(); g.moveTo(x-3,y); g.lineTo(x-4,y-6); g.moveTo(x,y); g.lineTo(x,y-8); g.moveTo(x+3,y); g.lineTo(x+4,y-6); g.stroke();
  }
  FX.groundTex = t;
  // grão de papel bem suave (fundos sem horizonte)
  const p = FX.makeCanvas(128,128), pg = p.getContext('2d');
  for(let i=0;i<900;i++){
    pg.fillStyle = rnd()<.5? 'rgba(0,0,0,.035)' : 'rgba(255,255,255,.05)';
    pg.fillRect(rnd()*128, rnd()*128, 1.4, 1.4);
  }
  FX.grainTex = p;
})();
FX.pat = function(name){
  const key='_pat_'+name;
  if(!FX[key]) FX[key] = ctx.createPattern(name==='ground'? FX.groundTex : FX.grainTex, 'repeat');
  return FX[key];
};
FX.buildVignette = function(){
  const k=FX.k, c=FX.makeCanvas(Math.round(W*k), Math.round(H*k)), g=c.getContext('2d');
  g.scale(k,k);
  const rg = g.createRadialGradient(W/2,H*.45,H*.28, W/2,H*.5,H*.78);
  rg.addColorStop(0,'rgba(20,12,30,0)'); rg.addColorStop(1,'rgba(20,12,30,.26)');
  g.fillStyle=rg; g.fillRect(0,0,W,H);
  // luz quentinha vindo de cima
  const lg = g.createLinearGradient(0,0,0,H*.35);
  lg.addColorStop(0,'rgba(255,248,220,.10)'); lg.addColorStop(1,'rgba(255,248,220,0)');
  g.fillStyle=lg; g.fillRect(0,0,W,H*.35);
  FX.vignette = c;
};

/* ---------- HD: tamanho real do canvas acompanha a tela ---------- */
FX.resize = function(){
  const s = Math.min(innerWidth/W, innerHeight/H);
  const dpr = window.devicePixelRatio || 1;
  const k = Math.max(1, Math.min(2, s*dpr));
  if(Math.abs(k-FX.k)<0.01 && cv.width===Math.round(W*k)) return;
  FX.k = k;
  cv.width = Math.round(W*k); cv.height = Math.round(H*k);
  FX.buildVignette();
};
addEventListener('resize', FX.resize);

/* ---------- rastreia degradês pra descobrir o "horizonte" de cada cena ---------- */
(function hookCtx(){
  const cLG = ctx.createLinearGradient.bind(ctx);
  ctx.createLinearGradient = function(x0,y0,x1,y1){
    const g = cLG(x0,y0,x1,y1);
    const stops = [], add = g.addColorStop.bind(g);
    g.addColorStop = function(o,c){ stops.push([o,c]); add(o,c); };
    g._fx = {x0,y0,x1,y1,stops};
    return g;
  };
  const fR = ctx.fillRect.bind(ctx);
  ctx.fillRect = function(x,y,w,h){
    fR(x,y,w,h);
    if(!FX.bgDone && x<=0 && y<=0 && w>=W && h>=H){
      FX.bgDone = true;
      const fs = ctx.fillStyle;
      FX.bg = (fs && fs._fx && fs._fx.x0===fs._fx.x1)? FX.analyze(fs._fx) : null;
      if(FX.bg) FX.enhanceBg(FX.bg);
    }
  };
})();
FX.analyze = function(info){
  const st = info.stops.slice().sort((a,b)=>a[0]-b[0]);
  if(st.length<2) return null;
  const span = info.y1-info.y0;
  const out = { top:st[0][1], bottom:st[st.length-1][1], horizon:null };
  for(let i=0;i<st.length-1;i++){
    if(st[i+1][0]-st[i][0] <= 0.025 && FX.dist(st[i][1], st[i+1][1]) > 70){
      out.horizon = info.y0 + span*st[i+1][0];
      out.sky = st[i][1]; out.ground = st[i+1][1];
      break;
    }
  }
  out.dark = FX.lum(out.top) < 0.32;
  out.night = out.horizon!==null && out.dark;
  out.underwater = FX.UNDERWATER.has(FX.sceneName);
  return out;
};
FX.UNDERWATER = new Set(['jonas2_run']);
FX.seedOf = function(s){ let h=0; for(const ch of s) h=(h*31+ch.charCodeAt(0))|0; return (h>>>0)%1000; };
FX.ridge = function(y0, amp, seed, color, freq){
  ctx.beginPath(); ctx.moveTo(-10, y0+2);
  for(let x=-10;x<=W+10;x+=18){
    const n = Math.sin(x*0.011*freq+seed)*0.55 + Math.sin(x*0.027*freq+seed*1.7)*0.3 + Math.sin(x*0.051*freq+seed*.3)*0.15;
    ctx.lineTo(x, y0 - amp*(0.55+0.45*n));
  }
  ctx.lineTo(W+10, y0+2); ctx.closePath();
  ctx.fillStyle = color; ctx.fill();
};
FX.enhanceBg = function(bg){
  ctx.save();
  const seed = FX.seedOf(FX.sceneName||'x');
  if(bg.horizon!==null && bg.horizon>40 && bg.horizon<H-40){
    const hy = bg.horizon;
    if(bg.night){ // céu estrelado
      for(let i=0;i<34;i++){
        const sx = (i*137.5+seed*13)%W, sy = ((i*71.3+seed*7)%(hy-30))+8;
        const tw = 0.35+0.65*Math.abs(Math.sin(T*1.6+i*1.9));
        ctx.fillStyle='rgba(255,250,220,'+(0.75*tw)+')';
        ctx.beginPath(); ctx.arc(sx,sy,1+(i%3)*.6,0,7); ctx.fill();
      }
    }
    // névoa clarinha no horizonte (profundidade)
    const hz = ctx.createLinearGradient(0,hy-90,0,hy);
    hz.addColorStop(0,'rgba(255,255,255,0)'); hz.addColorStop(1, bg.night? 'rgba(160,170,220,.18)':'rgba(255,255,255,.35)');
    ctx.fillStyle=hz; ctx.fillRect(0,hy-90,W,90);
    // 2 camadas de morros/dunas: a de trás "some" na atmosfera, a da frente nasce do chão
    FX.ridge(hy, 58, seed, FX.mix(bg.sky, bg.ground, bg.night? .55 : .42), 1);
    FX.ridge(hy, 30, seed+2.3, FX.mix(bg.ground, '#000', .06), 1.6);
    FX.ridge(hy+1, 12, seed+5.1, bg.ground, 2.4);
    // textura do chão + sombrinha logo abaixo do horizonte
    ctx.fillStyle = FX.pat('ground'); ctx.globalAlpha = .9;
    ctx.fillRect(0, hy, W, H-hy); ctx.globalAlpha = 1;
    const gs = ctx.createLinearGradient(0,hy,0,hy+70);
    gs.addColorStop(0,'rgba(0,0,0,.10)'); gs.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gs; ctx.fillRect(0,hy,W,70);
  } else if(bg.underwater){
    ctx.globalCompositeOperation = 'lighter';
    for(let i=0;i<6;i++){
      const x = (i*97+seed)%W + Math.sin(T*.4+i)*30, w2 = 40+(i%3)*22;
      const lg = ctx.createLinearGradient(0,0,0,H*.85);
      lg.addColorStop(0,'rgba(190,240,255,.16)'); lg.addColorStop(1,'rgba(190,240,255,0)');
      ctx.fillStyle=lg;
      ctx.beginPath(); ctx.moveTo(x-w2*.3,0); ctx.lineTo(x+w2*.3,0); ctx.lineTo(x+w2*1.6-80,H*.85); ctx.lineTo(x-w2*.4-80,H*.85); ctx.closePath(); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  } else {
    ctx.fillStyle = FX.pat('grain'); ctx.fillRect(0,0,W,H);
    const rg = ctx.createRadialGradient(W/2,-60,20,W/2,-60,H*.7);
    rg.addColorStop(0,'rgba(255,255,255,.16)'); rg.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=rg; ctx.fillRect(0,0,W,H);
  }
  ctx.restore();
};

/* ---------- partículas ---------- */
FX.burst = function(x,y,colors,n,speed){
  colors = colors || ['#FFD75E','#FFF3C4','#FF9FC2','#9FE3FF'];
  n = n||10; speed = speed||170;
  for(let i=0;i<n;i++){
    const a = Math.random()*Math.PI*2, v = speed*(0.4+Math.random()*0.8);
    FX.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60,life:.55+Math.random()*.35,t:0,
      r:3+Math.random()*4,c:colors[i%colors.length],kind:Math.random()<.45?'star':'dot'});
  }
};
FX.float = function(x,y,text,color,size){ FX.parts.push({x,y,vx:0,vy:-55,life:1.1,t:0,text,c:color||'#fff',size:size||22,kind:'text'}); };
FX.shake = function(a,t){ FX.shakeA = Math.max(FX.shakeA, a||6); FX.shakeT = Math.max(FX.shakeT, t||.25); };
FX.celebrate = function(){
  const cols=['#FFC93C','#FF6B8B','#6BBF59','#5EB3F2','#B07ACC','#FF9F43'];
  for(let i=0;i<110;i++){
    FX.confetti.push({x:Math.random()*W, y:-20-Math.random()*300, vx:(Math.random()-.5)*80, vy:120+Math.random()*160,
      rot:Math.random()*6, vr:(Math.random()-.5)*10, w:7+Math.random()*6, h:4+Math.random()*4, c:cols[i%cols.length], t:0});
  }
};
FX.recentPointer = function(){ return (T - FX.lastPtrT) < 0.35; };

FX.ambientKind = function(){
  const bg = FX.bg;
  if(!bg) return null;
  if(bg.underwater) return 'bubble';
  if(bg.night) return 'firefly';
  if(bg.horizon!==null && !bg.dark) return 'pollen';
  return null;
};
FX.updateAmbient = function(dt){
  const kind = FX.ambientKind();
  if(FX.ambientKindNow !== kind){ FX.ambient = []; FX.ambientKindNow = kind; }
  if(!kind) return;
  while(FX.ambient.length < (kind==='bubble'?16:14)){
    FX.ambient.push({x:Math.random()*W, y: kind==='bubble'? H+Math.random()*H : Math.random()*H,
      r: kind==='bubble'? 2+Math.random()*5 : 1.5+Math.random()*2.2, ph:Math.random()*7, sp:12+Math.random()*24});
  }
  for(const p of FX.ambient){
    p.ph += dt;
    if(kind==='bubble'){ p.y -= p.sp*2.2*dt; p.x += Math.sin(p.ph*2)*12*dt; if(p.y<-10){ p.y=H+10; p.x=Math.random()*W; } }
    else { p.y -= p.sp*.5*dt; p.x += Math.sin(p.ph*.8)*14*dt; if(p.y<-10){ p.y=H+10; p.x=Math.random()*W; } }
  }
};
FX.drawAmbient = function(){
  const kind = FX.ambientKindNow; if(!kind) return;
  ctx.save();
  for(const p of FX.ambient){
    if(kind==='bubble'){
      ctx.strokeStyle='rgba(220,250,255,.55)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(p.x-p.r*.35,p.y-p.r*.35,p.r*.28,0,7); ctx.fill();
    } else if(kind==='firefly'){
      const a = .35+.65*Math.abs(Math.sin(p.ph*2));
      ctx.fillStyle='rgba(255,236,140,'+(a*.25)+')'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3.2,0,7); ctx.fill();
      ctx.fillStyle='rgba(255,246,190,'+a+')'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill();
    } else {
      ctx.fillStyle='rgba(255,252,225,'+(.35+.3*Math.sin(p.ph*1.5))+')';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill();
    }
  }
  ctx.restore();
};

FX.update = function(dt){
  if(FX.shakeT>0){ FX.shakeT-=dt; if(FX.shakeT<=0) FX.shakeA=0; }
  FX.updateAmbient(dt);
  for(const p of FX.parts){ p.t+=dt; p.x+=p.vx*dt; p.y+=p.vy*dt; if(p.kind!=='text'){ p.vy+=380*dt; p.vx*=0.98; } }
  FX.parts = FX.parts.filter(p=>p.t<p.life);
  for(const r of FX.ripples) r.t+=dt;
  FX.ripples = FX.ripples.filter(r=>r.t<.45);
  for(const c of FX.confetti){ c.t+=dt; c.x+=c.vx*dt+Math.sin(c.t*4+c.rot)*30*dt; c.y+=c.vy*dt; c.rot+=c.vr*dt; }
  FX.confetti = FX.confetti.filter(c=>c.y<H+30 && c.t<6);
  if(FX.trans){ FX.trans.t+=dt; if(FX.trans.t>.5) FX.trans=null; }
};
FX.beginFrame = function(){
  FX.bgDone = false;
  ctx.setTransform(FX.k,0,0,FX.k,0,0);
  if(FX.shakeT>0){
    const a = FX.shakeA*Math.min(1,FX.shakeT*5);
    ctx.translate((Math.random()-.5)*2*a, (Math.random()-.5)*2*a);
  }
};
// desenhado depois da cena e antes do diálogo
FX.drawWorld = function(){
  FX.drawAmbient();
  for(const r of FX.ripples){
    const q = r.t/.45;
    ctx.strokeStyle='rgba(255,255,255,'+(0.75*(1-q))+')'; ctx.lineWidth=4*(1-q)+1;
    ctx.beginPath(); ctx.arc(r.x,r.y,10+q*34,0,7); ctx.stroke();
  }
  for(const p of FX.parts){
    const a = Math.max(0,1-p.t/p.life);
    ctx.save(); ctx.globalAlpha = a;
    if(p.kind==='text'){
      ctx.font='bold '+p.size+'px "Segoe UI"'; ctx.textAlign='center';
      ctx.lineWidth=5; ctx.strokeStyle='rgba(60,40,30,.75)'; ctx.strokeText(p.text,p.x,p.y);
      ctx.fillStyle=p.c; ctx.fillText(p.text,p.x,p.y);
    } else if(p.kind==='star'){
      ctx.translate(p.x,p.y); ctx.rotate(p.t*6);
      ctx.fillStyle=p.c; ctx.beginPath();
      for(let i=0;i<8;i++){ const rr2=i%2?p.r*.4:p.r*1.3, an=i*Math.PI/4; i?ctx.lineTo(Math.cos(an)*rr2,Math.sin(an)*rr2):ctx.moveTo(Math.cos(an)*rr2,Math.sin(an)*rr2); }
      ctx.closePath(); ctx.fill();
    } else {
      ctx.fillStyle=p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill();
    }
    ctx.restore();
  }
  if(FX.vignette){ ctx.drawImage(FX.vignette,0,0,W,H); }
};
// desenhado por cima de tudo (inclusive diálogo e tela de vitória)
FX.drawTop = function(){
  for(const c of FX.confetti){
    ctx.save(); ctx.translate(c.x,c.y); ctx.rotate(c.rot); ctx.scale(1, Math.abs(Math.cos(c.t*5+c.rot)));
    ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore();
  }
  if(FX.trans){
    const q = Math.min(1, FX.trans.t/.45), e = 1-Math.pow(1-q,3);
    const R = e*Math.hypot(W,H)*.62;
    ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,H); ctx.arc(W/2,H/2,Math.max(0.1,R),0,7,true);
    ctx.fillStyle='#22183A'; ctx.fill('evenodd');
    ctx.strokeStyle='rgba(255,215,94,'+(1-q)+')'; ctx.lineWidth=6;
    ctx.beginPath(); ctx.arc(W/2,H/2,Math.max(0.1,R),0,7); ctx.stroke();
    ctx.restore();
  }
};
FX.onScene = function(name){
  FX.sceneName = name; FX.parts = []; FX.bg = null;
  FX.trans = {t:0};
};

/* ---------- toque: anel + rastreio ---------- */
cv.addEventListener('pointerdown', e=>{ const p=toLocal(e); FX.lastPtrT=T; FX.ripples.push({x:p.x,y:p.y,t:0}); });
cv.addEventListener('pointermove', ()=>{ if(P.down) FX.lastPtrT=T; });
addEventListener('pointerup', ()=>{ FX.lastPtrT=T; });

/* ---------- "suco" nos sons que já existem (vale pra todas as fases) ---------- */
(function juice(){
  const wrap = (name, fn)=>{ const o=S[name]; S[name]=function(){ o.apply(this, arguments); try{ fn(); }catch(e){} }; };
  wrap('pick',  ()=>{ if(FX.recentPointer()) FX.burst(P.x,P.y,['#FFD75E','#FFF3C4','#FFFFFF'],8,140); });
  wrap('place', ()=>{ if(FX.recentPointer()) FX.burst(P.x,P.y,['#FFD75E','#8FD97A','#FFFFFF','#9FE3FF'],14,200); });
  wrap('star',  ()=>{ if(!END.active && FX.recentPointer()) FX.burst(P.x,P.y,['#FFC93C','#FFF3C4'],10,180); });
  wrap('bump',  ()=>FX.shake(5,.22));
  wrap('oops',  ()=>FX.shake(3.5,.18));
})();

FX.resize();
