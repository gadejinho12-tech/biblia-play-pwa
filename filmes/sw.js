// Clubinho do Reino Filmes — funciona sem internet depois do primeiro acesso.
// IMPORTANTE: ao publicar uma versão nova, aumente a VERSAO para os aparelhos baixarem tudo de novo.
const VERSAO='filmes-v19';
const ARQUIVOS=[
  './',
  './ajudante.html',
  './arca.html',
  './assinar.html',
  './cacapalavras.html',
  './conta-config.js',
  './tema-biblinha.css',
  './biblinha.js',
  './lili.svg',
  './lili-festa.svg',
  './conta.js',
  './entrar.html',
  './capa-criacao.jpg',
  './capa-davi.jpg',
  './capa-jonas.jpg',
  './capa-natal.jpg',
  './capa-noe.jpg',
  './capa-tempestade.jpg',
  './criacao.html',
  './davi.html',
  './index.html',
  './jonas.html',
  './marca.html',
  './memoria.html',
  './natal.html',
  './noe.html',
  './ovelha.html',
  './paes.html',
  './pais.html',
  './quiz.html',
  './tempestade.html',
  './zaqueu.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/icon-180.png'
];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(ARQUIVOS)).catch(()=>{})); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO).map(k=>caches.delete(k))))); self.clients.claim(); });
// Páginas (filmes e jogos): busca a versão mais nova na internet; sem internet, usa a cópia guardada.
// Imagens e ícones: usa a cópia guardada (mais rápido).
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  const save=r=>{ if(r && (r.ok||r.type==='opaque')){ const cp=r.clone(); caches.open(VERSAO).then(c=>c.put(e.request,cp)); } return r; };
  const page=e.request.mode==='navigate' || /\.(html|js|json)$|\/$/.test(new URL(e.request.url).pathname);
  if(page){ e.respondWith(fetch(e.request,{cache:'no-cache'}).then(save).catch(()=>caches.match(e.request,{ignoreSearch:true}))); return; }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(save))); });
