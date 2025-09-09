//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("./Datos/factbook_clean.json","utf-8"));
import { listapaises , listadatos} from "./Datos/listas.js";
let cuentas = JSON.parse(fs.readFileSync("./Datos/cuentas.json","utf-8"));


//Declarando funciones útiles

function traer(pais,dato) {
    dato = dato.split(".");
    let actual = data[pais];
for (let i = 0; i < dato.length; i++){
if (actual === undefined){
        return undefined;
    } 
actual = actual[dato[i]]; 
}
return actual;
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

/* for (let i = 0; i < 50; i++){
let pais1 = paisrandom();
let dato1 = datorandom();
if (contienedato(pais1,dato1)) console.log(traer(pais1,dato1),pais1,dato1);
}
*/
function cuentaexiste(nombre){
if (cuentas[nombre] != undefined) return true;
else return false
    }

function crearcuenta(nombre,contraseña){
if (!cuentaexiste(nombre)){ 
let cuentanueva = {
    [nombre]: {
    nombre: nombre,
    contraseña: contraseña
}
}
let cuentas = JSON.parse(fs.readFileSync("./Datos/cuentas.json","utf-8"));
cuentas[nombre] = cuentanueva[nombre];
fs.writeFileSync("./Datos/cuentas.json",JSON.stringify(cuentas))
}
}




let prando = paisrandom();
let drando = datorandom();


/* for (prando = paisrandom(),drando = datorandom(); contienedato(prando,drando); prando = paisrandom(),drando = datorandom()){
console.log(traer(prando,drando));
}*/


