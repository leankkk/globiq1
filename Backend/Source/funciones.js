//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("./Datos/factbook_clean.json","utf-8"));
import { listapaises , listadatos , listadias , listalabels, listadatosB, listalabelsB, listalabelsPaises} from "./listas.js";
let cuentas = JSON.parse(fs.readFileSync("./Datos/cuentas.json","utf-8"));
let quemados = JSON.parse(fs.readFileSync("./Datos/datos_quemados.json","utf-8"));

//Declarando funciones útiles

export function truedatorandom(){
    return listadatosB[Math.floor(Math.random() * listadatosB.length)]; 
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

export function paisdiariofront() {
    let diferencia = (new Date) - (new Date("2025-01-01"));
    diferencia = Math.floor(diferencia / 86400000);
    if (diferencia >= listapaises.length) diferencia -= listapaises.length;
    return {pais:listapaises[listadias[diferencia]],label:listapaises[listadias[diferencia]]};  
    }
 


export function traerlabel(dato) {
    for (let i = 0; i < listadatosB.length; i++){ 
        if (listadatosB[i] === dato) return listalabelsB[i];   
       }
}

export function traerlabelpais(pais) {
    for (let i = 0; i < listapaises.length; i++){ 
        if (listapaises[i] === pais) return listalabelsPaises[i];   
       }
}
   
export function traer(pais, dato, label) {
    let datoog = dato;
    dato = dato.split(".");
    
    for (let i = 0; i < dato.length; i++) {
      if (typeof dato[i] === 'string' && dato[i].includes("[")) {
        let [nombrelista, indicelista] = dato[i].split('[');
        indicelista = parseInt(indicelista.replace(']', ''), 10);
        dato.splice(i, 1, nombrelista, indicelista);
      }
    }
  
    let actual = data[pais];
    
    for (let i = 0; i < dato.length; i++) {
      if (actual === undefined) break;
      actual = actual[dato[i]];
    }
  
    if (actual && typeof actual === 'object') {
      if ('value' in actual) {
        actual = actual.value;
      } else if (Array.isArray(actual) && actual[0]?.value !== undefined) {
        actual = actual[0].value;
      }
    }
  
    if (label === true) {
      return {
        dato: actual,
        label: traerlabel(datoog),
        labelpais: traerlabelpais(pais)
      };   
    }
  
    return actual;
  }
    

    export function datorandom(){
        let dato = truedatorandom();
        let datolista = dato.split(".");
        for (let i = 0; i < listadatosB.length; i++){ 
        if (datolista[datolista.length-1] === "unit" || datolista[datolista.length-1] === "units" || datolista[datolista.length-1] === "note" || datolista[datolista.length-1] === "date" || typeof traer("argentina",dato) === "object" || (typeof traer("argentina",dato) === "string" && traer("argentina",dato).length > 15)) {
            dato = truedatorandom();
            datolista = dato.split(".");
        } else break;   
        }
    return dato;
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
        return false;
    }
    else {
        return true;
    }
}

export function elegirpista(data){
    let pais = data.pais;
    let dato = data.dato;
    let resultado = undefined;
if (data.dato === undefined){
    dato = datorandom();
}
if (data.pais === undefined){
    pais = paisdiario();
}
for (let i = 0; i < quemados.length; i++){    
if (quemados[i].dato === dato){
dato = datorandom();
i = 0;
}
}
for (let i = 0, valor = undefined; i < listadatosB.length; i++, valor = traer(pais,dato)){
    if (typeof(valor) !== "string" && !Array.isArray(valor) && valor != undefined && typeof(valor) !== "object"){
    if (valor === true) valor = "Verdadero";
    if (valor === false) valor = "Falso";
        resultado = {valor:valor,label:traerlabel(dato),pais:pais,labelpais:traerlabelpais(pais),path:dato};
    break;
} else dato = datorandom();
}
return resultado;
}

export function mayoromenor(data){
let timer;
if (data.timer === undefined) timer = 0;
else data.timer += 1;

let pais2mayor;
let pais2menor;
let victoria;
let input = data.input;

let paisinicial;
if (data.paisinicial === undefined) paisinicial = paisdiario();
else paisinicial = data.paisinicial;

let dato;
if (data.dato === undefined || timer >= 5) dato = datorandom();
else dato = data.dato;

let valor = undefined;
while (valor === undefined){
if (typeof(traer(paisinicial,dato))=== "number") valor = traer(paisinicial,dato);
else dato = datorandom();
}

let pais2 = paisinicial;
while (pais2 === paisinicial){
pais2 = paisrandom();
}

if (comparar(paisinicial,pais2,dato) === true){
    //el de la derecha es mayor
    pais2mayor = true;
    pais2menor = false;
    }
    else {
    //el de izquierda es mayor
    pais2mayor = false;
    pais2menor = true;
    }
if (data.input === pais2mayor) victoria = true;
else if (data.input === pais2menor) victoria = false;

return {paisinicial: paisinicial, labelpaisinicial: traerlabelpais(paisinicial), pais2: pais2, labelpais2: traerlabelpais(pais2), dato: dato, valor: valor,label: traerlabel(dato), victoria:victoria, timer: timer};
}

export function mayoromenorB(data){
//definir rapido las variables
let victoria;
let pais1 = data.pais1;
let pais2 = data.pais2;
let dato = data.dato;
let label = data.label;
let input = data.input; //si el pais derecho es mayor deberia ser positivo, si menor negativo

//comparación entre los dos paises
if (comparar(pais1,pais2,categoria) === true){
//el de la derecha es mayor
let pais2mayor = true;
let pais2menor = false;
}
else {
let pais2mayor = false;
let pais2menor = true;
}
if (input === pais2mayor) victoria = true;
else victoria = false;
return {victoria:victoria,}
}

export function recibirInputBloques(data){
let input = data.input;
let paisobjetivo = data.pais;
let listadescartados = data.listadescartados;
//data = input, pais, intentos, lista restantes
//input = {valor,comparacion,categoria,categorialabel}

if (input.comparacion === "mayor"){
for (let i = 0; i < listapaises.length;i++){
    let busqueda = traer(listapaises[i],input.categoria),
    if (!(busqueda >= input.valor) || busqueda === undefined){
listadescartados.push({
pais: listapaises[i],
label: traerlabel(listapaises[i]),
esundefined: (busqueda === undefined)
});
}}}
if (input.comparacion === ",menor"){
for (let i = 0; i > listapaises.length;i++){
    let busqueda = traer(listapaises[i],input.categoria),
    if (!(busqueda >= input.valor) || busqueda === undefined){
listadescartados.push({
pais: listapaises[i],
label: traerlabel(listapaises[i]),
esundefined: (busqueda === undefined)
});
}}}
return {listadescartados:listadescartados,pais:paisobjetivo}
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
