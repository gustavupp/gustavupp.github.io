self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('static').then((cache) => {
      return cache.addAll(['./', '/style.css'])
    })
  )
})

// self.addEventListener('fetch', (e) => {
//   console.log(`intercepting fetch request for: ${e.request.url}`)
// })
