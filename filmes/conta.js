/* ===== CONTA DA FAMÍLIA: login por código no e-mail + checagem da assinatura =====
   Usa o Supabase (login e lista de assinantes). A Kiwify avisa o Supabase quando alguém paga.
   Sem configuração (conta-config.js vazio), tudo fica liberado como antes. */
(function(){
  const C = window.BP_CONTA || {};
  const ON = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY);
  const KEY = 'bp_conta', OFFLINE_DIAS = 7;
  const cache = () => { try{ return JSON.parse(localStorage.getItem(KEY) || 'null'); }catch(e){ return null; } };
  const setCache = o => { try{ o ? localStorage.setItem(KEY, JSON.stringify(o)) : localStorage.removeItem(KEY); }catch(e){} };
  const pageId = () => (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
  const isFree = id => !ON || (C.GRATIS || []).includes(id);
  // assinante = o servidor confirmou nos últimos 7 dias (funciona sem internet nesse período)
  const isSub = () => { if(!ON) return true; const c = cache(); return !!(c && c.ativo && Date.now() < (c.ate || 0)); };
  let sbP = null;
  function sb(){
    if(!ON) return Promise.resolve(null);
    if(sbP) return sbP;
    sbP = new Promise((res, rej) => {
      const make = () => res(window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY, { auth:{ persistSession:true, storageKey:'bp_sessao' } }));
      if(window.supabase) return make();
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
      s.onload = make; s.onerror = () => { sbP = null; rej(new Error('sem internet')); };
      document.head.appendChild(s);
    });
    return sbP;
  }
  function ativoDe(row){
    if(!row) return false;
    const futuro = row.expira_em ? new Date(row.expira_em) > new Date() : true;
    if(row.status === 'ativo') return futuro;
    if(row.status === 'cancelado') return !!row.expira_em && futuro; // cancelou: vale até o fim do período pago
    return false;
  }
  async function refresh(){
    const s = await sb(); if(!s) return null;
    const { data:{ session } } = await s.auth.getSession();
    if(!session){ setCache(null); return null; }
    const email = (session.user.email || '').toLowerCase();
    const { data, error } = await s.from('assinantes').select('status,plano,expira_em').eq('email', email).maybeSingle();
    if(error) return cache();
    const o = { email, ativo: ativoDe(data), status: data ? data.status : 'sem_assinatura', plano: data && data.plano, expira: data && data.expira_em, ate: Date.now() + OFFLINE_DIAS*864e5 };
    setCache(o); return o;
  }
  async function sendCode(email){ const s = await sb(); const { error } = await s.auth.signInWithOtp({ email: email.trim().toLowerCase(), options:{ shouldCreateUser:true } }); if(error) throw error; }
  async function verify(email, code){ const s = await sb(); const { error } = await s.auth.verifyOtp({ email: email.trim().toLowerCase(), token: code.trim(), type:'email' }); if(error) throw error; return refresh(); }
  async function logout(){ try{ const s = await sb(); if(s) await s.auth.signOut(); }catch(e){} setCache(null); }
  window.BPConta = { ON, isFree, isSub, refresh, sendCode, verify, logout, cache, pageId, config: C };
  // portão: página paga sem assinatura → página "Assinar" (e volta depois)
  if(ON && !isFree(pageId()) && !isSub()) location.replace('assinar.html?de=' + encodeURIComponent(pageId()));
  else if(ON && cache() && navigator.onLine !== false) refresh().catch(()=>{});
})();
