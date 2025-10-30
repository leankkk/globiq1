connect2Server();
let input = document.getElementById('input');
let boton = document.getElementById('enviar');
let listaPistas = document.getElementById('listaPistas');
let popup = document.getElementById('popup');
let btnOk = document.getElementById('btn-ok');
let intentosDOM = document.getElementById("cantidaddeintentosDOM");
let usuario = sessionStorage.getItem("usuario") ?? "Sin usuario";
let btnCambiarCategoria = document.getElementById("btnCambiarCategoria");
let intentosFallidos = [];  // Array para almacenar los intentos fallidos


let paisDiario;
let intentos = 0;


async function enviarstats(){
  console.log("envio de stats iniciado");
  postEvent("recibirStats", { nombre: usuario }, getStats);
}


function getStats(data) {
  stats = data;
  console.log(stats);
  stats.stats.diario ??= {};
  let puntaje = stats.stats.diario.puntaje ?? Math.min(intentos, stats.stats.diario.puntaje);
  stats.stats.diario.puntaje ??= intentos;
  stats.stats.diario.puntaje = Math.min(intentos, stats.stats.diario.puntaje);
  console.log(puntaje, intentos, stats.stats.diario.puntaje);
  stats.stats.diario.puntaje ??= puntaje;
  postEvent("guardarStats", { stats }, guardarStats);
}


function guardarStats() {}


function establecerPaisDiario(data) {
  paisDiario = data.label;
}


function mostrarPista(data) {
  let nuevaPista = document.createElement('div');
  nuevaPista.classList.add('pista-item');
  intentos++;
  nuevaPista.textContent = intentos + ". " + data.label + ": " + data.valor;
  listaPistas.appendChild(nuevaPista);
  listaPistas.scrollTop = listaPistas.scrollHeight; // Hace que scrollee automáticamente
}


getEvent("obtenerPaisDiario", establecerPaisDiario);


// Unificamos los dos escuchadores de eventos en uno solo para el botón "Adivinar"
boton.addEventListener('click', () => {
  let respuesta = input.value.trim().toLowerCase();


  if (respuesta === paisDiario.toLowerCase()) {
    intentosDOM.innerText = "Cantidad de pistas:  " + intentos;
    popup.style.display = "flex";
    enviarstats();
    input.disabled = "disabled";
  } else {
    // Pedimos pista al backend
    postEvent("obtenerPista", {}, mostrarPista);
   
    // Añadimos el intento fallido a la lista de intentos
    intentosFallidos.push(respuesta);
    mostrarIntentos();
  }


  input.value = ""; // Limpiamos el input después de cada intento
});


// Función para mostrar los intentos fallidos
function mostrarIntentos() {
  let listaIntentos = document.getElementById('listaIntentos');
  listaIntentos.innerHTML = ''; // Limpiamos la lista de intentos antes de agregar nuevos


  // Recorremos el array de intentos fallidos y mostramos cada uno en el contenedor
  intentosFallidos.forEach((intento, index) => {
    let nuevoIntento = document.createElement('div');
    nuevoIntento.classList.add('intento-item');
    nuevoIntento.textContent = (index + 1) + ". " + intento; // Mostramos el intento con su número
    listaIntentos.appendChild(nuevoIntento); // Lo agregamos al contenedor
  });
}


btnOk.addEventListener('click', () => {
  popup.style.display = "none";
  window.location.href = "../home/index.html";
});


let btnRend = document.getElementById("btn-rend");
let rendirse = document.getElementById("rendirse");


btnRend.addEventListener('click', () => {
  window.location.href = "../home/index.html";
  rendirse.style.display = "none";
});


