connect2Server(3001);

let nombreUsuario = document.getElementById("nombreUsuario");
let usuario = sessionStorage.getItem("usuario") || "Sin usuario";
nombreUsuario.textContent = usuario;

let statsDiario = document.getElementById("statsDiario");
let statsHL = document.getElementById("statsHL");
let statsBloques = document.getElementById("statsBloques");
let listaDiario = document.getElementById("listaDiario");
let listaMayorMenor = document.getElementById("listaMayorMenor");
let listaBloques = document.getElementById("listaBloques");

function formatearString(string) {
  const result = string.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function esMostrable(valor) {
  if (valor === null) return false;
  if (Array.isArray(valor) && valor.length === 0) return false;
  if (typeof valor === "object" && !valor.label) return false;
  return true;
}

function llenarLista(listaDOM, infoObj) {
  Object.entries(infoObj).forEach(([clave, valor]) => {
    if (esMostrable(valor)) {
      let li = document.createElement("li");
      let texto = (typeof valor === "object" && valor.label) ? valor.label : valor;
      li.textContent = formatearString(clave) + ": " + texto;
      listaDOM.appendChild(li);
    }
  });
}

function mostrarStats(data) {
  llenarLista(listaDiario, data.stats.diario);
  llenarLista(listaMayorMenor, data.stats.mayormenor);
  llenarLista(listaBloques, data.stats.bloques);
}

postEvent("enviarStatsAlFront", { nombre: usuario }, mostrarStats);

document.getElementById("btnLogout").addEventListener("click", function () {
  sessionStorage.removeItem("usuario");
  window.location.href = "../pantalla 6 (login)/index.html";
});