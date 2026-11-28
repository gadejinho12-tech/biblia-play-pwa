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

## Pente fino (26/11) — feito e publicado
- Todas as 27 fases dos 9 jogos e os 3 jogos clássicos testados com toque de verdade em 6 telas (celular deitado/em pé, tablet deitado/em pé, computador, Android pequeno): todos chegam ao fim
- Corrigido: Natal fase 2 (arbustos fora da tela), arrastar com o dedo (Criação, Natal, Tempestade, Davi), Noé com um dedo só, pedras e Golias fora da tela no tablet, ondas fora da tela, Pães e Ovelha com itens fora da tela, caça-palavras/memória/quiz sem rolar, botões de 44px, legenda dos filmes no alto no celular deitado, título da abertura cortado, abertura do Zaqueu dizia "Nazaré"
- Testes guardados em prototipos/pente-fino/

### Decisões do dono (pendentes)
- [x] Nome: o dono decidiu manter **Clubinho do Reino** (26/11)
- [x] Quiz do Daniel: fica como está até o filme ficar pronto
- [x] Plano anual passa a ser R$ 149,90 (R$ 12,49 por mês; 12 × 14,90 = 178,80 → economia de R$ 28,90 ≈ 2 meses grátis). Falta o dono mudar o preço na Kiwify.
- [x] Pontos bíblicos discutíveis: o dono decidiu deixar como estão: magos no estábulo (Mt 2:11 diz "casa"); dono oferecendo o estábulo; "Mestre! Acorda!" dito por Pedro; motivo da fuga de Jonas; Davi "espanta" o leão; Pães cita detalhes de Marcos/Mateus
- [x] Tempestade fase 3: o dono decidiu não gravar fala nova
- Atenção: os build_*.py antigos (criacao, noe, davi, jonas, natal, tempestade, jogos) não funcionam mais; o HTML em filmes/ é a fonte de verdade. Ovelha, Pães e Zaqueu ainda são gerados pelos build_*.py (fontes sincronizadas).

## Você sabia? (26/11)
- [x] 10 curiosidades com a voz da narradora (filmes/curiosidades.js + filmes/audio/curiosidades/). 27/11: o dono pediu para TIRAR do app por enquanto (arquivos guardados); o "Você sabia?" fica só nas redes sociais (vídeos da Lili)
- [ ] Ir acrescentando mais (meta: várias por história); gravar com prototipos/fontes/gravar_curiosidades.py
- [ ] Isca grátis: ao ligar o login, deixar 1 filme liberado (hoje conta-config GRATIS tem criacao e noe; o dono falou em 1 filme — confirmar qual) + curiosidades abertas para todos

- [x] Filme Rute e Boaz + jogo O Campo de Boaz (27/11)

## 2. De graça, quando der
- [x] Supabase biblia-play reativado (26/11) e webhook da Kiwify testado: funcionou (registro de teste apagado)
- [ ] Antes de vender: gerar token novo do webhook na Kiwify (o atual apareceu num print) e atualizar o segredo KIWIFY_TOKEN no Supabase
- [ ] Lembrete: o Supabase grátis pausa após ~7 dias sem uso; reativar quando precisar
- [x] Imagem do produto na Kiwify feita com o nome novo (prototipos/kiwify/clubinho-produto-600x500.png)
- [x] Webhook "Lino - Clube MEI 100%" limitado ao produto Club MEI 100% (26/11); não recebe mais vendas do Biblinha
- [ ] (Voxia/Clube MEI, quando voltar a vender) marcar também "Reembolso" e "Chargeback" nesse webhook

## 3. Quando tiver dinheiro
- [ ] NÃO pagar o pedido 32696872 (biblinhaplay.com.br) — o nome agora é Clubinho do Reino. Registrar o domínio do nome novo (ex.: clubinhodoreino.com.br) → DNS para o GitHub Pages → página de vendas na Kiwify
- [x] Kiwify (26/11, feito pelo dono via Cowork): produto e produtor "Clubinho do Reino", fatura KIWIFY*CLUBINHO, imagem nova, descrição nova, suporte bennetfour@gmail.com
- [x] Plano anual NOVO R$ 149,90 → https://pay.kiwify.com.br/5AaelZx (até 12x). Mensal R$ 14,90 → https://pay.kiwify.com.br/vMYkAzH (igual). O anual antigo de R$ 119 (jBVV1nl) virou "Anual antigo" com o link desativado (não excluído)
- [ ] Página de vendas da Kiwify aponta para o endereço provisório do GitHub Pages: trocar quando o domínio estiver no ar
- [x] Login ligado (28/11): Supabase + links da Kiwify em filmes/conta-config.js; grátis só A Criação. Testado pelo dono (código por e-mail + assinatura de teste, já apagada)
- [x] SMTP trocado para clubinhodoreinoofc@gmail.com (senha de app nova, 27/11). Futuro: serviço transacional (Resend/Brevo) quando o volume crescer
- [ ] Compra real do plano mensal → entrar com o e-mail da compra → reembolso em 7 dias
- [ ] (Opcional) ElevenLabs para vozes ainda mais naturais (a chave precisa ir no cabeçalho `xi-api-key`)

## Já feito
- Pente fino em todos os filmes e jogos (26/11)
- Identidade visual (Lili, cores de dia ensolarado, ícone), publicada
- Vozes novas em todos os filmes e jogos (Francisca, Brian, Antônio; Deus e Golias com efeito), volume igualado
- Jonas e Natal com 3 fases diferentes; aviso para deitar o celular; faixa 3 a 7 anos
- Correções bíblicas (Criação, Noé, Davi, Jonas)
- Gamaliel protegido contra avisos da Kiwify de outros produtos
- Supabase biblia-play configurado (tabela, função kiwify-webhook, e-mail com código via Gmail)

## Como regravar vozes
`cd prototipos/fontes && SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 regravar_filme.py <filme>`
(precisa de edge-tts e do site speech.platform.bing.com liberado na rede)

## Webhook e planos (conferido 26/11)
- A função kiwify-webhook descobre mensal/anual pela frequência da assinatura (não pelo nome, código ou preço do plano), então o plano anual novo funciona sem mudar nada.
- Webhooks "Gamaliel Mensal" e "Lino - Clube MEI 100%" na Kiwify: o Gamaliel ignora produtos que não são dele (filtro PRODUTOS_GAMALIEL, já publicado). O do Clube MEI foi limitado ao produto Club MEI 100% em 26/11; conferir se ficou salvo (o relatório do Cowork diz "Todos que sou produtor").
