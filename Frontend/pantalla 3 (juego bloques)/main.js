

let bloquesContainer = document.getElementById('bloques');
let bloque1 = document.getElementById('bloque1');
let bloque2 = document.getElementById('bloque2');
let bloque3 = document.getElementById('bloque3');
let bloque4 = document.getElementById('bloque4');
let bloque5 = document.getElementById('bloque5');
let slots = document.querySelectorAll('.slot');
let dragged = null;
let input = {};
let intentos;
let paisobjetivo;
let listadescartados;
let listaposibles;

function establecerVariablesInicio(data){
  intentos = 0;
  paisobjetivo = data.pais;
  listadescartados = [];
  listaposibles = data.listaposibles;
  categorias = data.categorias;

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
  paisobjetivo: pais, //
intentos: intentos, //
listadescartados: listadescartados,//
listaposibles: listaposibles,//
}, evaluarRespuestaFront)});
