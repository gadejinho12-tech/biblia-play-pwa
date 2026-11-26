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
- [ ] Nome: o dono pesquisou "Minha biblianha" no INPI (sem resultados). Confirmar a grafia: "Minha Biblinha" (risco alto: BiblinhaPlay e "Biblinha e Turminha" na classe 41), "Minha Biblianha" ou manter "Clubinho do Reino" (livre). Só trocar depois da resposta.
- [ ] Quiz tem 7 perguntas do Daniel, mas o filme ainda é "em breve": deixar ou esconder?
- [ ] assinar.html diz "2 meses grátis" no anual (R$ 119); a conta dá quase 4 meses
- [ ] Pontos bíblicos discutíveis (deixados como estão): magos no estábulo (Mt 2:11 diz "casa"); dono oferecendo o estábulo; "Mestre! Acorda!" dito por Pedro; motivo da fuga de Jonas; Davi "espanta" o leão; Pães cita detalhes de Marcos/Mateus
- [ ] Tempestade fase 3: a voz não diz para tocar nas poças
- Atenção: os build_*.py antigos (criacao, noe, davi, jonas, natal, tempestade, jogos) não funcionam mais; o HTML em filmes/ é a fonte de verdade. Ovelha, Pães e Zaqueu ainda são gerados pelos build_*.py (fontes sincronizadas).

## 2. De graça, quando der
- [x] Supabase biblia-play reativado (26/11) e webhook da Kiwify testado: funcionou (registro de teste apagado)
- [ ] Antes de vender: gerar token novo do webhook na Kiwify (o atual apareceu num print) e atualizar o segredo KIWIFY_TOKEN no Supabase
- [ ] Lembrete: o Supabase grátis pausa após ~7 dias sem uso; reativar quando precisar
- [x] Imagem do produto na Kiwify feita com o nome novo (prototipos/kiwify/clubinho-produto-600x500.png)
- [x] Webhook "Lino - Clube MEI 100%" limitado ao produto Club MEI 100% (26/11); não recebe mais vendas do Biblinha
- [ ] (Voxia/Clube MEI, quando voltar a vender) marcar também "Reembolso" e "Chargeback" nesse webhook

## 3. Quando tiver dinheiro
- [ ] NÃO pagar o pedido 32696872 (biblinhaplay.com.br). Registrar o domínio do nome novo (ex.: clubinhodoreino.com.br) → DNS para o GitHub Pages → página de vendas na Kiwify
- [ ] Na Kiwify: renomear o produto para "Clubinho do Reino" e trocar a imagem (prototipos/kiwify/clubinho-produto-600x500.png); fatura do cartão com até 10 letras (ex.: "CLUBINHO")
- [ ] Ligar o login no site (ramo `assinatura-supabase`: conta-config.js com Supabase + links da Kiwify)
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
