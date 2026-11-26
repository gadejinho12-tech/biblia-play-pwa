const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [nm,opt] of [['cel-deitado',devices['iPhone 13 landscape']],['cel-empe',devices['iPhone 13']],['pc',{viewport:{width:1280,height:720}}],['tablet',devices['iPad Mini landscape']]]){
const c=await b.newContext({...opt,deviceScaleFactor:1});const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/filmes/natal.html#jogo');await p.waitForTimeout(800);
await p.evaluate(()=>{sessionStorage.setItem('bl_gire','1');document.getElementById('blGire')?.remove();startGame(); loadPhase(2);});await p.waitForTimeout(3000);
const pts=await p.evaluate(()=>{ const z=ZOOM*cam.z*PZ(), dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2;
 return GS.bush.map(b=>{ const lx=(b.x-cam.x)*z+W/2, ly=(b.y-30-cam.y)*z+H*CY; return {x:(lx*K+offX)/dpr, y:ly*K/dpr, has:b.has}; }); });
for(const q of pts){ await p.mouse.click(q.x,q.y); await p.waitForTimeout(250);} 
const r=await p.evaluate(()=>({got:GS.got,open:GS.bush.filter(b=>b.open).length,phase:GS.phase,fin:GS.finished,vw:innerWidth}));
console.log(nm,JSON.stringify(pts.map(q=>[Math.round(q.x),Math.round(q.y)])),JSON.stringify(r));await c.close();}
await b.close();})();
