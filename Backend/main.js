//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("factbook_clean.json","utf-8"));
import { listapaises } from "./listas.js";
import { listadatos } from "./listas.js";


//Declarando funciones útiles

function traer(pais,dato) {
    dato = dato.split(".");
    return data[pais]?.[dato[0]]?.[dato[1]]?.[dato[2]];
    }

function contienedato(pais,dato) {
    if (traer(pais,dato) != undefined){
        return true;
    }
    else {
        return false;
    }
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
 }


function paisdiario() {

}

function datorandom(){
    let numero = Math.round(Math.random() * listadatos.length);
    return listadatos[numero];   
}
//console.log(comparar("uruguay","people.population.total"));
/*let i = 0;
while(i<listapaises.length){
let actual = listapaises[i];
if (!contienedato(actual,"people.population.total")){
    console.log(actual);
}
i++;}*/
let pais1 = paisrandom();
let dato1 = datorandom();
console.log(traer(pais1,dato1),pais1,dato1);