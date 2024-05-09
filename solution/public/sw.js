const CACHE_NAME = 'PlantApp';

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
    console.log('Service Worker: Installing....');
    event.waitUntil((async () => {

        console.log('Service Worker: Caching App Shell at the moment......');
        try {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll([
                '/',
                '/stylesheets/style.css',
                '/addPlant'
            ]);
        }
        catch{
            console.log("error occured while caching...")
        }

    })());
});

//clear cache on reload
self.addEventListener('activate', event => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            // Use Promise.all to ensure all promises returned by the map are awaited
            return Promise.all(keys.map(async (cache) => {
                if (cache !== CACHE_NAME) {
                    console.log('Service Worker: Removing old cache:', cache);
                    return caches.delete(cache);
                }
            }));
        })()
    );
    self.clients.claim();
});


// Fetch event to handle network requests and update cache dynamically
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            // If the fetch succeeds, clone the response and store it in the cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, responseToCache);
            });
            return response;
        }).catch(function() {
            // If the network is unavailable, attempt to fulfill the request from the cache
            return caches.match(event.request)
                .then(function(response) {
                    if (response) {
                        return response;
                    }
                    // Optionally handle the case when the response is not in the cache
                    // and the network is unavailable. Return a default fallback or a custom error message
                    console.log('Service Worker: Fetching failed; no network and no cache:', event.request.url);
                    // Return a default fallback (if any)
                });
        })
    );
});