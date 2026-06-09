// ================================================================
// sw.js — Service Worker for PWA
// ================================================================

const CACHE_NAME = 'qr-gen-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './i18n.js',
  './manifest.json',
  './favicon.svg',
  'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (!resp || resp.status !== 200 || resp.type === 'opaque') return resp;
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
