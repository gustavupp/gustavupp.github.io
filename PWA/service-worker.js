importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js'
)

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
)

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('static').then((cache) => {
      return cache.addAll(['./index.html', 'style.css'])
    })
  )
})

self.addEventListener('fetch', (e) => {
  console.log(`intercepting fetch request for: ${e.request.url}`)
})
