const CACHE='kariega-radio-v3';
const CORE=[
 './','./index.html','./schedule.html','./presenters.html','./partners.html','./about.html','./contact.html','./join.html',
 './styles.css','./app.js','./manifest.json',
 './assets/kariega-logo.png','./assets/zola-nqini-heritage-banner.jpg',
 './assets/slabb-digital-group.jpg','./assets/afri-save.jpg','./assets/pumelamfazi.jpg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(url.origin!==location.origin)return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))));
});
