/*
  * author @emmsdan
  * for @alc 3.0
  * date @2018-june
*/

const cacheVersion = '3.0';
const cacheName = 's.io';
const cachNameVersion= `${cacheName}-static-${cacheVersion}`;
const cachNameVersion2= `${cacheName}-app-${cacheVersion}`;
/* add most basic files to be cached */
const staticCache = [
  './css/styles.css',
  './data/restaurants.json',
  './img/icon.png',
  './img/',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './index.html',
  './restaurant.html'
];
/* other files to be cached */
const cachableFiles = [
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCgCqcp1c2SNctmhwveXIhAr-QwrU1295U&libraries=places&callback=initMap'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    //add cache to system
    caches.open(cachNameVersion)
    .then((cache) => {
        cache.addAll(staticCache);
        //add cache to system
        caches.open(cachNameVersion2)
        .then((cache) => {
          try {
            cache.addAll(cachableFiles)
          }catch (e) {
            return 'Could not Access Server';
          }
        })

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
  handles all request made by the browser.
*/
self.addEventListener('fetch', (event) => {
  let url = event.request.clone();
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {

    event.respondWith(
      fetch(event.request).catch(error => {
        console.log('Oops, You are offline, Currently');
        return caches.match('index.html');
      })
    );

  }else{
    event.respondWith(
      caches.match(event.request)
      .then((res) => {
        if(res){
          return res;
        }
        return fetch(url).then((res) => {
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
    )
  }
});

self.addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});

self.addEventListener('controllerchange', () => {
    window.location.assign('./');
})
