//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("./Datos/factbook_clean.json","utf-8"));
import { listapaises , listadatos , listadias , listalabels, listadatosB, listalabelsB} from "./listas.js";
let cuentas = JSON.parse(fs.readFileSync("./Datos/cuentas.json","utf-8"));
let quemados = JSON.parse(fs.readFileSync("./Datos/datos_quemados.json","utf-8"));

//Declarando funciones útiles

export function truedatorandom(){
    return listadatosB[Math.floor(Math.random() * listadatosB.length)]; 
}

export function datorandom(){
    let dato = truedatorandom();
    let datolista = dato.split(".");
    for (let i = 0; i < listadatosB.length; i++){ 
    if (datolista[datolista.length-1] === "unit" || datolista[datolista.length-1] === "units" || datolista[datolista.length-1] === "note" || datolista[datolista.length-1] === "date") {
        dato = truedatorandom();
        datolista = dato.split(".");
    } else break;   
    }
return dato;
}

export function paisrandom() {
    let numero = Math.round(Math.random() * listapaises.length);
    return listapaises[numero];
    }
   
   
export function paisdiario() {
   let diferencia = (new Date) - (new Date("2025-01-01"));
   diferencia = Math.floor(diferencia / 86400000);
   if (diferencia >= listapaises.length) diferencia -= listapaises.length;
   return listapaises[listadias[diferencia]];  
   }
   

export function traerlabel(pais,dato) {
    for (let i = 0; i < listadatosB.length; i++){ 
        if (listadatosB[i] === dato) return listalabelsB[i];   
       }
}

   
export function traer(pais,dato,label) {
    //Si no hay nada
if (pais === undefined || (!listapaises.includes(pais) && !listadatosB.includes(dato))){
return "error";
}
//Si solo hay pais o dato esta mal (dato está vacío o no esta en la lista)
if (dato === undefined || !listadatosB.includes(dato)) {
    dato = datorandom(); //si datorandom de vuelta no va se rompe
    return "error";
} else if (!listapaises.includes(pais)) /*pais = paisdiario()*/ return "error";

//Si hay solo dato
if (!listapaises.includes(pais) && listadatosB.includes(pais)){
return "error";
/*dato = pais; 
pais = paisdiario();*/
}

//resto de la funcion
let datoog = dato;
dato = dato.split(".");
    let actual = data[pais];
for (let i = 0; i < dato.length; i++){
actual = actual[dato[i]]; 
}
//agarrar datos de lista u objetos
if (actual.value !== undefined) actual = actual.value;
if (actual[0] !== undefined) if (actual[0].value !== undefined) actual = actual.value;
if (label === true){
 return {dato:actual,label:traerlabel(pais,datoog)};   
}
return actual;
}





export function contienedato(pais,dato) {
    if (traer(pais,dato) != undefined){
        return true;
    }
    else {
        return false;
    }
}

export function comparar(pais1,pais2,dato){
    if (traer(pais1,dato) > traer(pais2,dato)){
        return true;
    }
    else {
        return false;
    }
}

export function elegirpista(data){
    let pais = data.pais;
    let dato = data.dato;
    let resultado = undefined;
if (data.dato === undefined){
    dato = datorandom();
}
for (let i = 0; i < quemados.length; i++){    
if (quemados[i].dato === dato){
dato = datorandom();
i = 0;
}
}
for (let i = 0, valor = undefined; i < listadatosB.length; i++, valor = traer(pais,dato)){
    if (typeof(valor) !== "string" && !Array.isArray(traer(valor)) && valor != undefined){
    resultado = {valor:valor,label:traerlabel(pais,dato),pais:pais,path:dato};
    break;
} else dato = datorandom();
}
return resultado;
}

export function cuentaexiste(nombre){
if (cuentas[nombre] != undefined) return true;
else return false;
    }

export function crearcuenta(data){
if (!cuentaexiste(data.nombre)){ 
cuentas[data.nombre] = {
    nombre: data.nombre,
    contraseña: data.contraseña
}
fs.writeFileSync("./Datos/cuentas.json",JSON.stringify(cuentas,null,2))
return {ok:true}
}
else return {ok:false,mensaje:"La cuenta ya existe."}
}

export function revisarlogin(data){
if (data.contraseña === undefined || data.nombre === undefined || cuentas[data.nombre] === undefined) return {login:false};;
if (data.contraseña === cuentas[data.nombre].contraseña) return {login:true};
else return {login:false};
}

export function actualizarstats(data){
cuentas[data.nombre].stats = data.stats;
fs.writeFileSync("./Datos/cuentas.json",JSON.stringify(cuentas,null,2));
} 
