var cacheName = 'siteCaches-v1';
var arrayOfCaches =  ["/",
"/index.html",
"/restaurant.html",
"/css/styles.css",
"/js/register.js",
"/js/main.js",
"/js/dbhelper.js",
"img/1.jpg",
"img/2.jpg",
"img/3.jpg",
"img/4.jpg",
"img/5.jpg",
"img/6.jpg",
"img/7.jpg",
"img/8.jpg",
"img/9.jpg",
"img/10.jpg",
"/js/restaurant_info.js"];

// cach all the static files that make up the restaurant review app in the intall event of the service worker 
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(cacheName).then(function(cache) {
        return cache.addAll(arrayOfCaches)
        .catch(function() { 
          console.log('cache failed!');
        });
    }));
});

// remove the old cache when service worker is active
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


// respond with an entry from the cache if there is one.
// If there isn't, fetch from the network.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
			return fetch(event.request);
		})
  );
});


