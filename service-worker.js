const CACHE_NAME = "firstpwa";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/favicon.ico",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/gallery.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/icon/icon-72x72.png",
    "/icon/icon-96x96.png",
    "/icon/icon-128x128.png",
    "/icon/icon-144x144.png",
    "/icon/icon-192x192.png",
    "/icon/icon-256x256.png",
    "/icon/icon-384x384.png",
    "/icon/icon-512x512.png",
    "img/1-1000x700.jpg",
    "img/2-1000x700.jpg",
    "img/3-1000x700.jpg",
    "img/4-1000x700.jpg",
    "img/5-1000x700.jpg",
    "img/6-1000x700.jpg",
    "img/bg.jpg",
    "img/profile.jpeg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});


self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});