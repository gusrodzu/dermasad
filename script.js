// Datos aún sin validar están centralizados aquí; no sustituir por datos inventados.
const SETTINGS = {
  doctor: 'Dr. Carlos Javier Assad Morell',
  // Pendiente: validar las cédulas general y de especialidad antes de exhibirlas.
  license: null,
  specialtyLicense: null,
  locations: {
    monterrey: {title:'Monterrey', city:'Monterrey', subtitle:'San Pedro Garza García, Nuevo León', address:'Calzada del Valle 400, San Pedro Garza García', phone:'81 8335 7065', whatsapp:'5218182549000', scheduleUrl:null, doctorDays:null},
    'playa-del-carmen':{title:'Playa del Carmen',city:'Playa del Carmen',subtitle:'Quintana Roo',address:null,phone:null,whatsapp:'529844622404',scheduleUrl:null,doctorDays:null}
  },
  // Tarifa orientativa extraída del wireframe; validar vigencia y aplicación por sede.
  consultationFrom:1500,
  priceValidated:false,
  discountPolicyValidated:false
};
const concerns=[['Manchas','Melasma y daño solar'],['Acné y cicatrices','Diagnóstico y plan individual'],['Caída de cabello','Evaluación de posibles causas'],['Lunares y lesiones','Revisión de la piel'],['Psoriasis y dermatitis','Atención de enfermedades inflamatorias de la piel'],['Antiedad','Opciones de atención facial']];
const treatments=[['Depilación láser',1500,'por sesión'],['Limpieza facial profunda',2000,''],['Peeling con láser',2000,''],['Luz pulsada',400,'por zona'],['Polinucleótidos',3500,''],['Radiofrecuencia',7500,''],['Ultrasonido focalizado',null,'']];
const money=(v)=>'$'+v.toLocaleString('es-MX');
const safe=(v,fallback='Por confirmar')=>v||fallback;
const license=()=>SETTINGS.license?` · Cédula profesional ${SETTINGS.license}`:'';
const licenseDetails=()=>[SETTINGS.license?`Cédula profesional: ${SETTINGS.license}`:'', SETTINGS.specialtyLicense?`Cédula de especialidad: ${SETTINGS.specialtyLicense}`:''].filter(Boolean).join(' · ');
let active='/';
// La sede elegida permanece durante la navegación y al volver a abrir el sitio.
const SEDE_STORAGE_KEY='dermassad:selected-sede';
const validSede=(id)=>id==='monterrey'||id==='playa-del-carmen';
function getSavedSede(){
  try {
    const saved=window.localStorage.getItem(SEDE_STORAGE_KEY);
    return validSede(saved)?saved:'';
  } catch { return ''; }
}
function saveSede(id){
  if(!validSede(id))return;
  try { window.localStorage.setItem(SEDE_STORAGE_KEY,id); } catch {}
}
function currentSede(path){
  const fromRoute=path.slice(1);
  return validSede(fromRoute)?fromRoute:getSavedSede();
}
// Enrutamiento portable: funciona desde index.html y Live Server, sin rewrites.
function route(){
  const fragment=decodeURIComponent(location.hash.slice(1)||'/');
  const path=fragment.split('#')[0].replace(/\/$/,'')||'/';
  return ['/','/monterrey','/playa-del-carmen','/el-doctor','/aviso-de-privacidad'].includes(path)?path:'/404';
}
function go(path){
  const newHash='#'+path;
  if(location.hash!==newHash)location.hash=newHash;
  else {render();window.scrollTo(0,0)}
}
function link(path,label,cls=''){
  const href=path.startsWith('/')?'#'+path:path;
  return `<a class="${cls}" href="${href}" data-link>${label}</a>`;
}
function header(path){
  const selected=currentSede(path);
  const isCity=validSede(path.slice(1));
  const treatmentLink=selected?'/'+selected+'#tratamientos':'/#sedes';
  const appointmentLink=selected?'/'+selected+'#agenda':'/#sedes';
  const activeLink=(target)=>path===target?' is-active':'';
  const navItem=(target,title)=>link(target,title,'nav-link'+activeLink(target));
  return `<div class="topline">Atención dermatológica · Monterrey y Playa del Carmen</div>
  <header class="header" id="site-header"><div class="container nav">
    ${link('/','<img class="logo-image" src="./assets/logo-dermassad.png" alt="Clínica Dermassad">','logo')}
    <nav id="navlinks" class="navlinks" aria-label="Navegación principal">
      ${navItem('/','Inicio')}
      ${navItem('/#atiendo','Qué atendemos')}
      ${navItem('/el-doctor','El especialista')}
      ${navItem('/#sedes','Sedes')}
      ${navItem(treatmentLink,'Tratamientos')}
      <div class="nav-mobile-group" aria-label="Explorar sedes"><span>Elige una sede</span>
        ${link('/monterrey','Monterrey · San Pedro','nav-mobile-city'+(path==='/monterrey'?' is-active':''))}
        ${link('/playa-del-carmen','Playa del Carmen','nav-mobile-city'+(path==='/playa-del-carmen'?' is-active':''))}
      </div>
      ${link(appointmentLink,'Solicitar cita ↗','btn nav-mobile-cta')}
    </nav>
    <div class="navend">
      <label class="visually-hidden" for="location-picker">Sede de atención</label>
      <select class="select" aria-label="Seleccionar sede" id="location-picker">
        <option value="" disabled ${selected?'':'selected'}>Seleccionar sede</option>
        <option value="monterrey" ${selected==='monterrey'?'selected':''}>Monterrey</option>
        <option value="playa-del-carmen" ${selected==='playa-del-carmen'?'selected':''}>Playa del Carmen</option>
      </select>
      ${link(appointmentLink,'Solicitar cita','btn nav-cta')}
      <button class="mobile-toggle" type="button" aria-label="Abrir menú de navegación" aria-controls="navlinks" aria-expanded="false" id="mobile-toggle"><span class="menu-icon" aria-hidden="true">☰</span><span class="menu-label">Menú</span></button>
    </div>
  </div></header>
  <button class="mobile-nav-backdrop" id="mobile-nav-backdrop" type="button" tabindex="-1" aria-label="Cerrar navegación" hidden></button>`;
}

// WhatsApp oficial por sede. El número se selecciona con la ruta o la sede recordada.
const whatsappIcon=()=>`<svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.52 3.49A11.86 11.86 0 0 0 12.08 0C5.52 0 .17 5.34.16 11.91c0 2.1.55 4.15 1.6 5.97L0 24l6.29-1.65a11.89 11.89 0 0 0 5.78 1.47h.01c6.56 0 11.9-5.34 11.92-11.91a11.82 11.82 0 0 0-3.48-8.42ZM12.08 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.87 9.87 0 0 1-1.52-5.25c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.81 9.81 0 0 1 2.9 7c-.01 5.45-4.45 9.88-9.9 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.34.45-.51.15-.17.2-.3.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.52.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>`;
function whatsappUrl(city){
  const l=SETTINGS.locations[city];
  if(!l?.whatsapp)return '';
  return `https://wa.me/${l.whatsapp}?text=${encodeURIComponent('Hola, me gustaría recibir información sobre la atención de Dermassad en '+l.title+'.')}`;
}
function waContactLink(city,label='Escribir por WhatsApp'){
  return `<a class="btn wa-contact-link" href="${whatsappUrl(city)}" target="_blank" rel="noopener noreferrer" aria-label="${label}, sede ${SETTINGS.locations[city].title}">${whatsappIcon()}<span>${label}</span></a>`;
}
function floatingWhatsapp(path){
  const selected=currentSede(path);
  if(selected){
    return `<aside class="wa-floating" aria-label="Contacto por WhatsApp"><a class="wa-float-button" href="${whatsappUrl(selected)}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Dermassad ${SETTINGS.locations[selected].title}" title="WhatsApp · ${SETTINGS.locations[selected].title}">${whatsappIcon()}</a></aside>`;
  }
  return `<aside class="wa-floating" aria-label="Contacto por WhatsApp"><details class="wa-choose"><summary class="wa-float-button" aria-label="Elegir sede para WhatsApp" title="Elegir sede para WhatsApp">${whatsappIcon()}</summary><div class="wa-choose-panel"><strong>WhatsApp de tu sede</strong><a href="${whatsappUrl('monterrey')}" target="_blank" rel="noopener noreferrer">Monterrey / San Pedro</a><a href="${whatsappUrl('playa-del-carmen')}" target="_blank" rel="noopener noreferrer">Playa del Carmen</a></div></details></aside>`;
}
function foot(){return `<footer class="foot"><div class="container"><div class="foot-grid"><div>${link('/','<img class="logo-image" src="./assets/logo-dermassad-blanco.png" alt="Clínica Dermassad">','logo')}<p>Dermatología y cuidado de la piel con orientación médica.</p><small>Los procedimientos se indican según la evaluación médica individual.</small></div><div><h3>Explorar</h3>${link('/','Inicio')}${link('/el-doctor','Sobre el doctor')}${link('/monterrey','Monterrey')}${link('/playa-del-carmen','Playa del Carmen')}</div><div><h3>Información</h3>${link('/aviso-de-privacidad','Aviso de privacidad')}<p>${licenseDetails()}</p></div></div><div class="foot-bottom">© ${new Date().getFullYear()} Dermassad · Derechos reservados.</div></div></footer>`}
function placeholder(label='Imagen ilustrativa'){return `<div class="display-photo" role="img" aria-label="${label}"><div class="pmark">D</div><span>${label}</span></div>`}
function locationCards(){return `<div class="grid cols-2">${Object.entries(SETTINGS.locations).map(([id,l])=>`<article class="location"><span class="location-icon">⌖</span><span class="eyebrow">Nuestra sede</span><h3>${l.title}</h3><p>${l.subtitle}<br>${safe(l.address,'Consulta la ubicación con la sede')}</p>${link('/'+id,'Explorar esta sede ↗','btn outline')}</article>`).join('')}</div>`}
function concernCards(items=concerns){return `<div class="grid cards">${items.map(([title,desc],i)=>`<article class="card"><div class="index">0${i+1} / DERMATOLOGÍA</div><h3>${title}</h3><p>${desc}</p><span class="arrow">Valoración dermatológica ↗</span></article>`).join('')}</div>`}
function home(){return `<main>
<section class="hero home-hero"><div class="container hero-grid"><div class="hero-copy"><div class="hero-top"><span class="mini-dash"></span><span class="eyebrow">Clínica Dermassad · Dermatología avanzada</span></div><h1>Dermatólogo en <em>Monterrey y Playa del Carmen.</em></h1><p class="hero-doctor">Dr. Carlos Javier Assad Morell <span>· Dermatología</span></p><p class="hero-description">Atención para tu piel, con enfoque médico. Conoce los motivos de consulta y elige la sede donde deseas recibir orientación.</p><div class="hero-actions">${link('/#sedes','Elegir sede y solicitar cita ↗','btn')}${link('/#atiendo','Ver motivos de consulta','btn outline')}</div><div class="hero-trust"><span class="trust-dot"></span> Dermatología avanzada · Atención en dos sedes</div></div><div class="hero-visual home-portrait"><div class="portrait-backdrop"></div><div class="portrait-photo-card"><img class="portrait-image" src="./assets/doctor-home.png" alt="Dr. Carlos Javier Assad Morell · Clínica Dermassad" fetchpriority="high"></div></div></div><div class="hero-bottom container"><span>01 / ATENCIÓN DERMATOLÓGICA</span><a href="#sedes">Conoce nuestras sedes <span>↓</span></a></div></section>
<section class="section home-locations white anchor-target" id="sedes"><div class="container"><div class="section-head home-section-head"><div><span class="eyebrow">01 — Selecciona tu ciudad</span><h2>El primer paso es elegir <em>dónde atenderte.</em></h2></div><p>Consulta la información de tu sede y continúa con el proceso de solicitud de valoración o tratamiento.</p></div><div class="location-showcase">${Object.entries(SETTINGS.locations).map(([id,l],i)=>`<a class="location-tile tile-${i+1}" href="#/${id}" data-link><div class="tile-art">${i===0?`<img class="tile-photo" src="./assets/monterrey-sala-espera.webp" alt="Sala de espera de Dermassad, sede San Pedro Garza García, Monterrey" loading="lazy" decoding="async">`:`<img class="tile-photo" src="./assets/galeria-recepcion.webp" alt="Instalaciones de Clínica Dermassad Playa del Carmen" loading="lazy" decoding="async">`}</div><div class="tile-info"><span class="tile-count">0${i+1} / SEDE DERMASSAD</span><h3>${l.title}</h3><p>${l.subtitle}</p><span class="tile-explore">Conocer sede <span aria-hidden="true">↗</span></span></div></a>`).join('')}</div></div></section>
<section class="section soft home-concerns anchor-target" id="atiendo"><div class="container"><div class="section-head home-section-head"><div><span class="eyebrow">02 — Motivos de consulta</span><h2>¿Qué te preocupa <em>de tu piel?</em></h2></div><p>La consulta comienza con lo que notas, sientes o deseas revisar. El diagnóstico y las opciones de atención se determinan mediante valoración médica.</p></div><div class="concern-showcase">${concerns.map(([name,desc],i)=>`<article class="concern-item"><span class="concern-number">0${i+1}</span><div><h3>${name}</h3><p>${desc}</p></div><span class="concern-symbol" aria-hidden="true">↗</span></article>`).join('')}</div><div class="home-inline-cta"><p>¿Buscas orientación para tu caso?</p>${link('/#sedes','Elegir una sede ↗','btn')}</div></div></section>
<section class="section home-doctor"><div class="container doctor-layout"><div class="doctor-visual doctor-visual-photo"><img class="doctor-photo-image" src="./assets/retrato-doctor.webp" alt="Retrato del Dr. Carlos Javier Assad Morell en la clínica" loading="lazy" decoding="async"><div class="doctor-photo-corner">Dermatología avanzada · Dermassad</div></div><div class="doctor-content"><span class="eyebrow">03 — El especialista</span><h2>Conoce al <em>Dr. Carlos Javier Assad Morell.</em></h2><p>Dermatólogo formado en la Universidad Autónoma de Nuevo León, con especialización en el Hospital Universitario y formación internacional en Londres. Su trayectoria integra práctica clínica e investigación dermatológica.</p><div class="credential-lines"><div><span>01</span><strong>Recertificado en 2024</strong><small>Consejo Mexicano de Dermatología.</small></div><div><span>02</span><strong>Especialidad en Dermatología · UANL</strong><small>Hospital Universitario, 1986–1989; formación internacional en Saint John’s Hospital, Londres.</small></div><div><span>03</span><strong>Investigación clínica desde 2017</strong><small>Centro de Investigación de Enfermedades de la Piel, en Clínica Dermassad.</small></div></div>${link('/el-doctor','Conocer su trayectoria ↗','btn light')}</div></div></section>
<section class="section white gallery-section" id="espacios"><div class="container"><div class="section-head home-section-head"><div><span class="eyebrow">Clínica Dermassad · Playa del Carmen</span><h2>Espacios para tu <em>atención.</em></h2></div><div><p>Conoce las instalaciones de nuestra sede de Playa del Carmen, Quintana Roo. Todas las fotografías de esta galería corresponden a esa sede.</p>${link("/playa-del-carmen","Conocer sede Playa del Carmen ↗","btn outline")}</div></div><div class="photo-gallery"><figure class="photo-gallery-main"><img src="./assets/galeria-espera.webp" alt="Sala de espera de Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Sala de espera</figcaption></figure><figure><img src="./assets/galeria-consultorio.webp" alt="Sala de atención de Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Sala de atención</figcaption></figure><figure><img src="./assets/galeria-recepcion.webp" alt="Recepción de Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Recepción</figcaption></figure><figure><img src="./assets/galeria-consulta.webp" alt="Área de consulta de Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Área de consulta</figcaption></figure><figure><img src="./assets/galeria-procedimientos.webp" alt="Sala de procedimientos de Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Área clínica</figcaption></figure><figure><img src="./assets/galeria-acceso.webp" alt="Acceso interior de Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Acceso interior</figcaption></figure></div></div></section>
<section class="section white anchor-target home-process" id="proceso"><div class="container"><div class="section-head center"><span class="eyebrow">04 — Tu consulta</span><h2>Un proceso sencillo, <em>paso a paso.</em></h2><p>Información clara desde el primer contacto hasta la definición de tus opciones de atención.</p></div><div class="process-grid"><article><span>01</span><div class="process-icon">⌖</div><h3>Elige tu sede</h3><p>Consulta la información y canales disponibles en tu ciudad.</p></article><article><span>02</span><div class="process-icon">＋</div><h3>Solicita una valoración</h3><p>Identifica el motivo de consulta y el canal para iniciar tu solicitud.</p></article><article><span>03</span><div class="process-icon">✓</div><h3>Define los siguientes pasos</h3><p>Tras la revisión médica, conoce las opciones y costos aplicables.</p></article></div><p class="process-disclaimer">La política de descuento de la valoración sobre tratamientos está sujeta a confirmación de la clínica.</p></div></section>
<section class="section closing-section"><div class="container"><div class="closing-panel"><span class="eyebrow">DERMASSAD / TU PRÓXIMO PASO</span><h2>Comienza el cuidado de tu piel <em>con una valoración.</em></h2><p>Elige la sede que te corresponde para continuar.</p>${link('/#sedes','Ver sedes y opciones de atención ↗','btn light')}</div></div></section>
</main>`}
function treatmentCards(city){
  const data=treatments.filter(x=>city==='monterrey'?x[0]!=='Ultrasonido focalizado':x[0]!=='Radiofrecuencia');
  return `<div class="grid cards">${data.map(([name,price,note])=>`<article class="card service-card"><span class="eyebrow">Procedimiento</span><h3 style="margin-top:15px">${name}</h3><p>La indicación y disponibilidad dependen de la valoración correspondiente.</p><span class="pricing">${price===null?'Precio a consultar':(SETTINGS.priceValidated?'Desde ':'Referencia desde ')+money(price)+' MXN'+(note?' · '+note:'')}</span>${price!==null&&!SETTINGS.priceValidated?'<small class="pricing-note">Importe orientativo, sujeto a confirmación.</small>':''}<a class="btn outline service-request" href="#agenda" data-treatment="${name}">Consultar este tratamiento ↗</a></article>`).join('')}</div>`
}
function faq(city){
  const qs=[
    ['¿Cómo solicito una valoración?','Elige la ruta de valoración y utiliza el formulario de contacto para indicar tu sede y el motivo de consulta.'],
    ['¿Cuánto cuesta una consulta?','La referencia inicial es desde $1,500 MXN. El importe definitivo y las condiciones deben confirmarse directamente con la clínica.'],
    ['¿Cuántas sesiones necesito?','Depende de tu evaluación y del procedimiento que se considere adecuado.'],
    ['¿Puedo solicitar un procedimiento específico?','Sí. Consulta los procedimientos disponibles y selecciona uno para iniciar una solicitud; el equipo confirmará si requiere valoración previa.'],
    ['¿Puedo realizarme un tratamiento en la primera visita?','La posibilidad de realizarlo dependerá de la evaluación, la disponibilidad y los protocolos aplicables.']
  ];
  if(city==='playa-del-carmen')qs.push(['¿Atienden a visitantes?','Comunícate con la sede para confirmar sus opciones de atención.']);
  return `<div class="accordion">${qs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`
}
function agenda(city){return `<div class="agenda"><span class="eyebrow">Explora tu solicitud</span><h3 style="font-size:1.6rem;margin:11px 0">Cuéntanos qué necesitas</h3><p class="muted">Elige tu motivo de atención y horario preferido. Esta selección no constituye una cita confirmada.</p><form id="appointment-form" class="form-grid"><div class="form-field"><label for="a-service">Motivo de consulta</label><select id="a-service" required><option value="">Selecciona una opción</option><option>Valoración dermatológica</option>${treatments.map(([t])=>`<option>${t}</option>`).join('')}</select></div><div class="form-field"><label for="a-city">Sede</label><select id="a-city" disabled><option>${SETTINGS.locations[city].title}</option></select></div><div class="form-field"><label for="a-date">Fecha preferida (orientativa)</label><input id="a-date" type="date" required></div><div class="form-field"><label for="a-time">Horario preferido (orientativo)</label><select id="a-time" required><option value="">Selecciona una franja</option><option>Por la mañana</option><option>Por la tarde</option></select></div><div class="form-field full"><label><input type="checkbox" id="a-consent" required style="width:auto;margin-right:8px">Entiendo que esta vista no crea una reserva ni envía una solicitud.</label></div><div class="form-field full"><button class="btn" type="submit">Revisar selección ↗</button><div id="appointment-result" aria-live="polite"></div></div></form><p class="fineprint">Esta herramienta no registra ni envía solicitudes. Consulta disponibilidad mediante los canales oficiales de la sede.</p></div>`}
function cityPage(city){let l=SETTINGS.locations[city],isP=city==='playa-del-carmen',isM=city==='monterrey';let ordered=isP?[concerns[3],concerns[0],concerns[4],concerns[1],concerns[2],concerns[5]]:[concerns[5],concerns[0],concerns[1],concerns[2],concerns[3],concerns[4]];const cityHeroVisual=isM?`<div class="hero-visual branch-hero"><div class="branch-photo-card"><img class="branch-photo" src="./assets/sucursal-monterrey.jpg" alt="Sucursal Dermassad Monterrey"><div class="photo-caption">Sucursal Dermassad Monterrey</div></div></div>`:`<div class="hero-visual playa-doctor-hero"><img class="playa-doctor-image" src="./assets/doctor-home.png" alt="Dr. Carlos Javier Assad Morell · Clínica Dermassad" loading="eager" decoding="async"></div>`;const cityMapVisual=isM?`<div class="branch-location-card"><img class="branch-photo location-photo" src="./assets/sucursal-monterrey.jpg" alt="Entrada de la sucursal Dermassad Monterrey"></div>`:`<div class="map-placeholder">⌖<br>Ubicación de ${l.title}<br>Consultar con la sede</div>`;return `<main><section class="hero"><div class="container hero-grid"><div class="hero-copy"><span class="eyebrow">Dermassad · Sede ${l.title}</span><h1>Dermatología en ${l.title}.</h1><p>Atención dermatológica con el ${SETTINGS.doctor}. Selecciona el motivo de tu visita y conoce las alternativas para solicitar una cita.</p><div class="hero-actions">${link('#rutas','Quiero agendar ↗','btn')}${link('#servicios','Explorar servicios','btn outline')}${waContactLink(city,'WhatsApp de la sede')}</div><div class="small-line">${safe(l.address,'Consulta ubicación con la sede')}${l.phone?' · '+l.phone:''}</div>${isP?`<a class="branch-gallery-link" href="#instalaciones">Ver instalaciones de Playa del Carmen ↓</a>`:isM?`<a class="branch-gallery-link" href="#instalaciones">Ver instalaciones de San Pedro ↓</a>`:''}</div>${cityHeroVisual}</div></section>${isP?`<section class="section white playa-gallery-section" id="instalaciones"><div class="container"><div class="section-head playa-gallery-heading"><div><span class="eyebrow">Clínica Dermassad · Playa del Carmen</span><h2>Conoce nuestras <em>instalaciones.</em></h2><p>Recepción, sala de espera y espacios de atención de nuestra sede de Playa del Carmen, Quintana Roo.</p></div></div><div class="playa-photo-grid"><figure><img src="./assets/galeria-espera.webp" alt="Sala de espera en Clínica Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1201"><figcaption>Sala de espera</figcaption></figure><figure><img src="./assets/galeria-recepcion.webp" alt="Recepción de Clínica Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1201"><figcaption>Recepción</figcaption></figure><figure><img src="./assets/galeria-consultorio.webp" alt="Consultorio de Clínica Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1201"><figcaption>Consultorio</figcaption></figure><figure><img src="./assets/galeria-consulta.webp" alt="Área de consulta en Clínica Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1201"><figcaption>Área de consulta</figcaption></figure><figure><img src="./assets/galeria-procedimientos.webp" alt="Sala de procedimientos en Clínica Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1201"><figcaption>Sala de procedimientos</figcaption></figure><figure><img src="./assets/galeria-acceso.webp" alt="Acceso interior a las instalaciones de Clínica Dermassad Playa del Carmen" loading="lazy" decoding="async" width="1600" height="1201"><figcaption>Acceso interior</figcaption></figure></div><p class="fineprint playa-gallery-note">Fotografías de la sede Playa del Carmen.</p></div></section>`:''}${isM?`<section class="section white playa-gallery-section monterrey-gallery-section" id="instalaciones"><div class="container"><div class="section-head playa-gallery-heading"><div><span class="eyebrow">Clínica Dermassad · Monterrey / San Pedro</span><h2>Conoce nuestras <em>instalaciones.</em></h2><p>Recorre la recepción, la sala de espera y los espacios de atención de nuestra sede en San Pedro Garza García, Nuevo León.</p></div></div><div class="playa-photo-grid"><figure><img src="./assets/monterrey-recepcion.webp" alt="Recepción de Clínica Dermassad, sede San Pedro Garza García, Monterrey" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Recepción</figcaption></figure><figure><img src="./assets/monterrey-sala-espera.webp" alt="Sala de espera de Dermassad Monterrey / San Pedro" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Sala de espera</figcaption></figure><figure><img src="./assets/monterrey-acceso-interior.webp" alt="Acceso a Clínica Dermassad en Monterrey / San Pedro" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Acceso interior</figcaption></figure><figure><img src="./assets/monterrey-consultorio.webp" alt="Consultorio de Clínica Dermassad, sede San Pedro Garza García, Monterrey" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Consultorio</figcaption></figure><figure><img src="./assets/monterrey-sala-atencion.webp" alt="Sala de atención de Clínica Dermassad, sede San Pedro Garza García, Monterrey" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Sala de atención</figcaption></figure><figure><img src="./assets/monterrey-sala-procedimientos.webp" alt="Sala clínica de Dermassad, sede Monterrey / San Pedro" loading="lazy" decoding="async" width="1600" height="1200"><figcaption>Sala de procedimientos</figcaption></figure></div><p class="fineprint playa-gallery-note">Fotografías de la sede Monterrey (San Pedro Garza García).</p></div></section>`:''}<section class="section white anchor-target" id="rutas"><div class="container"><div class="section-head center"><span class="eyebrow">Elige cómo comenzar</span><h2>¿En qué podemos ayudarte?</h2><p>Dos formas de iniciar, según lo que necesites.</p></div><div class="grid cols-2"><article class="route-card consult"><span class="pill">Ruta de valoración</span><h3 style="font-size:1.7rem">Necesito que revisen mi piel.</h3><p>Manchas, acné, cabello, lunares, enfermedades de la piel o dudas sobre opciones antiedad.</p><a href="#agenda" class="btn" data-care-route="valoracion">Solicitar valoración ↗</a></article><article class="route-card procedure"><span class="pill">Ruta de procedimientos</span><h3 style="font-size:1.7rem">Ya sé qué tratamiento me interesa.</h3><p>Consulta los procedimientos de esta sede y solicita orientación para agendar.</p><a href="#tratamientos" class="btn" data-care-route="tratamiento">Elegir tratamiento ↗</a></article></div><div class="feature-band"><strong>Primera visita:</strong> la indicación de un procedimiento requiere revisar el caso y las condiciones de atención.</div></div></section><section class="section soft anchor-target" id="servicios"><div class="container"><div class="section-head"><span class="eyebrow">Motivos de consulta</span><h2>Atención que comienza escuchando tu piel.</h2><p>Cada caso requiere valoración para definir el abordaje adecuado.</p></div>${concernCards(ordered)}<p class="notice">Referencia de valoración desde $1,500 MXN. Tarifa orientativa sujeta a confirmación por sede.</p></div></section>${isP?`<section class="section white"><div class="container split"><div><span class="eyebrow">Revisión preventiva</span><h2>Revisión de lunares y exposición solar.</h2><p class="muted">La revisión dermatológica puede formar parte de un cuidado preventivo. Consulta las opciones de valoración.</p></div>${placeholder('Imagen ilustrativa de atención')}</div></section>`:''}<section class="section white anchor-target" id="tratamientos"><div class="container"><div class="section-head"><span class="eyebrow">Opciones de procedimiento</span><h2>Tratamientos disponibles para evaluar.</h2><p>Consulta las opciones de atención. Los importes son orientativos y la disponibilidad depende de la sede y la valoración correspondiente.</p></div>${treatmentCards(city)}</div></section><section class="section soft anchor-target" id="agenda"><div class="container split"><div><span class="eyebrow">Planea tu visita</span><h2>Tu siguiente paso comienza aquí.</h2><p class="muted">Elige el motivo y una fecha preferida para preparar tu solicitud de atención.</p><div class="pending">La disponibilidad debe consultarse directamente con la sede.</div></div>${agenda(city)}</div></section><section class="section white"><div class="container split">${isP?`<div class="playa-doctor-secondary"><img src="./assets/doctor-home.png" alt="Dr. Carlos Javier Assad Morell · Clínica Dermassad" loading="lazy" decoding="async"></div>`:`<div class="doctor-bio-photo"><img src="./assets/retrato-doctor.webp" alt="Retrato profesional del Dr. Carlos Javier Assad Morell" loading="lazy" decoding="async"></div>`}<div><span class="eyebrow">Acerca del especialista</span><h2>Conoce al ${SETTINGS.doctor}.</h2><p class="muted">Conoce la trayectoria del especialista y su enfoque de atención dermatológica.</p>${link('/el-doctor','Ver trayectoria profesional ↗','btn outline')}</div></div></section><section class="section soft"><div class="container split"><div><span class="eyebrow">Preguntas frecuentes</span><h2>Resolvemos tus dudas.</h2><p class="muted">Información general sobre el proceso de atención en ${l.title}.</p></div>${faq(city)}</div></section><section class="section white"><div class="container split">${cityMapVisual}<div><span class="eyebrow">Visítanos</span><h2>Dermassad ${l.title}.</h2><p><strong>Dirección</strong><br>${safe(l.address,'Consulta la dirección con la sede')}</p><p><strong>Teléfono</strong><br>${safe(l.phone,'Solicita los medios de contacto a la clínica')}</p><p><strong>Días de atención</strong><br>${safe(l.doctorDays,'Consultar con la sede')}</p>${waContactLink(city,'Consultar por WhatsApp')}<div class="pending">Antes de visitarnos, confirma directamente los horarios y la ubicación de la sede.</div></div></div></section></main>`}
function doctorPage(){return `<main class="doctor-profile">
<section class="section white doctor-profile-hero"><div class="container split doctor-profile-top">
  <div><span class="eyebrow">Especialista · Dermassad</span><h1>Dr. Carlos Javier <em>Assad Morell.</em></h1><p class="doctor-lead">Trayectoria en dermatología, formación médica, investigación y actualización profesional.</p><div class="doctor-certification"><span class="doctor-cert-icon" aria-hidden="true">✓</span><div><strong>Recertificado en 2024</strong><small>Consejo Mexicano de Dermatología</small></div></div><div class="hero-actions">${link('/#sedes','Elegir sede para valoración ↗','btn')}${link('/el-doctor#formacion','Ver su formación','btn outline')}</div></div>
  <div class="doctor-bio-photo"><img src="./assets/retrato-doctor.webp" alt="Dr. Carlos Javier Assad Morell, especialista en dermatología de Clínica Dermassad" loading="eager" decoding="async"></div>
</div></section>
<section class="section doctor-detail-section" id="formacion"><div class="container"><div class="section-head"><span class="eyebrow">01 — Formación</span><h2>Preparación médica <em>y especialidad.</em></h2><p>Estudios profesionales y formación internacional del Dr. Carlos Javier Assad Morell.</p></div>
<div class="doctor-timeline">
<article><span class="doctor-period">1978–1984</span><div><h3>Medicina</h3><p>Facultad de Medicina, Universidad Autónoma de Nuevo León (UANL).</p></div></article>
<article><span class="doctor-period">1986–1989</span><div><h3>Especialidad en Dermatología</h3><p>Hospital Universitario de la Universidad Autónoma de Nuevo León.</p></div></article>
<article><span class="doctor-period">Formación internacional</span><div><h3>Posgrado internacional</h3><p>Saint John’s Hospital for Diseases of the Skin, Universidad de Londres, Inglaterra.</p></div></article>
</div></div></section>
<section class="section white doctor-detail-section" id="certificacion"><div class="container"><div class="section-head"><span class="eyebrow">02 — Certificación y membresías</span><h2>Actualización <em>profesional.</em></h2></div>
<div class="doctor-feature"><div><span class="doctor-feature-year">2024</span><h3>Recertificación</h3><p>Recertificado por el Consejo Mexicano de Dermatología en 2024.</p><a class="doctor-source-link" href="https://www.consejomexicanodermatologia.org.mx/noticias/resultados-certificacion-y-recertificacion-2024" target="_blank" rel="noopener noreferrer">Consultar resultados oficiales de recertificación ↗</a></div><div><h3>Membresías profesionales</h3><ul class="doctor-memberships"><li>Colegio de Médicos Dermatólogos de Nuevo León</li><li>Colegio Latinoamericano de Dermatología (CILAD)</li><li>Sociedad de Cirugía Dermatológica y Oncológica</li><li>Academia Mexicana de Dermatología</li></ul></div></div>
</div></section>
<section class="section doctor-detail-section" id="investigacion"><div class="container"><div class="section-head"><span class="eyebrow">03 — Investigación</span><h2>Investigación sobre enfermedades <em>de la piel.</em></h2></div>
<div class="doctor-research"><div><span class="eyebrow">Desde 2017</span><h3>Centro de Investigación de Enfermedades de la Piel</h3><p>Desarrolla actividades de investigación dentro de Clínica Dermassad.</p></div><div><h3>Líneas de investigación</h3><div class="doctor-topic-list"><span>Psoriasis</span><span>Dermatitis atópica</span><span>Hidradenitis supurativa</span><span>Alopecia areata</span><span>Vitíligo</span></div></div></div>
</div></section>
<section class="section white doctor-detail-section" id="publicaciones"><div class="container"><div class="section-head"><span class="eyebrow">04 — Publicaciones</span><h2>Contribuciones <em>académicas.</em></h2><p>Selección de publicaciones vinculadas a su trayectoria. La referencia de 2007 tiene respaldo bibliográfico independiente; los datos editoriales de los trabajos de 1994 y 2025 están pendientes de corroborarse en sus respectivas revistas.</p></div><div class="doctor-publications">
<article><span>1994</span><div><h3>El láser de CO2 en dermatología</h3><p>Revista Mexicana de Dermatología.</p></div></article>
<article><span>2007</span><div><h3>Pseudomycetoma for Microsporum canis: Report of a Case Diagnosed by Fine Needle Aspiration Biopsy</h3><p>Acta Cytologica, 51(3), 424–428 · Coautor: Carlos Assad-Morel.</p><a class="doctor-source-link" href="https://pubmed.ncbi.nlm.nih.gov/17536547/" target="_blank" rel="noopener noreferrer">Consultar publicación en PubMed ↗</a></div></article>
<article><span>2025</span><div><h3>Experiencia de vida real de bimekizumab en el tratamiento de la psoriasis en placas moderada a severa en población mexicana</h3></div></article>
</div></div></section>
<section class="section doctor-detail-section doctor-languages"><div class="container doctor-languages-inner"><div><span class="eyebrow">05 — Idiomas</span><h2>Atención en distintos <em>idiomas.</em></h2></div><div class="doctor-topic-list"><span>Español</span><span>Inglés</span><span>Francés</span></div></div></section>
<section class="section white"><div class="container"><div class="closing-panel"><span class="eyebrow">Dermassad · Solicitar atención</span><h2>Elige dónde quieres <em>atenderte.</em></h2><p>Consulta los canales disponibles de Monterrey / San Pedro y Playa del Carmen.</p>${link('/#sedes','Conocer nuestras sedes ↗','btn')}</div></div></section>
</main>`}
function privacy(){return `<main><div class="container legal"><span class="eyebrow">Protección de datos personales</span><h1>Aviso de privacidad</h1><div class="pending">El aviso de privacidad completo estará disponible aquí cuando la clínica habilite la recepción de datos mediante sus canales digitales.</div><p>El formulario de esta vista no registra ni transmite información.</p>${link('/','Volver al inicio ↗','btn outline')}</div></main>`}
let navigationEvents=new AbortController();
function bind(){
  navigationEvents.abort();
  navigationEvents=new AbortController();
  document.querySelectorAll('a[data-link]').forEach(a=>a.addEventListener('click',e=>{
    const dest=a.getAttribute('href')||'';
    if(dest.startsWith('#/') ){
      e.preventDefault();
      const [path,section]=dest.slice(1).split('#');
      go(path);
      if(section)setTimeout(()=>document.getElementById(section)?.scrollIntoView({behavior:'smooth',block:'start'}),60);
      return;
    }
    // Anchors within the city pages (rutas, tratamientos, agenda, etc.).
    if(dest.startsWith('#') && dest.length>1){
      e.preventDefault();
      document.getElementById(dest.slice(1))?.scrollIntoView({behavior:'smooth'});
    }
  }));
  document.querySelectorAll('a[href^="#"]:not([data-link])').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    if(!id)return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  }));
  const mobileToggle=document.getElementById('mobile-toggle');
  const mobileNav=document.getElementById('navlinks');
  const mobileBackdrop=document.getElementById('mobile-nav-backdrop');
  const closeMobileMenu=(restoreFocus=false)=>{
    if(!mobileNav||!mobileToggle)return;
    mobileNav.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded','false');
    mobileToggle.setAttribute('aria-label','Abrir menú de navegación');
    mobileToggle.querySelector('.menu-icon').textContent='☰';
    mobileToggle.querySelector('.menu-label').textContent='Menú';
    if(mobileBackdrop)mobileBackdrop.hidden=true;
    document.body.classList.remove('nav-open');
    if(restoreFocus)mobileToggle.focus();
  };
  mobileToggle?.addEventListener('click',()=>{
    const opened=!mobileNav.classList.contains('open');
    if(!opened){closeMobileMenu();return;}
    mobileNav.classList.add('open');
    mobileToggle.setAttribute('aria-expanded','true');
    mobileToggle.setAttribute('aria-label','Cerrar menú de navegación');
    mobileToggle.querySelector('.menu-icon').textContent='×';
    mobileToggle.querySelector('.menu-label').textContent='Cerrar';
    if(mobileBackdrop)mobileBackdrop.hidden=false;
    document.body.classList.add('nav-open');
    mobileNav.querySelector('a')?.focus();
  });
  mobileBackdrop?.addEventListener('click',()=>closeMobileMenu(true));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&mobileNav?.classList.contains('open'))closeMobileMenu(true);
  },{signal:navigationEvents.signal});
  mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMobileMenu()));
  window.addEventListener('resize',()=>{
    if(window.innerWidth>990&&mobileNav?.classList.contains('open'))closeMobileMenu();
  },{signal:navigationEvents.signal});
  document.getElementById('location-picker')?.addEventListener('change',e=>{if(validSede(e.target.value)){saveSede(e.target.value);go('/'+e.target.value)}});
  document.querySelectorAll('[data-treatment]').forEach(a=>a.addEventListener('click',()=>{
    const chosen=a.dataset.treatment;const selector=document.getElementById('a-service');
    if(selector)selector.value=chosen;
  }));
  document.querySelectorAll('[data-care-route]').forEach(a=>a.addEventListener('click',()=>{
    const selector=document.getElementById('a-service');
    if(selector&&a.dataset.careRoute==='valoracion')selector.value='Valoración dermatológica';
  }));
  const date=document.getElementById('a-date');
  if(date)date.min=new Date().toISOString().slice(0,10);
  document.getElementById('appointment-form')?.addEventListener('submit',e=>{
    e.preventDefault();
    document.getElementById('appointment-result').innerHTML='<div class="form-msg"><strong>Selección orientativa.</strong> No se envió información ni se realizó una reserva. Comunícate con la sede para consultar disponibilidad.</div>';
  });
}
function render(){active=route();if(validSede(active.slice(1)))saveSede(active.slice(1));let content=active==='/'?home():active==='/monterrey'?cityPage('monterrey'):active==='/playa-del-carmen'?cityPage('playa-del-carmen'):active==='/el-doctor'?doctorPage():active==='/aviso-de-privacidad'?privacy():`<main class="container legal"><h1>Página no encontrada</h1>${link('/','Volver al inicio','btn')}</main>`;document.getElementById('app').innerHTML=header(active)+content+foot()+floatingWhatsapp(active);document.title=active==='/'?'Dermatólogo en Monterrey y Playa del Carmen | Dermassad':active==='/monterrey'?'Dermatólogo en Monterrey | Dermassad':active==='/playa-del-carmen'?'Dermatólogo en Playa del Carmen | Dermassad':active==='/el-doctor'?'Dr. Carlos Javier Assad Morell | Dermassad':'Dermassad · '+active.slice(1).replaceAll('-',' ');const md=document.querySelector('meta[name=description]');if(md)md.content=active==='/'?'Dermatología en Monterrey y Playa del Carmen. Conoce motivos de consulta, tratamientos y formas de solicitar valoración en Dermassad.':`Conoce las opciones de atención dermatológica de Dermassad en ${active==='/monterrey'?'Monterrey':active==='/playa-del-carmen'?'Playa del Carmen':'México'}.`;bind()}
window.addEventListener('hashchange',()=>{
  render();
  const section=location.hash.slice(1).split('#')[1];
  if(section)setTimeout(()=>document.getElementById(section)?.scrollIntoView(),30);
  else window.scrollTo(0,0);
});
render();
const initialSection=location.hash.slice(1).split('#')[1];
if(initialSection)setTimeout(()=>document.getElementById(initialSection)?.scrollIntoView(),100);
