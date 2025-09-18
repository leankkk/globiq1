//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("./Datos/factbook_clean.json","utf-8"));
import { listapaises , listadatos , listadias} from "./listas.js";
let cuentas = JSON.parse(fs.readFileSync("./Datos/cuentas.json","utf-8"));


//Declarando funciones útiles

export function datorandom(){
    let numero = Math.round(Math.random() * listadatos.length);
    return listadatos[numero];   
}

export function paisrandom() {
    let numero = Math.round(Math.random() * listapaises.length);
    return listapaises[numero];
    }
   
   
export function paisdiario() {
   let diferencia = (new Date) - (new Date("2025-01-01"));
   diferencia = Math.floor(diferencia / 86400000);
   if (diferencia >= listapaises.length) diferencia -= listapaises.length;
   return listapaises[diferencia];  
   }
   

export function traer(pais,dato,key) {
    //Si no hay nada
if (pais === undefined || (!listapaises.includes(pais) && !listadatos.includes(dato))){
pais = paisdiario();
dato = datorandom();
}
//Si solo hay pais o dato esta mal (dato está vacío o no esta en la lista)
if (dato === undefined || !listadatos.includes(dato)) dato = datorandom(); //si datorandom de vuelta no va se rompe
else if (!listapaises.includes(pais)) pais = paisdiario();
//Si hay solo dato
if (!listapaises.includes(pais) && listadatos.includes(pais)){
dato = pais; 
pais = paisdiario();
}

//resto de la funcion
dato = dato.split(".");
    let actual = data[pais];
for (let i = 0; i < dato.length; i++){
//chequeo de emergencia
if (actual === undefined) return undefined; 
actual = actual[dato[i]]; 
}
if (key === true){
    for (let i = 0, actual = data[pais]; i < dato.length; i++){ 
    actual = actual[dato[i]];
}
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
if (data.categoria === undefined){
    let pais = data.pais;
    let dato = datorandom();
    let quemados = JSON.parse(fs.readFileSync("../Datos/datos_quemados.json","utf-8"));
for (let i = 0; i < quemados.length; i++){    
if (quemados[i].key = dato){
dato = datorandom();
i = 0;
}
let resultado = traer(pais,dato);
}
}
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
