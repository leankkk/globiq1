
connect2Server();


let boton1 = document.getElementById('boton1');
let boton2 = document.getElementById('boton2');
let territorioActual = document.getElementById('territorioActual');


let paisI = {
    nombre: "ARGENTINA",
    territorio: 12000000
};


let paisD = {
    nombre: "PAÍS",
    territorio: 0
};

let valores = [1000000, 2000000, 3000000, 4000000, 5000000];
let indice = 0;


boton1.addEventListener('click', function () {
    let aumento = valores[indice];
    paisD.territorio = paisI.territorio + aumento;
    mostrarTerritorio();
    avanzarIndice();
});


boton2.addEventListener('click', function () {
    let disminuye = valores[indice];
    paisD.territorio = paisI.territorio - disminucion;
    mostrarTerritorio();
    avanzarIndice();
});


function mostrarTerritorio() {
    territorioActual.innerText = paisActual.territorio + " kiometroCuadrado";
}
