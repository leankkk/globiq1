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
   

export function traer(pais,dato) {
//Si no hay nada
if (pais === undefined || (!listapaises.includes(pais) && !listadatos.includes(dato))){
pais = paisdiario();
dato = datorandom();
}
//Si solo hay pais o dato esta mal (dato está vacío o no esta en la lista)
if (dato === undefined || !listadatos.includes(dato)) dato = datorandom();
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

export function cuentaexiste(nombre){
if (cuentas[nombre] != undefined) return true;
else return false
    }

export function crearcuenta(data){
if (!cuentaexiste(data[nombre])){ 
let cuentanueva = {
    [data.nombre]: {
    nombre: data[nombre]},
    contraseña: data[contraseña]
}
}
cuentas[nombre] = cuentanueva[nombre];
fs.writeFileSync("./Datos/cuentas.json",JSON.stringify(cuentas,null,2))
}

export function revisarlogin(data){
if (data.contraseña === cuentas[data.nombre].contraseña) return {login:true};
else return {login:false};
}

export function actualizarstats(data){
cuentas[data.nombre].stats = data.stats;
fs.writeFileSync("./Datos/cuentas.json",JSON.stringify(cuentas,null,2));
} 
