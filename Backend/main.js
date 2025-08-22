//Importando datos
import fs from "fs";
let data = JSON.parse(fs.readFileSync("factbook_limpio.json","utf-8"));

//Declarando funciones útiles

function limpiarpedido(string){
let i;
let c;
let categoria = "";
let dato = "";
let valor = "";
    for (i = 0; i < string.length; i++){
    if (string[i] === "."){
for (c = 0; c < i; c++){
    if (categoria === ""){
      categoria += string[c];
    }
    else if (dato === ""){
        dato += string[c];
    }
    else if (valor === ""){
        valor += string[c];
    }
}
    }

    }
    let lista = [categoria,dato,valor]
    return lista;
}


function contienedato(pais,dato) {

}

function traerdato(pais,dato) {
dato = limpiarpedido(dato);
return data[pais][dato[0]][dato[1]][dato[2]];
}

function compararpaises(pais1,pais2,dato){
    if (traerdato(pais1,dato) > traerdato(pais2,dato)){
        return true;
    }
    else {
        return false;
    }
}

function paisrandom() {
 return Math.round(Math.random() * cantidadpaises);
} //Por ahora la función solo da un entero al azar según cantidad de países.


function paisdiario() {

}

function datorandom(pais){

}

console.log(traerdato("india",limpiarpedido("people.population.total")));