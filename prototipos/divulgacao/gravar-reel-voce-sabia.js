const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const c=await b.newContext({viewport:{width:720,height:1280},recordVideo:{dir:process.env.S+'/reel/raw',size:{width:720,height:1280}},hasTouch:true,isMobile:true});
const p=await c.newPage();const t0=Date.now();
await p.addInitScript(()=>{try{sessionStorage.setItem('bl_gire','1')}catch(e){}});
await p.goto('file://'+process.cwd()+'/filmes/ovelha.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{
 document.getElementById('blGire')?.remove();
 const st=document.createElement('style');st.textContent=`#ctrl,#top,#sub,#chapter,.topbar,#blGire,header,#xskip,.xb{display:none!important}
 #rl{position:fixed;inset:0;z-index:999;pointer-events:none;font-family:'Baloo 2',Nunito,sans-serif;color:#2B3A55}
 #rl .tit{position:absolute;left:50%;top:110px;transform:translateX(-50%) scale(0);transition:transform .5s cubic-bezier(.3,1.6,.5,1);background:#FFC93C;border-radius:999px;padding:14px 34px;font-size:64px;font-weight:800;box-shadow:0 8px 0 #E0A21B;white-space:nowrap}
 #rl .tit.on{transform:translateX(-50%) scale(1)}
 #rl .box{position:absolute;left:40px;right:40px;bottom:170px;background:#FFFDF6;border-radius:40px;padding:34px 36px 30px;box-shadow:0 12px 0 #E8E1CF;opacity:0;transform:translateY(40px);transition:all .5s}
 #rl .box.on{opacity:1;transform:none}
 #rl .box p{margin:0;font:800 46px/1.18 'Baloo 2',Nunito,sans-serif} #rl .box p em{font-style:normal;color:#FF8A3D}
 #rl .box small{display:block;margin-top:12px;font:800 28px Nunito,sans-serif;color:#5B6A86}
 #rl .lili{position:absolute;right:30px;bottom:-40px;width:150px;transform:rotate(8deg)}
 #rl .fim{position:absolute;inset:0;background:linear-gradient(#9fdcff,#e4f6ff 65%,#62BD45 65%);display:grid;place-items:center;text-align:center;opacity:0;transition:opacity .6s}
 #rl .fim.on{opacity:1} #rl .fim img{width:300px} #rl .fim h1{margin:10px 0 0;font-size:92px;line-height:.95} #rl .fim h1 b{color:#FF8A3D}
 #rl .fim p{font:800 34px Nunito,sans-serif;margin:16px 40px} #rl .fim .cta{display:inline-block;background:#FF8A3D;color:#fff;border-radius:999px;padding:16px 40px;font-size:40px;box-shadow:0 7px 0 #D96A22}
 #rl .marca{position:absolute;left:30px;top:34px;background:rgba(255,255,255,.9);border-radius:999px;padding:8px 18px 8px 10px;font:800 26px 'Baloo 2';display:flex;align-items:center;gap:8px}#rl .marca img{width:44px}`;
 document.head.appendChild(st);
 const d=document.createElement('div');d.id='rl';d.innerHTML=`<div class="marca"><img src="icons/icon-192.png">Clubinho <b style="color:#FF8A3D">do Reino</b></div><div class="tit">💡 Você sabia?</div>
 <div class="box"><p>O bom pastor deixou <em>99 ovelhas</em> para procurar <em>uma só</em> que estava perdida!</p><small>Lucas 15:4</small><img class="lili" src="lili.svg"></div>
 <div class="fim"><div><img src="lili-festa.svg"><h1>Clubinho<br><b>do Reino</b></h1><p>Histórias da Bíblia em desenho animado e joguinhos para crianças de 3 a 7 anos</p><span class="cta">▶ Comece grátis</span></div></div>`;document.body.appendChild(d);
 document.getElementById('play').click(); setTimeout(()=>{try{stopVoice()}catch(e){}},50);
 window.vai=(sc)=>{const i=SCRIPT.findIndex(l=>l.sc===sc); P.scT=0; enterLine(i); setTimeout(()=>{try{stopVoice()}catch(e){}},30);};
 vai('contagem');
});
const marca=(Date.now()-t0)/1000; console.log('inicio',marca);
await p.waitForTimeout(400); await p.evaluate(()=>document.querySelector('#rl .tit').classList.add('on'));
await p.waitForTimeout(900); await p.evaluate(()=>document.querySelector('#rl .box').classList.add('on'));
await p.waitForTimeout(3300); await p.evaluate(()=>vai('procura'));
await p.waitForTimeout(3000); await p.evaluate(()=>vai('ombros'));
await p.waitForTimeout(1800); await p.evaluate(()=>document.querySelector('#rl .fim').classList.add('on'));
await p.waitForTimeout(3600);
await c.close(); await b.close(); require('fs').writeFileSync(process.env.S+'/reel/inicio.txt',String(marca));})();
