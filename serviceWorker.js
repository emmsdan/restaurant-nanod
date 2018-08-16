/*
  * author @emmsdan
  * for @alc 3.0
  * date @2018-june
*/

const cacheVersion = '3.0';
const cacheName = 'emmsdan-restaurant.io';
const cachNameVersion= `${cacheName}-static-${cacheVersion}`;
/* add most basic files to be cached */
const staticCache = [
  './',
  './css/styles.css',
  './data/restaurants.json',
  './img/icon.png',
  './js/dbhelper.js',
  './js/main.js',
  './js/toast.js',
  './js/restaurant_info.js',
  './js/sw-registration.js',
  './restaurant.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    //add cache to system
    caches.open(cachNameVersion)
    .then((cache) => {
      cache.addAll(staticCache);
    })
  );
});

/* removes old cached files and update it to the latest version */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then( (keys) => {
        return Promise.all(keys.map((key, i) => {
          if(key !== cachNameVersion){
            return caches.delete(keys[i]);
          }
      }))
    })
  )
});

/*
  let handles all request made by the browser.
*/
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true})
    .then((response) => {
      return response || fetch(event.request).then((res) => {
        if(!res || res.status !== 200 || res.type !== 'basic'){
          return res;
        }
        let response = res.clone();
        caches.open(cachNameVersion)
        .then((cache) => {
          cache.put(event.request, response);
        });
        return res;
      }).catch ((error)=> {
        return error;
      })
    })
    .catch((err) => {
      console.log(err, event.request)
      return caches.match('index.html');
    })
  );
});

self.addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});

self.addEventListener('controllerchange', () => {
    window.location.assign('./');
});
