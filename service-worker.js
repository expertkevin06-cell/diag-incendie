const STATIC_CACHE = 'diag-static-v2';
const DYNAMIC_CACHE = 'diag-dynamic-v2';

const STATIC_ASSETS = ['/', '/index.html', '/css/styles.css', '/js/app.js', '/js/database.js', '/js/gemini-search.js', '/manifest.json', '/images/icon.svg'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(STATIC_CACHE).then(c => c.addAll(STATIC_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k !== STATIC_CACHE && k !== DYNAMIC_CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (event.request.method !== 'GET') return;
    if (url.hostname.includes('generativelanguage.googleapis.com')) { event.respondWith(networkFirst(event.request)); return; }
    if (event.request.destination === 'image') { event.respondWith(cacheFirst(event.request)); return; }
    event.respondWith(networkFirstWithCache(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        if (response.ok || response.type === 'opaque') {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (e) {
        return new Response('', { status: 503, statusText: 'Offline' });
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) { const c = await caches.open(DYNAMIC_CACHE); c.put(request, response.clone()); }
        return response;
    } catch (e) {
        const cached = await caches.match(request);
        return cached || new Response(JSON.stringify({ error: 'offline' }), { status: 503 });
    }
}

async function networkFirstWithCache(request) {
    try {
        const response = await fetch(request);
        if (response.ok) { const c = await caches.open(DYNAMIC_CACHE); c.put(request, response.clone()); }
        return response;
    } catch (e) {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('/index.html');
        return new Response('', { status: 503 });
    }
}
