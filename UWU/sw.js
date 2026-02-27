// ============================================
// SERVICE WORKER — Calendar PWA
// Caches core app files for offline use.
// Network-first for external APIs, cache-first for app shell.
// ============================================

const CACHE_NAME = 'calendar-v1';
const APP_SHELL = [
    './Calendar.html',
    './app.js',
    './styles.css',
    './manifest.json',
    './icon.png'
];

// External origins we'll try to cache on the fly
const CACHEABLE_ORIGINS = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.tailwindcss.com'
];

// ── Install: pre-cache the app shell ─────────────────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

// ── Activate: remove old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// ── Fetch strategy ────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Always skip non-GET and browser-extension requests
    if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

    // Prayer times API — network only (real-time data, no caching)
    if (url.hostname.includes('aladhan.com')) {
        event.respondWith(fetch(request).catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } })));
        return;
    }

    // App shell files — cache-first
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;
                return fetch(request).then(response => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    }
                    return response;
                });
            })
        );
        return;
    }

    // External cacheable assets (fonts, Tailwind) — stale-while-revalidate
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
