connect2Server();

let modal = document.getElementById("myModal")
let mensajeResultado = document.getElementById("mensajeResultado");
let bloquesContainer = document.getElementById('bloques');
let bloque1 = document.getElementById('bloque1');
let bloque2 = document.getElementById('bloque2');
let bloque3 = document.getElementById('bloque3');
let bloque4 = document.getElementById('bloque4');
let bloque5 = document.getElementById('bloque5');
let slots = document.querySelectorAll('.slot');
let respuesta =  document.getElementById("respuestaDiv");
let dragged = null;
let input = {};
let intentos;
let paisobjetivo;
let listadescartados;
let listaposibles;
let usuario = sessionStorage.getItem("usuario") ?? "Sin usuario";

function mostrarPopUp(intentos) {
  mensajeResultado.innerText = "¡Adivinaste el país ("+ labelPaisObjetivo +")! Te llevó " + intentos +" intentos.";
  modal.style.display = "block"; 
}

function actualizarCategorias(data){
  categorias = data
  bloque1.innerText = categorias[0].label;
  bloque2.innerText = categorias[1].label;
  bloque3.innerText = categorias[2].label;
  bloque4.innerText = categorias[3].label;
  bloque5.innerText = categorias[4].label;
};



function evaluarRespuestaFront(data){
  listadescartados = data.listadescartados;
  listaposibles = data.listaposibles;
  intentos = data.intentos;
if (data.victoria){
mostrarPopUp(data.intentos);
enviarstats();
document.getElementById("btnAdivinar").disabled = true;
getEvent("iniciarBloques",establecerVariablesInicio);
}
else {
respuesta.classList.remove("invisible");
respuesta.innerText = "Respuesta: "+data.respuesta;
actualizarListasFront(data.listaposibles, data.listadescartados);
postEvent("obtenerCategorias",{pais:paisobjetivo}, actualizarCategorias)
}
}

async function enviarstats(){
  console.log("envio de stats iniciado")
  postEvent("recibirStats",{nombre:usuario},getStats);
}

function getStats(data){
  stats = data;
  console.log(stats);
  if (!stats) stats = {};
  stats.stats ??= {};
  stats.stats.bloques ??= {};
  
  let prevIntentos = Number(stats.stats.bloques.intentos);
  if (!Number.isFinite(prevIntentos)) prevIntentos = 0;
  let currentIntentos = Number(intentos);
  if (!Number.isFinite(currentIntentos)) currentIntentos = 0;

  let statintentos = Math.min(currentIntentos, prevIntentos || currentIntentos);

  stats.stats.bloques.intentos = statintentos;
  console.log(intentos, prevIntentos, stats.stats.bloques.intentos);
  stats.stats.bloques.intentos ??= statintentos; 

  postEvent("guardarStats",{nombre:usuario, stats:stats.stats},guardarStats);
 }
 
 function guardarStats(){};

function establecerVariablesInicio(data){
  intentos = 0;
  paisobjetivo = data.pais;
  labelPaisObjetivo = data.labelPaisObjetivo;
  listadescartados = [];
  listaposibles = data.listaposibles;
  categorias = data.categorias;
  bloque1.innerText = categorias[0].label;
  bloque2.innerText = categorias[1].label;
  bloque3.innerText = categorias[2].label;
  bloque4.innerText = categorias[3].label;
  bloque5.innerText = categorias[4].label;
  }

getEvent("iniciarBloques",establecerVariablesInicio);

document.querySelectorAll('.bloque').forEach(bloque => {
  bloque.addEventListener('dragstart', e => {
    dragged = e.target;
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => bloque.style.opacity = "0.3", 0);
  });

  bloque.addEventListener('dragend', () => {
    dragged.style.opacity = "1";
    dragged = null;
  });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', e => {
    e.preventDefault();

    if (dragged && dragged.id === "MOM" && slot.id !== "slot2") return; 
    if (dragged && dragged.id !== "MOM" && slot.id === "slot2") return;

    slot.classList.add('hovered');
  });

  slot.addEventListener('dragleave', () => {
    slot.classList.remove('hovered');
  });

  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('hovered');

    if (dragged && dragged.id === "MOM" && slot.id !== "slot2") return;
    if (dragged && dragged.id !== "MOM" && slot.id === "slot2") return;

    if (slot.firstChild) {
      bloquesContainer.appendChild(slot.firstChild);
    }

    slot.appendChild(dragged);
    dragged.style.margin = "0";
  });
});

bloquesContainer.addEventListener('dragover', e => e.preventDefault());
bloquesContainer.addEventListener('drop', e => {
  e.preventDefault();
  if (dragged) {
    bloquesContainer.appendChild(dragged);
    dragged.style.margin = "5px";
  }
});

let valorSlot1 = "";
let valorSlot2 = "";
let valorInputFinal = 0;

document.getElementById('btnAdivinar').addEventListener('click', () => {
  valorSlot1 = document.querySelector('#slot1').textContent.trim();
  valorSlot2 = document.querySelector('#slot2').textContent.trim();
  valorInputFinal = document.querySelector('#inputFinal').value.trim();

  // Validar que todo esté completo
  if (!valorSlot1 || !valorSlot2 || !valorInputFinal) {
    mostrarError("Debes completar todos los campos antes de adivinar.");
    return;
  }

  input = {
    comparacion: valorSlot2,
    valor: parseInt(valorInputFinal),
    categoria: valorSlot1
  };

  postEvent("evaluarRespuestaBloques", {
    input: input,
    paisobjetivo: paisobjetivo,
    intentos: intentos,
    listadescartados: listadescartados,
    listaposibles: listaposibles,
  }, evaluarRespuestaFront);
});


function actualizarListasFront(posibles, descartados) {
  const ulPosibles = document.getElementById("ulPosibles");
  const ulDescartados = document.getElementById("ulDescartados");

  ulPosibles.innerHTML = "";
  ulDescartados.innerHTML = "";

  posibles.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.label || p.pais;
    ulPosibles.appendChild(li);
  });

  descartados.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.label || p.pais;
    ulDescartados.appendChild(li);
  });

  document.getElementById("posiblesHTMLTexto").innerText = "Posibles ("+posibles.length+")";
  document.getElementById("descartadosHTMLTexto").innerText = "Descartados ("+descartados.length+")";
}

// Función para mostrar popup de error
function mostrarError(mensaje) {
  const errorModal = document.getElementById("errorModal");
  const errorMensaje = document.getElementById("errorMensaje");
  errorMensaje.innerText = mensaje;
  errorModal.style.display = "block";
}

// Cerrar el popup
document.getElementById("cerrarError").addEventListener("click", () => {
  document.getElementById("errorModal").style.display = "none";
});

// También cerrar si se hace clic fuera
window.addEventListener("click", (e) => {
  const modal = document.getElementById("errorModal");
  if (e.target === modal) modal.style.display = "none";
});
