
connect2Server();

const Valorizquierdo = 1000000;
const Valorderecho = 1;


const botonMayor = document.getElementById("btnMayor");
const botonMenor = document.getElementById("btnMenor");

function verificarRespuesta(opcion) {
    const esMayor = Valorderecho > Valorizquierdo;

    if (opcion === 'mayor' && esMayor === true) {
        alert("¡Correcto!");
    } else if (opcion === 'menor' && esMayor === false) {
        alert("¡Correcto!");
    } else {
        alert("Incorrecto");
    }

    alert("El país tenía: " + Valorderecho);
}

botonMayor.addEventListener("click", function() {
    verificarRespuesta('mayor');
});

botonMenor.addEventListener("click", function() {
    verificarRespuesta('menor');
});
