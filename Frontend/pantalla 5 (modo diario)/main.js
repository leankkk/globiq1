connect2Server();

let input = document.getElementById('input');
let boton = document.getElementById('enviar');

let paisdiario = "";
let categoria;
let pistaactual;
let intentos = 0;

function establecerPaisDiario(data) {
    paisdiario = data.label;
    paisdiarioB = data.pais;
}

function guardarPistas(data) {
    if (pistaactual !== undefined){
window["pista"+intentos] = pistaactual;
    }
    pistaactual = data;
    intentos++;
console.log(pistaactual);
}


getEvent("obtenerPaisDiario", establecerPaisDiario);



boton.addEventListener('click', function () {
    let respuesta = input.value.trim().toLowerCase();
    if (respuesta === paisdiario.toLowerCase()) {
        alert('¡Adivinaste el país!');
    } else {
        postEvent("obtenerPista", {
            pais: paisdiario, 
            categoria: categoria
        }, guardarPistas);
        alert((intentos+" - intento. Pista: "+pistaactual.label+": "+pistaactual.valor));
    }
});
