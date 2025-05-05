const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).catch((err) => {
        console.error('Fetch failed:', event.request.url, err);
        return new Response('Offline or resource not found', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      });
    })
  );
});