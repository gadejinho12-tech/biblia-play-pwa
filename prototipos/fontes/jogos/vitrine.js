/* ===== VITRINE: mini-cenas em loop para os cartões (parecem o jogo sendo jogado) =====
   Cada cena desenha num espaço lógico de 320×200. t = segundos desde o início. */
const VW=320, VH=200;
function vSky(c1,c2){ ctx.fillStyle=vgrad(0,VH,[[0,c1],[1,c2]]); ctx.fillRect(0,0,VW,VH); }
function vGround(y,c1,c2){ ctx.fillStyle=vgrad(y,VH,[[0,c1],[1,c2]]); ctx.fillRect(0,y,VW,VH-y); }
function vHills(y,c){ ell(70,y+34,160,50,c); ell(270,y+40,170,46,mix(c,'#000000',.08)); }
function vCloud(x,y,s,a){ ctx.save(); ctx.globalAlpha=a==null?.9:a; ell(x,y,18*s,10*s,'#ffffff'); ell(x+14*s,y-5*s,14*s,11*s,'#ffffff'); ell(x-14*s,y-2*s,12*s,8*s,'#ffffff'); ctx.restore(); }
function vStar4(x,y,r,a){ ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='#fff6c8'; ctx.beginPath(); ctx.moveTo(x,y-r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.quadraticCurveTo(x,y,x,y+r); ctx.quadraticCurveTo(x,y,x-r,y); ctx.quadraticCurveTo(x,y,x,y-r); ctx.fill(); ctx.restore(); }
// dedo/toque: círculo branco com anel que pulsa quando "aperta"
function vTouch(x,y,press){ ctx.save(); if(press>0){ ctx.strokeStyle=`rgba(255,255,255,${.7*(1-press)})`; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(x,y,9+press*14,0,7); ctx.stroke(); }
  softShadow(x+2,y+4,14,.35); ell(x,y,9,9,'rgba(255,255,255,.92)'); ell(x,y,9,9,'rgba(0,0,0,0)'); ctx.strokeStyle='rgba(60,40,30,.35)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,9,0,7); ctx.stroke(); ctx.restore(); }
let VCLEAN=false;
function vChip(txt,x,y,right){ if(VCLEAN) return; ctx.save(); ctx.font='800 11px Nunito,system-ui,sans-serif'; const w=ctx.measureText(txt).width+16; const X=right? x-w : x;
  ctx.fillStyle='rgba(255,252,242,.92)'; rr(X,y,w,20,10); ctx.fill(); ctx.fillStyle='#33261f'; ctx.textBaseline='middle'; ctx.fillText(txt,X+8,y+10.5); ctx.restore(); }
function vPop(txt,x,y,k){ if(VCLEAN||k<=0||k>=1) return; ctx.save(); ctx.globalAlpha=Math.min(1,(1-k)*2); ctx.font='800 15px Nunito,system-ui,sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#ffd860'; ctx.strokeStyle='rgba(80,50,10,.6)'; ctx.lineWidth=3; ctx.strokeText(txt,x,y-k*22); ctx.fillText(txt,x,y-k*22); ctx.restore(); }
function vFish(x,y,s,c,dir){ ctx.save(); ctx.translate(x,y); ctx.scale((dir||1)*s,s); const w=Math.sin(G*8)*.25; ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(-18,-7+w*8); ctx.lineTo(-18,7+w*8); ctx.closePath(); ctx.fill(); shade(0,0,12,7,mix(c,'#ffffff',.35),c); ell(6,-2,1.6,1.6,'#22202a'); ctx.restore(); }
function vBird(x,y,s){ const f=Math.sin(G*12)*5; ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.strokeStyle='#3a3550'; ctx.lineWidth=2; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-8,-f*.6); ctx.quadraticCurveTo(-4,-4,0,0); ctx.quadraticCurveTo(4,-4,8,-f*.6); ctx.stroke(); ctx.restore(); }
function vBoat(rock){ ctx.save(); ctx.rotate(rock); ctx.fillStyle=vgrad(-20,6,[[0,'#b97c47'],[1,'#6e4224']]); ctx.beginPath(); ctx.moveTo(-58,-18); ctx.lineTo(58,-18); ctx.quadraticCurveTo(50,6,30,8); ctx.lineTo(-30,8); ctx.quadraticCurveTo(-50,6,-58,-18); ctx.fill();
  ctx.strokeStyle='rgba(60,30,12,.45)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(-54,-10); ctx.lineTo(54,-10); ctx.stroke(); ctx.strokeStyle='#6e4224'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-26,-18); ctx.lineTo(-26,-86); ctx.stroke(); ctx.restore(); }
const ease2=t=>t<0?0:t>1?1:t*t*(3-2*t);

const SCENES={
  // A Criação — arrastar cada criação para o céu ou para o mar
  criacao(t){ const L=7.5, u=t%L; vSky('#8cc8ef','#e7f4f6'); ctx.fillStyle=vgrad(112,VH,[[0,'#4fa2cf'],[1,'#1f5f8e']]); ctx.fillRect(0,112,VW,VH);
    ctx.save(); ctx.globalAlpha=.35; ctx.fillStyle='#ffffff'; for(let i=0;i<6;i++){ const x=(i*70+G*14)%380-30; ctx.fillRect(x,114+Math.sin(G*2+i)*2,26,2); } ctx.restore();
    glow(262,40,60,'#fff3b0',.6); ell(262,40,16,16,'#ffe27a'); vCloud(70,38,1,.95); vCloud(200,24,.7,.8);
    const items=[['pomba',[160,96],[90,64]],['peixe',[160,96],[236,150]],['tartaruga',[160,96],[110,160]]];
    let done=0; for(let i=0;i<3;i++){ const s=i*2.1+.4, e=s+1.5; const [kind,a,b]=items[i];
      if(u>=e){ done++; const p=b; if(kind==='pomba') animal('pomba',p[0]+Math.sin(G*1.5)*14,p[1]+Math.sin(G*3)*4,1.1,1,0); else if(kind==='peixe') vFish(p[0]+Math.sin(G*1.2)*16,p[1],1.1,'#f2a65e',Math.cos(G*1.2)>0?1:-1); else { ctx.save(); ctx.globalAlpha=.95; animal('tartaruga',p[0]+Math.sin(G*.8)*8,p[1],.7,1,0); ctx.restore(); } vPop('+1',b[0],b[1]-24,(u-e)/1.1); } }
    // peça na mão
    for(let i=0;i<3;i++){ const s=i*2.1+.4, e=s+1.5; if(u<s-.4||u>=e) continue; const [kind,a,b]=items[i]; const k=ease2((u-s-.25)/1.1); const x=lerp(a[0],b[0],k), y=lerp(a[1],b[1],k)-Math.sin(k*Math.PI)*18;
      ctx.save(); ctx.fillStyle='rgba(255,250,235,.95)'; rr(x-22,y-20,44,40,12); ctx.fill(); ctx.restore();
      if(kind==='pomba') animal('pomba',x-2,y+6,1,1,0); else if(kind==='peixe') vFish(x,y,1,'#f2a65e',1); else animal('tartaruga',x-2,y+12,.55,1,0);
      const tx=u<s+.25? lerp(160,x+10,ease2((u-s+.4)/.65)) : x+10, ty=u<s+.25? lerp(190,y+12,ease2((u-s+.4)/.65)) : y+12; vTouch(tx,ty,u>s+.15&&u<s+.5?(u-s-.15)/.35:0); }
    vChip('☁️ Céu ou mar? · '+done+'/3',8,8); },

  // Noé — os animais entram na arca, de dois em dois, antes da chuva
  noe(t){ const rainA=.5+.5*Math.sin(t*.4); vSky(mix('#9cc4e4','#6f7f9a',rainA*.6),'#e4eef0'); vCloud(60,30,1.2,.9); vCloud(150,20,1,.8); vCloud(250,34,1.3,.85); vHills(118,'#a9cf86'); vGround(150,'#8fbf6a','#6aa653');
    ctx.save(); ctx.translate(250,160); ctx.scale(.36,.36); ark(0,0,1,{lit:.55,ramp:1,doorLit:.6}); ctx.restore();
    const kinds=['ovelha','ovelha','coelho','coelho','elefante','elefante','girafa','girafa','leao','leao']; let inside=0;
    for(let i=0;i<kinds.length;i++){ const x=((t*34+(kinds.length-i)*36)%400)-60; if(x>232){ inside++; continue; } const y=172+(i%2)*6, a=x>205? 1-(x-205)/27:1; if(x<-40) continue;
      ctx.save(); ctx.globalAlpha=a; animal(kinds[i],x,y,kinds[i]==='elefante'||kinds[i]==='girafa'?.5:.62,1,i*.4); ctx.restore(); }
    person('noe',196,174,{pose:'point',s:.34,dir:-1});
    ctx.save(); ctx.globalAlpha=rainA*.6; rain(1,.2); ctx.restore();
    vChip('🐾 Todos a salvo! · '+(4+Math.floor(t*1.7)%5)+'/8',8,8); },

  // Davi — gira a funda e acerta o gigante
  davi(t){ const L=3.6, u=t%L; vSky('#f5d9a4','#f8eedc'); vHills(110,'#d8c08a'); vGround(156,'#cdb47a','#a88a52'); glow(70,40,50,'#fff0c0',.5);
    const gx=252, gy=176; let fall=0; if(u>2.35) fall=Math.sin(Math.min(1,(u-2.35)/.5)*Math.PI*.5)*.35*(u<3.2?1:1-(u-3.2)/.4);
    person('davi',70,178,{pose:'sling',fast:u>1.2&&u<1.95,s:.5,dir:1});
    ctx.save(); ctx.translate(gx,gy); ctx.rotate(fall); person('golias',0,0,{pose:'spear',s:.4,dir:-1}); ctx.restore();
    if(u>1.95&&u<2.4){ const k=(u-1.95)/.45; const x=lerp(86,gx-4,k), y=lerp(120,96,k)-Math.sin(k*Math.PI)*30; ell(x,y,3.4,3,'#7a6a5a'); ctx.strokeStyle='rgba(255,255,255,.6)'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-10,y+2); ctx.lineTo(x-2,y); ctx.stroke(); }
    if(u>2.35&&u<2.7){ glow(gx-2,96,30,'#ffffff',.8*(1-(u-2.35)/.35)); }
    vPop('+⭐',gx-10,80,(u-2.4)/1.1); vChip('🎯 Funda de Davi · '+(u>2.4?3:2)+'/3',8,8); },

  // Jonas — nadando no fundo do mar, pegando conchinhas
  jonas(t){ vSky('#4aa0cc','#0f3e66'); ctx.save(); ctx.globalAlpha=.18; ctx.fillStyle='#ffffff'; for(let i=0;i<4;i++){ ctx.beginPath(); const x=40+i*80+Math.sin(G*.5+i)*10; ctx.moveTo(x,0); ctx.lineTo(x+30,0); ctx.lineTo(x+60,VH); ctx.lineTo(x+10,VH); ctx.fill(); } ctx.restore();
    ctx.save(); ctx.globalAlpha=.35; ctx.fillStyle='#0a2a4a'; ctx.beginPath(); const wx=((t*22)%520)-120; ctx.ellipse(wx,70,90,30,0,0,7); ctx.fill(); ctx.beginPath(); ctx.moveTo(wx-80,70); ctx.lineTo(wx-120,50); ctx.lineTo(wx-118,92); ctx.fill(); ctx.restore();
    vGround(180,'#d8c08a','#b89a62'); for(let i=0;i<7;i++){ const x=i*50+10; ctx.strokeStyle='#3f8a5a'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,186); ctx.quadraticCurveTo(x+Math.sin(G*1.6+i)*8,166,x+Math.sin(G*1.6+i)*12,150); ctx.stroke(); }
    let got=0; for(let i=0;i<6;i++){ const x=((i*64-t*48)%384+384)%384-30, y=60+((i*53)%90); if(x<92&&x>70){ got=1; continue; } ell(x,y,6,5,'#ffe0d0'); ell(x-1.5,y-1.5,2,1.6,'#ffffff'); }
    const jy=110+Math.sin(t*1.6)*36; ctx.save(); ctx.translate(86,jy); ctx.rotate(Math.PI/2.15+Math.sin(t*3)*.05); person('jonas',0,40,{pose:'armsup',s:.34,dir:1}); ctx.restore();
    for(let i=0;i<8;i++){ const y=((VH-(t*30+i*37))%VH+VH)%VH, x=60+i*30+Math.sin(G*2+i)*4; ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(x,y,2+(i%3),0,7); ctx.stroke(); }
    vFish(((t*40)%400)-40,40,.8,'#ffd27a',1); vFish(360-((t*30)%420),150,.7,'#f2a6c8',-1);
    vChip('🐚 Nade, Jonas! · '+(12+Math.floor(t*1.3)%9),8,8); },

  // Natal — a estrela guia os magos até Belém
  natal(t){ vSky('#121a48','#4a4a8a'); for(let i=0;i<34;i++){ const x=(i*97)%VW, y=(i*53)%110; vStar4(x,y,1.5+(i%3),.4+.4*Math.sin(G*2+i)); }
    const sx=150+Math.sin(t*.4)*60, sy=38; glow(sx,sy,60,'#fff3b0',.55); vStar4(sx,sy,12,1); ctx.strokeStyle='rgba(255,243,176,.25)'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(262,120); ctx.stroke();
    ell(90,190,200,70,'#2c3266'); ell(280,196,160,60,'#252a58'); vGround(176,'#3a3a6a','#2a2a50');
    ctx.save(); ctx.translate(262,160); ctx.fillStyle='#7a4a2a'; ctx.beginPath(); ctx.moveTo(-40,-34); ctx.lineTo(0,-58); ctx.lineTo(40,-34); ctx.closePath(); ctx.fill(); ctx.fillStyle='#5a3a22'; ctx.fillRect(-34,-34,68,40); glow(0,-14,46,'#ffc870',.55); ctx.fillStyle='#ffcf80'; rr(-26,-28,52,32,6); ctx.fill(); ctx.restore();
    person('maria',248,182,{pose:'kneel',s:.28,dir:1}); person('jose',280,182,{pose:'stand',s:.3,dir:-1});
    const mx=((t*22)%240)-50; ['mago1','mago2','mago3'].forEach((m,i)=>{ const x=mx-i*30; if(x>-30&&x<205) person(m,x,184,{pose:'walk',s:.3,dir:1,ph:i}); });
    vChip('⭐ Siga a estrela!',8,8); },

  // Tempestade — deslize o dedo para acalmar o mar
  tempestade(t){ const L=7, u=t%L; const calm=u<3.2?0:Math.min(1,(u-3.2)/1.4)*(u<6.4?1:1-(u-6.4)/.6);
    vSky(mix('#3a4660','#8cc8ef',calm),mix('#6a7690','#e7f4f6',calm)); if(calm<.6){ ctx.save(); ctx.globalAlpha=(1-calm)*.9; vCloud(60,30,1.6,.7); vCloud(200,24,1.8,.65); vCloud(290,40,1.3,.7); ctx.restore(); }
    if(u>1&&u<1.12) { ctx.fillStyle='rgba(255,255,255,.5)'; ctx.fillRect(0,0,VW,VH); }
    const amp=lerp(14,2.5,calm); ctx.save(); waves(130,amp,'#4a7aa0','#2a4a70',2.4,false); ctx.restore();
    const bob=Math.sin(G*2.4)*amp*.5, rock=Math.sin(G*2.1)*lerp(.18,.03,calm);
    ctx.save(); ctx.translate(160,140+bob); ctx.save(); ctx.rotate(rock); person('pedro',-30,-14,{pose:calm>.5?'stand':'pray',s:.3,dir:1}); person('jesus',14,-16,{pose:u>2.6?'armsup':'sleep',s:.32,dir:-1}); ctx.restore(); vBoat(rock); ctx.restore();
    ctx.save(); waves(154,amp*.8,'#5a8ab0','#2a4a70',3,true); ctx.restore();
    if(calm<.4){ ctx.save(); ctx.globalAlpha=.5*(1-calm); rain(1,.4); ctx.restore(); }
    if(u>2.6&&u<3.6){ const k=ease2((u-2.6)/.9); const x=lerp(40,280,k), y=150+Math.sin(k*Math.PI*2)*8; ctx.strokeStyle='rgba(255,255,255,.75)'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(lerp(40,280,Math.max(0,k-.25)),150); ctx.lineTo(x,y); ctx.stroke(); vTouch(x,y,0); }
    if(calm>.9) vPop('Silêncio, mar!',160,70,(u-4.6)/1.6);
    vChip(calm>.5?'🌤️ O mar se acalmou':'🌊 Deslize para acalmar',8,8); },

  // Jogo da memória — cartas virando
  memoria(t){ vSky('#f4e6c8','#ead6ae'); const ids=['noe','leao','davi','pomba']; const P=VITRINE_PORTRAITS; const deck=[0,1,2,3,1,0,3,2]; const L=8, u=t%L;
    const order=[[0,5],[1,4],[2,7],[3,6]]; const shown=new Set(); let flipping=null;
    order.forEach((pr,i)=>{ const s=.6+i*1.6; if(u>s+1.1) pr.forEach(c=>shown.add(c)); else if(u>s){ flipping={pr,k:(u-s)/1.1}; } });
    for(let c=0;c<8;c++){ const col=c%4, row=Math.floor(c/4), x=44+col*72, y=48+row*88; let sc=1, up=shown.has(c);
      if(flipping && flipping.pr.includes(c)){ const k=flipping.k, half=flipping.pr.indexOf(c)===0? Math.min(1,k*2.2) : Math.max(0,(k-.35)*2.2); sc=Math.abs(Math.cos(Math.min(1,half)*Math.PI)); up=half>.5; }
      ctx.save(); ctx.translate(x,y); ctx.scale(Math.max(.04,sc),1); softShadow(0,38,30,.25); if(up){ ctx.fillStyle='#fffaf0'; rr(-28,-36,56,72,9); ctx.fill(); if(shown.has(c)){ ctx.strokeStyle='#5f9a4c'; ctx.lineWidth=3; rr(-28,-36,56,72,9); ctx.stroke(); } const im=P[ids[deck[c]]]; if(im) ctx.drawImage(im,-22,-24,44,44); }
      else { ctx.fillStyle=vgrad(-36,36,[[0,'#f0cf8a'],[1,'#c98a3a']]); rr(-28,-36,56,72,9); ctx.fill(); ctx.strokeStyle='rgba(255,250,235,.8)'; ctx.lineWidth=1.5; rr(-23,-31,46,62,6); ctx.stroke(); vStar4(0,0,8,.95); } ctx.restore(); }
    if(flipping){ const c=flipping.k<.5? flipping.pr[0] : flipping.pr[1]; const x=44+(c%4)*72+12, y=48+Math.floor(c/4)*88+20; vTouch(x,y,(flipping.k%.5)*2); }
    vChip('🃏 Pares: '+shown.size/2+'/4',8,8); },

  // Caça-palavras — a palavra vai sendo marcada
  cacapalavras(t){ vSky('#fffaf0','#f3e6cc'); const G1=['QARCAZBL','NOEXTPFE','UPOMBAHR','DAVIKLUZ','MESTRELA']; const L=8, u=t%L;
    const words=[[0,1,4,'#f6c33a'],[2,1,5,'#8fc4e8'],[3,0,4,'#b9df92'],[4,1,7,'#f2a6c8']]; const cw=34, ch=30, ox=24, oy=34;
    words.forEach(([r,c0,len,col],i)=>{ const s=.4+i*1.8; if(u<s) return; const k=Math.min(1,(u-s)/1); ctx.fillStyle=rgba(col,.75); rr(ox+c0*cw+3,oy+r*ch+3,(len*cw-6)*k+ (k<1?0:0),ch-6,12); ctx.fill();
      if(k<1){ vTouch(ox+c0*cw+(len*cw)*k,oy+r*ch+ch/2+6,0); } else vPop('✓',ox+(c0+len)*cw,oy+r*ch+10,(u-s-1)/.9); });
    ctx.font='800 17px Nunito,system-ui,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillStyle='#33261f';
    G1.forEach((row,r)=>[...row].forEach((ch2,c)=>ctx.fillText(ch2,ox+c*cw+cw/2,oy+r*ch+ch/2+1)));
    vChip('🔤 Ache: ARCA · POMBA · DAVI · ESTRELA',8,6); },

  // Quiz — toca na resposta certa
  quiz(t){ vSky('#2a3270','#1b2152'); for(let i=0;i<20;i++) vStar4((i*67)%VW,(i*41)%VH,1.4,.3+.3*Math.sin(G*2+i));
    const Q=[['Quem construiu a arca?',['Davi','Noé','Jonas','Pedro'],1],['Quem venceu o gigante?',['Davi','Saul','José','Adão'],0],['Onde Jonas ficou 3 dias?',['Na arca','No barco','No peixe','Na cova'],2]];
    const L=3.2, qi=Math.floor(t/L)%3, u=t%L, [q,opts,ok]=Q[qi];
    ctx.font='800 16px Fraunces,Georgia,serif'; ctx.textAlign='center'; ctx.fillStyle='#fff6e0'; ctx.fillText(q,160,40);
    opts.forEach((o,i)=>{ const x=20+(i%2)*144, y=62+Math.floor(i/2)*58; let bg='rgba(255,250,235,.95)', fg='#33261f'; if(i===ok&&u>1.5){ bg='#6aa653'; fg='#ffffff'; }
      ctx.fillStyle=bg; rr(x,y,136,46,14); ctx.fill(); ctx.fillStyle=fg; ctx.font='800 14px Nunito,system-ui,sans-serif'; ctx.textBaseline='middle'; ctx.fillText(['A','B','C','D'][i]+'  '+o,x+68,y+24); });
    const bx=20+(ok%2)*144+100, by=62+Math.floor(ok/2)*58+30; const tx=lerp(160,bx,ease2(u/1.2)), ty=lerp(196,by,ease2(u/1.2)); vTouch(tx,ty,u>1.2&&u<1.7?(u-1.2)/.5:0);
    vPop('Certo! ⭐',160,186,(u-1.6)/1.4); ctx.textBaseline='alphabetic'; },

  // Minha Arca — os amigos comprados com moedinhas
  arca(t){ vSky('#9fd0ee','#fdf2da'); ctx.save(); ctx.translate(160,108); ctx.scale(.55,.55); decor('arcoiris',0,-60,3); ctx.restore(); vHills(120,'#a9cf86'); vGround(150,'#8fbf6a','#6aa653');
    ctx.save(); ctx.translate(160,158); ctx.scale(.34,.34); ark(0,0,1,{lit:.5,ramp:1,doorLit:.4}); ctx.restore();
    const list=[['ovelha',60],['leao',100],['zebra',214],['pavao',262],['coelho',130],['urso',188]]; const n=2+Math.floor(t/1.6)%5;
    list.slice(0,n).forEach(([id,x],i)=>animal(id,x,178+(i%2)*4,.52,x>160?-1:1,i));
    decor('sol',36,34,.7); decor('borboleta',230+Math.sin(G*.8)*30,70+Math.sin(G*1.5)*10,.6);
    vChip('🪙 '+(30+n*7)+' moedinhas',8,8); vChip('🚢 '+n+' amigos',312,8,true); },
};
// figurinhas desenhadas uma vez para o jogo da memória
const VITRINE_PORTRAITS={};
function vitrinePrep(){ for(const id of ['noe','leao','davi','pomba']) VITRINE_PORTRAITS[id]=portrait(id,88,['#fffaf0','#f3e2c0']); }

/* motor: um único laço anima só os cartões visíveis (≈30 quadros/s) */
const VIT=[]; let vitStill=false;
try{ vitStill=matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
function vitrine(canvas,scene,opt){ const v={c:canvas,x:canvas.getContext('2d'),scene,vis:false,t0:(opt&&opt.offset)||Math.random()*3,cover:!!(opt&&opt.cover),clean:!!(opt&&opt.clean)}; VIT.push(v);
  if('IntersectionObserver' in window){ new IntersectionObserver(es=>es.forEach(e=>v.vis=e.isIntersecting),{rootMargin:'80px'}).observe(canvas); } else v.vis=true;
  vitDraw(v,vitStill?2.2:0); return v; }
function vitDraw(v,t){ const r=v.c.getBoundingClientRect(); if(!r.width) return; const dpr=Math.min(devicePixelRatio||1,1.6), w=Math.round(r.width*dpr), h=Math.round(r.height*dpr);
  if(v.c.width!==w||v.c.height!==h){ v.c.width=w; v.c.height=h; } ctx=v.x; ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,w,h);
  const k=Math.max(w/VW,h/VH); ctx.setTransform(k,0,0,k,(w-VW*k)/2,(h-VH*k)/2); VCLEAN=v.clean; ctx.save(); try{ SCENES[v.scene](t+v.t0); }catch(e){} ctx.restore(); VCLEAN=false; }
let vitLast=0;
function vitLoop(ts){ requestAnimationFrame(vitLoop); if(vitStill || ts-vitLast<32) return; vitLast=ts; G=ts/1000; for(const v of VIT) if(v.vis) vitDraw(v,G); }
