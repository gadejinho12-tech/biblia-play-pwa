# Assinatura do Bíblia Play (Kiwify + Supabase)

Como funciona: a família paga na **Kiwify** → a Kiwify avisa o **Supabase** (função `kiwify-webhook`) →
o e-mail entra na tabela `assinantes` → no site, a família entra com o e-mail (código de 6 números) e tudo é liberado.

Enquanto `filmes/conta-config.js` estiver vazio, o site fica todo liberado, sem login.

## Passo a passo
1. **Supabase**: criar conta e projeto (supabase.com, plano grátis, região São Paulo).
2. **Tabela**: SQL Editor → colar `supabase/schema.sql` → Run.
3. **E-mail com código**: Authentication → Email Templates → "Magic Link": trocar o texto para mostrar `{{ .Token }}` (o código de 6 números).
4. **Endereço do site**: Authentication → URL Configuration → Site URL = `https://gadejinho12-tech.github.io/biblia-play-pwa/filmes/`.
5. **Função do webhook**: `supabase functions deploy kiwify-webhook --no-verify-jwt` e `supabase secrets set KIWIFY_TOKEN=...`.
6. **Kiwify**: criar o produto de assinatura (mensal e anual) → Apps → Webhooks → URL `https://<projeto>.supabase.co/functions/v1/kiwify-webhook`, eventos: compra aprovada, reembolso, chargeback, assinatura cancelada, assinatura renovada. Copiar o token para o passo 5.
7. **Site**: preencher `filmes/conta-config.js` (URL e anon key do Supabase, links de pagamento da Kiwify).
