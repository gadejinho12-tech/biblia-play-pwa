// Service Worker do Bíblia Play — cache simples pra funcionar offline depois do primeiro carregamento.
// IMPORTANTE: sempre que publicar uma nova versão do jogo, mude CACHE_VERSION (ex: 'v2', 'v3'...)
// pra forçar os celulares já instalados a baixarem os arquivos novos.
const CACHE_VERSION = 'v3';
const CACHE_NAME = 'biblia-play-' + CACHE_VERSION;

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// cache-first: serve do cache instantâneo (inclusive offline); se não tiver, busca na rede e guarda
// pra próxima. Isso é seguro aqui porque o jogo inteiro é um arquivo único sem chamadas de API.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
