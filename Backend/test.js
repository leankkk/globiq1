import fs from "fs";
//import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";
import { traer, contienedato, comparar, paisrandom, paisdiario, datorandom, cuentaexiste, crearcuenta, revisarlogin, actualizarstats, elegirpista } from "./Source/funciones.js";
import { listadatos, listapaises, listadias, listalabels} from "./Source/listas.js";
let data = JSON.parse(fs.readFileSync("./Datos/factbook_clean.json","utf-8"));


let i = 0;
function funciontest(){
let dato = datorandom();
if (contienedato("argentina",dato)){
console.log(traer("argentina",dato,true));
return;
}
else return funciontest();
i++;
}

//console.log(elegirpista({pais:"afghanistan"}))

for (i = 0; i < listadatos.length; i++){
console.log(traer("argentina",listadatos[i],true));
}