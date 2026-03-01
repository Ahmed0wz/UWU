// ============================================
// SERVICE WORKER — Calendar PWA
// ============================================

const CACHE_NAME = 'calendar-v7';
const BASE = 'https://ahmed0wz.github.io/UWU/';

const APP_SHELL = [
    BASE + 'index.html',
    BASE + 'app.js',
    BASE + 'styles.css',
    BASE + 'manifest.json',
    BASE + 'icon.png'
];

const CACHEABLE_ORIGINS = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

    // Prayer times API — network only
    if (url.hostname.includes('aladhan.com')) {
        event.respondWith(
            fetch(request).catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } }))
        );
        return;
    }

    // App shell — cache first
    if (request.url.startsWith(BASE)) {
        event.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;
                return fetch(request).then(response => {
                    if (response.ok) {
                        caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
                    }
                    return response;
                });
            })
        );
        return;
    }

    // External assets — stale while revalidate
    if (CACHEABLE_ORIGINS.some(o => request.url.startsWith(o))) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache =>
                cache.match(request).then(cached => {
                    const networkFetch = fetch(request).then(response => {
                        if (response.ok) cache.put(request, response.clone());
                        return response;
                    }).catch(() => cached);
                    return cached || networkFetch;
                })
            )
        );
    }
});
