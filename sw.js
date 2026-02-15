const CACHE_NAME = 'ps-digital-v1';
const assets = [
  './',
  './index.html',
  './PSdigital.png' // Certifique-se que o nome da imagem está correto
];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Faz o app responder mesmo sem internet usando o cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});