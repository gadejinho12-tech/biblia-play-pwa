// utilitários comuns dos testes de criacao/noe/davi (pente fino)
const {chromium,devices}=require('playwright');
const VPS=[
  ['cel-deitado',devices['iPhone 13 landscape']],
  ['cel-empe',devices['iPhone 13']],
  ['cel-empe-app',{viewport:{width:390,height:844},hasTouch:true,isMobile:true}], // iPhone 13 em pé, tela cheia (app instalado)
  ['ipad-deitado',devices['iPad Mini landscape']],
  ['ipad-empe',devices['iPad Mini']],
  ['pc',{viewport:{width:1280,height:720}}],
  ['android-deitado',{viewport:{width:640,height:360},hasTouch:true,isMobile:true}],
];
const ROOT=require('path').resolve(__dirname,'../..');
async function abrir(b,opt,file,errs){
  const c=await b.newContext({...opt,deviceScaleFactor:1}); const p=await c.newPage();
  p.on('pageerror',e=>errs.push('pageerror: '+e.message));
  p.on('console',m=>{ if(m.type()==='error' && !/fonts\.googleapis|net::ERR/.test(m.text())) errs.push('console: '+m.text()); });
  await p.addInitScript(()=>{ try{ sessionStorage.setItem('bl_gire','1'); }catch(e){} });
  await p.goto('file://'+(file.startsWith('/')? file : ROOT+'/filmes/'+file)+'#jogo'); await p.waitForTimeout(700);
  await p.evaluate(()=>{ document.getElementById('blGire')?.remove(); });
  return {c,p};
}
// virtual (tela lógica) -> CSS px
const V2C=`(lx,ly)=>{ const dpr=cv.width/innerWidth, offX=(cv.width-W*K)/2; return {x:(lx*K+offX)/dpr, y:ly*K/dpr}; }`;
module.exports={chromium,devices,VPS,ROOT,abrir,V2C,OUT:process.env.S||__dirname+'/shots'};
