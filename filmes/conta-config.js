/* ===== CONFIGURAÇÃO DA CONTA E DO PAGAMENTO =====
   Enquanto SUPABASE_URL estiver vazio, o site funciona como antes: tudo liberado, sem login.
   Depois de criar o Supabase e os produtos na Kiwify, é só preencher aqui. */
window.BP_CONTA = {
  // Supabase (Settings → API). A "anon key" é pública: pode ficar no site.
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',

  // Links de pagamento da Kiwify (um para cada plano). Ficam vazios até ligar o login,
  // para ninguém pagar antes de o acesso funcionar. Quando ligar, usar:
  //   mensal R$ 14,90/mês  → https://pay.kiwify.com.br/vMYkAzH
  //   anual  R$ 149,90/ano → https://pay.kiwify.com.br/5AaelZx   (o antigo jBVV1nl, de R$ 119, foi desativado)
  KIWIFY_MENSAL: '',
  KIWIFY_ANUAL: '',

  // Preços mostrados na página "Assinar"
  PRECO_MENSAL: 'R$ 14,90',
  PRECO_ANUAL: 'R$ 149,90',
  PRECO_ANUAL_MES: 'R$ 12,49',

  // O que é grátis (o resto pede assinatura)
  GRATIS: ['criacao', 'noe', 'memoria', 'arca', 'ajudante', 'pais', 'marca', 'assinar', 'entrar', 'index'],
};
