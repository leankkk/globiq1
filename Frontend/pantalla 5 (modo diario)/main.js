connect2Server();

let paisdiario;
let categoria;
let pista;

function establecerPaisDiario(data){
paisdiario = data;
}
function guardarPistas(data){
pista = data;
}

//Traer el país del día del back
getEvent("obtenerPaisDiario",establecerPaisDiario);

//Traer una pista al azar para el país del back. Opcional especificar categoría (todavia no se puede)
postEvent("obtenerPista",{pais:paisdiario,categoria:categoria},guardarPistas)