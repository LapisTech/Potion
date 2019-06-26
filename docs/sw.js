const VERSION = location.search + '';
const CACHE_KEY = 'potion.lapis.tech-v' + VERSION;
const CACHE_FILES = [
    './index.html',
    './app.js',
    './favicon.ico',
].map((url) => { return url + VERSION; });
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_KEY).then((cache) => {
        return cache.addAll(CACHE_FILES);
    }));
});
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys.filter((key) => { return key !== CACHE_KEY; }).map((key) => {
            return caches.delete(key);
        }));
    }));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    }));
});
