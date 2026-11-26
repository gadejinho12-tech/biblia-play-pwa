const {chromium,devices}=require('playwright');
const VPS=[['cel-deitado',devices['iPhone 13 landscape']],['cel-empe',devices['iPhone 13']],['tab-deitado',devices['iPad Mini landscape']],['tab-empe',devices['iPad Mini']],['pc',{viewport:{width:1280,height:720}}],['android-deitado',{viewport:{width:640,height:360},hasTouch:true,isMobile:true,deviceScaleFactor:2}]];
async function abre(b,opt,url,errs){ const c=await b.newContext({...opt,deviceScaleFactor:1}); await c.addInitScript(()=>{ try{sessionStorage.setItem('bl_gire','1');}catch(e){} });
  const p=await c.newPage(); p.on('pageerror',e=>errs.push('ERR '+p.url().split('/').pop()+': '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('CONSOLE '+m.text()); });
  p.on('requestfailed',r=>{ if(!/fonts\.g/.test(r.url())) errs.push('REQFAIL '+r.url().slice(0,120)); });
  await p.goto('file://'+process.cwd()+'/filmes/'+url); await p.waitForTimeout(400); return {c,p}; }
// caixa visível? retorna problemas
async function confere(p,sel,nome){ return p.evaluate(([sel,nome])=>{ const out=[]; const vw=innerWidth, vh=innerHeight;
  for(const el of document.querySelectorAll(sel)){ const r=el.getBoundingClientRect(); if(!r.width) continue;
    if(r.width<44||r.height<44) out.push(nome+' pequeno '+Math.round(r.width)+'x'+Math.round(r.height)+' "'+(el.textContent||'').trim().slice(0,20)+'"');
    if(r.left<-1||r.right>vw+1) out.push(nome+' fora na horizontal '+Math.round(r.left)+'..'+Math.round(r.right)+' vw='+vw);
  } return out; },[sel,nome]); }
module.exports={chromium,devices,VPS,abre,confere};
