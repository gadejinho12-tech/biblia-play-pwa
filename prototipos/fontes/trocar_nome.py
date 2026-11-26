# Troca o nome do site em todas as telas, títulos, nome do app e página da marca.
# Uso:  python3 trocar_nome.py "Amiguinhos de Deus" "Ovelhinhas TV" "Ovelhinhas" "TV" "Ovelhinhas"
#        (nome antigo, nome novo, parte 1 do logo, parte 2 do logo (laranja), nome curto do app)
import glob, json, os, sys
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'filmes')

def trocar(antigo, novo, p1, p2, curto):
    a1, a2 = antigo.split(' ', 1) if ' ' in antigo else (antigo, '')
    logo_velho = '%s <b>%s</b>' % (a1, a2)
    logo_novo = '%s <b>%s</b>' % (p1, p2) if p2 else p1
    n = 0
    for f in glob.glob(os.path.join(F, '*.html')) + glob.glob(os.path.join(F, '*.js')) + glob.glob(os.path.join(F, '*.css')):
        s = open(f, encoding='utf-8').read(); o = s
        s = s.replace(logo_velho, logo_novo).replace(antigo, novo).replace(antigo.upper(), novo.upper())
        if s != o: open(f, 'w', encoding='utf-8').write(s); n += 1
    m = json.load(open(os.path.join(F, 'manifest.json'), encoding='utf-8'))
    m['name'] = novo + ' — Histórias da Bíblia'; m['short_name'] = curto
    json.dump(m, open(os.path.join(F, 'manifest.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print('arquivos alterados:', n, '| nome do app:', curto)

if __name__ == '__main__':
    trocar(*sys.argv[1:6])
