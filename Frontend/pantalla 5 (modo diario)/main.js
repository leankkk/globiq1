connect2Server();

let input = document.getElementById('input')
let paisdiario = "argentina";
let categoria;
let pista;

function establecerPaisDiario(data){
paisdiario = data;
}
function guardarPistas(data){
pista = data;
}

getEvent("obtenerPaisDiario",establecerPaisDiario);

postEvent("obtenerPista",{pais:paisdiario,categoria:categoria},guardarPistas)

//

if(input === paisdiario) {
    alert('Adivinaste el país del día!')
}
else {
    let nuevoDiv = document.createElement('div')
    div.textContent = 'Nueva Pista: ' + pista.label + pista.valor
}