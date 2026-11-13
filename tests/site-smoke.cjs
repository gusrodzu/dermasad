// Dermassad · pruebas estáticas sin dependencias externas.
// Ejecutar desde la raíz: node tests/site-smoke.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'script.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'design-system.css'),'utf8');
const deployment=fs.readFileSync(path.join(root,'.cpanel.yml'),'utf8');

const app={innerHTML:''};
const doc={
  getElementById(id){return id==='app'?app:id==='route-status'?{textContent:''}:null;},
  querySelector(sel){if(sel==='main')return {id:'',tabIndex:-1};if(sel==='meta[name=description]')return {content:''};return null;},
  querySelectorAll(){return [];},
  addEventListener(){}
};
const win={
  localStorage:{getItem(){return null;},setItem(){}},
  addEventListener(){},
  scrollTo(){},
  innerWidth:1200
};
const api=new Function('window','document','location','AbortController',source+'\nreturn {home,cityPage,doctorPage,privacy,photoDialog,whatsappUrl,header};')(
  win,doc,{hash:'#/'},AbortController
);
const views={
  inicio:api.home(),
  monterrey:api.cityPage('monterrey'),
  playa:api.cityPage('playa-del-carmen'),
  especialista:api.doctorPage(),
  privacidad:api.privacy()
};
const imageRef=/src="\.\/assets\/([^"]+)"/g;
const idRef=/\bid="([^"]+)"/g;
const hashRef=/href="#([^/"][^"]*)"/g;
for(const [name,markup] of Object.entries(views)){
  assert.equal((markup.match(/<h1(?:\s|>)/g)||[]).length,1,name+': debe haber un solo H1');
  const ids=[...markup.matchAll(idRef)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,name+': hay IDs duplicados');
  for(const m of markup.matchAll(imageRef)){
    assert.ok(fs.existsSync(path.join(root,'assets',m[1])),name+': falta '+m[1]);
  }
  for(const m of markup.matchAll(hashRef)){
    assert.ok(ids.includes(m[1]),name+': ancla rota #'+m[1]);
  }
  assert.ok(!markup.includes('formulario de contacto'),name+': texto de formulario obsoleto');
}
assert.ok(views.monterrey.includes('monterrey-sala-espera.webp'),'Fotos de Monterrey');
assert.ok(views.playa.includes('galeria-espera.webp'),'Fotos de Playa del Carmen');
assert.ok(views.especialista.includes('Recertificado en 2024'),'Trayectoria profesional');
assert.ok(api.whatsappUrl('monterrey','Hola').includes('5218182549000'),'WhatsApp Monterrey');
assert.ok(api.whatsappUrl('playa-del-carmen','Hola').includes('529844622404'),'WhatsApp Playa del Carmen');
assert.ok(decodeURIComponent(api.whatsappUrl('monterrey','Quiero consultar acné')).includes('acné'),'Mensaje contextual');
assert.ok(api.photoDialog().includes('photo-dialog-next'),'Modal de galería');
assert.ok(html.includes('design-system.css'),'CSS activo en HTML');
assert.ok(deployment.includes('design-system.css'),'CSS desplegado por cPanel');
assert.ok(deployment.includes('dermasad-preview'),'Destino de pruebas');
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length,'CSS desbalanceado');
// UI Bundle 04: header adaptable, composición y contenido veraz
assert.ok(css.includes('@media(max-width:1199px)'), 'Breakpoint tablet del encabezado');
assert.ok(css.includes('.header .navlinks.open'), 'Panel móvil desplegable');
assert.ok(css.includes('.playa-photo-grid figure:first-child'), 'Galería editorial con imagen destacada');
assert.ok(css.includes('.branch-hero-actions'), 'Acciones simplificadas en sede');
assert.ok(source.includes('window.innerWidth>1199'), 'Breakpoints sincronizados entre JS/CSS');
assert.ok(views.monterrey.includes('monterrey-acceso-interior.webp'), 'Ubicación Monterrey con foto real');
assert.ok(views.playa.includes('galeria-acceso.webp'), 'Ubicación Playa del Carmen con foto real');
assert.ok(!views.playa.includes('class="map-placeholder"'), 'Sin marcador de ubicación ficticio');
assert.ok(!views.monterrey.includes('Referencia desde'), 'No publicar precios orientativos sin validar');
assert.ok(views.monterrey.includes('Precio y disponibilidad a confirmar con la sede'), 'Mensaje de precio claro');
assert.ok(views.playa.includes('Consultar por WhatsApp'), 'Contacto directo en hero');

console.log('✓ Dermassad smoke tests: 5 vistas, enlaces, assets, WhatsApp, modal y staging');
