# Abertura dos filmes: antes do Capítulo 1, a primeira cena aparece de longe e a câmera
# vai se aproximando (uns 6 segundos), com uma musiquinha e o nome do lugar. Sem fala.
# Uso:  python3 abertura.py criacao "No princípio"   (ou: python3 abertura.py todos)
import os, re, sys
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'filmes')
TITULOS = {'criacao': 'No princípio', 'noe': 'Muito tempo atrás...', 'davi': 'Os campos de Belém', 'jonas': 'A terra de Israel',
           'natal': 'Nazaré', 'tempestade': 'O mar da Galileia', 'ovelha': 'Jesus ensinava o povo', 'paes': 'O mar da Galileia'}

CENA = r'''/* ===== abertura: a primeira cena, vista de longe, com a câmera chegando perto ===== */
const ABERTURA_TITULO=%s;
SC.abertura = t=>{ const prim=SCRIPT.find(l=>!l.intro && l.card==null).sc, cena=SC[prim]; const k=ease(ss(0,6.2,t)); const orig=setCam;
  setCam=(a)=>{ cam.x=a[0]; cam.y=lerp(a[1]-200,a[1],k); cam.z=lerp(a[2]*.5,a[2],k); setCam=()=>{}; };
  try{ cena(0); } finally{ setCam=orig; }
  const al=clamp(t/1.2,0,1)*clamp((6.4-t)/1,0,1); if(al>0){ ctx.save(); ctx.setTransform(K,0,0,K,(cv.width-W*K)/2,0); ctx.globalAlpha=al; ctx.font='800 52px "Baloo 2", Nunito, sans-serif'; ctx.textAlign='center'; ctx.lineWidth=8; ctx.strokeStyle='rgba(43,58,85,.55)'; ctx.fillStyle='#fffdf6'; ctx.strokeText(ABERTURA_TITULO,W/2,H*.3); ctx.fillText(ABERTURA_TITULO,W/2,H*.3); ctx.restore(); }
};
'''
ENTRA = """  if(l.intro){ $('chapter').classList.remove('on'); subEl.classList.remove('on'); $('summary').hidden=true; TALK=null; words=[]; $('top').textContent='Biblinha Play';
    [[72,0],[76,.35],[79,.7],[84,1.05],[81,1.6],[79,1.95],[76,2.3],[79,2.65],[84,3.3],[88,3.7]].forEach(([n,d])=>pluck(n,.07,d)); return; }
"""

def aplicar(nome, titulo=None):
    p = os.path.join(F, nome + '.html'); s = open(p, encoding='utf-8').read()
    if "{intro:true" in s:
        print(nome, ': já tem abertura'); return
    titulo = titulo or TITULOS[nome]
    def R(a, b):
        nonlocal s
        assert s.count(a) == 1, (nome, s.count(a), a[:60]); s = s.replace(a, b)
    R("  {card:0},", "  {intro:true, sc:'abertura', who:'', text:'', dur:6.6},\n  {card:0},")
    # as partes abaixo podem já ter vindo do filme-base (ex.: natal.html): só aplica o que falta
    if "if(l.intro){ l.rec=null; }" not in s:
        R("SCRIPT.forEach(l=>{ if(l.card==null){ vi++;", "SCRIPT.forEach(l=>{ if(l.intro){ l.rec=null; } else if(l.card==null){ vi++;")
    if "if(l.intro){ $('chapter')" not in s:
        R("  $('chapter').classList.toggle('on', l.card!=null);", ENTRA + "  $('chapter').classList.toggle('on', l.card!=null);")
    if "if(l.intro) return 6.6;" not in s and "function lineDur(l){" in s:
        s = s.replace("function lineDur(l){", "function lineDur(l){ if(l.intro) return 6.6;", 1)
    if "const ABERTURA_TITULO=" in s:
        s = re.sub(r"const ABERTURA_TITULO=.*?;\n", lambda m: "const ABERTURA_TITULO=%s;\n" % repr(titulo), s, count=1)
    else:
        R("/* ================= ROTEIRO", CENA % repr(titulo) + "/* ================= ROTEIRO")
    open(p, 'w', encoding='utf-8').write(s); print(nome, ': abertura "%s"' % titulo)

if __name__ == '__main__':
    if sys.argv[1] == 'todos':
        for n in TITULOS: aplicar(n)
    else:
        aplicar(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
