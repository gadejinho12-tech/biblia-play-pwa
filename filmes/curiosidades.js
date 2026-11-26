/* Você sabia? — curiosidades da Bíblia com a voz da narradora.
   Na estante aparece a "curiosidade do dia"; no fim de cada filme, a curiosidade daquela história.
   Para acrescentar uma nova: adicione um item aqui e grave o áudio com prototipos/fontes/gravar_curiosidades.py */
window.CURIOSIDADES = [
  { id:'c01', historia:'criacao',    texto:'Você sabia que Deus fez tudo em seis dias, e no sétimo dia descansou?', ref:'Gênesis 2:2' },
  { id:'c02', historia:'noe',        texto:'Você sabia que a arca de Noé era mais comprida que um campo de futebol?', ref:'Gênesis 6:15' },
  { id:'c03', historia:'davi',       texto:'Você sabia que Davi pegou cinco pedrinhas lisas no riacho, mas só precisou de uma?', ref:'1 Samuel 17:40 e 49' },
  { id:'c04', historia:'davi',       texto:'Você sabia que o gigante Golias tinha quase três metros de altura? Mais alto que a porta da sua casa!', ref:'1 Samuel 17:4' },
  { id:'c05', historia:'jonas',      texto:'Você sabia que a cidade de Nínive era tão grande que levava três dias para atravessar a pé?', ref:'Jonas 3:3' },
  { id:'c06', historia:'natal',      texto:'Você sabia que Belém, a cidade onde Jesus nasceu, quer dizer "casa do pão"?', ref:'Lucas 2:4' },
  { id:'c07', historia:'tempestade', texto:'Você sabia que Jesus acalmou a tempestade só com a palavra? Ele falou ao mar: "Fique quieto! Acalme-se!"', ref:'Marcos 4:39' },
  { id:'c08', historia:'ovelha',     texto:'Você sabia que o bom pastor deixou noventa e nove ovelhas para procurar uma só que estava perdida?', ref:'Lucas 15:4' },
  { id:'c09', historia:'paes',       texto:'Você sabia que, depois que todo mundo comeu, ainda sobraram doze cestos cheios de pão?', ref:'João 6:13' },
  { id:'c10', historia:'zaqueu',     texto:'Você sabia que Zaqueu subiu numa árvore chamada sicômoro, que é parecida com uma figueira?', ref:'Lucas 19:4' },
];

window.vocesabia = function(onde, opcoes){
  const L = window.CURIOSIDADES, o = opcoes || {};
  if(!onde || !L || !L.length) return;
  if(!document.getElementById('vsCss')){
    const st = document.createElement('style'); st.id = 'vsCss';
    st.textContent = `
    .vs{display:flex;gap:14px;align-items:center;background:#FFF6D6;border-radius:24px;padding:14px 16px;box-shadow:0 5px 0 #F1DFA0;color:#2B3A55;text-align:left;margin:12px 0}
    .vs img{width:64px;height:64px;flex:none}
    .vs .cx{flex:1;min-width:0}
    .vs b{display:block;font:800 18px/1.1 'Baloo 2',Nunito,sans-serif;color:#FF8A3D;margin-bottom:2px}
    .vs p{margin:0;font:700 16px/1.35 Nunito,system-ui,sans-serif}
    .vs small{display:block;margin-top:3px;font:700 13px Nunito,sans-serif;color:#5B6A86}
    .vs .bt{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
    .vs button{border:0;border-radius:999px;min-height:44px;padding:8px 16px;font:800 15px 'Baloo 2',Nunito,sans-serif;cursor:pointer;background:#fff;color:#2B3A55;box-shadow:0 3px 0 #E8D79A}
    .vs button.ouvir{background:#FF8A3D;color:#fff;box-shadow:0 3px 0 #D96A22}
    @media (max-width:420px){ .vs{align-items:flex-start} .vs img{width:48px;height:48px} .vs p{font-size:15px} }`;
    document.head.appendChild(st);
  }
  let lista = o.historia ? L.filter(c=>c.historia===o.historia) : L.slice();
  if(!lista.length) lista = L.slice();
  const dia = Math.floor(Date.now()/864e5);
  let i = o.historia ? 0 : dia % lista.length;
  const el = document.createElement('div'); el.className = 'vs'; el.setAttribute('role','region'); el.setAttribute('aria-label','Você sabia?');
  el.innerHTML = '<img src="lili.svg" alt=""><div class="cx"><b>💡 Você sabia?</b><p></p><small></small><div class="bt"><button type="button" class="ouvir">🔊 Ouvir</button>' + (o.historia && lista.length < 2 ? '' : '<button type="button" class="outra">Outra curiosidade ➜</button>') + '</div></div>';
  let audio = null;
  function para(){ if(audio){ audio.pause(); audio = null; } }
  function mostra(){ const c = lista[i]; el.querySelector('p').textContent = c.texto.replace(/^Você sabia que /,'').replace(/^./,m=>m.toUpperCase()).replace(/\?(\s|$)/,'.$1'); el.querySelector('small').textContent = c.ref; para(); }
  el.querySelector('.ouvir').onclick = ()=>{ para(); try{ if(window.stopVoice) window.stopVoice(); }catch(e){} audio = new Audio('audio/curiosidades/' + lista[i].id + '.mp3'); audio.play().catch(()=>{}); };
  const ou = el.querySelector('.outra'); if(ou) ou.onclick = ()=>{ if(o.historia && lista.length > 1){ i = (i+1) % lista.length; } else { if(lista !== L){ lista = L.slice(); } i = (i+1) % lista.length; } mostra(); };
  mostra();
  if(o.antes) onde.insertBefore(el, o.antes); else onde.appendChild(el);
  return el;
};
