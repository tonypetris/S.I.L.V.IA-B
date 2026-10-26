// S.I.L.V.I.A. + B service worker – offline cache
const CACHE='silvia-b-1.0.0-rc.1-202610261612';
const LOCAL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-512-maskable.png','icons/apple-touch-icon.png'];
const REMOTE=['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;800&display=swap'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);for(const u of LOCAL){try{await c.add(u)}catch(err){}}
  for(const u of REMOTE){try{const r=await fetch(u,{mode:'no-cors'});await c.put(u,r)}catch(err){}}self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(e.request,{ignoreSearch:e.request.mode==='navigate'});
  if(hit)return hit;try{const r=await fetch(e.request);if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());return r}catch(err){return (e.request.mode==='navigate'&&await c.match('index.html'))||Response.error()}})())});
