const CACHE_NAME = "prop-lot-size-shell-v2";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS.map(p => new URL(p, self.registration.scope).href))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("prop-lot-size-") && k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith(caches.match(req, {ignoreSearch:true}).then(cached => cached || fetch(req).then(res => {
    if (res && res.ok) { const copy=res.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)); }
    return res;
  }).catch(() => req.mode === "navigate" ? caches.match(new URL("./index.html",self.registration.scope).href) : Response.error())));
});