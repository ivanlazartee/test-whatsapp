/* =========================================================
   Test "¿Cuánto tiempo perdés contestando WhatsApp?"
   ========================================================= */

// ---------- Configuración ----------

const WHATSAPP = "5493816755692";          // formato internacional, sin "+" ni espacios
const SEMANAS_POR_MES = 4.33;
const RESUELVE_UNA_WEB = 0.7;              // 7 de cada 10 preguntas repetidas se responden solas

// ---------- Preguntas ----------

const PREGUNTAS = [
  {
    id: "rubro",
    tipo: "unica",
    titulo: "¿De qué es tu negocio?",
    opciones: [
      { valor: "gastronomia",    texto: "Gastronomía",               desc: "Bar, resto, delivery, cafetería" },
      { valor: "comercio",       texto: "Comercio o tienda",         desc: "Ropa, accesorios, regalería, ferretería" },
      { valor: "salud",          texto: "Salud o estética",          desc: "Consultorio, peluquería, uñas, spa" },
      { valor: "profesional",    texto: "Servicios profesionales",   desc: "Contador, abogado, arquitecto, técnico" },
      { valor: "turismo",        texto: "Turismo o alojamiento",     desc: "Cabañas, hostel, excursiones" },
      { valor: "otro",           texto: "Otro rubro",                desc: "" },
    ],
  },
  {
    id: "consultas",
    tipo: "unica",
    titulo: "¿Cuántas consultas de clientes te llegan por WhatsApp por día?",
    ayuda: "Contá chats, no mensajes: si una persona te escribe 5 veces, es una consulta.",
    opciones: [
      { valor: 5,  texto: "Menos de 10" },
      { valor: 20, texto: "Entre 10 y 30" },
      { valor: 45, texto: "Entre 30 y 60" },
      { valor: 75, texto: "Más de 60" },
    ],
  },
  {
    id: "repetidas",
    tipo: "unica",
    titulo: "¿Cuántas de esas consultas preguntan lo mismo?",
    ayuda: "Precios, horarios, si hay stock, dónde están, si hacen envíos.",
    opciones: [
      { valor: 0.2,  texto: "Pocas" },
      { valor: 0.5,  texto: "Más o menos la mitad" },
      { valor: 0.75, texto: "La mayoría" },
      { valor: 0.9,  texto: "Casi todas" },
    ],
  },
  {
    id: "minutos",
    tipo: "unica",
    titulo: "¿Cuánto tiempo te lleva responder cada una?",
    ayuda: "Desde que abrís el chat hasta que lo cerrás: buscar el precio, mandar fotos, esperar que te contesten.",
    opciones: [
      { valor: 1,   texto: "Un minuto" },
      { valor: 2.5, texto: "Entre 2 y 3 minutos" },
      { valor: 5,   texto: "Unos 5 minutos" },
      { valor: 8,   texto: "Más de 5 minutos" },
    ],
  },
  {
    id: "dias",
    tipo: "rango",
    titulo: "¿Cuántos días por semana respondés mensajes?",
    min: 1,
    max: 7,
    inicial: 6,
  },
  {
    id: "herramientas",
    tipo: "multiple",
    titulo: "¿Qué de esto ya tenés?",
    ayuda: "Elegí todas las que correspondan.",
    opciones: [
      { valor: "catalogo", texto: "Catálogo o carta online con precios" },
      { valor: "turnos",   texto: "Turnos o reservas online" },
      { valor: "pedidos",  texto: "Pedidos online" },
      { valor: "rapidas",  texto: "Respuestas rápidas de WhatsApp Business" },
      { valor: "web",      texto: "Página web propia" },
      { valor: "ninguna",  texto: "Nada de esto todavía" },
    ],
  },
];

// ---------- Recomendaciones por rubro ----------
// "necesita": qué herramienta resuelve el problema. Si ya la tiene, pasamos a la siguiente.

const RECOS = {
  gastronomia: [
    { necesita: "catalogo", titulo: "Carta digital con QR", texto: "Precios, fotos y horarios siempre actualizados. El cliente la ve antes de escribirte y te llega directo el pedido." },
    { necesita: "pedidos",  titulo: "Pedidos que llegan armados", texto: "El cliente elige en la carta y te llega un solo mensaje con el pedido completo, la dirección y la forma de pago." },
  ],
  comercio: [
    { necesita: "catalogo", titulo: "Catálogo online con stock", texto: "Cada producto con fotos, talles y precio. Las preguntas de \"¿precio?\" y \"¿hay stock?\" se responden solas." },
    { necesita: "pedidos",  titulo: "Carrito que arma el pedido", texto: "El cliente elige productos y te llega un WhatsApp con todo listo para cobrar, sin ir y venir de mensajes." },
  ],
  salud: [
    { necesita: "turnos",   titulo: "Turnos online", texto: "Tus clientes ven los horarios libres y reservan solos, a cualquier hora. Vos solo confirmás." },
    { necesita: "catalogo", titulo: "Lista de servicios y precios", texto: "Cada tratamiento con duración y precio, para que lleguen al chat sabiendo qué quieren." },
  ],
  profesional: [
    { necesita: "web",      titulo: "Web con servicios y preguntas frecuentes", texto: "Qué hacés, cuánto cuesta aproximadamente y qué necesitás del cliente. Llegan consultas más claras y mejor filtradas." },
    { necesita: "turnos",   titulo: "Agenda de reuniones online", texto: "Que el cliente elija el horario para la primera consulta sin coordinar por chat." },
  ],
  turismo: [
    { necesita: "web",      titulo: "Web con fotos, tarifas y disponibilidad", texto: "Lo que más preguntan los huéspedes, a la vista. Y un botón para consultar fechas que llega con todos los datos." },
    { necesita: "turnos",   titulo: "Reservas online", texto: "El huésped elige fechas, ve el precio total y reserva sin esperar que le contestes." },
  ],
  otro: [
    { necesita: "web",      titulo: "Página con precios y preguntas frecuentes", texto: "Un link para mandar en vez de escribir lo mismo veinte veces por día." },
    { necesita: "catalogo", titulo: "Catálogo de productos o servicios", texto: "Todo lo que ofrecés en un solo lugar, fácil de compartir por WhatsApp e Instagram." },
  ],
};

// Si ya tiene todo lo básico, le ofrecemos mejorar lo que tiene
const RECOS_YA_TIENE = [
  { necesita: null, titulo: "Rediseño y nuevas funciones", texto: "Ya tenés lo básico. Podemos renovar el diseño de tu web o proyecto y sumarle lo que hoy le falta, para que responda más preguntas sola y se vea profesional." },
  { necesita: null, titulo: "Mantenimiento mensual", texto: "Precios, fotos y horarios siempre al día, sin que tengas que tocar nada. Me pasás los cambios por WhatsApp y yo los actualizo." },
];

// Si ya tiene web o catálogo, también le ofrecemos mantenerlo
const RECO_MANTENIMIENTO = RECOS_YA_TIENE[1];

const TIP_RAPIDAS = { titulo: "Activá las respuestas rápidas", texto: "En WhatsApp Business podés guardar respuestas y mandarlas escribiendo \"/\". Guardá las 5 preguntas que más te hacen: es gratis y lo hacés hoy." };

// ---------- Estado ----------

const respuestas = {};
let indice = 0;

// ---------- DOM ----------

const $ = (id) => document.getElementById(id);
const pantallas = {
  intro: $("pantalla-intro"),
  quiz: $("pantalla-quiz"),
  resultado: $("pantalla-resultado"),
};
const form = $("form-pregunta");
const btnAtras = $("btn-atras");
const btnSiguiente = $("btn-siguiente");

function mostrar(nombre) {
  Object.entries(pantallas).forEach(([k, el]) => (el.hidden = k !== nombre));
  window.scrollTo({ top: 0 });
}

// ---------- Render de una pregunta ----------

function renderPregunta() {
  const p = PREGUNTAS[indice];
  $("progreso-texto").textContent = `Pregunta ${indice + 1} de ${PREGUNTAS.length}`;
  $("progreso-relleno").style.width = `${(indice / PREGUNTAS.length) * 100}%`;
  btnAtras.textContent = indice === 0 ? "Volver al inicio" : "Atrás";

  form.replaceChildren();

  const titulo = document.createElement("h2");
  titulo.className = "pregunta__titulo";
  titulo.id = "pregunta-titulo";
  titulo.tabIndex = -1;
  titulo.textContent = p.titulo;
  form.append(titulo);

  if (p.ayuda) {
    const ayuda = document.createElement("p");
    ayuda.className = "pregunta__ayuda";
    ayuda.textContent = p.ayuda;
    form.append(ayuda);
  }

  if (p.tipo === "rango") renderRango(p);
  else renderOpciones(p);

  actualizarSiguiente();
  titulo.focus();
}

function renderOpciones(p) {
  const lista = document.createElement("div");
  lista.className = "opciones";
  lista.setAttribute("role", "group");
  lista.setAttribute("aria-labelledby", "pregunta-titulo");

  p.opciones.forEach((op) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `opcion${p.tipo === "multiple" ? " opcion--multiple" : ""}`;
    btn.dataset.valor = op.valor;
    btn.setAttribute("aria-pressed", estaElegida(p, op.valor));
    btn.innerHTML = `
      <span class="opcion__marca" aria-hidden="true"></span>
      <span class="opcion__texto">
        <span class="opcion__titulo"></span>
        ${op.desc ? '<span class="opcion__desc"></span>' : ""}
      </span>`;
    btn.querySelector(".opcion__titulo").textContent = op.texto;
    if (op.desc) btn.querySelector(".opcion__desc").textContent = op.desc;
    btn.addEventListener("click", () => elegir(p, op.valor));
    lista.append(btn);
  });

  form.append(lista);
}

function renderRango(p) {
  if (respuestas[p.id] === undefined) respuestas[p.id] = p.inicial;
  const caja = document.createElement("div");
  caja.className = "dias";
  caja.innerHTML = `
    <p class="dias__valor"><output id="dias-valor"></output> <span>días por semana</span></p>
    <input type="range" id="dias-input" min="${p.min}" max="${p.max}" step="1" aria-labelledby="pregunta-titulo">
    <div class="dias__escala" aria-hidden="true"><span>${p.min}</span><span>${p.max}</span></div>`;
  form.append(caja);

  const input = caja.querySelector("input");
  const salida = caja.querySelector("output");
  input.value = respuestas[p.id];
  salida.textContent = input.value;
  input.addEventListener("input", () => {
    respuestas[p.id] = Number(input.value);
    salida.textContent = input.value;
  });
}

function estaElegida(p, valor) {
  const r = respuestas[p.id];
  return p.tipo === "multiple" ? Array.isArray(r) && r.includes(valor) : r === valor;
}

// ---------- Elegir respuestas ----------

function elegir(p, valor) {
  if (p.tipo === "multiple") {
    let lista = respuestas[p.id] || [];
    if (valor === "ninguna") {
      lista = lista.includes("ninguna") ? [] : ["ninguna"];
    } else {
      lista = lista.filter((v) => v !== "ninguna");
      lista = lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];
    }
    respuestas[p.id] = lista;
    form.querySelectorAll(".opcion").forEach((b) => {
      b.setAttribute("aria-pressed", lista.includes(b.dataset.valor));
    });
    actualizarSiguiente();
    return;
  }

  // Única: marcamos y pasamos a la siguiente después de un instante
  respuestas[p.id] = valor;
  form.querySelectorAll(".opcion").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.valor) === String(valor));
  });
  setTimeout(avanzar, 220);
}

function actualizarSiguiente() {
  const p = PREGUNTAS[indice];
  const esUltima = indice === PREGUNTAS.length - 1;
  btnSiguiente.textContent = esUltima ? "Ver mi resultado" : "Siguiente";
  btnSiguiente.hidden = p.tipo === "unica";
  btnSiguiente.disabled = p.tipo === "multiple" && !(respuestas[p.id] || []).length;
  btnSiguiente.style.opacity = btnSiguiente.disabled ? 0.5 : 1;
}

function avanzar() {
  if (indice < PREGUNTAS.length - 1) {
    indice++;
    renderPregunta();
  } else {
    mostrarResultado();
  }
}

function retroceder() {
  if (indice === 0) {
    mostrar("intro");
    return;
  }
  indice--;
  renderPregunta();
}

// ---------- Cálculo ----------
// Ejemplo: 20 consultas × 2,5 min = 50 min por día
//          50 min × 6 días × 4,33 semanas = 1.299 min = 21,7 h por mes
//          21,7 h × 75 % repetidas = 16,2 h · × 70 % = 11,4 h recuperables

function calcular(r) {
  const minutosDia = r.consultas * r.minutos;
  const horasMes = (minutosDia * r.dias * SEMANAS_POR_MES) / 60;
  const horasRepetidas = horasMes * r.repetidas;
  const horasRecuperables = horasRepetidas * RESUELVE_UNA_WEB;
  return { minutosDia, horasMes, horasRepetidas, horasRecuperables };
}

const num = (n, dec = 1) => n.toLocaleString("es-AR", { maximumFractionDigits: dec });

function textoHoras(h) {
  if (h < 1) return `${Math.round(h * 60)} minutos`;
  const r = Math.round(h);
  return `${r} ${r === 1 ? "hora" : "horas"}`;
}

function textoOpcion(id, valor) {
  const p = PREGUNTAS.find((q) => q.id === id);
  return p.opciones.find((o) => o.valor === valor)?.texto ?? valor;
}

// ---------- Resultado ----------

function mostrarResultado() {
  const r = respuestas;
  const c = calcular(r);

  mostrar("resultado");
  $("resultado-intro").focus();

  // Número grande con conteo
  animarNumero($("horas-total"), Math.round(c.horasMes));
  $("horas-total").parentElement.querySelector("span").textContent = Math.round(c.horasMes) === 1 ? "hora" : "horas";

  const jornadas = c.horasMes / 8;
  $("jornadas-texto").textContent = jornadas >= 1
    ? `Son ${num(jornadas)} jornadas completas de 8 horas, todos los meses.`
    : `Es casi ${Math.max(1, Math.round(jornadas * 8))} hora${Math.round(jornadas * 8) > 1 ? "s" : ""} de una jornada de 8, todos los meses.`;

  // Cuadraditos: uno por hora (máximo 80). Los ocres son las horas recuperables.
  const total = Math.min(Math.round(c.horasMes), 80);
  const recup = Math.min(Math.round(c.horasRecuperables), total);
  const grilla = $("jornadas");
  grilla.replaceChildren();
  for (let i = 0; i < total; i++) {
    const s = document.createElement("span");
    if (i < recup) s.className = "rep";
    s.style.animationDelay = `${Math.min(i * 18, 900)}ms`;
    grilla.append(s);
  }

  $("horas-recuperables").textContent = textoHoras(c.horasRecuperables);

  // Paso a paso del cálculo, con tus números
  const pasos = [
    `${r.consultas} consultas × ${num(r.minutos)} min = ${num(c.minutosDia, 0)} min por día`,
    `${num(c.minutosDia, 0)} min × ${r.dias} días × ${num(SEMANAS_POR_MES, 2)} semanas = ${num(c.horasMes)} horas por mes`,
    `${num(c.horasMes)} h × ${Math.round(r.repetidas * 100)} % repetidas = ${num(c.horasRepetidas)} h`,
    `${num(c.horasRepetidas)} h × ${Math.round(RESUELVE_UNA_WEB * 100)} % que se responden solas = ${num(c.horasRecuperables)} h recuperables`,
  ];
  $("calculo-pasos").replaceChildren(...pasos.map((t) => Object.assign(document.createElement("li"), { textContent: t })));

  renderRecos(r);
  armarWhatsApp(r, c);
}

function animarNumero(el, destino) {
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducir || destino < 2) {
    el.textContent = destino;
    return;
  }
  const inicio = performance.now();
  const dur = 900;
  const frame = (t) => {
    const p = Math.min((t - inicio) / dur, 1);
    const suave = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(destino * suave);
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function renderRecos(r) {
  const tiene = r.herramientas || [];
  const opciones = RECOS[r.rubro] || RECOS.otro;
  const faltan = opciones.filter((o) => !tiene.includes(o.necesita));
  const elegidas = faltan.length ? faltan : RECOS_YA_TIENE;

  const items = elegidas.map((o, i) => crearReco(o, i === 0 ? "Lo más importante" : "Después"));

  // Tiene web o catálogo pero todavía le falta algo: sumamos el mantenimiento
  const tieneAlgoOnline = tiene.includes("web") || tiene.includes("catalogo");
  if (faltan.length && tieneAlgoOnline) items.push(crearReco(RECO_MANTENIMIENTO, "Para lo que ya tenés"));
  if (!tiene.includes("rapidas")) items.push(crearReco(TIP_RAPIDAS, "Gratis, hoy mismo", true));

  $("recos").replaceChildren(...items);
}

function crearReco(o, etiqueta, gratis = false) {
  const li = document.createElement("li");
  li.className = "reco";
  li.innerHTML = `<span class="reco__etiqueta${gratis ? " reco__etiqueta--gratis" : ""}"></span><h3></h3><p></p>`;
  li.querySelector("span").textContent = etiqueta;
  li.querySelector("h3").textContent = o.titulo;
  li.querySelector("p").textContent = o.texto;
  return li;
}

function armarWhatsApp(r, c) {
  const tiene = (r.herramientas || []).filter((v) => v !== "ninguna");
  const herramientas = tiene.length
    ? tiene.map((v) => textoOpcion("herramientas", v).toLowerCase()).join(", ")
    : "nada de eso todavía";

  const mensaje = [
    "¡Hola NorteDigitalDev! Hice el test y quiero el diagnóstico gratis de mi negocio.",
    "",
    `• Rubro: ${textoOpcion("rubro", r.rubro)}`,
    `• Consultas por día: ${textoOpcion("consultas", r.consultas).toLowerCase()}`,
    `• Preguntas repetidas: ${textoOpcion("repetidas", r.repetidas).toLowerCase()}`,
    `• Tiempo en WhatsApp: ${textoHoras(c.horasMes)} por mes`,
    `• Ya tengo: ${herramientas}`,
  ].join("\n");

  $("btn-whatsapp").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

// ---------- Compartir ----------

async function compartir() {
  const c = calcular(respuestas);
  const datos = {
    title: "¿Cuánto tiempo perdés contestando WhatsApp?",
    text: `Paso ${textoHoras(c.horasMes)} por mes contestando WhatsApp. ¿Y vos?`,
    url: location.origin + location.pathname,
  };
  try {
    if (navigator.share) {
      await navigator.share(datos);
    } else {
      await navigator.clipboard.writeText(`${datos.text} ${datos.url}`);
      avisar("Link copiado");
    }
  } catch (e) {
    // Si el usuario cancela el menú de compartir no hacemos nada
  }
}

function avisar(texto) {
  const t = $("toast");
  t.textContent = texto;
  t.classList.add("visible");
  setTimeout(() => t.classList.remove("visible"), 2200);
}

// ---------- Eventos ----------

$("btn-empezar").addEventListener("click", () => {
  indice = 0;
  mostrar("quiz");
  renderPregunta();
});

btnAtras.addEventListener("click", retroceder);
btnSiguiente.addEventListener("click", () => {
  if (!btnSiguiente.disabled) avanzar();
});

$("btn-compartir").addEventListener("click", compartir);

$("btn-reiniciar").addEventListener("click", () => {
  Object.keys(respuestas).forEach((k) => delete respuestas[k]);
  indice = 0;
  mostrar("quiz");
  renderPregunta();
});
