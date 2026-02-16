const CACHE_NAME = 'ps-digital-v2'; // Mudei para v2 para forçar a atualização
const assets = [
  './',
  './index.html',
  './PSdigital.png',
  './manifest.json'
];

// Instalação e Cache
self.addEventListener('install', event => {
  self.skipWaiting(); // Força o SW novo a assumir o controle imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Estratégia: Tenta rede primeiro para chamadas de API, se não, usa cache para arquivos estáticos
self.addEventListener('fetch', event => {
  // Se for uma chamada para a Planilha (Google Scripts), não usa cache
  if (event.request.url.includes('google.com')) {
    return; 
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
