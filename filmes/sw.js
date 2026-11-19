// Bíblia Play Filmes — funciona sem internet depois do primeiro acesso.
// IMPORTANTE: ao publicar uma versão nova, aumente a VERSAO para os aparelhos baixarem tudo de novo.
const VERSAO='filmes-v3';
const ARQUIVOS=[
  './',
  './ajudante.html',
  './arca.html',
  './cacapalavras.html',
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
  './memoria.html',
  './natal.html',
  './noe.html',
  './pais.html',
  './quiz.html',
  './tempestade.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(ARQUIVOS)).catch(()=>{})); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{ if(r && (r.ok||r.type==='opaque')){ const cp=r.clone(); caches.open(VERSAO).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>hit))); });
