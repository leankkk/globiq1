connect2Server();

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

function mostrarPopUp(intentos) {
  mensajeResultado.innerText = "¡Adivinaste el país ("+ listaposibles[0].nombre +")! Te llevó " + intentos +" intentos.";
  modal.style.display = "block"; 
}

function evaluarRespuestaFront(data){
if (data.victoria){
mostrarPopUp(data.intentos);
enviarstats();
document.getElementById("btnAdivinar").disabled = true;
}
else {
respuesta.classList.remove("invisible");
respuesta.innerText = "Respuesta: "+data.respuesta;
}
}

async function enviarstats(){
  console.log("envio de stats iniciado")
postEvent("recibirStats",{nombre:usuario},getStats);
}

function getStats(data){
  stats = data;
  console.log(stats);
  stats.stats.bloques ??= {};
  let statintentos = stats.stats.bloques.statintentos ?? Math.max(timer, stats.stats.bloques.statintentos);
  stats.stats.bloques.statintentos = Math.max(timer, stats.stats.bloques.statintentos);
  console.log(statintentos, timer, stats.stats.bloques.statintentos);
  stats.stats.bloques.statintentos ??= statintentos; 
  postEvent("guardarStats",{stats},guardarStats);
 }
 
 function guardarStats(){};

function establecerVariablesInicio(data){
  intentos = 0;
  paisobjetivo = data.pais;
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
  valorInputFinal = document.querySelector('#inputFinal').value;
input = {
  comparacion: valorSlot2,
  valor: parseInt(valorInputFinal),
  categoria: valorSlot1
}
postEvent("evaluarRespuestaBloques",{
  input: input,
  paisobjetivo: paisobjetivo, //
intentos: intentos, //
listadescartados: listadescartados,//
listaposibles: listaposibles,//
}, evaluarRespuestaFront)});
