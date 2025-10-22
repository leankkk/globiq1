import { iniciarMayorMenor, mayoromenor } from "../../Backend/Source/funciones";

connect2Server();

let paisinicial;
let labelpaisinicial;
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
paisinicial = paisinicial; 
labelpaisinicial = traerlabelpais(paisinicial);
    pais2 = pais2;
    labelpais2 = traerlabelpais(pais2);
    dato = dato;
    valorinicial = valorinicial;
    label = traerlabel(dato);
    timer = timer;
}

function mayoromenor(data){
    
}


getEvent("obtenerPaisDiario", establecerPaisDiario);
postEvent("iniciarMayorMenor",{paisInicial: paisDiario, dato: "people.population.total"},iniciarMayorMenor); 
//está puesto población como dato inical para testear. sacar despues

postEvent("evaluarRespuesta", {/*poner acá el input*/ timer: timer, paisinicial: paisinicial, pais2: pais2,}, mayoromenor);


function verificarRespuesta(opcion) {
    let esMayor = valorDerecho > valorIzquierdo;

    if (opcion === 'mayor' && esMayor === true) {
        racha++;
        puntaje++;
        alert("¡Correcto!");
    } else if (opcion === 'menor' && esMayor === false) {
        racha++;
        puntaje++;
       
        
        alert("¡Correcto!");
        alert(`Adivinaste. Racha: ${racha} victorias`);
    } else {
        alert("Incorrecto");
       
        racha = 0;
        puntaje = 0;
        alert(`Perdiste. Racha: ${racha} victorias`);
        
        return;
    }

    actualizarRacha();
    seleccionarPais();  
}


botonMayor.addEventListener('click', function() {
input = "mayor";
});

botonMenor.addEventListener('click', function() {
input = "menor"
});


obtenerPaises();


