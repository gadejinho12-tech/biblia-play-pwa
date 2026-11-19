//@@CAST
const CAST={
  adao:{ robe:['#8fbf6a','#557f3a'], sash:'#7a5a2a', skin:['#e8b48a','#c98f62'], hair:'#5a3a22', s:1 },
  eva:{ robe:['#b4d47e','#6f9a48'], sash:'#e8a0a8', skin:['#f3c8a0','#dca07a'], hair:'#8a4a26', longhair:true, s:.94 },
};
//@@SCENES
/* ===== peças da Criação ===== */
const popS=(t,t0)=>{ const q=clamp((t-t0)/.55,0,1); if(q<=0) return 0; const c=1.7; return 1+(c+1)*Math.pow(q-1,3)+c*Math.pow(q-1,2); }; // "pula" para dentro
function fish(x,y,s,c,dir,ph){ s=s||1; dir=dir||1; const w=Math.sin(G*8+(ph||0))*.25; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  ctx.save(); ctx.translate(-16,0); ctx.rotate(w); ctx.fillStyle=mix(c,'#000000',.15); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-14,-11); ctx.lineTo(-14,11); ctx.closePath(); ctx.fill(); ctx.restore();
  shade(0,0,20,12,mix(c,'#ffffff',.25),c); ell(9,-3,3.4,3.4,'#ffffff'); ell(10,-3,1.8,1.8,'#2c2340'); ctx.strokeStyle=rgba('#ffffff',.35); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(-2,0,7,-1.2,1.2); ctx.stroke(); ctx.restore(); }
function turtle(x,y,s,dir){ s=s||1; dir=dir||1; const f=Math.sin(G*4)*.4; ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  for(const [fx,fy,r] of [[-14,8,.5],[14,8,-.5],[-12,-8,-.5],[12,-8,.5]]){ ctx.save(); ctx.translate(fx,fy); ctx.rotate(r+f*(fx>0?1:-1)); ell(0,0,9,4,'#8fbf6a'); ctx.restore(); }
  shade(20,0,7,6,'#9ccf78','#6f9a48'); ell(23,-2,1.5,1.5,'#2c2340'); shade(0,0,18,13,'#6fa858','#3f7034'); for(const [hx,hy] of [[-6,-4],[5,-4],[0,5]]) ell(hx,hy,4.5,4,'rgba(255,255,255,.18)'); ctx.restore(); }
function bird(x,y,s,c,dir,ph){ s=s||1; dir=dir||1; const f=Math.sin(G*12+(ph||0)); ctx.save(); ctx.translate(x,y); ctx.scale(dir*s,s);
  shade(0,0,11,7,mix(c,'#ffffff',.3),c); shade(9,-4,6,6,mix(c,'#ffffff',.3),c); ell(14,-4,3,1.4,'#e6974d'); ell(10,-5,1,1,'#2c2340');
  ctx.save(); ctx.translate(-2,-2); ctx.rotate(-.3-f*.8); shade(-7,0,11,3.5,mix(c,'#ffffff',.4),c); ctx.restore(); ctx.restore(); }
function flower(x,y,s,c){ s=s||1; ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.strokeStyle='#4f8a3e'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-24); ctx.stroke(); ell(5,-10,6,3,'#6aa653',-.5);
  for(let i=0;i<5;i++){ const a=i*Math.PI*2/5+G*.3; ell(Math.cos(a)*7,-28+Math.sin(a)*7,5.5,5.5,c); } ell(0,-28,4,4,'#ffd75e'); ctx.restore(); }
function fruitTree(x,y,s){ tree(x,y,s,'#6fb35c','#3f7d3a'); for(const [fx,fy] of [[-20,-96],[14,-104],[26,-78],[-28,-74],[0,-82]]) ell(x+fx*s,y+fy*s,5*s,5*s,'#e85d5d'); }
function sunDisk(x,y,r,a){ glow(x,y,r*5,'#fff0b8',.55*(a==null?1:a)); ell(x,y,r,r,'#ffe9a0'); ell(x-r*.25,y-r*.25,r*.5,r*.5,'rgba(255,255,255,.45)'); }
function moon(x,y,r){ glow(x,y,r*3,'#e8eeff',.35); ell(x,y,r,r,'#f4f1e2'); ell(x+r*.35,y-r*.15,r*.85,r*.9,'rgba(30,40,80,.0)'); ell(x-r*.3,y+r*.2,r*.18,r*.18,'rgba(180,170,150,.5)'); ell(x+r*.2,y-r*.3,r*.12,r*.12,'rgba(180,170,150,.5)'); }
function starShape(x,y,r,c){ ctx.fillStyle=c||'#ffe88a'; ctx.beginPath(); for(let k=0;k<10;k++){ const rr2=k%2?r*.42:r, an=-Math.PI/2+k*Math.PI/5; k?ctx.lineTo(x+Math.cos(an)*rr2,y+Math.sin(an)*rr2):ctx.moveTo(x+Math.cos(an)*rr2,y+Math.sin(an)*rr2); } ctx.closePath(); ctx.fill(); }
function sea(y0,c1,c2){ ctx.fillStyle=vgrad(y0,y0+420,[[0,c1],[1,c2]]); ctx.beginPath(); ctx.moveTo(-2000,y0); for(let x=-2000;x<=2000;x+=30) ctx.lineTo(x,y0+Math.sin(x*.012+G*1.2)*5); ctx.lineTo(2000,900); ctx.lineTo(-2000,900); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.4)'; ctx.lineWidth=2.5; for(let i=0;i<12;i++){ const xx=((i*181+G*25)%1600)-800, yy=y0+18+(i%4)*26; ctx.beginPath(); ctx.moveTo(xx,yy); ctx.lineTo(xx+30,yy); ctx.stroke(); } }
function edenSky(){ sky('#7cc6ec','#cfeaf4','#fff3d0'); }

SC.escuro = t=>{ LIGHT.dx=1; LIGHT.rim='#9aa8d8'; LIGHT.rimA=.2; setCam([0,-120,.9],[0,-140,1.15],t/7);
  layer(0,()=>{ sky('#05060c','#0b1022','#141a30'); for(let i=0;i<30;i++){ const px=((i*137+G*12)%1400)-700, py=-120+Math.sin(G*.6+i)*60+((i*31)%120); glow(px,py,22,'#a8b8ff',.18+.12*Math.sin(G*2+i)); } });
  layer(1,()=>{ sea(30,'#141c34','#05060c'); glow(0,0,320,'#c8d0ff',.08+.06*Math.sin(G)); });
};
SC.luz = t=>{ const k=ss(0,1.6,t), split=ss(4,8,t); LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6;
  setCam([0,-140,1.15],[0,-170,.9],t/9);
  layer(0,()=>{ sky(mix('#05060c','#f4c878',k),mix('#0b1022','#ffe8b8',k),mix('#141a30','#fff6dc',k));
    if(split>0){ ctx.save(); ctx.globalAlpha=split; const g=ctx.createLinearGradient(-W/2,0,W/2,0); g.addColorStop(0,'rgba(255,240,200,0)'); g.addColorStop(.5,'rgba(255,240,200,0)'); g.addColorStop(.62,'rgba(20,26,60,.85)'); g.addColorStop(1,'rgba(10,14,40,.95)'); ctx.fillStyle=g; ctx.fillRect(-W,-H,W*2,H*2);
      for(let i=0;i<24;i++){ const sx=W*.12+((i*67)%Math.max(60,W*.36)), sy=-300+((i*53)%300); starShape(sx,sy,2+(i%3),'rgba(255,240,180,.9)'); } moon(W*.33,-230,22); ctx.restore(); }
    glow(0,-80,lerp(0,700,k),'#fff4d0',.8*k*(1-split*.6)); godRays(0,-80,900,.25*k,G,'#fff0c0'); });
  layer(1,()=>{ sea(30,mix('#141c34','#5aa0d0',k),mix('#05060c','#24507a',k)); });
};
SC.ceu = t=>{ LIGHT.dx=1; setCam([0,-200,.85],[0,-160,1.05],t/6);
  const k=ss(0,3,t);
  layer(0,()=>{ sky(mix('#f4c878','#5eb3f2',k),mix('#ffe8b8','#a8d8f8',k),'#e8f4fa'); sunDisk(320,-240,0,0); for(let i=0;i<6;i++){ const s=popS(t,1+i*.5); if(s>0) cloud(-560+i*220,-260+(i%2)*60,.9*s,'#ffffff','#dfe8f2',.95); } });
  layer(1,()=>{ sea(20,'#5aa0d0','#24507a'); });
};
SC.terra = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([0,-160,.8],[60,-150,1.15],t/10);
  const up=ss(0,3.5,t);
  layer(0,()=>{ sky('#5eb3f2','#a8d8f8','#e8f4fa'); for(let i=0;i<5;i++) cloud(((i*300+G*8)%1600)-800,-280+(i%2)*50,.9,'#ffffff','#dfe6ee',.9); });
  layer(.2,()=>{ ctx.save(); ctx.translate(0,(1-up)*160); ridge(-20,150,.004,3,'#a8c0d8','#c8d8e4'); ctx.restore(); });
  layer(.5,()=>{ ctx.save(); ctx.translate(0,(1-up)*120); ridge(10,80,.008,5,'#9fcf8c','#bfe0a4'); ctx.restore(); });
  layer(1,()=>{ sea(lerp(-30,130,up),'#5aa0d0','#24507a'); if(up>.6){ ctx.save(); ctx.globalAlpha=ss(.6,1,up); ctx.fillStyle=vgrad(-10,140,[[0,'#8fd07a'],[1,'#5f9a4c']]); ctx.beginPath(); ctx.moveTo(-1400,130); ctx.lineTo(-1400,0); ctx.quadraticCurveTo(0,-50,1400,0); ctx.lineTo(1400,130); ctx.fill(); ctx.restore(); }
    const items=[[-420,'tree',4.2],[-300,'flower',4.6],[-220,'flower',4.9],[-120,'fruit',5.2],[20,'flower',5.6],[120,'tree',5.9],[230,'flower',6.2],[330,'fruit',6.5],[440,'flower',6.8],[-520,'flower',7.1],[540,'tree',7.4]];
    for(const [x,ty,t0] of items){ const s=popS(t,t0); if(s<=0) continue; const y=-Math.abs(x)*.02; if(ty==='flower') flower(x,y,s*1.2,['#ff8fb3','#ffd75e','#b99be8','#ffffff'][Math.abs(x)%4]); else if(ty==='fruit') fruitTree(x,y,.8*s); else tree(x,y,.85*s,'#6fb35c','#3f7d3a'); } });
};
SC.astros = t=>{ const night=ss(3.2,5.2,t); LIGHT.dx=1; LIGHT.rim=night>.5?'#cfd8ff':'#fff1c8'; LIGHT.rimA=.5; setCam([0,-200,.8],[0,-230,.95],t/9);
  const sa=lerp(Math.PI*.95,Math.PI*.05,ss(0,3.6,t));
  layer(0,()=>{ sky(mix('#5eb3f2','#0e1638',night),mix('#a8d8f8','#2a3466',night),mix('#fff0d0','#4a4a7a',night));
    if(night<1) sunDisk(Math.cos(sa)*480,-120-Math.sin(sa)*260,42,1-night);
    if(night>0){ ctx.save(); ctx.globalAlpha=night; for(let i=0;i<60;i++){ const sx=((i*137.5)%1400)-700, sy=-360+((i*71.3)%320); const tw=.5+.5*Math.sin(G*2+i); starShape(sx,sy,(1.5+(i%3))*popS(t,4+i*.04),`rgba(255,240,180,${.6+.4*tw})`); } moon(-320,-250,32*popS(t,4.2)); ctx.restore(); } });
  layer(.5,()=>{ ridge(10,80,.008,5,mix('#9fcf8c','#2f4a3a',night),mix('#bfe0a4','#3a5a48',night)); });
  layer(1,()=>{ ground(mix('#8fd07a','#3a5a3a',night),mix('#5a8a46','#1e3020',night)); for(let i=0;i<7;i++) (i%2?fruitTree:tree)(-600+i*200,0,.8,mix('#6fb35c','#2f5a3a',night),mix('#3f7d3a','#1e3a26',night)); });
};
SC.mar = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.55; setCam([0,-150,1.0],[0,-120,1.2],t/6);
  layer(0,()=>{ sky('#5eb3f2','#a8d8f8','#e8f4fa'); sunDisk(380,-250,34); for(let i=0;i<4;i++) cloud(((i*340+G*8)%1600)-800,-280+(i%2)*40,.9,'#ffffff','#dfe6ee',.9);
    const bc=['#7fb6e8','#f2a65e','#e8d9a8','#ffffff','#e88a9a']; for(let i=0;i<9;i++){ const s=popS(t,.8+i*.35); if(s<=0) continue; const bx=((i*150+G*70)%1500)-750, by=-300+((i*47)%140)+Math.sin(G*2+i)*12; bird(bx,by,1.3*s,bc[i%bc.length],1,i); } });
  layer(1,()=>{ sea(-40,'#5aa8d8','#1e4a7a');
    const fc=['#f2a65e','#ffd75e','#e85d8a','#7fd0c8','#b99be8'];
    for(let i=0;i<12;i++){ const s=popS(t,.5+i*.25); if(s<=0) continue; const dir=i%2?1:-1; const fx=((i*170+G*60*dir)%1600+1600)%1600-800, fy=40+(i%4)*45+Math.sin(G*2+i)*8;
      if(i%5===4) turtle(fx,fy,1.1*s,dir); else fish(fx,fy,1.1*s,fc[i%fc.length],dir,i); }
    const j=(G*.7)%3; if(j<1){ const q=j; fish(lerp(-200,40,q),-40-Math.sin(q*Math.PI)*90,1.3,'#f2a65e',1,0); } });
};
SC.animais6 = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.6; setCam([-120,-170,1.15],[60,-160,1.25],t/8);
  layer(0,()=>{ sky('#5eb3f2','#a8d8f8','#fff0d0'); sunDisk(380,-250,34); for(let i=0;i<5;i++) cloud(((i*300+G*8)%1600)-800,-270+(i%2)*50,.9,'#ffffff','#dfe6ee',.9); });
  layer(.2,()=>ridge(-30,110,.004,2,'#b9cfe0','#d7e4ea'));
  layer(.5,()=>{ ridge(0,60,.008,4,'#9fcf8c','#bfe0a4'); for(let i=0;i<9;i++) tree(-900+i*230,10,.7+(i%3)*.12,'#6fb35c','#3f7d3a'); });
  layer(1,()=>{ ground('#8fd07a','#5a8a46'); for(let i=0;i<8;i++) flower(-560+i*160,8,1,['#ff8fb3','#ffd75e','#ffffff'][i%3]);
    const list=[['leao',-330,.6],['elefante',-120,1.4],['girafa',120,2.4],['coelho',300,3.2],['ovelha',420,3.8],['coelho',-460,4.4],['ovelha',-10,5]];
    for(const [tp,x,t0] of list){ const s=popS(t,t0); if(s<=0) continue; ctx.save(); ctx.translate(x,0); ctx.scale(s,s); animal(tp,Math.sin(G*.6+x)*20,0,1.05,x<0?1:-1,x*.01); ctx.restore(); } });
};
function garden(t,eve){
  layer(0,()=>{ edenSky(); sunDisk(eve? -420 : 360, eve? -60 : -250, eve? 46 : 34); if(eve){ const a=ss(0,6,t); ctx.save(); ctx.globalAlpha=a*.8; ctx.fillStyle=vgrad(-H/2,H/2,[[0,'#3a3a7a'],[.6,'#f2a878'],[1,'#ffd08a']]); ctx.fillRect(-W,-H,W*2,H*2); ctx.restore();
      for(let i=0;i<30;i++){ const sx=((i*137.5)%1400)-700, sy=-360+((i*71.3)%220); starShape(sx,sy,2*ss(2,6,t),'rgba(255,240,180,.85)'); } }
    for(let i=0;i<4;i++) cloud(((i*340+G*5)%1600)-800,-270+(i%2)*40,.9,eve?'#ffd0b0':'#ffffff',eve?'#d08a80':'#dfe6ee',.85); godRays(0,-700,800,eve?.08:.16,G,'#fff0c0'); });
  layer(.2,()=>ridge(-30,110,.004,2,eve?'#c89a9a':'#b9cfe0',eve?'#e0b8a8':'#d7e4ea'));
  layer(.5,()=>{ ridge(0,60,.008,4,'#8fcf7c','#b0e0a0'); for(let i=0;i<10;i++) (i%2?fruitTree:tree)(-1000+i*220,10,.8+(i%3)*.12,'#6fb35c','#3f7d3a'); });
  layer(1,()=>{ ground('#8fd07a','#4f8a3e'); ctx.fillStyle=vgrad(40,90,[[0,'#7cc4e4'],[1,'#3a86b8']]); ctx.beginPath(); ctx.moveTo(-2000,60); ctx.quadraticCurveTo(0,40,2000,70); ctx.lineTo(2000,110); ctx.quadraticCurveTo(0,80,-2000,100); ctx.fill();
    for(let i=0;i<10;i++) flower(-640+i*140,6,1.1,['#ff8fb3','#ffd75e','#ffffff','#b99be8'][i%4]);
    fruitTree(-420,0,1.1); fruitTree(430,0,1.05);
    if(eve){ animal('leao',-300,-2,.9,1,0); animal('ovelha',-240,6,.9,-1,1); animal('coelho',300,4,.9,-1,2); animal('elefante',380,-2,.85,-1,3);
      person('adao',-60,-6,{pose:'sit'}); person('eva',10,-6,{pose:'sit',dir:-1}); }
    else { animal('girafa',-330,-2,.9,1,0); animal('coelho',260,6,.9,-1,2); animal('ovelha',340,4,.9,-1,1);
      const w=t<4? 'walk':'open'; const dx=t<4? lerp(-200,-40,t/4) : -40; person('adao',dx,0,{pose:w}); person('eva',dx+70,0,{pose:w,dir: t<4?1:-1,ph:.5}); } });
}
SC.jardim = t=>{ LIGHT.dx=1; LIGHT.rim='#fff1c8'; LIGHT.rimA=.7; if(t<6) setCam([-200,-170,1.1],[0,-150,1.5],t/6); else setCam([0,-150,1.5],[0,-170,1.2],(t-6)/5); garden(t,false); };
SC.descanso = t=>{ LIGHT.dx=-1; LIGHT.rim='#ffd6a0'; LIGHT.rimA=.8; setCam([0,-150,1.45],[0,-190,.95],t/10); garden(t,true); };
//@@ROTEIRO
const CH=[ 'No princípio', 'Um mundo cheio de cores', 'Peixes, aves e animais', 'Feitos com amor' ];
const N=(t)=>({who:'Narrador',text:t}), DEUS=t=>({who:'Deus',text:t});
const SCRIPT=[
  {card:0},
  {sc:'escuro', ...N('No comecinho de tudo, não existia nada. Só escuridão... e silêncio. Mas Deus já estava lá! E o Espírito de Deus pairava sobre as águas. (Gênesis 1:1-2)')},
  {sc:'luz', ...DEUS('Haja luz! (Gênesis 1:3)')},
  {sc:'luz', ...N('E a luz apareceu! Que lindo! Deus viu que a luz era boa. Ele separou a luz da escuridão. A luz, Ele chamou de dia. E a escuridão, de noite. Esse foi o primeiro dia.')},
  {sc:'ceu', ...N('No segundo dia, Deus abriu o céu, bem lá no alto. Um céu azulzinho, por cima das águas. (Gênesis 1:6-8)')},
  {card:1},
  {sc:'terra', ...DEUS('Que apareça a terra seca! E que ela se encha de flores, plantas e árvores cheias de frutos! (Gênesis 1:9-11)')},
  {sc:'terra', ...N('E a terra apareceu! Subiram montanhas. Nasceram campos e flores. E as árvores ficaram carregadinhas de frutas. Esse foi o terceiro dia.')},
  {sc:'astros', ...N('No quarto dia, Deus acendeu o sol, para brilhar de dia. E para a noite, Ele fez a lua... e um montão de estrelas! (Gênesis 1:16)')},
  {card:2},
  {sc:'mar', ...N('No quinto dia, o mar se encheu de peixes! E o céu se encheu de passarinhos, voando e cantando. (Gênesis 1:20-21)')},
  {sc:'animais6', ...N('No sexto dia, chegaram os animais da terra. O leão, o elefante, a girafa... e o coelhinho! Cada um do seu jeitinho. (Gênesis 1:24-25)')},
  {card:3},
  {sc:'jardim', ...N('E então, Deus fez o homem e a mulher: Adão e Eva. Eles eram parecidos com Deus. E foram feitos para cuidar de tudo, e para serem amigos dele. (Gênesis 1:27)')},
  {sc:'jardim', ...DEUS('Eu fiz tudo isto para vocês, com muito amor. Cuidem bem do meu mundo.')},
  {sc:'descanso', ...N('Deus olhou para tudo o que tinha feito... e sorriu. Era muito bom! E no sétimo dia, Deus descansou. (Gênesis 1:31; 2:2)')},
  {summary:true, sc:'descanso', ...N('Sabe o que a gente aprendeu hoje? Que Deus criou tudo com amor. E criou você também! Você é uma obra especial das mãos de Deus.')},
];
let vi=0; SCRIPT.forEach(l=>{ if(l.card==null){ vi++; l.rec='v'+String(vi).padStart(2,'0'); } else l.rec='c'+(l.card+1); });
function lineDur(l){ if(l.card!=null) return Math.max(3.4,(REC_DUR[l.rec]||2)+1.2); if(l.rec && REC_DUR[l.rec]) return REC_DUR[l.rec]+.7; return Math.max(4, l.text.replace(/\(.*?\)/g,'').length*.068)+.8; }
// cenas que precisam de mais tempo pra "acontecer" na tela
SCRIPT.forEach(l=>{ if(l.card==null && l.rec==='v02') l.dur=3.2; if(l.card==null && (l.sc==='terra'||l.sc==='astros'||l.sc==='mar'||l.sc==='animais6')) l.dur=Math.max(lineDur(l),7.2); });
let T0=0; SCRIPT.forEach(l=>{ l.start=T0; if(!l.dur) l.dur=lineDur(l); T0+=l.dur; }); const TOTAL=T0;
SCRIPT.forEach((l,i)=>{ if(l.card!=null){ const nx=SCRIPT[i+1]; l.sc=nx.sc; } });
const chapterStarts=SCRIPT.map((l,i)=>l.card!=null?i:-1).filter(i=>i>=0);
//@@MOOD
const MOOD={ escuro:[[45,52,57],[43,50,55],[41,48,53],[43,50,55]], luz:[[60,64,67,72],[65,69,72,77],[67,71,74,79],[72,76,79,84]], ceu:[[60,64,67],[65,69,72],[62,65,69],[67,71,74]],
  terra:[[60,64,67],[65,69,72],[67,71,74],[64,67,71]], astros:[[57,60,64],[53,57,60],[55,59,62],[60,64,67]], mar:[[62,66,69],[67,71,74],[64,67,71],[62,66,69]],
  animais6:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]], jardim:[[60,64,67,72],[65,69,72,76],[62,65,69,74],[67,71,74,79]], descanso:[[57,60,64,69],[53,57,60,65],[55,59,62,67],[60,64,67,72]], obra:[[60,64,67],[65,69,72],[67,71,74],[60,64,67]] };
//@@GAME
/* ================= JOGO DE RECOMPENSA: Encha o Mundo de Vida (3 fases) =================
   A criança arrasta cada criação para o lugar certo. Cada coisa colocada ganha vida
   na tela. Fase 1: céu e mar · Fase 2: céu, terra e mar · Fase 3: dia, noite, terra e mar. */
let MODE='film';
const GS={};
const ITEM_ZONE={ pomba:'ceu', ave:'ceu', nuvem:'ceu', peixe:'mar', peixe2:'mar', tartaruga:'mar', arvore:'terra', flor:'terra', leao:'terra', coelho:'terra', elefante:'terra', girafa:'terra', ovelha:'terra', sol:'dia', lua:'noite', estrela:'noite' };
const PHASES=[
  { name:'Fase 1 · Céu e mar', items:['pomba','peixe','nuvem','peixe2','ave','tartaruga'], voice:['g1','Agora é a sua vez! Arraste cada criação para o lugar certo. Ela mora no céu, ou no mar?'] },
  { name:'Fase 2 · Terra viva', items:['arvore','peixe','leao','pomba','flor','coelho','nuvem','elefante'], voice:['g5','Fase dois: agora tem terra também! Árvores, flores e animais moram na terra.'] },
  { name:'Fase 3 · Dia e noite', items:['sol','lua','girafa','estrela','peixe2','ovelha','ave','estrela','tartaruga','arvore'], voice:['g6','Fase três: o céu tem dia e noite! O sol vai no dia. A lua e as estrelas, na noite.'] },
];
function bands(){ const ph=GS.phase; return ph===1? {sky:H*.52, land:H*.52} : {sky:H*.42, land:H*.66}; }
function zoneAt(x,y){ const b=bands(); if(y<b.sky) return GS.phase===3? (x<W/2?'dia':'noite') : 'ceu'; if(y<b.land) return 'terra'; return 'mar'; }
function fits(item,zone){ const z=ITEM_ZONE[item]; if(z==='ceu') return zone==='ceu'||zone==='dia'||zone==='noite'; if(GS.phase<3 && (z==='dia'||z==='noite')) return zone==='ceu'; return z===zone; }
function gameReset(){ Object.assign(GS,{ phase:1, queue:[], cur:null, drag:false, px:0, py:0, placed:[], mistakes:[0,0,0], stage:'play', banner:0, idle:0, cool:0, ended:false, wrongT:0 }); startPhase(1,false); }
function startPhase(n,speak){ GS.phase=n; GS.queue=PHASES[n-1].items.slice(); GS.placed=[]; GS.stage='play'; GS.banner=2.6; nextItem(); $('gAn').textContent=PHASES[n-1].name; $('gGol').textContent='🌱 0 / '+PHASES[n-1].items.length; if(speak!==false) gsay(PHASES[n-1].voice[0],PHASES[n-1].voice[1],true); }
function nextItem(){ GS.cur=GS.queue.shift()||null; GS.px=W/2; GS.py=H*.5; GS.idle=0; GS.pop=0; }
let gsubT=0;
function gsay(key,text,force){ if(!force && GS.cool>0) return; GS.cool=1; speak({rec:key,text}); whoEl.textContent='Narradora'; txtEl.textContent=text; subEl.classList.add('on'); gsubT=Math.max(2,(REC_DUR[key]||2)+.6); }
function startGame(){
  MODE='game'; document.body.classList.add('game'); stopVoice(); P.playing=false;
  ['summary','gwin','cover'].forEach(id=>$(id).hidden=true); $('ctrl').hidden=true; $('top').hidden=true; $('chapter').classList.remove('on'); $('ghud').hidden=false;
  if(!AC) audioInit(); if(AC) AC.resume(); gameReset();
  gsay(PHASES[0].voice[0],PHASES[0].voice[1],true);
}
function leaveGame(){ MODE='film'; document.body.classList.remove('game'); stopVoice(); $('ghud').hidden=true; $('gwin').hidden=true; subEl.classList.remove('on'); $('ctrl').hidden=false; $('top').hidden=false; }
function toScreen(e){ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; return { x:(e.clientX*dpr-offX)/K, y:e.clientY*dpr/K }; }
function gameTap(e){ if(AC) AC.resume(); if(GS.stage!=='play'||!GS.cur) return; const p=toScreen(e); if(Math.hypot(p.x-GS.px,p.y-GS.py)<110){ GS.drag=true; GS.ox=GS.px-p.x; GS.oy=GS.py-p.y; pluck(74,.05); } }
cv.addEventListener('pointermove',e=>{ if(MODE!=='game'||!GS.drag) return; const p=toScreen(e); GS.px=p.x+GS.ox; GS.py=p.y+GS.oy; });
addEventListener('pointerup',()=>{ if(MODE!=='game'||!GS.drag) return; GS.drag=false; drop(); });
function drop(){
  const it=GS.cur, x=GS.px, y=GS.py;
  if(Math.hypot(x-W/2,y-H*.5)<55){ GS.px=W/2; GS.py=H*.5; return; } // soltou no mesmo lugar: nada acontece
  const z=zoneAt(x,y);
  if(fits(it,z)){ GS.placed.push({it, x, y, t:0, ph:Math.random()*6, dir:Math.random()<.5?1:-1}); [79,83].forEach((m,i)=>pluck(m,.06,i*.08));
    if(GS.placed.length%3===0) gsay('g8','Muito bem!'); else if(GS.placed.length===1) gsay('g2','Isso!');
    $('gGol').textContent='🌱 '+GS.placed.length+' / '+PHASES[GS.phase-1].items.length;
    if(GS.queue.length){ nextItem(); }
    else { GS.cur=null; GS.stage='between'; setTimeout(()=>{ if(MODE!=='game') return;
      if(GS.phase<3){ gsay('g4','E Deus viu que era bom! Vamos para a próxima fase.',true); setTimeout(()=>{ if(MODE==='game') startPhase(GS.phase+1); },3200); }
      else finishGame(); },900); }
  } else { GS.mistakes[GS.phase-1]++; GS.wrongT=.6; gsay('g3','Ops! Esse mora em outro lugar.',true); GS.px=W/2; GS.py=H*.5; pluck(50,.09); pluck(47,.07,.12); }
}
function finishGame(){ GS.ended=true; gsay('g7','Parabéns! Você ajudou a encher o mundo de vida. Era muito bom!',true);
  const st=GS.mistakes.map(m=>m===0?3:(m<=2?2:1)); const avg=Math.round(st.reduce((a,b)=>a+b,0)/3); setTimeout(()=>{ if(MODE!=='game') return;
  $('gStars').textContent='⭐'.repeat(avg)+'☆'.repeat(3-avg); $('gRes').textContent=PHASES.map((p,i)=>p.name.split(' · ')[1]+': '+'⭐'.repeat(st[i])).join('  ·  '); $('gwin').hidden=false; },3800); window.__lastStars=avg; }
function gameUpdate(dt){ const g=GS; if(g.cool>0) g.cool-=dt; if(gsubT>0){ gsubT-=dt; if(gsubT<=0) subEl.classList.remove('on'); }
  if(g.banner>0) g.banner-=dt; if(g.wrongT>0) g.wrongT-=dt; g.pop=Math.min(1,(g.pop||0)+dt*3); if(!g.drag) g.idle+=dt; for(const p of g.placed) p.t+=dt; }
function drawItem(it,x,y,s,o){ o=o||{}; const t=o.t||0, ph=o.ph||0, dir=o.dir||1, live=o.live;
  const bob=live? Math.sin(G*2+ph)*4 : 0;
  if(it==='pomba') animal('pomba',x+(live?Math.sin(G*.8+ph)*30:0),y+12+bob,1.5*s,dir,ph);
  else if(it==='ave') bird(x+(live?Math.sin(G*.9+ph)*30:0),y+bob,1.5*s,'#7fb6e8',dir,ph);
  else if(it==='nuvem') cloud(x+(live?Math.sin(G*.3+ph)*20:0),y,.55*s,'#ffffff','#dfe6ee',1);
  else if(it==='peixe') fish(x+(live?Math.sin(G*.7+ph)*40:0),y+bob,1.4*s,'#f2a65e',live?(Math.cos(G*.7+ph)>0?1:-1):1,ph);
  else if(it==='peixe2') fish(x+(live?Math.sin(G*.6+ph)*40:0),y+bob,1.4*s,'#e85d8a',live?(Math.cos(G*.6+ph)>0?1:-1):1,ph);
  else if(it==='tartaruga') turtle(x+(live?Math.sin(G*.4+ph)*30:0),y+bob,1.3*s,dir);
  else if(it==='arvore') fruitTree(x,y+40*s,.7*s);
  else if(it==='flor') flower(x,y+20*s,1.6*s,'#ff8fb3');
  else if(it==='sol') sunDisk(x,y,24*s,live?1:.8);
  else if(it==='lua') moon(x,y,20*s);
  else if(it==='estrela') starShape(x,y+(live?Math.sin(G*2+ph)*3:0),14*s*(live?(.85+.15*Math.sin(G*3+ph)):1),'#ffe88a');
  else animal(it,x+(live?Math.sin(G*.5+ph)*24:0),y+26*s,1.1*s,live?(Math.cos(G*.5+ph)>0?1:-1):1,ph); }
function gameDraw(){
  const b=bands(), ph=GS.phase;
  // céu
  ctx.fillStyle=vgrad(0,b.sky,[[0,'#5eb3f2'],[1,'#d8eefa']]); ctx.fillRect(-10,-10,W+20,b.sky+10);
  if(ph===3){ ctx.fillStyle=vgrad(0,b.sky,[[0,'#121a44'],[1,'#3a4478']]); ctx.fillRect(W/2,-10,W/2+10,b.sky+10); for(let i=0;i<14;i++) starShape(W/2+20+((i*61)%(W/2-30)),12+((i*37)%(b.sky*.7)),1.6,'rgba(255,240,200,.6)');
    ctx.save(); ctx.font='800 15px Nunito, sans-serif'; ctx.textAlign='center'; ctx.fillStyle='rgba(58,44,36,.55)'; ctx.fillText('☀️ DIA',W/4,b.sky-14); ctx.fillStyle='rgba(255,255,255,.7)'; ctx.fillText('🌙 NOITE',W*.75,b.sky-14); ctx.restore(); }
  // terra
  if(ph>1){ ctx.fillStyle=vgrad(b.sky-30,b.land,[[0,'#9fd88a'],[1,'#5f9a4c']]); ctx.beginPath(); ctx.moveTo(-10,b.land); ctx.lineTo(-10,b.sky+12); ctx.quadraticCurveTo(W*.3,b.sky-26,W*.55,b.sky+4); ctx.quadraticCurveTo(W*.8,b.sky+24,W+10,b.sky-6); ctx.lineTo(W+10,b.land); ctx.fill(); }
  // mar
  ctx.fillStyle=vgrad(b.land,H,[[0,'#5aa8d8'],[1,'#1e4a7a']]); ctx.beginPath(); ctx.moveTo(-10,H+10); ctx.lineTo(-10,b.land); for(let x=0;x<=W+20;x+=24) ctx.lineTo(x,b.land+Math.sin(x*.03+G*1.5)*4); ctx.lineTo(W+10,H+10); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=2; for(let i=0;i<8;i++){ const xx=((i*137+G*25)%(W+60))-30, yy=b.land+24+(i%3)*30; ctx.beginPath(); ctx.moveTo(xx,yy); ctx.lineTo(xx+26,yy); ctx.stroke(); }
  // rótulos das zonas (só enquanto arrasta)
  if(GS.drag){ ctx.save(); ctx.font='800 16px Nunito, sans-serif'; ctx.textAlign='left'; ctx.fillStyle='rgba(255,255,255,.85)'; if(ph<3) ctx.fillText('CÉU',14,28); if(ph>1) ctx.fillText('TERRA',14,b.sky+28); ctx.fillText('MAR',14,b.land+28); ctx.restore(); }
  // o que já foi criado ganha vida
  for(const p of GS.placed){ const s=Math.min(1,popS(p.t,0))*1.3; drawItem(p.it,p.x,p.y,s,{live:true,ph:p.ph,dir:p.dir}); }
  // peça atual
  if(GS.cur && GS.stage==='play'){ const x=GS.px, y=GS.py; const sh=GS.wrongT>0? Math.sin(G*50)*6 : 0;
    if(!GS.drag){ ctx.save(); ctx.globalAlpha=.95; ell(W/2,H*.5,82,82,'rgba(251,243,227,.92)'); ctx.strokeStyle='rgba(201,138,58,.8)'; ctx.lineWidth=4; ctx.setLineDash([8,7]); ctx.beginPath(); ctx.arc(W/2,H*.5,82+Math.sin(G*4)*3,0,7); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    drawItem(GS.cur,x+sh,y,Math.min(1,popS(GS.pop,0))*1.55,{});
    if(!GS.drag && GS.idle>4){ const z=ITEM_ZONE[GS.cur]; const ty = z==='mar'? (b.land+H)/2 : (z==='terra'? (b.sky+b.land)/2 : b.sky*.45); const tx = z==='dia'? W/4 : (z==='noite'? W*.75 : W/2+120);
      const k=(G*1.2)%1; ctx.save(); ctx.globalAlpha=1-k; ctx.font='34px sans-serif'; ctx.textAlign='center'; ctx.fillText('👆',lerp(W/2,tx,k),lerp(H*.5,ty,k)); ctx.restore(); } }
  if(GS.banner>0){ const a=Math.min(1,GS.banner*1.5); ctx.save(); ctx.globalAlpha=a; const bw=Math.min(420,W-40); ctx.fillStyle='rgba(251,243,227,.96)'; rr(W/2-bw/2,H*.2-36,bw,64,14); ctx.fill();
    ctx.font='800 26px Fraunces, Georgia, serif'; ctx.textAlign='center'; ctx.fillStyle='#3a2c24'; ctx.fillText(PHASES[ph-1].name,W/2,H*.2+6); ctx.restore(); }
}
$('toGame').onclick=startGame; $('coverGame').onclick=()=>{ if(!AC) audioInit(); startGame(); };
$('gAgain').onclick=startGame; $('gFilm').onclick=()=>{ leaveGame(); seekChapter(0); };
try{ if(localStorage.getItem('bp_criacao_visto')) $('coverGame').hidden=false; }catch(e){}
