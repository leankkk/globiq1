connect2Server();

let input = document.getElementById('input');
let boton = document.getElementById('enviar');
let listaPistas = document.getElementById('listaPistas');
let popup = document.getElementById('popup');
let btnOk = document.getElementById('btn-ok');

let paisDiario;
let intentos = 0;

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

getEvent("obtenerPaisDiario", establecerPaisDiario);

boton.addEventListener('click', () => {
  let respuesta = input.value.trim().toLowerCase();

  if (respuesta === paisDiario.toLowerCase()) {
    popup.style.display = "flex";
  } else {
    // pedimos pista al backend
    postEvent("obtenerPista", {}, mostrarPista);
  }

  input.value = ""; // limpia input después de cada intento
});

btnOk.addEventListener('click', () => {
  popup.style.display = "none";
});
