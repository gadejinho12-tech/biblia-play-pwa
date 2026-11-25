# Pendências do Biblinha Play (atualizado em 21/11/2026)

## Para lançar a assinatura (nesta ordem)
1. [ ] Testar o webhook: Kiwify → Apps → Webhooks → "Supabase Bíblia Play" → "Testar Webhook" (evento Compra aprovada).
       Conferir se o comprador de teste entrou em `public.assinantes` (projeto biblia-play) e apagar o registro de teste.
2. [ ] Ligar o login no site: juntar o ramo `assinatura-supabase` no `main` (conta-config.js já tem Supabase + links Kiwify).
3. [ ] Compra real do plano mensal → entrar no site com o e-mail da compra → pedir reembolso dentro de 7 dias.

## Já feito
- Supabase biblia-play (ref gmpmvrhbyziulhgmbjxv): tabela assinantes, função kiwify-webhook (sem JWT),
  segredo KIWIFY_TOKEN, e-mail com código de 6 números via Gmail contactobibliaplay@gmail.com (testado: chegou).
- Kiwify: produto Biblinha Play, mensal https://pay.kiwify.com.br/vMYkAzH, anual https://pay.kiwify.com.br/jBVV1nl, webhook criado.
- Gamaliel protegido: webhook do porteiro ignora produtos que não são do Gamaliel (PR #6, publicado no Railway).

## Depois
- Domínio biblinhaplay.com.br (pagamento no Registro.br em 21/11) → DNS para o GitHub Pages → trocar a página de vendas na Kiwify.
- Identidade visual e troca do nome "Bíblia Play" → "Biblinha Play" (em andamento).
- Vozes: refazer narrações com a narradora do ElevenLabs (corrigir a chave: cabeçalho xi-api-key, sem prefixo).
- Decidir com o dono: restringir o webhook "Lino - Clube MEI 100%" ao produto Club MEI.

## Ideias para o futuro (pedido do dono em 25/11)
- Aumentar as fases dos jogos (hoje são 3 por filme) e deixar os filmes mais longos.
- Fazer como no Jonas: cada fase com uma brincadeira diferente (os outros filmes ainda têm 3 fases parecidas).
- Gravar no ElevenLabs as falas novas do jogo do Jonas (j8 a j11), que hoje usam a voz do aparelho.
