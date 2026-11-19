'use strict';
/* =====================================================================
   JESUS ACALMA A TEMPESTADE (Marcos 4:35-41)
   F1 "Atravessando o Mar"   — PILOTAR: arraste pra guiar o barco (visto
                               de cima), desvie das pedras, pegue peixes.
   F2 "A Grande Tempestade"  — EQUILIBRAR: segure o lado mais alto do
                               barco pra ele não virar + toque nas poças
                               pra tirar água com o balde.
   F3 "Mestre, Salva-nos!"   — ACORDAR + ACALMAR: toque em Jesus pra
                               acordá-lo; depois deslize o dedo pelas
                               ondas e o mar vai ficando calmo.
   ===================================================================== */

/* ---------- cenário de tempestade compartilhado (F2/F3) ---------- */
const STORM = {
  sky(storm){ // storm: 1 = tempestade, 0 = bonança ao entardecer
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, FX.mix('#22305E','#2B3448',storm));
    g.addColorStop(.55, FX.mix('#F0A86A','#3B4660',storm));
    g.addColorStop(1, FX.mix('#1E4F86','#141C2B',storm));
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    if(storm<.85){ // estrelas e lua aparecendo
      const a = 1-storm/.85;
      for(let i=0;i<30;i++){
        const sx=(i*151.3)%W, sy=(i*67.7)%380+20, tw=.4+.6*Math.abs(Math.sin(T*1.5+i));
        ctx.fillStyle='rgba(255,250,220,'+(a*tw*.9)+')'; ctx.beginPath(); ctx.arc(sx,sy,1.2+(i%3)*.5,0,7); ctx.fill();
      }
      ctx.save(); ctx.globalAlpha=a;
      const mg = ctx.createRadialGradient(410,170,10,410,170,110);
      mg.addColorStop(0,'rgba(255,240,200,.55)'); mg.addColorStop(1,'rgba(255,240,200,0)');
      ctx.fillStyle=mg; ctx.fillRect(280,40,260,260);
      blob(410,170,38,38,'#FFF3C4',3.5); blob(398,160,8,8,'rgba(230,210,160,.6)',0); blob(422,182,6,6,'rgba(230,210,160,.6)',0);
      ctx.restore();
    }
  },
  clouds(storm){
    if(storm<=0.02) return;
    ctx.save(); ctx.globalAlpha = Math.min(1,storm*1.2);
    for(let i=0;i<7;i++){
      const cx = ((i*120 + T*(14+i*3)) % (W+260)) - 130, cy = 60+(i%3)*44 - (1-storm)*120;
      const c = FX.mix('#8C95A8','#4A5468',storm);
      blob(cx,cy,90,34,c,0); blob(cx+50,cy-18,60,30,c,0); blob(cx-46,cy-10,54,26,c,0);
      blob(cx,cy+16,96,18,FX.mix('#6F788C','#353D50',storm),0);
    }
    ctx.restore();
  },
  sea(y0, rough, storm, front){
    const col = front? FX.mix('#2E7FC0','#1D3E62',storm) : FX.mix('#3E8FD0','#2A4A70',storm);
    ctx.beginPath(); ctx.moveTo(-10,H+10);
    for(let x=-10;x<=W+10;x+=12){
      const yy = y0 + Math.sin(x*.018 + T*(front?2.2:1.6))*rough + Math.sin(x*.041 - T*(front?3.1:2.4))*rough*.45;
      ctx.lineTo(x,yy);
    }
    ctx.lineTo(W+10,H+10); ctx.closePath();
    ctx.fillStyle=col; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,'+(.35+storm*.35)+')'; ctx.lineWidth=front?5:3; ctx.stroke();
    if(!front){ // brilho da lua no mar calmo
      ctx.save(); ctx.globalAlpha = Math.max(0,.6-storm);
      for(let i=0;i<6;i++){ const yy=y0+20+i*22, w2=60-i*6; panel(410-w2/2+Math.sin(T*2+i)*6, yy, w2, 5, 2.5, 'rgba(255,240,200,.7)', null); }
      ctx.restore();
    }
  },
  rain(amount){
    if(amount<=0.02) return;
    ctx.save(); ctx.strokeStyle='rgba(200,220,255,'+(.45*amount)+')'; ctx.lineWidth=2; ctx.lineCap='round';
    ctx.beginPath();
    const n = Math.floor(90*amount);
    for(let i=0;i<n;i++){
      const x = ((i*53.7 + T*240) % (W+120)) - 60, y = ((i*97.3 + T*900) % (H+60)) - 30;
      ctx.moveTo(x,y); ctx.lineTo(x-9,y+26);
    }
    ctx.stroke(); ctx.restore();
  },
  bolt(b){
    if(!b || b.t<=0) return;
    ctx.save(); ctx.globalAlpha=Math.min(1,b.t*4);
    ctx.fillStyle='rgba(255,255,255,'+(b.t*.9)+')'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='#FFF7C2'; ctx.lineWidth=6; ctx.lineJoin='round'; ctx.shadowColor='#FFE98A'; ctx.shadowBlur=18;
    ctx.beginPath(); b.pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke();
    ctx.restore();
  },
  newBolt(){
    const pts=[]; let x=60+Math.random()*(W-120), y=40;
    while(y<430){ pts.push([x,y]); x+= (Math.random()-.5)*70; y+= 30+Math.random()*40; }
    beep(70,.6,'sawtooth',.09); beep(52,.9,'square',.06,.08);
    FX.shake(5,.35);
    return {pts, t:.32};
  },
};
function boatToWorld(bx,by,th,lx,ly){ return { x: bx + Math.cos(th)*lx - Math.sin(th)*ly, y: by + Math.sin(th)*lx + Math.cos(th)*ly }; }

/* =====================================================================
   FASE 1 — Atravessando o Mar (pilotar)
   ===================================================================== */
scenes.tempestade1_run = {
  init(){
    playMusic('tempestade');
    this.ts = toastState();
    this.boat = { x:270, y:770, tilt:0 };
    this.objs = []; this.spawnT = 1.2; this.travel = 0; this.goal = 7600;
    this.speed = 200; this.hits = 0; this.fish = 0; this.invul = 0; this.slow = 0;
    this.scroll = 0; this.started = false; this.finished = false; this.endT = 0;
    say([
      NT_LINE.narr('Naquele dia, ao cair da tarde, Jesus disse aos discípulos: "Vamos para o outro lado do lago." (Marcos 4:35)'),
      NT_LINE.pedro('Deixa com a gente, Mestre! Pedro, André, Tiago e João... somos pescadores, conhecemos esse mar!'),
      NT_LINE.narr('MISSÃO: arraste o dedo pra pilotar o barco. Desvie das pedras 🪨 e pegue os peixinhos que pulam 🐟!'),
    ], ()=>{ this.started = true; toast(this.ts,'Arraste para pilotar! ⛵'); });
  },
  tap(x,y){ if(topBarTap(x,y)) return; },
  update(dt){
    if(!this.started || this.finished) return;
    const b = this.boat;
    if(P.down && P.y>130){
      const tx = Math.max(70, Math.min(W-70, P.x));
      const dx = tx-b.x; b.x += dx*Math.min(1, dt*7); b.tilt = Math.max(-.35, Math.min(.35, dx*.006));
    } else b.tilt *= Math.max(0,1-dt*5);
    if(this.invul>0) this.invul -= dt;
    if(this.slow>0) this.slow -= dt;
    const sp = (this.speed + Math.min(90, this.travel*0.012)) * (this.slow>0? .45 : 1);
    this.travel += sp*dt; this.scroll += sp*dt;
    // novos obstáculos e peixes (sempre deixa passagem: 1 pedra por "linha")
    if(this.travel < this.goal-300){
      this.spawnT -= dt;
      if(this.spawnT<=0){
        this.spawnT = Math.max(.55, .95 - this.travel/this.goal*.4);
        const rx = 70+Math.random()*(W-140);
        this.objs.push({type:'rock', x:rx, y:-60, r:30+Math.random()*16, seed:Math.random()*6});
        if(Math.random()<.6){
          let fx = 70+Math.random()*(W-140);
          if(Math.abs(fx-rx)<110) fx = rx>W/2? rx-160 : rx+160;
          this.objs.push({type:'fish', x:fx, y:-140, ph:Math.random()*6});
        }
      }
    }
    for(const o of this.objs){
      o.y += sp*dt;
      if(o.dead) continue;
      if(o.type==='rock' && this.invul<=0 && Math.abs(o.x-b.x) < o.r+26 && Math.abs(o.y-b.y) < o.r+50){
        this.hits++; this.invul = 1.4; this.slow = .7; o.dead = true;
        S.bump(); FX.burst(o.x,o.y,['#FFFFFF','#BFE6FF'],12,160);
        toast(this.ts, this.hits<3? 'Ops! Cuidado com as pedras! 🪨' : 'Devagar e sempre — você consegue!');
      }
      if(o.type==='fish' && Math.hypot(o.x-b.x, o.y-b.y) < 62){
        o.dead = true; this.fish++; S.pick();
        FX.burst(o.x,o.y,['#9FE3FF','#FFFFFF','#FFD75E'],10,150); FX.float(o.x,o.y-20,'+1 🐟','#FFF3C4');
      }
    }
    this.objs = this.objs.filter(o=>o.y < H+80 && !(o.dead && o.type==='fish'));
    if(this.travel >= this.goal){
      this.endT += dt;
      if(this.endT>1.2 && !this.finished){ this.finished = true; this.finish(); }
    }
  },
  finish(){
    S.win();
    const stars = this.hits===0? 3 : (this.hits<=2? 2 : 1);
    say([
      NT_LINE.narr('O barco seguia tranquilo. Jesus estava tão cansado depois de um dia inteiro ensinando o povo, que se deitou na parte de trás do barco... e dormiu. (Marcos 4:38)'),
      NT_LINE.pedro('Pescamos '+this.fish+' peixinhos no caminho! Mas... hmm... essas nuvens escuras lá longe não estão com uma cara boa...'),
    ], ()=>showEnd({
      key:'tempestade1', title:'⭐ ATRAVESSANDO O MAR · FASE 1!', stars,
      verse:'Naquele dia, ao cair da tarde, Jesus disse aos seus discípulos: Passemos para a outra margem.',
      ref:'Marcos 4:35',
      lesson:'Os discípulos seguiram Jesus para onde Ele mandou. Quando a gente caminha com Jesus, Ele vai junto no barco — em todos os momentos, até nos mais tranquilos!',
      nextLabel:'▶  Fase 2: A Grande Tempestade', next:()=>setScene('tempestade2_run'),
      replay:()=>setScene('tempestade1_run'),
    }));
  },
  drawBoatTop(b){
    ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(b.tilt);
    // esteira
    ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=5; ctx.lineCap='round';
    for(let i=0;i<4;i++){ const yy=60+i*26+(this.scroll%26); const sp=14+i*12;
      ctx.beginPath(); ctx.moveTo(-sp,yy); ctx.lineTo(-sp-8,yy+12); ctx.moveTo(sp,yy); ctx.lineTo(sp+8,yy+12); ctx.stroke(); }
    ctx.lineCap='butt';
    shadowE(4,10,52);
    ctx.beginPath(); ctx.moveTo(0,-78); ctx.bezierCurveTo(48,-40,44,50,26,66); ctx.lineTo(-26,66); ctx.bezierCurveTo(-44,50,-48,-40,0,-78); ctx.closePath();
    ctx.fillStyle='#A5652F'; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,-62); ctx.bezierCurveTo(36,-32,32,44,18,56); ctx.lineTo(-18,56); ctx.bezierCurveTo(-32,44,-36,-32,0,-62); ctx.closePath();
    ctx.fillStyle='#D99A5B'; ctx.fill();
    ctx.strokeStyle='rgba(90,50,20,.5)'; ctx.lineWidth=3;
    for(const yy of [-30,0,28]){ ctx.beginPath(); ctx.moveTo(-30,yy); ctx.lineTo(30,yy); ctx.stroke(); }
    // tripulação (cabecinhas vistas de cima)
    const heads=[[-14,-36,'#3A2A1A'],[14,-14,'#6B4423'],[-14,12,'#241B14']];
    for(const [hx,hy,hc] of heads){ blob(hx,hy,11,11,'#E3AD79',2.5); blob(hx,hy-3,10,7,hc,0); }
    // Jesus descansando na popa (manto claro)
    blob(0,46,20,10,'#F4EEDD',2.5); blob(-14,44,8,8,'#E3AD79',2);
    // vela vista de cima
    ctx.save(); ctx.rotate(Math.sin(T*1.5)*.08);
    ctx.beginPath(); ctx.moveTo(-40,-8); ctx.quadraticCurveTo(0,-30,40,-8); ctx.quadraticCurveTo(0,-16,-40,-8); ctx.closePath();
    ctx.fillStyle='#FFF9EC'; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=3; ctx.stroke(); ctx.restore();
    blob(0,-10,6,6,'#8B5A2B',2.5);
    ctx.restore();
  },
  drawRock(o){
    ctx.save(); ctx.translate(o.x,o.y);
    ctx.strokeStyle='rgba(255,255,255,.7)'; ctx.lineWidth=4;
    ctx.beginPath(); ctx.ellipse(0,6,o.r*1.25+Math.sin(T*4+o.seed)*3,o.r*.85,0,0,7); ctx.stroke();
    blob(0,0,o.r,o.r*.82,'#8E8A86',4);
    blob(-o.r*.3,-o.r*.3,o.r*.35,o.r*.22,'rgba(255,255,255,.35)',0);
    blob(o.r*.35,o.r*.2,o.r*.3,o.r*.2,'rgba(0,0,0,.12)',0);
    ctx.restore();
  },
  draw(dt){
    const q = Math.min(1, this.travel/this.goal); // entardecer
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0, FX.mix('#62C1EA','#3A5F9A',q)); g.addColorStop(1, FX.mix('#2A86C8','#24406E',q));
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    // reflexos e ondinhas rolando
    ctx.strokeStyle='rgba(255,255,255,.28)'; ctx.lineWidth=3; ctx.lineCap='round';
    for(let i=0;i<16;i++){
      const yy = ((i*67 + this.scroll*.9) % (H+60)) - 30, xx = (i*173)%W;
      ctx.beginPath(); ctx.moveTo(xx-22,yy); ctx.quadraticCurveTo(xx,yy-8,xx+22,yy); ctx.stroke();
    }
    ctx.lineCap='butt';
    // tom alaranjado de pôr do sol vindo de cima
    if(q>0){ const sg=ctx.createLinearGradient(0,0,0,H*.5); sg.addColorStop(0,'rgba(255,150,80,'+(q*.35)+')'); sg.addColorStop(1,'rgba(255,150,80,0)'); ctx.fillStyle=sg; ctx.fillRect(0,0,W,H*.5); }
    for(const o of this.objs){
      if(o.type==='rock' && !o.dead) this.drawRock(o);
      if(o.type==='fish'){ const j=Math.sin(T*5+o.ph); drawFishItem(o.x, o.y-Math.max(0,j)*18, 1.05, j*.5);
        if(j<-.6){ ctx.strokeStyle='rgba(255,255,255,.6)'; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(o.x,o.y+8,18,6,0,0,7); ctx.stroke(); } }
    }
    if(!(this.invul>0 && Math.floor(T*12)%2)) this.drawBoatTop(this.boat);
    drawTopBar('TEMPESTADE · FASE 1','#3F6FB5');
    hudBar(W/2-150, 80, 300, 34, q, '#6BBF59', '⛵ Outra margem: '+Math.floor(q*100)+'%');
    panel(W-110,124,96,34,14,'rgba(255,249,236,.94)',OUT,3.5); txt('🐟 '+this.fish, W-62, 147, 15, '#3A6FA8', 'center', true);
    toastDraw(this.ts, dt, 170);
  }
};

/* =====================================================================
   FASE 2 — A Grande Tempestade (equilibrar + tirar água)
   ===================================================================== */
scenes.tempestade2_run = {
  init(){
    playMusic('tempestade2');
    this.ts = toastState();
    this.th = 0; this.om = 0; this.water = 0; this.puddles = [];
    this.time = 0; this.dur = 40; this.sustos = 0; this.gust = 0; this.gustT = 3;
    this.puddleT = 2; this.boltT = 2.5; this.bolt = null; this.bailPress = false; this.bucket = 0;
    this.started = false; this.finished = false; this.splashT = 0;
    say([
      NT_LINE.narr('De repente, veio uma ventania muito forte! As ondas batiam no barco, e ele começou a se encher de água. (Marcos 4:37)'),
      NT_LINE.pedro('Segurem firme, pessoal! Joguem o peso pro lado mais alto do barco!'),
      NT_LINE.narr('MISSÃO: SEGURE o dedo no lado do barco que está mais ALTO pra equilibrar. Toque nas poças 💧 pra tirar a água com o balde. Aguente firme!'),
    ], ()=>{ this.started = true; toast(this.ts,'Segure o lado mais alto! ⚖️'); });
  },
  boatPos(){ return { x:270, y:600 + Math.sin(this.time*1.7)*16 }; },
  tap(x,y){
    if(topBarTap(x,y)) return;
    if(!this.started || this.finished) return;
    const bp = this.boatPos();
    for(const p of this.puddles){
      const w = boatToWorld(bp.x,bp.y,this.th,p.lx,p.ly);
      if(Math.hypot(x-w.x,y-w.y) < 46){
        this.bailPress = true; p.dead = true; this.water = Math.max(0, this.water-.1); this.bucket = .45;
        beep(500,.08,'sine',.08); beep(340,.12,'sine',.07,.06);
        FX.burst(w.x,w.y-10,['#9FE3FF','#FFFFFF','#5EB3F2'],10,170); FX.float(w.x,w.y-30,'💧 fora!','#DDF4FF',18);
        return;
      }
    }
  },
  release(){ this.bailPress = false; },
  update(dt){
    if(this.bolt){ this.bolt.t -= dt; if(this.bolt.t<=0) this.bolt=null; }
    if(!this.started || this.finished) return;
    this.time += dt;
    const ramp = .8 + Math.min(1,this.time/this.dur)*.7;
    this.gustT -= dt;
    if(this.gustT<=0){ this.gustT = 2.6+Math.random()*2.2; this.gust = (Math.random()<.5?-1:1)*(1.3+Math.random()*.8); }
    this.gust *= Math.max(0,1-dt*1.1);
    const wave = (0.9*Math.sin(this.time*1.25) + 0.6*Math.sin(this.time*2.3+1.3) + this.gust)*ramp;
    let input = 0;
    if(P.down && !this.bailPress && P.y>140) input = P.x<W/2? -1 : 1;
    this.om += (wave + input*3.3 - this.th*2.0 - this.om*1.7)*dt;
    this.th += this.om*dt;
    if(Math.abs(this.th)>.75){ this.th = Math.sign(this.th)*.75; this.om *= -.2; }
    // água entrando
    if(Math.abs(this.th) > .42){
      this.water += .24*dt; this.splashT -= dt;
      if(this.splashT<=0){ this.splashT=.25; const bp=this.boatPos(); const side=Math.sign(this.th);
        const w=boatToWorld(bp.x,bp.y,this.th,side*140,-24); FX.burst(w.x,w.y,['#FFFFFF','#BFE6FF'],6,150); }
    }
    this.puddleT -= dt;
    if(this.puddleT<=0){
      this.puddleT = Math.max(1.3, 2.6 - this.time*.03);
      if(this.puddles.length<5){ this.puddles.push({lx:-110+Math.random()*220, ly:-34, t:0}); this.water += .05; }
    }
    for(const p of this.puddles){ p.t+=dt; if(p.t>4){ p.t=0; this.water += .03; } }
    this.puddles = this.puddles.filter(p=>!p.dead);
    if(this.bucket>0) this.bucket -= dt;
    this.boltT -= dt;
    if(this.boltT<=0){ this.boltT = 3+Math.random()*3; this.bolt = STORM.newBolt(); }
    if(this.water >= 1){
      this.sustos++; this.water = .5; this.puddles = []; S.oops(); FX.shake(9,.4);
      toast(this.ts, 'Que susto! Tire a água e equilibre o barco! 💦', true);
    }
    if(this.time >= this.dur && !this.finished){ this.finished = true; this.finish(); }
  },
  finish(){
    const stars = this.sustos===0? 3 : (this.sustos===1? 2 : 1);
    say([
      NT_LINE.narr('Vocês lutaram bravamente contra as ondas! Mas a tempestade não parava, e os discípulos estavam com muito medo...'),
      NT_LINE.narr('E Jesus? Continuava dormindo, tranquilo, com a cabeça num travesseiro. (Marcos 4:38)'),
      NT_LINE.pedro('Precisamos acordar o Mestre! Só Ele pode nos ajudar!'),
    ], ()=>showEnd({
      key:'tempestade2', title:'⭐ A GRANDE TEMPESTADE · FASE 2!', stars,
      verse:'Levantou-se grande temporal de vento, e as ondas se arremessavam contra o barco, de modo que o mesmo já estava a encher-se de água.',
      ref:'Marcos 4:37',
      lesson:'Às vezes a vida fica agitada como uma tempestade: medo, briga, tristeza. Fazer a nossa parte é importante — mas a maior ajuda está em chamar por Jesus!',
      nextLabel:'▶  Fase 3: Mestre, Salva-nos!', next:()=>setScene('tempestade3_run'),
      replay:()=>setScene('tempestade2_run'),
    }));
  },
  drawCrew(scared){
    return ()=>{
      drawDisciple(0,-20,-12,.72,1,scared?T*14:0,scared?'up':null);
      drawDisciple(1,38,-12,.72,-1,0,null);
      drawDisciple(2,96,-12,.72,-1,scared?T*12:0,scared?'up':null);
      drawSleepingJesus(-100,-34,.8,0);
    };
  },
  draw(dt){
    STORM.sky(1);
    STORM.clouds(1);
    STORM.sea(560,22,1,false);
    const bp = this.boatPos();
    const danger = Math.abs(this.th)>.42;
    // "água" dentro do barco subindo
    drawBoatSide(bp.x,bp.y,1,this.th,{storm:true, torn:true, crew:this.drawCrew(danger)});
    ctx.save(); ctx.translate(bp.x,bp.y); ctx.rotate(this.th);
    if(this.water>0){ ctx.globalAlpha=.75; panel(-138,-22-this.water*14,276,8+this.water*14,6,'rgba(90,170,230,.8)',null); ctx.globalAlpha=1; }
    for(const p of this.puddles){
      const pulse = 1+Math.sin(T*6+p.lx)*.08;
      blob(p.lx,p.ly,24*pulse,11*pulse,'#7CC4F0',3);
      blob(p.lx-7,p.ly-3,7,3,'rgba(255,255,255,.7)',0);
      txt('💧',p.lx,p.ly-18,18,'#fff');
    }
    ctx.restore();
    STORM.sea(700,30,1,true);
    STORM.rain(1);
    STORM.bolt(this.bolt);
    // dica: segure o lado mais alto
    if(this.started && !this.finished && Math.abs(this.th)>.18){
      const left = this.th>0; const ax = left? 70 : W-70, bob = Math.sin(T*8)*6;
      ctx.save(); ctx.globalAlpha = .55+.45*Math.abs(Math.sin(T*5));
      blob(ax, 470+bob, 44, 44, danger? 'rgba(232,93,93,.85)':'rgba(255,201,60,.85)', 4);
      txt(left?'👈':'👉', ax, 482+bob, 34, '#fff');
      ctx.restore();
      txt('segure aqui!', ax, 535, 15, '#fff', 'center', true);
    }
    if(this.bucket>0){ txt('🪣', P.x, P.y-30-(.45-this.bucket)*60, 34, '#fff'); }
    drawTopBar('TEMPESTADE · FASE 2','#2E4A78');
    // medidor de inclinação
    panel(W/2-130, 80, 260, 46, 16, 'rgba(255,249,236,.94)', OUT, 4);
    panel(W/2-110, 96, 220, 14, 7, '#BFE6A8', null);
    panel(W/2-110, 96, 44, 14, 7, '#F2A0A0', null); panel(W/2+66, 96, 44, 14, 7, '#F2A0A0', null);
    const mx = W/2 + Math.max(-1,Math.min(1,this.th/.75))*104;
    blob(mx, 103, 11, 11, danger? '#E85D5D':'#5E9FD8', 3);
    txt('⚖️', W/2-120, 112, 15, '#fff', 'left');
    hudBar(24, 136, 230, 30, this.water, this.water>.7? '#E85D5D' : '#5EB3F2', '💧 Água no barco');
    hudBar(W-254, 136, 230, 30, this.time/this.dur, '#FFC93C', '⏳ Aguente firme!');
    if(this.sustos) txt('Sustos: '+this.sustos, W/2, 196, 14, '#FFD3D3', 'center', true);
    toastDraw(this.ts, dt, 214);
  }
};

/* =====================================================================
   FASE 3 — Mestre, Salva-nos! (acordar + acalmar as ondas)
   ===================================================================== */
scenes.tempestade3_run = {
  init(){
    playMusic('tempestade2');
    this.ts = toastState();
    this.stage = 'intro'; this.wake = 0; this.wakeTaps = 0;
    this.waves = []; this.calmed = 0; this.need = 12; this.crashes = 0;
    this.spawnT = .6; this.calm = 0; this.time = 0; this.bolt = null; this.boltT = 2;
    this.lastP = null; this.finished = false; this.shakeJ = 0;
    say([
      NT_LINE.narr('A tempestade estava cada vez mais forte. Os discípulos correram até Jesus, que dormia na popa do barco.'),
      NT_LINE.narr('MISSÃO: toque em Jesus pra acordá-lo! 🙏'),
    ], ()=>{ this.stage = 'wake'; toast(this.ts,'Toque em Jesus para acordá-lo!'); });
  },
  boatPos(){ const s = 1-this.calm; return { x:270, y:610 + Math.sin(T*1.7)*14*s, th: Math.sin(T*1.3)*.16*s }; },
  jesusPos(){ const b=this.boatPos(); return boatToWorld(b.x,b.y,b.th,-100,-40); },
  tap(x,y){
    if(topBarTap(x,y)) return;
    if(this.stage==='wake'){
      const j = this.jesusPos();
      if(Math.hypot(x-j.x,y-j.y) < 70){
        this.wakeTaps++; this.shakeJ = .3; S.tap();
        FX.float(j.x, j.y-40, ['Mestre!','Mestre! Acorda!','Salva-nos!'][Math.min(2,this.wakeTaps-1)], '#FFF3C4', 20);
        if(this.wakeTaps>=3){ this.stage = 'waking'; this.wake = 0; }
      }
    }
    if(this.stage==='calm') this.lastP = {x,y};
  },
  release(){ this.lastP = null; },
  startCalm(){
    say([
      NT_LINE.pedro('Mestre, o senhor não se importa que a gente afunde?! (Marcos 4:38)'),
      NT_LINE.narr('Jesus se levantou, falou firme com o vento e disse ao mar:'),
      NT_LINE.jesus('Silêncio! Aquiete-se!'),
      NT_LINE.narr('MISSÃO: deslize o dedo pelas ondas grandes pra acalmá-las, uma por uma! 🌊👆'),
    ], ()=>{ this.stage = 'calm'; toast(this.ts,'Deslize o dedo nas ondas! 🌊'); });
  },
  update(dt){
    this.time += dt;
    if(this.shakeJ>0) this.shakeJ -= dt;
    if(this.bolt){ this.bolt.t -= dt; if(this.bolt.t<=0) this.bolt=null; }
    if(this.calm<.5){ this.boltT -= dt; if(this.boltT<=0){ this.boltT = 3+Math.random()*3; this.bolt = STORM.newBolt(); } }
    if(this.stage==='waking'){
      this.wake += dt;
      if(this.wake>1.1){ this.stage='talk'; this.startCalm(); }
    }
    // calmaria visual acompanha o progresso
    const target = this.stage==='done'? 1 : this.calmed/this.need*.85;
    this.calm += (target-this.calm)*Math.min(1,dt*1.5);
    if(this.stage!=='calm') return;
    // deslize: segmento do dedo de um quadro pro outro
    if(P.down){
      const cur = {x:P.x,y:P.y};
      if(this.lastP && Math.hypot(cur.x-this.lastP.x,cur.y-this.lastP.y) > 6){
        for(const w of this.waves){
          if(w.state!=='up' && w.state!=='rise') continue;
          const cx = w.x, cy = w.base - w.h*.8;
          if(segHitsCircle(this.lastP.x,this.lastP.y,cur.x,cur.y,cx,cy,Math.max(55,w.h*.55))){
            w.state = 'calm'; w.t = 0; this.calmed++;
            beep(880,.18,'sine',.06); beep(1175,.25,'sine',.05,.1);
            FX.burst(cx,cy,['#FFFFFF','#BFE6FF','#FFF3C4'],16,220);
            FX.float(cx,cy-30,this.calmed>=this.need? 'Silêncio! ✨' : 'Shhh... 🤫','#FFFFFF',20);
          }
        }
      }
      this.lastP = cur;
    }
    // ondas nascem, crescem e — se ninguém acalmar — quebram no barco
    this.spawnT -= dt;
    const active = this.waves.filter(w=>w.state==='rise'||w.state==='up').length;
    if(this.spawnT<=0 && active < 3 && this.calmed + active < this.need){
      this.spawnT = Math.max(.7, 1.5 - this.calmed*.06);
      const side = Math.random()<.5? -1:1;
      this.waves.push({x: W/2 + side*(70+Math.random()*130), base: 900, h:0, max:150+Math.random()*90, state:'rise', t:0, dir:-side});
    }
    for(const w of this.waves){
      w.t += dt;
      if(w.state==='rise'){ w.h = w.max*Math.min(1,w.t/1.0); if(w.t>=1){ w.state='up'; w.t=0; } }
      else if(w.state==='up'){ w.h = w.max*(1+Math.sin(w.t*4)*.04); if(w.t>3.4){ w.state='crash'; w.t=0; this.crashes++; S.bump(); FX.shake(8,.35);
          FX.burst(w.x,w.base-w.h,['#FFFFFF','#BFE6FF'],18,260); toast(this.ts,'Splash! Tente acalmar mais rápido! 🌊'); } }
      else if(w.state==='crash'){ w.h *= Math.max(0,1-dt*5); }
      else if(w.state==='calm'){ w.h *= Math.max(0,1-dt*4); }
    }
    this.waves = this.waves.filter(w=>!((w.state==='calm'||w.state==='crash') && w.h<4));
    if(this.calmed >= this.need && !this.finished){
      this.finished = true; this.stage = 'done'; playMusic('calma'); S.win(); FX.celebrate();
      setTimeout(()=>this.finish(), 1600);
    }
  },
  finish(){
    if(scene!==this) return;
    const stars = this.crashes<=1? 3 : (this.crashes<=4? 2 : 1);
    say([
      NT_LINE.narr('E o vento parou. O mar ficou liso como um espelho — e houve uma grande calmaria. (Marcos 4:39)'),
      NT_LINE.jesus('Por que vocês ficaram com tanto medo? Ainda não têm fé em mim? (Marcos 4:40)'),
      NT_LINE.pedro('Quem é este, que até o vento e o mar obedecem a Ele?! (Marcos 4:41)'),
    ], ()=>showEnd({
      key:'tempestade3', title:'⭐ JESUS ACALMA A TEMPESTADE!', stars,
      verse:'E ele, despertando, repreendeu o vento, e disse ao mar: Cala-te, aquieta-te. E o vento se aquietou, e houve grande bonança.',
      ref:'Marcos 4:39',
      lesson:'Jesus tem poder sobre tudo — até sobre o vento e o mar! Quando você sentir medo, pode chamar por Ele em oração: Jesus está no seu barco e cuida de você.',
      nextLabel:'▶  Próxima história: Pães e Peixes', next:()=>setScene('paes1_run'),
      replay:()=>setScene('tempestade3_run'),
    }));
  },
  drawWave(w){
    const top = w.base - w.h, hw = 120 + w.h*.35;
    ctx.save();
    ctx.globalAlpha = w.state==='calm'? Math.min(1,w.h/60) : 1;
    ctx.beginPath(); ctx.moveTo(w.x-hw, w.base);
    ctx.bezierCurveTo(w.x-hw*.5, w.base, w.x-hw*.35, top, w.x, top);
    ctx.bezierCurveTo(w.x+w.dir*hw*.35, top-10, w.x+w.dir*hw*.55, top+w.h*.25, w.x+w.dir*hw*.3, top+w.h*.35);
    ctx.bezierCurveTo(w.x+hw*.6, w.base-w.h*.2, w.x+hw*.6, w.base, w.x+hw, w.base);
    const g = ctx.createLinearGradient(0,top,0,w.base); g.addColorStop(0,FX.mix('#4FA3DA','#2C5A88',1-this.calm)); g.addColorStop(1,'#163454');
    ctx.fillStyle=g; ctx.fill(); ctx.strokeStyle=OUT; ctx.lineWidth=4; ctx.stroke();
    // espuma
    ctx.fillStyle='rgba(255,255,255,.9)';
    for(let i=0;i<5;i++){ const a=i/4; ctx.beginPath(); ctx.arc(w.x - hw*.2 + a*hw*.4*w.dir, top+4+Math.sin(T*6+i)*3, 9-i, 0, 7); ctx.fill(); }
    if(this.stage==='calm' && (w.state==='up'||w.state==='rise')){
      const pulse = .5+.5*Math.sin(T*6);
      ctx.strokeStyle='rgba(255,243,196,'+(.35+pulse*.4)+')'; ctx.lineWidth=4; ctx.setLineDash([10,8]);
      ctx.beginPath(); ctx.moveTo(w.x-70, top+w.h*.25); ctx.lineTo(w.x+70, top+w.h*.25); ctx.stroke(); ctx.setLineDash([]);
      txt('👆', w.x+76+pulse*10, top+w.h*.25+10, 26, '#fff');
    }
    ctx.restore();
  },
  draw(dt){
    const storm = 1-this.calm;
    STORM.sky(storm);
    STORM.clouds(storm);
    STORM.sea(560, 4+18*storm, storm, false);
    const b = this.boatPos();
    const standing = this.stage==='talk'||this.stage==='calm'||this.stage==='done';
    drawBoatSide(b.x,b.y,1,b.th,{storm:storm>.4, torn:true, crew:()=>{
      drawDisciple(0,-10,-12,.72,1, storm>.4?T*12:0, storm>.4&&!standing?'up':null);
      drawDisciple(1,46,-12,.72,-1,0,null);
      drawDisciple(2,100,-12,.72,-1,0, storm>.4?'up':null);
      if(standing) drawJesus(-96,-14,.82,1,0,this.stage==='calm');
      else { const jx = this.shakeJ>0? Math.sin(T*60)*3 : 0; drawSleepingJesus(-100+jx,-34,.8,this.stage==='waking'?1:0); }
    }});
    if(this.stage==='wake'){
      const j = this.jesusPos(), p = 1+Math.sin(T*5)*.1;
      ctx.strokeStyle='rgba(255,215,94,.9)'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(j.x,j.y,52*p,0,7); ctx.stroke();
      txt('👆', j.x+40, j.y+50, 30, '#fff');
    }
    if(standing && this.stage!=='done'){ // luz serena em volta de Jesus
      const j = boatToWorld(b.x,b.y,b.th,-96,-60);
      const rg = ctx.createRadialGradient(j.x,j.y,10,j.x,j.y,140);
      rg.addColorStop(0,'rgba(255,240,180,.35)'); rg.addColorStop(1,'rgba(255,240,180,0)');
      ctx.fillStyle=rg; ctx.fillRect(j.x-140,j.y-140,280,280);
    }
    STORM.sea(700, 6+24*storm, storm, true);
    for(const w of this.waves) this.drawWave(w);
    STORM.rain(Math.max(0,storm*1.15-.15));
    STORM.bolt(this.bolt);
    drawTopBar('TEMPESTADE · FASE 3', FX.mix('#3F6FB5','#2E4A78',storm));
    if(this.stage==='calm' || this.stage==='done'){
      hudBar(W/2-150, 80, 300, 34, this.calmed/this.need, '#8FD0F2', '🌊 Ondas acalmadas: '+this.calmed+' / '+this.need);
    } else if(this.stage==='wake'){
      hudPill('🙏 Acorde Jesus: '+this.wakeTaps+' / 3', 80, 240);
    }
    toastDraw(this.ts, dt, 126);
  }
};
