connect2Server();

let input = document.getElementById('input');
let boton = document.getElementById('enviar');

let paisdiario = "argentina";
let categoria;
let pista;

function establecerPaisDiario(data) {
    paisdiario = data;
}

function guardarPistas(data) {
    pista = data;
}


getEvent("obtenerPaisDiario", establecerPaisDiario);


postEvent("obtenerPista", {
    pais: paisdiario, 
    categoria: categoria
}, guardarPistas);

boton.addEventListener('click', function () {
    let respuesta = input.value.trim().toLowerCase();

    if (respuesta === paisdiario.toLowerCase()) {
        alert('¡Adivinaste el país!');
    } else {
        alert("Pista: " + (pista || "No hay pista disponible"));
    }
});
