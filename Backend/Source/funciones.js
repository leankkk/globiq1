//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("./Datos/factbook_clean.json","utf-8"));
import { listapaises , listadatos} from "./listas.js";
let cuentas = JSON.parse(fs.readFileSync("./cuentas.json","utf-8"));


//Declarando funciones útiles

export function traer(pais,dato) {
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

export function paisrandom() {
 let numero = Math.round(Math.random() * listapaises.length);
 return listapaises[numero];
 }


export function paisdiario() {

}

export function datorandom(){
    let numero = Math.round(Math.random() * listadatos.length);
    return listadatos[numero];   
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


