// Mendix Trainer - Service Worker (PWA + Notifications)
const CACHE_NAME = 'mendix-trainer-v2.0.1';

// Determine base path dynamically (works on GitHub Pages subpaths)
const BASE = self.location.pathname.replace(/sw\.js$/, '');

const ASSET_NAMES = [
    'index.html',
    'tailwind.min.css',
    'style.css',
    'app.js',
    'questions-intermediate.js',
    'questions-advanced.js',
    'manifest.json',
    'icon-192.svg',
    'icon-512.svg',
    'icon-180.png',
    'icon-192.png',
    'icon-512.png',
];

const ASSETS = [BASE, ...ASSET_NAMES.map(a => BASE + a)];

// Install: cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                if (response.status === 200 && event.request.method === 'GET') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                }
                return response;
            });
        }).catch(() => {
            if (event.request.mode === 'navigate') {
                return caches.match(BASE + 'index.html');
            }
        })
    );
});

// Notification click: open or focus the app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
            for (const client of clients) {
                if ('focus' in client) {
                    return client.focus();
                }
            }
            return self.clients.openWindow(BASE);
        })
    );
});

// Listen for messages from app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: BASE + 'icon-192.svg',
            badge: BASE + 'icon-192.svg',
            tag: 'mendix-daily-reminder',
            renotify: true,
        });
    }
});
