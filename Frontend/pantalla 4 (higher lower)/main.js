
connect2Server();


let racha = 0;
let puntaje = 0;
let paises = [];  


const paisIzquierdo = document.getElementById('paisIzquierdo');
const poblacionIzquierdo = document.getElementById('poblacionIzquierdo');
const paisDerecho = document.getElementById('paisDerecho');
const poblacionDerecho = document.getElementById('poblacionDerecho');
const botonMayor = document.getElementById('btnMayor');
const botonMenor = document.getElementById('btnMenor');
const rachaElement = document.getElementById('racha');


let valorIzquierdo = 0;
let valorDerecho = 0;


async function obtenerPaises() {
    try {
        
        const response = await fetch('https://api.tuservidor.com/paises');  
        if (!response.ok) {
            throw new Error('Error al obtener los países');
        }
        paises = await response.json();  
        console.log(paises);  
        seleccionarPais();
    } catch (error) {
        console.error('Error al obtener los datos de los países:', error);
    }
}


function seleccionarPais() {
    if (paises.length < 2) {
        alert('No hay suficientes países para jugar');
        return;
    }

    
    const pais1 = paises[Math.floor(Math.random() * paises.length)];
    const pais2 = paises[Math.floor(Math.random() * paises.length)];


    paisIzquierdo.textContent = pais1.nombre;
    poblacionIzquierdo.textContent = `Población: ${pais1.poblacion.toLocaleString()}`;
    valorIzquierdo = pais1.poblacion;

    paisDerecho.textContent = pais2.nombre;
    poblacionDerecho.textContent = `Población: ${pais2.poblacion.toLocaleString()}`;
    valorDerecho = pais2.poblacion;
}


function actualizarRacha() {
    rachaElement.textContent = `Racha: ${racha} victorias`;
}


function verificarRespuesta(opcion) {
    const esMayor = valorDerecho > valorIzquierdo;

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
    verificarRespuesta('mayor');
});

botonMenor.addEventListener('click', function() {
    verificarRespuesta('menor');
});


obtenerPaises();


