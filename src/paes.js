'use strict';
/* =====================================================================
   PÃES E PEIXES (João 6:1-14)
   F1 "O Lanche do Menino" — ACHAR NA MULTIDÃO EM MOVIMENTO: o povo anda
                             pra lá e pra cá; toque no menino do cesto.
   F2 "Dá pra Todo Mundo!" — ARREMESSAR: puxe um pão ou peixe do cesto
                             (que nunca acaba!) e lance com o dedo pra
                             quem está pedindo.
   F3 "Doze Cestos"        — PEGAR AS SOBRAS: arraste o cesto pra pegar
                             os pedaços que caem, "para que nada se
                             perca" — até encher os 12 cestos.
   ===================================================================== */
const PAES_ROBES = ['#4E8FD1','#6BBF59','#E8A33C','#B07ACC','#C0483A','#5EC9B0','#D9A45A','#8E7AC9'];
const PAES_SKINS = ['#F2C79B','#E3AD79','#C98A5B','#8A5A3A','#F6D2AE'];
const PAES_HAIR  = ['#241B14','#4A3320','#6B4423','#A5652F','#E8E8E8'];

/* =====================================================================
   FASE 1 — O Lanche do Menino (achar na multidão em movimento)
   ===================================================================== */
scenes.paes1_run = {
  init(){
    playMusic('paes');
    this.ts = toastState();
    this.round = 1; this.wrong = 0; this.found = false; this.foundT = 0; this.started = false; this.finished = false;
    this.setupRound();
    say([
      NT_LINE.narr('Uma multidão enorme seguia Jesus pra ouvir Ele falar — mais de cinco mil pessoas! Já era tarde, e todo mundo estava com fome. (João 6:5)'),
      NT_LINE.filipe('Nem com o salário de oito meses daria pra comprar pão pra tanta gente! (João 6:7)'),
      NT_LINE.narr('MISSÃO: ache na multidão o MENINO que trouxe um lanche no cesto 🧺 e toque nele! Olhe bem a cor da roupa dele.'),
    ], ()=>{ this.started = true; toast(this.ts,'Procure o menino do cesto! 🔍'); });
  },
  setupRound(){
    const r = this.round;
    const n = [12,18,24][r-1];
    const speedMul = [0.6,1,1.35][r-1];
    this.targetRobe = PAES_ROBES[Math.floor(Math.random()*PAES_ROBES.length)];
    const people = [];
    const rndRow = ()=> 360 + Math.random()*540;
    const mk = (kid, robe, basket)=>{
      const y = rndRow(), depth = (y-360)/540;
      return { x: 40+Math.random()*(W-80), y, s:(0.56+depth*0.4)*(kid?.8:1), kid, basket,
        robe, skin: PAES_SKINS[Math.floor(Math.random()*PAES_SKINS.length)],
        hairC: PAES_HAIR[Math.floor(Math.random()*(kid?4:5))], hair: 1+Math.floor(Math.random()*5),
        dir: Math.random()<.5?-1:1, sp: (Math.random()<.25? 0 : (18+Math.random()*30))*speedMul, walk: Math.random()*6, idle: 0 };
    };
    for(let i=0;i<n;i++){
      let robe = PAES_ROBES[Math.floor(Math.random()*PAES_ROBES.length)];
      people.push(mk(false, robe, false));
    }
    // pistas falsas: crianças da MESMA cor sem cesto (rodada 2+) e crianças com cesto de OUTRA cor (rodada 3)
    if(r>=2) for(let i=0;i<r;i++) people.push(mk(true, this.targetRobe, false));
    if(r>=3) for(let i=0;i<2;i++){ let c; do{ c=PAES_ROBES[Math.floor(Math.random()*PAES_ROBES.length)]; }while(c===this.targetRobe); people.push(mk(true, c, true)); }
    const boy = mk(true, this.targetRobe, true); boy.target = true; boy.hairC = '#6B4423'; boy.skin = '#E3AD79';
    if(boy.sp===0) boy.sp = 20*speedMul;
    people.push(boy);
    this.people = people;
    this.found = false; this.foundT = 0;
  },
  tap(x,y){
    if(topBarTap(x,y)) return;
    if(!this.started || this.found || this.finished) return;
    const hits = this.people.filter(p=>Math.abs(x-p.x) < 28*p.s+8 && y > p.y-100*p.s && y < p.y+10);
    if(!hits.length) return;
    hits.sort((a,b)=>b.y-a.y);
    const p = hits[0];
    if(p.target){
      this.found = true; this.foundT = 0; p.sp = 0; S.place();
      FX.burst(p.x,p.y-50*p.s,['#FFD75E','#FFF3C4','#8FD97A'],18,220); FX.float(p.x,p.y-110*p.s,'Achou! 🧺','#FFF3C4',24);
    } else {
      this.wrong++; S.oops(); p.idle = .6;
      const msg = (p.kid && p.robe===this.targetRobe)? 'Mesma roupa... mas cadê o cesto? 🧺' : (p.kid && p.basket)? 'Tem cesto, mas a roupa é de outra cor! 👕' : 'Esse não... procure um menino com cesto!';
      toast(this.ts, msg);
    }
  },
  update(dt){
    for(const p of this.people){
      if(p.idle>0){ p.idle-=dt; continue; }
      if(p.sp>0){
        p.x += p.dir*p.sp*dt; p.walk += dt*p.sp*.2;
        if(p.x<20){ p.x=20; p.dir=1; } else if(p.x>W-20){ p.x=W-20; p.dir=-1; }
        if(Math.random()<dt*.15) p.dir*=-1;
      } else p.walk = 0;
    }
    if(this.found && !this.finished){
      this.foundT += dt;
      if(this.foundT>1.3){
        if(this.round<3){ this.round++; this.setupRound(); toast(this.ts,'Rodada '+this.round+' — a multidão aumentou! 🔍', true); }
        else { this.finished = true; this.finish(); }
      }
    }
  },
  finish(){
    const stars = this.wrong<=1? 3 : (this.wrong<=4? 2 : 1);
    say([
      NT_LINE.andre('Mestre, aqui está um menino que tem cinco pães de cevada e dois peixinhos... mas o que é isso pra tanta gente? (João 6:9)'),
      NT_LINE.menino('Pode pegar tudo, Jesus! É pouquinho... mas é tudo o que eu tenho! 😊'),
      NT_LINE.jesus('Obrigado! Nas mãos de Deus, o pouco que a gente oferece com amor vira muito.'),
    ], ()=>showEnd({
      key:'paes1', title:'⭐ O LANCHE DO MENINO · FASE 1!', stars,
      verse:'Está aqui um rapaz que tem cinco pães de cevada e dois peixinhos; mas que é isto para tantos?',
      ref:'João 6:9',
      lesson:'O menino deu tudo o que tinha, mesmo sendo pouquinho. Nunca ache que o que você tem é pequeno demais: quando a gente divide com amor, Deus multiplica!',
      nextLabel:'▶  Fase 2: Dá pra Todo Mundo!', next:()=>setScene('paes2_run'),
      replay:()=>setScene('paes1_run'),
    }));
  },
  drawKidBasket(p){
    drawWicker(p.x + p.dir*20*p.s, p.y-28*p.s, p.s*.62, 2);
  },
  draw(dt){
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#7FCBEF'); g.addColorStop(.31,'#CFEAF8'); g.addColorStop(.32,'#9BD97F'); g.addColorStop(1,'#5FAE4C');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    // mar da Galileia lá no fundo
    ctx.fillStyle='rgba(80,160,220,.55)'; ctx.beginPath(); ctx.ellipse(400,300,190,14,0,0,7); ctx.fill();
    const sorted = this.people.slice().sort((a,b)=>a.y-b.y);
    for(const p of sorted){
      drawPerson({x:p.x,y:p.y,s:p.s,skin:p.skin,robe:p.robe,hairC:p.hairC,hairShape:p.hair,beard:!p.kid && p.hairC==='#E8E8E8',dir:p.dir,walk:p.walk,carry:null});
      if(p.basket) this.drawKidBasket(p);
      if(p.target && this.found){
        ctx.strokeStyle='rgba(255,215,94,.95)'; ctx.lineWidth=5; ctx.beginPath(); ctx.ellipse(p.x,p.y-40*p.s,46*p.s+8,70*p.s+8,0,0,7); ctx.stroke();
      }
    }
    drawTopBar('PÃES E PEIXES · FASE 1','#D98C2B');
    // cartão-pista
    panel(W/2-150, 80, 300, 92, 18, 'rgba(255,249,236,.96)', OUT, 4);
    drawPerson({x:W/2-100, y:160, s:.62, skin:'#E3AD79', robe:this.targetRobe, hairC:'#6B4423', beard:false, dir:1, walk:0, carry:null});
    drawWicker(W/2-100+13, 142, .4, 2);
    txt('Ache este menino!', W/2+30, 114, 17, '#5A3A10', 'center', true);
    txt('roupa desta cor + cesto 🧺', W/2+30, 138, 13, '#8a6a4a', 'center');
    txt('Rodada '+this.round+' / 3', W/2+30, 160, 13, '#3A6FA8', 'center', true);
    toastDraw(this.ts, dt, 182);
  }
};

/* =====================================================================
   FASE 2 — Dá pra Todo Mundo! (arremessar com o dedo)
   ===================================================================== */
scenes.paes2_run = {
  init(){
    playMusic('paes');
    this.ts = toastState();
    const A = [-160,-125,-90,-55,-20];
    this.groups = A.map((deg,i)=>{ const a=deg*Math.PI/180;
      return { x: 270+196*Math.cos(a), y: 860+520*Math.sin(a), want: Math.random()<.5?'pao':'peixe', fed:0, happy:0, wobble:0, seed:i }; });
    this.baskets = [ {type:'pao', x:150, y:875}, {type:'peixe', x:390, y:875} ];
    this.items = []; this.grab = null; this.hist = [];
    this.delivered = 0; this.need = 15; this.misses = 0;
    this.started = false; this.finished = false;
    say([
      NT_LINE.jesus('Peçam pro povo se sentar na grama. (João 6:10)'),
      NT_LINE.narr('Jesus pegou os cinco pães e os dois peixinhos, olhou pro céu e agradeceu a Deus... e começou a repartir. (João 6:11)'),
      NT_LINE.narr('MISSÃO: puxe um pão 🍞 ou um peixe 🐟 do cesto e LANCE com o dedo na direção de quem está pedindo. Os cestos nunca esvaziam!'),
    ], ()=>{ this.started = true; toast(this.ts,'Puxe do cesto e lance! 👆'); });
  },
  tap(x,y){
    if(topBarTap(x,y)) return;
    if(!this.started || this.finished) return;
    for(const b of this.baskets){
      if(Math.hypot(x-b.x,y-b.y) < 72){
        this.grab = { type:b.type, x, y }; this.hist = [{x,y,t:T}];
        S.pick(); FX.burst(b.x,b.y-20,['#FFF3C4','#FFD75E'],6,120);
        return;
      }
    }
  },
  release(){
    if(!this.grab) return;
    const g = this.grab; this.grab = null;
    const h = this.hist, now = T;
    const old = h.find(q=>now-q.t < .12) || h[0];
    const dx = g.x-old.x, dy = g.y-old.y, dtt = Math.max(.016, now-old.t);
    let vx = dx/dtt, vy = dy/dtt; const sp = Math.hypot(vx,vy);
    if(sp < 250 || vy > -40){ S.tap(); return; } // gesto fraco: volta pro cesto
    const k = Math.min(1100, Math.max(620, sp))/sp; vx*=k; vy*=k;
    this.items.push({ type:g.type, x:g.x, y:g.y, vx, vy, rot:0, t:0 });
    S.woosh();
  },
  update(dt){
    if(this.grab && P.down){ this.grab.x = P.x; this.grab.y = P.y; this.hist.push({x:P.x,y:P.y,t:T}); if(this.hist.length>12) this.hist.shift(); }
    for(const it of this.items){
      it.t += dt; it.x += it.vx*dt; it.y += it.vy*dt; it.rot += dt*8;
      it.vx *= (1-dt*.25); it.vy *= (1-dt*.25);
      for(const gr of this.groups){
        if(it.done || gr.fed>=3) continue;
        if(Math.hypot(it.x-gr.x, it.y-(gr.y-10)) < 62){
          it.done = true;
          if(gr.want===it.type){
            gr.fed++; gr.happy = 1.2; this.delivered++; S.place();
            FX.burst(gr.x,gr.y-30,['#FF8FB3','#FFD75E','#FFFFFF'],14,200);
            FX.float(gr.x,gr.y-60, gr.fed>=3? 'Satisfeitos! 😊' : 'Obrigado! ❤️', '#FFF3C4', 19);
            if(gr.fed<3) setTimeout(()=>{ gr.want = Math.random()<.5?'pao':'peixe'; }, 900);
          } else {
            this.misses++; gr.wobble = .5; S.oops();
            toast(this.ts, gr.want==='pao'? 'Aqui a gente queria PÃO! 🍞' : 'Aqui a gente queria PEIXE! 🐟');
          }
        }
      }
      if(!it.done && (it.y<60 || it.x<-40 || it.x>W+40 || it.t>2.2)){ it.done = true; this.misses++; }
    }
    this.items = this.items.filter(i=>!i.done);
    for(const gr of this.groups){ if(gr.happy>0) gr.happy-=dt; if(gr.wobble>0) gr.wobble-=dt; }
    if(this.delivered >= this.need && !this.finished){ this.finished = true; setTimeout(()=>this.finish(), 900); }
  },
  finish(){
    if(scene!==this) return;
    const stars = this.misses<=3? 3 : (this.misses<=8? 2 : 1);
    say([
      NT_LINE.narr('Todo mundo comeu — e comeu o quanto quis! Com só cinco pães e dois peixinhos, Jesus alimentou mais de cinco mil pessoas. (João 6:11)'),
      NT_LINE.menino('Uau! Meu lanchinho virou uma festa pra multidão inteira!'),
    ], ()=>showEnd({
      key:'paes2', title:'⭐ DÁ PRA TODO MUNDO! · FASE 2', stars,
      verse:'E Jesus tomou os pães e, havendo dado graças, repartiu-os pelos discípulos, e os discípulos pelos que estavam assentados; e igualmente também dos peixes, quanto eles queriam.',
      ref:'João 6:11',
      lesson:'Jesus agradeceu antes de repartir — e o pouco virou muito! Agradecer e dividir com os outros são jeitos lindos de mostrar o amor de Deus.',
      nextLabel:'▶  Fase 3: Doze Cestos', next:()=>setScene('paes3_run'),
      replay:()=>setScene('paes2_run'),
    }));
  },
  drawGroup(gr){
    const wob = gr.wobble>0? Math.sin(T*40)*4 : 0;
    ctx.save(); ctx.translate(gr.x+wob, gr.y);
    blob(0,8,58,18,'#E8D9B0',3);
    const looks = [[-28,0],[0,-6],[28,0]];
    looks.forEach(([dx,dy],i)=>{
      const robe = PAES_ROBES[(gr.seed*3+i)%PAES_ROBES.length], skin = PAES_SKINS[(gr.seed+i)%PAES_SKINS.length];
      const hop = gr.happy>0? Math.abs(Math.sin(T*12+i))*8 : 0;
      blob(dx,dy-6-hop,13,14,robe,3); blob(dx,dy-28-hop,11,11,skin,3);
      blob(dx,dy-35-hop,10,5,PAES_HAIR[(gr.seed+i)%4],0);
      ctx.fillStyle=OUT; ctx.beginPath(); ctx.arc(dx-3.5,dy-29-hop,1.6,0,7); ctx.arc(dx+3.5,dy-29-hop,1.6,0,7); ctx.fill();
      if(gr.happy>0 || gr.fed>=3) smile(dx,dy-25-hop,4,true);
    });
    ctx.restore();
    // balão do pedido
    if(gr.fed<3){
      const by = gr.y-82, bob = Math.sin(T*3+gr.seed)*3;
      blob(gr.x, by+bob, 28, 24, '#FFF9EC', 3.5);
      ctx.fillStyle='#FFF9EC'; ctx.beginPath(); ctx.arc(gr.x-6,by+28+bob,5,0,7); ctx.fill();
      if(gr.want==='pao') drawBread(gr.x,by+bob,.95,0); else drawFishItem(gr.x,by+bob,.95,0);
      for(let i=0;i<3;i++) blob(gr.x-14+i*14, gr.y+38, 5,5, i<gr.fed? '#FF8FB3':'rgba(255,255,255,.6)', 2);
    } else {
      txt('😊', gr.x, gr.y-70, 30, '#fff');
    }
  },
  draw(dt){
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#86CFF0'); g.addColorStop(.2,'#D6EEF8'); g.addColorStop(.21,'#A6DE88'); g.addColorStop(1,'#5FAE4C');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    // flores no gramado
    for(let i=0;i<14;i++){ const fx=(i*97+30)%W, fy=260+((i*173)%640);
      blob(fx,fy,4,4,['#FF8FB3','#FFD75E','#FFFFFF'][i%3],1.5); }
    for(const gr of this.groups) this.drawGroup(gr);
    // Jesus abençoando entre os cestos
    drawJesus(270, 940, .78, 1, 0, true);
    const glow = ctx.createRadialGradient(270,860,10,270,860,120);
    glow.addColorStop(0,'rgba(255,240,180,.35)'); glow.addColorStop(1,'rgba(255,240,180,0)');
    ctx.fillStyle=glow; ctx.fillRect(150,740,240,240);
    for(const b of this.baskets){
      drawWicker(b.x, b.y, 1.5, 0);
      for(let i=0;i<3;i++){ if(b.type==='pao') drawBread(b.x-18+i*18, b.y-26-(i===1?6:0), .9, (i-1)*.3); else drawFishItem(b.x-18+i*18, b.y-26-(i===1?6:0), .85, (i-1)*.3); }
      const sp = .5+.5*Math.sin(T*4+b.x);
      txt('✨', b.x+44, b.y-44, 16, 'rgba(255,255,255,'+sp+')');
    }
    // trajetória de mira enquanto segura
    if(this.grab){
      const gx=this.grab.x, gy=this.grab.y;
      if(this.grab.type==='pao') drawBread(gx,gy,1.2,0); else drawFishItem(gx,gy,1.2,0);
      ctx.save(); ctx.globalAlpha=.6; txt('↑ lance!', gx, gy-34, 15, '#fff', 'center', true); ctx.restore();
    }
    for(const it of this.items){ if(it.type==='pao') drawBread(it.x,it.y,1.1,it.rot); else drawFishItem(it.x,it.y,1.1,it.rot); }
    drawTopBar('PÃES E PEIXES · FASE 2','#D98C2B');
    hudBar(W/2-150, 80, 300, 34, this.delivered/this.need, '#FF8FB3', '🍽️ Alimentados: '+this.delivered+' / '+this.need);
    toastDraw(this.ts, dt, 124);
  }
};

/* =====================================================================
   FASE 3 — Doze Cestos (pegar as sobras)
   ===================================================================== */
scenes.paes3_run = {
  init(){
    playMusic('paes');
    this.ts = toastState();
    this.bx = 270; this.walk = 0; this.dir = 1;
    this.pieces = []; this.spawnT = 1; this.filled = 0; this.inBasket = 0; this.per = 3;
    this.misses = 0; this.caught = 0; this.time = 0; this.swapT = 0;
    this.started = false; this.finished = false;
    say([
      NT_LINE.jesus('Recolham os pedaços que sobraram, para que nada se perca. (João 6:12)'),
      NT_LINE.narr('MISSÃO: arraste o dedo pra mover o discípulo com o cesto e pegue os pedaços que caem! Encha os 12 cestos! 🧺'),
    ], ()=>{ this.started = true; toast(this.ts,'Arraste para pegar as sobras! 🧺'); });
  },
  tap(x,y){ if(topBarTap(x,y)) return; },
  update(dt){
    if(!this.started || this.finished) return;
    this.time += dt;
    if(P.down && P.y>150){
      const tx = Math.max(50, Math.min(W-50, P.x)), d = tx-this.bx;
      this.bx += d*Math.min(1,dt*10); if(Math.abs(d)>3){ this.walk += dt*10; this.dir = d>0?1:-1; } else this.walk = 0;
    } else this.walk = 0;
    if(this.swapT>0) this.swapT -= dt;
    this.spawnT -= dt;
    if(this.spawnT<=0 && this.filled<12){
      const prog = this.filled/12;
      this.spawnT = Math.max(.42, .85 - prog*.45);
      const r = Math.random();
      this.pieces.push({ x:40+Math.random()*(W-80), y:150, vy: 150+prog*150+Math.random()*50, rot:Math.random()*6,
        type: r<.08? 'ouro' : (r<.58? 'pao':'peixe') });
    }
    const catchY = 820;
    for(const pc of this.pieces){
      pc.y += pc.vy*dt; pc.rot += dt*3;
      if(!pc.done && pc.y > catchY-30 && pc.y < catchY+20 && Math.abs(pc.x-this.bx) < 58){
        pc.done = true; this.caught++;
        const add = pc.type==='ouro'? 2 : 1;
        this.inBasket += add; S.pick();
        FX.burst(pc.x,catchY-30, pc.type==='ouro'? ['#FFD75E','#FFF3C4','#FFC93C'] : ['#FFF3C4','#E8B86A'], pc.type==='ouro'?16:8, 160);
        if(pc.type==='ouro') FX.float(pc.x,catchY-70,'+2 ✨','#FFD75E');
        while(this.inBasket >= this.per && this.filled<12){
          this.inBasket -= this.per; this.filled++; this.swapT = .5; S.place();
          FX.float(this.bx, catchY-110, 'Cesto '+this.filled+' cheio! 🧺', '#FFF3C4', 21);
        }
      }
      if(!pc.done && pc.y > 900){ pc.done = true; pc.lost = true; this.misses++; FX.burst(pc.x,900,['#C9A15E','#8FD97A'],5,90); }
    }
    this.pieces = this.pieces.filter(p=>!p.done);
    if(this.filled>=12 && !this.finished){ this.finished = true; S.win(); FX.celebrate(); setTimeout(()=>this.finish(), 1300); }
  },
  finish(){
    if(scene!==this) return;
    const stars = this.misses<=3? 3 : (this.misses<=8? 2 : 1);
    say([
      NT_LINE.narr('Eles juntaram os pedaços que sobraram... e encheram DOZE cestos! Sobrou mais do que tinha no começo! (João 6:13)'),
      NT_LINE.filipe('Eu achei que não ia dar nem pra começar... e olha só quanta sobra!'),
      NT_LINE.jesus('Deus cuida de vocês com fartura. E nada do que Ele dá deve ser desperdiçado.'),
    ], ()=>showEnd({
      key:'paes3', title:'⭐ PÃES E PEIXES · CONCLUÍDA!', stars,
      verse:'Recolheram, pois, e encheram doze cestos de pedaços dos cinco pães de cevada, que sobejaram aos que haviam comido.',
      ref:'João 6:13',
      lesson:'Deus não dá só o suficiente — Ele dá com fartura! E cuidar do que recebemos, sem desperdiçar, é um jeito de agradecer pelo que Ele nos dá.',
      nextLabel:'▶  Próxima história: Zaqueu', next:()=>scenes.zaqueu.start(1),
      replay:()=>setScene('paes3_run'),
    }));
  },
  draw(dt){
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#F7B57A'); g.addColorStop(.36,'#FCE2B8'); g.addColorStop(.37,'#9BD97F'); g.addColorStop(1,'#4F9E3E');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    // multidão satisfeita sentada no morro (silhuetas)
    for(let i=0;i<22;i++){ const cx=(i*53+20)%W, cy=372+((i*37)%60);
      blob(cx,cy,10,11,PAES_ROBES[i%PAES_ROBES.length],2); blob(cx,cy-16,7,7,PAES_SKINS[i%PAES_SKINS.length],2); }
    // 12 cestos (progresso)
    panel(18, 80, W-36, 66, 18, 'rgba(255,249,236,.94)', OUT, 4);
    for(let i=0;i<12;i++){
      const cx = 52 + i*39.6, on = i<this.filled;
      ctx.save(); if(!on) ctx.globalAlpha=.3; drawWicker(cx, 118, .58, on?2:0); ctx.restore();
    }
    for(const pc of this.pieces){
      if(pc.type==='ouro'){ const gl=ctx.createRadialGradient(pc.x,pc.y,2,pc.x,pc.y,30); gl.addColorStop(0,'rgba(255,230,120,.8)'); gl.addColorStop(1,'rgba(255,230,120,0)'); ctx.fillStyle=gl; ctx.fillRect(pc.x-30,pc.y-30,60,60); drawBread(pc.x,pc.y,.9,pc.rot); }
      else if(pc.type==='pao') drawBread(pc.x,pc.y,.85,pc.rot); else drawFishItem(pc.x,pc.y,.85,pc.rot);
    }
    // discípulo com o cesto
    drawDisciple(1, this.bx, 900, .9, this.dir, this.walk, 'up');
    const sc = 1.25 + (this.swapT>0? Math.sin(this.swapT*20)*.12 : 0);
    drawWicker(this.bx, 812, sc, this.inBasket>0? (this.inBasket>1?2:1) : 0);
    for(let i=0;i<this.per;i++) blob(this.bx-14+i*14, 850, 4.5,4.5, i<this.inBasket? '#FFC93C':'rgba(255,255,255,.65)', 2);
    drawTopBar('PÃES E PEIXES · FASE 3','#D98C2B');
    txt('Perdidos: '+this.misses, W-24, 170, 13, '#7a4a2a', 'right', true);
    toastDraw(this.ts, dt, 176);
  }
};
