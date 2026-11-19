import pathlib, base64, json, os
J=pathlib.Path('jogos'); A=pathlib.Path('kokoro/classicos')
css=(J/'common.css').read_text(); arte=(J/'arte.js').read_text(); common=(J/'common.js').read_text()
HEAD='<!doctype html>\n<html lang="pt-BR">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
H='<div class="bp-hello" hidden><img alt=""><span></span></div>'
HELLO=(J/'hello.html').read_text()
def rec(keys): return json.dumps({k:'data:audio/mpeg;base64,'+base64.b64encode((A/(k+'.mp3')).read_bytes()).decode() for k in keys})
names=['noe','davi','golias','jonas','jesus','pedro','adao','eva','saul','maria','jose','anjo','ovelha','leao','elefante','girafa','pomba','coelho','arca']
pages={'memoria':['mi','mf']+['m_'+n for n in names], 'cacapalavras':['ci','ca','cf'], 'quiz':['qi','qa','qb','qf']+[f'q{i:02d}' for i in range(1,55)]}
for name,keys in pages.items():
    s=(J/(name+'.src.html')).read_text().replace('%%EXTRA%%',pathlib.Path('quiz_novas.json').read_text()).replace('%%CSS%%',css).replace('%%ARTE%%',arte).replace('%%COMMON%%',common).replace('%%REC%%',rec(keys)).replace('<div class="overlay" id="win" hidden><div class="page">','<div class="overlay" id="win" hidden><div class="page">'+H)+'\n'+HELLO
    pathlib.Path('shelf/'+name+'.html').write_text(HEAD+s)
    print(name, os.path.getsize('shelf/'+name+'.html'))

s=(J/'pais.src.html').read_text().replace('%%CSS%%',css).replace('%%COMMONLITE%%',"const $ = id => document.getElementById(id);")
pathlib.Path('shelf/pais.html').write_text(HEAD+s); print('pais', os.path.getsize('shelf/pais.html'))

s=(J/'ajudante.src.html').read_text().replace('%%CSS%%',css).replace('%%ARTE%%',arte).replace('%%COMMON%%',common)
pathlib.Path('shelf/ajudante.html').write_text(HEAD+s); print('ajudante', os.path.getsize('shelf/ajudante.html'))
