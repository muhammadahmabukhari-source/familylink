// FamilyLink Service Worker v2 - Push Notifications + Offline
const CACHE_NAME = 'familylink-v2';
const OFFLINE_FILES = ['./'];

// Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  clients.claim();
});

// Fetch - network first, cache fallback
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Push notification handler
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'FamilyLink Alert';
  const options = {
    body: data.body || 'You have a new notification',
    icon: './icon.png',
    badge: './icon.png',
    vibrate: [200, 100, 200, 100, 200],
    data: { url: data.url || './' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('familylink') && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});

// Background sync for offline SOS
self.addEventListener('sync', e => {
  if (e.tag === 'sos-sync') {
    e.waitUntil(syncPendingSOS());
  }
});

async function syncPendingSOS() {
  // Sync any pending SOS that failed while offline
  console.log('Syncing pending SOS alerts...');
}
