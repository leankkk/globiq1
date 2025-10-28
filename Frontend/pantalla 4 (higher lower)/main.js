connect2Server();

let paisInicialNombre = document.getElementById("paisInicialNombre");
let paisInicialDato = document.getElementById("paisInicialDato");
let botonMayor = document.getElementById("btnMayor");
let botonMenor = document.getElementById("btnMenor");

let paisInicial;
let labelpaisInicial;
let labelpais2;
let pais2;
let dato;
let valorInicial;
let label;
let timer;
let paisDiario = "placeholder";
//esto está de repuesto. en realidad país diario se debería establkecer con la función

let racha = 0;
let puntaje = 0;
let paises = [];  

function iniciarMayorMenor(data) {
    paisInicial = data.paisInicial; 
labelpaisInicial = data.labelpaisInicial;
    pais2 = data.pais2;
    labelpais2 = data.labelpais2;
    dato = data.dato;
    valorInicial = data.valorInicial;
    label = data.label;
    timer = data.timer;
    paisInicialNombre.innerText = labelpaisInicial;
    paisInicialDato.innerText = valorInicial;
    pais2Nombre.innerText = labelpais2;
    categoriaNombre.innerText = label;
  }


function armarBloques(data){
    //armar los bloques a partir de las categorias recibidas
}

function evaluarResultado(data){
if (data.victoria) {
alert("Ganaste. Racha: "+data.timer);
 paisInicial = data.paisInicial; 
    pais2 = data.pais2;
    dato = data.dato;
    timer = data.timer;
    paisInicialNombre.innerText = data.labelpaisInicial;
    paisInicialDato.innerText = data.valorInicial;
    pais2Nombre.innerText = data.labelpais2;
    categoriaNombre.innerText = data.label;
}
else {
alert("Perdiste. Puntaje: "+data.timer);
pais2Nombre.innerText = data.labelPais2 + ": "+data.valorPais2;
postEvent("iniciarMayorMenor",{}, iniciarMayorMenor); 
//se muestra undefined en el nombre de pais 2. eso es porque en el backend se reemplaza labelpais2 por el nuevo pais y el viejo se pierde. agregar forma de arreglarlo. vincular con sist. de quemados
}

}


postEvent("iniciarMayorMenor",{}, iniciarMayorMenor); 


botonMayor.addEventListener("click", ()=> {
    postEvent("evaluarRespuesta", {input: false, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorInicial: valorInicial, }, evaluarResultado);
});

botonMenor.addEventListener("click", ()=> {
    postEvent("evaluarRespuesta", {input: true, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorInicial: valorInicial}, evaluarResultado);
});



