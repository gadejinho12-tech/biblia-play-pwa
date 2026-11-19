import pathlib, base64, json, os
J=pathlib.Path('jogos'); A=pathlib.Path('kokoro/classicos')
css=(J/'common.css').read_text(); arte=(J/'arte.js').read_text(); common=(J/'common.js').read_text()
HEAD='<!doctype html>\n<html lang="pt-BR">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
CONTA='<script src="conta-config.js"></script><script src="conta.js"></script>\n'
H='<div class="bp-hello" hidden><img alt=""><span></span></div>'
HELLO=(J/'hello.html').read_text()
def rec(keys): return json.dumps({k:'data:audio/mpeg;base64,'+base64.b64encode((A/(k+'.mp3')).read_bytes()).decode() for k in keys})
names=['noe','davi','golias','jonas','jesus','pedro','adao','eva','saul','maria','jose','anjo','ovelha','leao','elefante','girafa','pomba','coelho','arca']
pages={'memoria':['mi','mf']+['m_'+n for n in names], 'cacapalavras':['ci','ca','cf'], 'quiz':['qi','qa','qb','qf']+[f'q{i:02d}' for i in range(1,55)]}
for name,keys in pages.items():
    s=(J/(name+'.src.html')).read_text().replace('%%EXTRA%%',pathlib.Path('quiz_novas.json').read_text()).replace('%%CSS%%',css).replace('%%ARTE%%',arte).replace('%%COMMON%%',common).replace('%%REC%%',rec(keys)).replace('<div class="overlay" id="win" hidden><div class="page">','<div class="overlay" id="win" hidden><div class="page">'+H)+'\n'+HELLO
    pathlib.Path('shelf/'+name+'.html').write_text(HEAD+CONTA+s)
    print(name, os.path.getsize('shelf/'+name+'.html'))

s=(J/'pais.src.html').read_text().replace('%%CSS%%',css).replace('%%COMMONLITE%%',"const $ = id => document.getElementById(id);")
pathlib.Path('shelf/pais.html').write_text(HEAD+s); print('pais', os.path.getsize('shelf/pais.html'))

s=(J/'ajudante.src.html').read_text().replace('%%CSS%%',css).replace('%%ARTE%%',arte).replace('%%COMMON%%',common)
pathlib.Path('shelf/ajudante.html').write_text(HEAD+CONTA+s); print('ajudante', os.path.getsize('shelf/ajudante.html'))

s=(J/'arca.src.html').read_text().replace('%%CSS%%',css).replace('%%ARTE%%',arte).replace('%%COMMON%%',common)
pathlib.Path('shelf/arca.html').write_text(HEAD+CONTA+HELLO+s); print('arca', os.path.getsize('shelf/arca.html'))

vit=(J/'vitrine.js').read_text()
_c=common; vit=_c[_c.index('const ANIMAIS='):_c.index('// histórias')]+'\n'+vit
s=(J/'estante.src.html').read_text().replace('%%HELLO%%',HELLO).replace('%%ARTE%%',arte).replace('%%VITRINE%%',vit)
pathlib.Path('shelf/index.html').write_text(s); print('estante', os.path.getsize('shelf/index.html'))

s=(J/'marca.src.html').read_text().replace('%%ARTE%%',arte).replace('%%VITRINE%%',vit)
pathlib.Path('shelf/marca.html').write_text(HEAD+CONTA+s); print('marca', os.path.getsize('shelf/marca.html'))

mcss=(J/'marca.css').read_text(); logo=(J/'logo.svg.html').read_text()
for n in ['assinar','entrar']:
    s=(J/(n+'.src.html')).read_text().replace('%%MARCACSS%%',mcss).replace('%%LOGO%%',logo)
    pathlib.Path('shelf/'+n+'.html').write_text(HEAD+s); print(n, os.path.getsize('shelf/'+n+'.html'))
