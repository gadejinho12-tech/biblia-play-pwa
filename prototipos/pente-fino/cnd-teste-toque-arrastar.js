// Verifica se arrastar com o DEDO (toque real via CDP) funciona no jogo da Criação: o navegador
// pode tomar o gesto para rolar a página (pointercancel) quando o canvas tem touch-action:manipulation.
const {chromium,devices,abrir,V2C}=require('./cnd-comum.js');
(async()=>{ const b=await chromium.launch();
for(const [nm,opt] of [['cel-empe',devices['iPhone 13']],['android-deitado',{viewport:{width:640,height:360},hasTouch:true,isMobile:true}]]){
  const errs=[]; const {c,p}=await abrir(b,opt,'criacao.html',errs);
  await p.evaluate(()=>{ window.__ev=[]; ['pointerdown','pointermove','pointerup','pointercancel'].forEach(t=>addEventListener(t,e=>__ev.push(t),true)); startGame(); });
  await p.waitForTimeout(800);
  const st=await p.evaluate(`(()=>{ const v=${V2C}; return {from:v(GS.px,GS.py), to:v(GS.px+100, bands().sky*.4), it:GS.cur}; })()`);
  const s=await c.newCDPSession(p);
  await s.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:st.from.x,y:st.from.y,id:1}]});
  for(let i=1;i<=10;i++){ await s.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:st.from.x+(st.to.x-st.from.x)*i/10,y:st.from.y+(st.to.y-st.from.y)*i/10,id:1}]}); await p.waitForTimeout(20); }
  await s.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); await p.waitForTimeout(300);
  const r=await p.evaluate(()=>({placed:GS.placed.length, drag:GS.drag, ev:[...new Set(__ev)].join(','), ta:getComputedStyle(cv).touchAction}));
  console.log(nm, st.it, JSON.stringify(r), errs.join(';')); await c.close(); }
await b.close(); })();
