# Pendências do Biblinha Play (atualizado em 26/11/2026)

Regra combinada com o dono: o que custa dinheiro fica para depois. Fazemos primeiro o que é de graça.

## 1. Agora: novos filmes e jogos (um de cada vez)
Para cada filme: roteiro e fases aprovados pelo dono → cenas → vozes → jogo com 3 fases diferentes → teste → publicar.

### Novo Testamento
- [ ] **A Ovelha Perdida** (Lucas 15:3-7) — roteiro em aprovação (prototipos/roteiros/ovelha-perdida.md)
- [ ] **Pães e Peixes** (João 6:1-14)
- [ ] **Zaqueu** (Lucas 19:1-10)
- [ ] Ideias depois: O Bom Samaritano, Jesus e as crianças, O filho que voltou (filho pródigo), A pesca maravilhosa

### Antigo Testamento (depois)
- [ ] Daniel na Cova dos Leões · Moisés e o Mar Aberto · Ester, a Rainha Corajosa (já aparecem como "em breve")

### Jogos que ainda têm 3 fases parecidas
- [ ] Criação, Noé, Davi e Tempestade: trocar por fases com brincadeiras diferentes (como já feito no Jonas e no Natal)
- [ ] Mais fases por jogo e filmes mais longos

## 2. De graça, quando der
- [ ] Imagem do produto na Kiwify (300×250) com a Lili
- [ ] Reativar o Supabase biblia-play (está pausado) e testar o webhook da Kiwify ("Testar Webhook")
- [ ] Decidir sobre o webhook antigo "Lino - Clube MEI 100%" na Kiwify
- [ ] Pesquisa da marca "Biblinha Play" no INPI

## 3. Quando tiver dinheiro
- [ ] Domínio biblinhaplay.com.br (Registro.br, pedido 32696872) → DNS para o GitHub Pages → página de vendas na Kiwify
- [ ] Ligar o login no site (ramo `assinatura-supabase`: conta-config.js com Supabase + links da Kiwify)
- [ ] Compra real do plano mensal → entrar com o e-mail da compra → reembolso em 7 dias
- [ ] (Opcional) ElevenLabs para vozes ainda mais naturais (a chave precisa ir no cabeçalho `xi-api-key`)

## Já feito
- Identidade Biblinha Play (Lili, cores de dia ensolarado, ícone), publicada
- Vozes novas em todos os filmes e jogos (Francisca, Brian, Antônio; Deus e Golias com efeito), volume igualado
- Jonas e Natal com 3 fases diferentes; aviso para deitar o celular; faixa 3 a 7 anos
- Correções bíblicas (Criação, Noé, Davi, Jonas)
- Gamaliel protegido contra avisos da Kiwify de outros produtos
- Supabase biblia-play configurado (tabela, função kiwify-webhook, e-mail com código via Gmail)

## Como regravar vozes
`cd prototipos/fontes && SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 regravar_filme.py <filme>`
(precisa de edge-tts e do site speech.platform.bing.com liberado na rede)
