// Naraverse Service Worker — Push Notifications
self.addEventListener('push', function(e) {
  var data = {};
  try { data = e.data.json(); } catch(err) { data = { title: 'Naraverse', body: e.data ? e.data.text() : 'Ada konten baru!' }; }
  var options = {
    body: data.body || 'Ada konten baru di Naraverse!',
    icon: '/image-1.png',
    badge: '/image-1.png',
    image: data.image || '',
    data: { url: data.url || '/' },
    actions: [{ action: 'open', title: 'Lihat Sekarang' }],
    vibrate: [200, 100, 200],
    requireInteraction: false
  };
  e.waitUntil(self.registration.showNotification(data.title || '🎬 Naraverse — Konten Baru!', options));
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) ? e.notification.data.url : '/';
  e.waitUntil(clients.matchAll({ type: 'window' }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      if (clientList[i].url === url && 'focus' in clientList[i]) return clientList[i].focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});

self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(clients.claim()); });
