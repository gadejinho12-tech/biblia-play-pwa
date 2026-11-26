# Pendências do Clubinho do Reino (antes: Biblinha Play → Amiguinhos de Deus → TV das Ovelhinhas) — atualizado em 26/11/2026

> 26/11: nome final **Clubinho do Reino** (INPI: "Clubinho do reino" sem nenhum resultado). Antes pensamos em "TV das Ovelhinhas", mas "As Ovelhinhas" já é marca na classe 41. Histórico: "Biblinha Play" (já existe o app BiblinhaPlay e a marca "Biblinha e Turminha") → "Amiguinhos de Deus" (marca registrada por outra pessoa, classes 16 e 42) → "TV das Ovelhinhas" (descartado) → "Clubinho do Reino".
> Ao registrar no INPI: marca mista (nome + desenho da Lili), classes 41 e 9; vale pesquisar também "Clubinho" sozinho e consultar um especialista antes.
> Domínio sugerido: clubinhodoreino.com.br (conferir no registro.br).

Regra combinada com o dono: o que custa dinheiro fica para depois. Fazemos primeiro o que é de graça.

## 1. Novos filmes e jogos (pausado: o dono achou a quantidade boa por enquanto)
Para cada filme: roteiro e fases aprovados pelo dono → cenas → vozes → jogo com 3 fases diferentes → teste → publicar.

### Novo Testamento
- [x] **A Ovelha Perdida** (Lucas 15:3-7) — publicada
- [x] **Pães e Peixes** (João 6:1-14) — publicado
- [x] **Zaqueu** (Lucas 19:1-10) — publicado
- [x] Abertura em todos os filmes (câmera de longe + musiquinha + nome do lugar) — publicada
- [x] Jogos clássicos atualizados com Ovelha Perdida, Pães e Peixes e Zaqueu (quiz +15 perguntas, memória +3 personagens, caça-palavras +3 listas)
- [ ] Ideias depois: O Bom Samaritano, Jesus e as crianças, O filho que voltou (filho pródigo), A pesca maravilhosa

### Antigo Testamento (depois)
- [ ] Daniel na Cova dos Leões · Moisés e o Mar Aberto · Ester, a Rainha Corajosa (já aparecem como "em breve")

### Jogos que ainda têm 3 fases parecidas
- [ ] Criação, Noé, Davi e Tempestade: trocar por fases com brincadeiras diferentes (como já feito no Jonas e no Natal)
- [ ] Mais fases por jogo e filmes mais longos

## 2. De graça, quando der
- [x] Supabase biblia-play reativado (26/11) e webhook da Kiwify testado: funcionou (registro de teste apagado)
- [ ] Antes de vender: gerar token novo do webhook na Kiwify (o atual apareceu num print) e atualizar o segredo KIWIFY_TOKEN no Supabase
- [ ] Lembrete: o Supabase grátis pausa após ~7 dias sem uso; reativar quando precisar
- [x] Imagem do produto na Kiwify feita com o nome novo (prototipos/kiwify/clubinho-produto-600x500.png)
- [x] Webhook "Lino - Clube MEI 100%" limitado ao produto Club MEI 100% (26/11); não recebe mais vendas do Biblinha
- [ ] (Voxia/Clube MEI, quando voltar a vender) marcar também "Reembolso" e "Chargeback" nesse webhook
- [ ] Pesquisa da marca "Biblinha Play" no INPI

## 3. Quando tiver dinheiro
- [ ] NÃO pagar o pedido 32696872 (biblinhaplay.com.br). Registrar o domínio do nome novo (ex.: clubinhodoreino.com.br) → DNS para o GitHub Pages → página de vendas na Kiwify
- [ ] Na Kiwify: renomear o produto para "Clubinho do Reino" e trocar a imagem (prototipos/kiwify/clubinho-produto-600x500.png); fatura do cartão com até 10 letras (ex.: "CLUBINHO")
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
