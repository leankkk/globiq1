//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("factbook_clean.json","utf-8"));

import { listapaises } from "listas.js";


//Declarando funciones útiles

function contienedato(pais,dato) {
    if (traer(pais,dato) != undefined){
        return true;
    }
    else {
        return false;
    }
}

function traer(pais,dato) {
dato = dato.split(".");
return data[pais]?.[dato[0]]?.[dato[1]]?.[dato[2]];
}

function comparar(pais1,pais2,dato){
    if (traer(pais1,dato) > traer(pais2,dato)){
        return true;
    }
    else {
        return false;
    }
}

function paisrandom() {
 let numero = Math.round(Math.random() * listapaises.length);
 return listapaises[numero];
} //Por ahora la función solo da un entero al azar según cantidad de países.


function paisdiario() {

}

function datorandom(pais){

}
//console.log(comparar("uruguay","people.population.total"));
let i = 0;
while(i<listapaises.length){
let actual = listapaises[i];
if (!contienedato(actual,"people.population.total")){
    console.log(actual);
}
i++;}