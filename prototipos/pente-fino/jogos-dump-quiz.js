const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});
await p.goto('file://'+process.cwd()+'/filmes/quiz.html');await p.waitForTimeout(500);
const r=await p.evaluate(()=>{const recs=Object.keys(REC);const qs=QS.map(q=>({s:q.s,p:q.p,q:q.q,a:q.a,rec:q.rec,ref:q.ref,hasRec:!!REC[q.rec]}));
 const dup={};QS.forEach(q=>{dup[q.q]=(dup[q.q]||0)+1});
 return {recs,qs,dups:Object.entries(dup).filter(x=>x[1]>1),badP:QS.filter(q=>!CAST[q.p]&&!ANIMAIS.includes(q.p)&&q.p!=='arca').map(q=>q.p)};});
const by={};for(const q of r.qs){by[q.s]=(by[q.s]||0)+1;}
console.log('counts',JSON.stringify(by));console.log('recs',r.recs.length,r.recs.filter(k=>!/^q\d/.test(k)).join(','));
console.log('missing rec',r.qs.filter(q=>!q.hasRec).map(q=>q.rec+':'+q.q).join('\n'));console.log('dups',JSON.stringify(r.dups),'badP',r.badP);
for(const q of r.qs) console.log(q.rec,'|',q.s,'|',q.p,'|',q.q,'|',q.a.join(' / '),'|',q.ref||'');
await b.close();})();
