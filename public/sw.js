self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
      caches.open('static')
        .then(function (cache) {
          // cache.add('/');
          // cache.add('/index.html');
          // cache.add('/src/js/app.js');
          cache.addAll([
            '/',
            '/index.html',
            '/home.html',
            '/login.html',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css'
          ]);
        })
    );
  });
  
  self.addEventListener('activate', function () {
    console.log('SW Activated');
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          if (res) {
            return res;
          } else {
            return fetch(event.request);
          }
        })
    );
  });