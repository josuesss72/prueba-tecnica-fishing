self.addEventListener('install', (event) => {
	self.skipWaiting();
	event.waitUntil(
		caches.open('v1').then((cache) => {
			return cache.addAll([
				'/',
				'/index.html',
				'/manifest.webmanifest',
				'/manifest.json'
			]);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});