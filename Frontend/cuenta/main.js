connect2Server(3001);

// mostrar usuario logueado
let nombreUsuario = document.getElementById("nombreUsuario");
let usuario = sessionStorage.getItem("usuario") || "Sin usuario";
nombreUsuario.textContent = usuario;

// referencias a los contenedores de stats
let statsDiario = document.getElementById("statsDiario");
let statsHL = document.getElementById("statsHL");
let statsBloques = document.getElementById("statsBloques");
