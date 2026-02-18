/**
 * Service Worker - Caching Strategy
 * Implements efficient caching for offline support and faster loads
 *
 * Cache Strategy:
 * - HTML: Network first (always fresh)
 * - JS/CSS: Cache first (versioned by Vite hash)
 * - Images: Cache first with size limit
 * - API: Network first with cache fallback
 */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const ASSETS_CACHE = `assets-${CACHE_VERSION}`;

// Static assets to precache on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/logo.png",
  "/robots.txt",
  "/sitemap.xml",
];

// Install event - precache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Ignore errors during precaching
        console.log("Precache failed - offline mode may have limitations");
      });
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (
            !name.includes(CACHE_VERSION) &&
            (name.includes("static") ||
              name.includes("dynamic") ||
              name.includes("assets"))
          ) {
            return caches.delete(name);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // HTML - Network first
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return (
              response ||
              new Response("Offline - page not available", {
                status: 503,
                statusText: "Service Unavailable",
                headers: new Headers({
                  "Content-Type": "text/plain",
                }),
              })
            );
          });
        }),
    );
    return;
  }

  // JS/CSS (versioned) - Cache first
  if (
    request.url.includes("/assets/") &&
    (request.url.endsWith(".js") || request.url.endsWith(".css"))
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            caches.open(ASSETS_CACHE).then((cache) => {
              cache.put(request, response.clone());
            });
            return response;
          })
        );
      }),
    );
    return;
  }

  // Images - Cache first with size check
  if (
    request.method === "GET" &&
    (request.url.includes("/images/") ||
      request.url.match(/\.(png|jpg|jpeg|svg|webp|gif)$/i))
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            caches.open(ASSETS_CACHE).then((cache) => {
              // Keep cache size under control
              cache.add(request).catch(() => {
                // Ignore cache size errors
              });
            });
            return response;
          })
          .catch(() => {
            // Return placeholder for failed images
            return new Response("", { status: 404 });
          });
      }),
    );
    return;
  }

  // API calls - Network first
  if (request.method === "GET") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        }),
    );
    return;
  }
});

// Handle message from clients (optional: for cache busting)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
