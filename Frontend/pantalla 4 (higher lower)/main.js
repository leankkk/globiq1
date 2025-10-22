import { iniciarMayorMenor, mayoromenor } from "../../Backend/Source/funciones";

connect2Server();

let paisInicial;
let labelpaisInicial;
let labelpais2;
let pais2;
let dato;
let valorinicial;
let label;
let timer;

let racha = 0;
let puntaje = 0;
let paises = [];  

function establecerPaisDiario(data) {
    paisDiario = data.label;
  }

function iniciarMayorMenor(data){
paisInicial = paisInicial; 
labelpaisInicial = traerlabelpais(paisInicial);
    pais2 = pais2;
    labelpais2 = traerlabelpais(pais2);
    dato = dato;
    valorinicial = valorinicial;
    label = traerlabel(dato);
    timer = timer;
}

function evaluarResultado(data){
if (data.victoria) alert("Ganaste. Racha: "+data.timer);
else alert("Perdiste.")
}


getEvent("obtenerPaisDiario", establecerPaisDiario);
postEvent("iniciarMayorMenor",{paisInicial: paisDiario, dato: "people.population.total"},iniciarMayorMenor); 
//está puesto población como dato inical para testear. sacar despues
postEvent("obtenerCategorias",{pais: paisDiario, cantidad: 5});


botonMayor.addEventListener('click', ()=> {
    postEvent("evaluarRespuesta", {input: true, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorinicial: valorinicial, }, evaluarResultado);
});

botonMenor.addEventListener('click', ()=> {
    postEvent("evaluarRespuesta", {input: true, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorinicial: valorinicial, }, evaluarResultado);
});



