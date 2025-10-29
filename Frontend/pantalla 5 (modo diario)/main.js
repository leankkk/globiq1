connect2Server();
let input = document.getElementById('input');
let boton = document.getElementById('enviar');
let listaPistas = document.getElementById('listaPistas');
let popup = document.getElementById('popup');
let btnOk = document.getElementById('btn-ok');
let intentosDOM = document.getElementById("cantidaddeintentosDOM");
let usuario = sessionStorage.getItem("usuario") ?? "Sin usuario";

let paisDiario;
let intentos = 0;

async function enviarstats(){
  console.log("envio de stats iniciado")
postEvent("recibirStats",{nombre:usuario},getStats);
}

function getStats(data){
stats = data;
console.log(stats);
stats.stats.diario ??= {};
let puntaje = stats.stats.diario.puntaje ?? Math.min(intentos, stats.stats.diario.puntaje);
stats.stats.diario.puntaje ??= intentos;
stats.stats.diario.puntaje = Math.min(intentos, stats.stats.diario.puntaje);
console.log(puntaje, intentos, stats.stats.diario.puntaje);
stats.stats.diario.puntaje ??= puntaje; 
postEvent("guardarStats",{stats},guardarStats);
}

function guardarStats(){};

function establecerPaisDiario(data) {
  paisDiario = data.label;
}

function mostrarPista(data) {
  let nuevaPista = document.createElement('div');
  nuevaPista.classList.add('pista-item');
  intentos++;
  nuevaPista.textContent = intentos + ". " + data.label + ": " + data.valor;
  listaPistas.appendChild(nuevaPista);
  listaPistas.scrollTop = listaPistas.scrollHeight; // hace que scrollee automáticamente
}

getEvent("obtenerPaisDiario",establecerPaisDiario)

boton.addEventListener('click', () => {
  let respuesta = input.value.trim().toLowerCase();

  if (respuesta === paisDiario.toLowerCase()) {
    intentosDOM.innerText = "Cantidad de pistas:  "+intentos;
    popup.style.display = "flex";
    enviarstats();
    input.disabled = "disabled";
  } else {
    // pedimos pista al backend
    postEvent("obtenerPista", {}, mostrarPista);
  }

  input.value = ""; // limpia input después de cada intento
});

btnOk.addEventListener('click', () => {
  popup.style.display = "none";
});
