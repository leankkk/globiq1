connect2Server();

let botonMayor = document.getElementById("btnMayor");
let botonMenor = document.getElementById("btnMenor");

let paisInicial;
let labelpaisInicial;
let labelpais2;
let pais2;
let dato;
let valorinicial;
let label;
let timer;
let paisDiario = "placeholder";
//esto está de repuesto. en realidad país diario se debería establkecer con la función

let racha = 0;
let puntaje = 0;
let paises = [];  

function establecerPaisDiario(data) {
    paisDiario = data.pais;
    paisDiarioLabel = data.label
  }

function iniciarMayorMenor(data){
paisInicial = data.paisInicial; 
labelpaisInicial = data.labelpaisInicial;
    pais2 = data.pais2;
    labelpais2 = data.labelpais2;
    dato = data.dato;
    valorinicial = data.valorinicial;
    label = data.label;
    timer = data.timer;
}

function armarBloques(data){
    //armar los bloques a partir de las categorias recibidas
}

function evaluarResultado(data){
if (data.victoria) alert("Ganaste. Racha: "+data.timer);
else alert("Perdiste.")
}


getEvent("obtenerPaisDiario", establecerPaisDiario);
postEvent("iniciarMayorMenor",{paisInicial: paisDiario, dato: "people.population.total"}, iniciarMayorMenor); 
//está puesto población como dato inical para testear. sacar despues
//postEvent("obtenerCategorias",{pais: paisDiario, cantidad: 5}, armarBloques);


botonMayor.addEventListener("click", ()=> {
    postEvent("evaluarRespuesta", {input: true, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorinicial: valorinicial, }, evaluarResultado);
});

botonMenor.addEventListener("click", ()=> {
    postEvent("evaluarRespuesta", {input: true, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorinicial: valorinicial}, evaluarResultado);
});



