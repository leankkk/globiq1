//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("factbook_limpio.json","utf-8"));

//Declarando funciones útiles

function contienedato(pais,dato) {
    if (traerdato(pais,dato) != undefined){
        return true;
    }
    else {
        return false;
    }
}

function traerdato(pais,dato) {
dato = dato.split(".");
return data[pais]?.[dato[0]]?.[dato[1]]?.[dato[2]];
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
console.log(compararpaises("uruguay","argentina","people.population.total"));
