/**
 * ==============================================================================
 * Ecos de Soberanía - Service Worker (Offline-First PWA)
 * Diseñado para la Feria de Ingeniería de Sistemas - UNI
 * ==============================================================================
 * Estrategia de Caching:
 * 1. App Shell (HTML, CSS, JS, Assets locales) -> Cache-First con fallback a red.
 * 2. Recursos externos (Imágenes de Wikimedia, Google Fonts) -> Cache-First con Runtime Caching.
 * 3. Garantiza funcionamiento 100% offline durante la feria en el stand.
 */

const CACHE_VERSION = 'ecos-soberania-v1.0.0';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

// Recursos esenciales que forman el App Shell
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/animations.css',
  './js/main.js',
  './js/data.js',
  './js/quiz.js',
  './js/touch-gallery.js',
  './js/leaderboard.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

// Orígenes externos permitidos para runtime caching (Wikimedia, Google Fonts, CDNs)
const EXTERNAL_ORIGINS = [
  'upload.wikimedia.org',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

/**
 * Evento Install: Pre-cacheo del App Shell esencial
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Pre-cacheando App Shell...');
        // Usamos addAll con manejo de errores individuales para no abortar si falta un icono
        return Promise.allSettled(
          APP_SHELL.map((url) =>
            cache.add(url).catch((err) => {
              console.warn(`[Service Worker] No se pudo pre-cachear: ${url}`, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

/**
 * Evento Activate: Limpieza de cachés antiguas al actualizar versión
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
            console.log(`[Service Worker] Eliminando caché obsoleta: ${key}`);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/**
 * Evento Fetch: Estrategia Cache-First con Runtime Caching
 */
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean GET (como analíticas o POST)
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // 1. Verificamos si es recurso local o de orígenes autorizados (Wikimedia, Fonts)
  const isLocalRequest = requestUrl.origin === self.location.origin;
  const isExternalAllowed = EXTERNAL_ORIGINS.some(origin => requestUrl.hostname.includes(origin));

  if (!isLocalRequest && !isExternalAllowed) {
    return; // Dejar pasar peticiones no controladas
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Encontrado en caché: retorno inmediato (Ultra rápido y offline-ready)
        return cachedResponse;
      }

      // Si no está en caché, buscar en red y guardar en Runtime Cache
      return fetch(event.request)
        .then((networkResponse) => {
          // Validar respuesta válida (status 200 o tipo 'opaque' para recursos CORS no-cors)
          if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch((error) => {
          console.warn('[Service Worker] Fallo de red y recurso no disponible en caché:', event.request.url, error);
          
          // Si es navegación HTML, retornar la página principal cacheada
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }

          return new Response('Recurso no disponible offline.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        });
    })
  );
});
