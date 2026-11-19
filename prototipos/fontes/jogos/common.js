/* ===== base comum dos jogos clássicos ===== */
const $ = id => document.getElementById(id);
// narradora (mesma voz dos filmes)
const voice = new Audio(); let voiceOn = true;
function say(k){ if(!voiceOn || !REC[k]) return; try{ voice.pause(); voice.src = REC[k]; voice.currentTime = 0; voice.play().catch(()=>{}); }catch(e){} }
function toggleVoice(btn){ voiceOn = !voiceOn; btn.textContent = voiceOn? '🔊' : '🔇'; btn.setAttribute('aria-label', voiceOn? 'Narração ligada' : 'Narração desligada'); if(!voiceOn) voice.pause(); }
// sons curtinhos
let AC=null;
function ac(){ try{ if(!AC) AC = new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==='suspended') AC.resume(); }catch(e){} return AC; }
function tone(n,dur,vol,delay,type){ const a=ac(); if(!a) return; const t0=a.currentTime+(delay||0); const o=a.createOscillator(); o.type=type||'sine'; o.frequency.value=440*Math.pow(2,(n-69)/12);
  const g=a.createGain(); g.gain.setValueAtTime(vol||.08,t0); g.gain.exponentialRampToValueAtTime(.0005,t0+(dur||.5)); o.connect(g); g.connect(a.destination); o.start(t0); o.stop(t0+(dur||.5)+.05); }
const sfx={ tap:()=>tone(76,.12,.05), good:()=>{ tone(76,.4,.07); tone(81,.5,.06,.08); }, bad:()=>{ tone(52,.25,.06,0,'triangle'); tone(49,.3,.05,.1,'triangle'); }, win:()=>[72,76,79,84].forEach((n,i)=>tone(n,.7,.07,i*.13)) };
// estrelas guardadas no aparelho (a estante mostra)
function saveStars(key,st){ try{ localStorage.setItem(key, Math.max(+(localStorage.getItem(key)||0), st)); }catch(e){} }
function starText(st){ return '⭐'.repeat(st)+'☆'.repeat(3-st); }
// confete
function confetti(){ const c=$('confetti'); if(!c) return; const x=c.getContext('2d'); c.width=innerWidth; c.height=innerHeight; const P=[]; const cols=['#e8b65a','#d97b6c','#6aa653','#6fa8e0','#b99be8'];
  for(let i=0;i<120;i++) P.push({x:Math.random()*c.width,y:-20-Math.random()*c.height*.5,vx:(Math.random()-.5)*2,vy:2+Math.random()*3,r:Math.random()*6,c:cols[i%5]});
  let t=0; (function f(){ t++; x.clearRect(0,0,c.width,c.height); for(const p of P){ p.x+=p.vx; p.y+=p.vy; p.r+=.1; x.save(); x.translate(p.x,p.y); x.rotate(p.r); x.fillStyle=p.c; x.fillRect(-5,-3,10,6); x.restore(); } if(t<240) requestAnimationFrame(f); else x.clearRect(0,0,c.width,c.height); })(); }
// retratos com o mesmo desenho dos filmes
const ANIMAIS=['ovelha','leao','elefante','girafa','pomba','coelho'];
function portrait(id,size,bg){ const dpr=Math.min(devicePixelRatio||1,2); const c=document.createElement('canvas'); c.width=c.height=Math.round(size*dpr); c.style.width=c.style.height=size+'px';
  ctx=c.getContext('2d'); ctx.scale(dpr,dpr);
  const g=ctx.createRadialGradient(size/2,size*.4,size*.1,size/2,size/2,size*.7); g.addColorStop(0,bg?bg[0]:'#fff8e8'); g.addColorStop(1,bg?bg[1]:'#f0dcb8'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(size/2,size/2,size/2,0,7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(size/2,size/2,size/2-1,0,7); ctx.clip();
  if(id==='arca'){ ctx.translate(size/2,size*.78); const k=size/330; ctx.scale(k,k); ark(0,0,1,{lit:.6,ramp:1,doorLit:.6}); }
  else if(ANIMAIS.includes(id)){ ctx.translate(size/2,size*(id==='girafa'?.92:.8)); const k=size/(id==='girafa'?120:(id==='elefante'?90:72)); ctx.scale(k,k); animal(id,id==='pomba'?-4:0,id==='pomba'?-20:0,id==='pomba'?1.8:1,1,0); }
  else { const C=CAST[id]; const k=size/(118*C.s); ctx.translate(size/2,size*1.02); ctx.scale(k,k); person(id,0,0,{pose:'stand',dir:1}); }
  ctx.restore(); ctx.strokeStyle='rgba(120,90,50,.35)'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(size/2,size/2,size/2-1,0,7); ctx.stroke(); return c; }
// histórias (mesma ordem da estante)
const STORIES=[
  { id:'criacao', name:'A Criação', who:'adao', ref:'Gênesis 1–2' },
  { id:'noe', name:'Noé e a Arca', who:'noe', ref:'Gênesis 6–9' },
  { id:'davi', name:'Davi e Golias', who:'davi', ref:'1 Samuel 17' },
  { id:'jonas', name:'Jonas', who:'jonas', ref:'Jonas 1–4' },
  { id:'tempestade', name:'Jesus Acalma a Tempestade', who:'jesus', ref:'Marcos 4' },
];
