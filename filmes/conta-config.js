/* ===== CONFIGURAÇÃO DA CONTA E DO PAGAMENTO =====
   Login ligado (Supabase biblia-play + Kiwify). Para desligar e liberar tudo de novo:
   deixe SUPABASE_URL vazio. */
window.BP_CONTA = {
  // Supabase (Settings → API). A "anon key" é pública: pode ficar no site.
  SUPABASE_URL: 'https://gmpmvrhbyziulhgmbjxv.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcG12cmhieXppdWxoZ21ianh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMzAyNTQsImV4cCI6MjExMDcwNjI1NH0.us5TihNd3k9JqIBZ0v_3BUNJUw0-woepy2Gs3BXMKe0',

  // Botão "Entrar com Google" (precisa do Google ligado no Supabase: Authentication → Sign In / Providers → Google)
  GOOGLE: true,

  // Links de pagamento da Kiwify (um para cada plano). O anual antigo (jBVV1nl, R$ 119) foi desativado.
  KIWIFY_MENSAL: 'https://pay.kiwify.com.br/vMYkAzH',
  KIWIFY_ANUAL: 'https://pay.kiwify.com.br/5AaelZx',

  // Preços mostrados na página "Assinar"
  PRECO_MENSAL: 'R$ 14,90',
  PRECO_ANUAL: 'R$ 149,90',
  PRECO_ANUAL_MES: 'R$ 12,49',

  // O que é grátis (o resto pede assinatura)
  GRATIS: ['criacao', 'ajudante', 'pais', 'marca', 'assinar', 'entrar', 'index'],  // isca: só o filme (e o jogo) da Criação
};
