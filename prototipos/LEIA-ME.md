# Protótipos

Arquivos independentes (abra direto no navegador). Ainda não fazem parte do jogo publicado.

- `filme-davi.html` — filme "Davi e Golias" + jogo de recompensa "A Funda de Davi".
- `filme-noe.html` — **filme piloto** "Noé e a Arca" no estilo livro ilustrado (4 capítulos, narração, resumo final).
- `cinema-davi-golias.html` — fase cinema 3D de Davi e Golias (precisa de internet para carregar o 3D).
- `cinema-pomba.html` — fase cinema 3D "A Pomba e o Ramo de Oliveira" (precisa de internet).
- `aventura-corrida-arca.html` — protótipo de jogabilidade de aventura (correr e pular) com os 2 estilos de gráfico.

As vozes gravadas usadas nos filmes vêm do próprio `index.html` do jogo.

## Como os filmes são feitos

- Estilo único (livro ilustrado), mesmo motor para todas as histórias: `fontes/filme-noe.src.html`.
- Cada história nova troca só elenco, cenas, roteiro, trilha e jogo (ex.: `fontes/davi_parts.js` + `fontes/build_davi.py`).
- Vozes: Kokoro (licença Apache 2.0, uso comercial permitido), elenco fixo em `fontes/gerar_vozes.py`
  (narradora = `pf_dora`; Noé = `pm_santa`; Deus, Davi, Saul = `pm_alex` com tom ajustado; Golias = `pm_santa` grave com eco).
- As falas de cada filme estão em `fontes/falas_*.json`.
