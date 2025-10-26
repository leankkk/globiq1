c// ======================
// CONEXIÓN CON BACKEND
// ======================

// Llama a SoqueTIC
connect2Server();

/* main.js
  - Asume que conectaste soqueTIC con connect2Server()
  - Asume que en el HTML tu SVG tiene <path id="AR" class="land" title="Argentina"> ...
*/

// -------------------- Conexión SoqueTIC --------------------
if (typeof connect2Server === 'function') {
  // inicializa la conexión (puerto default 3000)
  try { connect2Server(); } catch (e) { console.warn("connect2Server error:", e); }
} else {
  console.warn("connect2Server no está definida. Asegurate de incluir soquetic-client.js");
}

// Helper: mayúsculas en IDs
function idFromCode(code){
  if(!code) return null;
  return String(code).toUpperCase();
}

// -------------------- Drag & Drop --------------------
document.querySelectorAll('.bloque').forEach(b => {
  b.addEventListener('dragstart', (e) => {
    // guardamos tipo y valor en JSON para poder recuperar
    const payload = {
      kind: b.dataset.kind || 'text',
      value: b.dataset.value || b.textContent.trim(),
      text: b.textContent.trim()
    };
    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    b.classList.add('dragging');
  });
  b.addEventListener('dragend', (e) => b.classList.remove('dragging'));
});

// Permitimos drops en las tres dropzones
const dropCategoria = document.getElementById('dropCategoria');
const dropComparador = document.getElementById('dropComparador');
const dropValor = document.getElementById('dropValor');
const dropzones = [dropCategoria, dropComparador, dropValor];

dropzones.forEach(zone => {
  zone.addEventListener('dragover', (e) => e.preventDefault());
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    let raw = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');
    let payload;
    try { payload = JSON.parse(raw); } catch (err) { payload = { text: raw, kind: 'text', value: raw }; }

    // crear bloque visual dentro de la dropzone
    const nb = document.createElement('div');
    nb.className = 'bloque';
    nb.textContent = payload.text || payload.value;
    nb.dataset.kind = payload.kind;
    nb.dataset.value = payload.value;
    // permitimos remover bloques con doble click
    nb.addEventListener('dblclick', () => nb.remove());
    zone.innerHTML = ''; // para que cada zona solo tenga 1 bloque (como el mock)
    zone.appendChild(nb);
  });
});

// -------------------- Construcción del objeto input --------------------
// Esta función lee las 3 dropzones y arma el objeto que espera tu backend
function construirInputDesdeDropzones(){
  const categoriaNode = dropCategoria.querySelector('.bloque');
  const comparadorNode = dropComparador.querySelector('.bloque');
  const valorNode = dropValor.querySelector('.bloque');

  const categoria = categoriaNode ? (categoriaNode.dataset.value || categoriaNode.textContent.trim()) : undefined;
  const comparacion = comparadorNode ? (comparadorNode.dataset.value || comparadorNode.textContent.trim().toLowerCase()) : undefined;
  let valor = valorNode ? (valorNode.dataset.value || valorNode.textContent.trim()) : undefined;

  // intentar parsear valor numérico si parece número
  if (valor !== undefined) {
    const n = Number(String(valor).replace(/[^\d\.\-]/g,''));
    if (!Number.isNaN(n)) valor = n;
  }

  // retornamos el objeto con la forma que tu backend usa: {valor, comparacion, categoria, categorialabel}
  return {
    valor: valor,
    comparacion: comparacion, // 'mayor' o 'menor' idealmente
    categoria: categoria,     // path tipo "economy.gdp.value"
    categorialabel: categoriaNode ? categoriaNode.textContent.trim() : undefined
  };
}

// -------------------- Botón Intentar --------------------
const btnIntentar = document.getElementById('btnIntentar');
btnIntentar.addEventListener('click', () => {
  const input = construirInputDesdeDropzones();
  // Pedimos también el pais objetivo que el frontend debe conocer (si lo tenés)
  const paisInput = document.getElementById('paisInput').value.trim().toLowerCase();

  // Preparamos payload para el backend según tu spec
  const payload = {
    input: input,
    pais: paisInput || undefined,
    intentos: 0
  };

  // Llamada SoqueTIC
  if (typeof postEvent === 'function') {
    postEvent("recibirInputBloques", payload, (data) => {
      console.log("Respuesta backend recibirInputBloques:", data);
      // Datos que tu backend devuelve (según tu código): listaposibles (array), listadescartados (array)
      // Algunos endpoints devuelven listadescartados no enviándolos (comentado en tu backend), así que hacemos defensivo
      const posibles = (data.listaposibles || []).map(p => (p.pais || p).toString().toUpperCase());
      const descartados = (data.listadescartados || []).map(p => (p.pais || p).toString().toUpperCase());

      // Si backend no devuelve listadescartados pero sí listaposibles, inferimos descartados = todos - posibles
      if ((!data.listadescartados || data.listadescartados.length === 0) && posibles.length > 0) {
        // todos los ids presentes en el SVG que tengan class land
        const all = Array.from(document.querySelectorAll('.mapa .land')).map(el => el.id.toUpperCase()).filter(Boolean);
        const setPos = new Set(posibles);
        const inferredDesc = all.filter(id => !setPos.has(id));
        pintarMapa(posibles, inferredDesc);
      } else {
        pintarMapa(posibles, descartados);
      }

      // si hay victoria, tu backend lo devuelve en 'victoria' según otra función; lo mostramos
      if (data.victoria === true) {
        alert("¡Victoria! Encontraste el país objetivo.");
      } else if (data.respuesta) {
        // si tu backend devuelve respuesta 'Sí'/'No', lo mostramos pequeño
        console.log("Respuesta:", data.respuesta);
      }
    });
  } else {
    console.warn("postEvent no está definido: soquetic-client.js no cargado.");
  }
});

// -------------------- Pintado del SVG --------------------
function pintarMapa(posibles = [], descartados = []) {
  // normalizamos listas a mayúsculas
  const setPosibles = new Set((posibles || []).map(s => s.toString().toUpperCase()));
  const setDesc = new Set((descartados || []).map(s => s.toString().toUpperCase()));

  // Primero limpiamos clases
  document.querySelectorAll('.mapa .land').forEach(p => {
    p.classList.remove('posible','descartado');
    // restauramos estilo base (si el svg ya tenía inline style no lo tocamos más que quitar clases)
    // no hacemos style.fill directo para no sobreescribir estilos que tengas en tu svg
  });

  // Aplicamos posibles y descartados (si existe el elemento)
  setPosibles.forEach(code => {
    const el = document.getElementById(code);
    if (el) el.classList.add('posible');
  });
  setDesc.forEach(code => {
    const el = document.getElementById(code);
    if (el) el.classList.add('descartado');
  });
}

// -------------------- Selección de país manual (input + click en SVG) --------------------
// click en SVG: escribe el input y aplica un highlight temporal
document.querySelectorAll('.mapa .land').forEach(p => {
  p.addEventListener('click', () => {
    const title = p.getAttribute('title') || p.getAttribute('name') || p.id;
    const input = document.getElementById('paisInput');
    if (input) input.value = title;
    // marcar visualmente (clase CSS específica)
    document.querySelectorAll('.mapa .land').forEach(x => x.classList.remove('selected'));
    p.classList.add('selected');
    // opcional: si querés que seleccionar país lo envie al servidor como guess, podés llamar a otra función aquí
  });
});

// Botón lupa/flag: buscar por nombre de país escrito
document.getElementById('btnSelectCountry').addEventListener('click', () => {
  const q = document.getElementById('paisInput').value.trim().toLowerCase();
  if (!q) return alert("Escribí el nombre del país (ej: Argentina)");

  let found = false;
  document.querySelectorAll('.mapa .land').forEach(p => {
    const title = (p.getAttribute('title') || '').toLowerCase();
    if (title === q) {
      p.click();
      found = true;
    }
  });

  if (!found) {
    alert("País no encontrado en el mapa (revisá exactitud del nombre).");
  }
});
