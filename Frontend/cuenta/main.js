connect2Server(3001);

// mostrar usuario logueado
let nombreUsuario = document.getElementById("nombreUsuario");
let usuario = sessionStorage.getItem("usuario") || "Sin usuario";
nombreUsuario.textContent = usuario;

// referencias a los contenedores de stats
let statsDiario = document.getElementById("statsDiario");
let statsHL = document.getElementById("statsHL");
let statsBloques = document.getElementById("statsBloques");
let listaDiario = document.getElementById("listaDiario");
let listaMayorMenor = document.getElementById("listaMayorMenor");
let listaBloques = document.getElementById("listaBloques");
let infoDiario;
let infoMayorMenor;
let infoBloques;
let listaObjDiario;
let listaObjMayorMenor;
let listaObjBloques;


//importar stats para mostrar en pantalla
function mostrarStats(data){
//guardando las variables
infoDiario = data.stats.diario;
infoMayorMenor = data.stats.mayormenor;
infoBloques = data.stats.bloques;

//armar los elementos de cada lista de stats
for (let i = 0, listaObjDiario = Object.entries(infoDiario); i < listaObjDiario.length; i++) {
let ("li"+i) = document.createElement("li")
    listaDiario.appendChild()
    
}
}

postEvent("enviarStatsAlFront",{usuario: usuario}, mostrarStats);
