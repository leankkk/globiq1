import fs from "fs";
import { traer, contienedato, comparar, paisrandom, paisdiario, datorandom, cuentaexiste, crearcuenta, revisarlogin, actualizarstats } from "./Source/funciones.js";
import { listadatos, listapaises , listadias} from "./Source/listas.js";

let prando = paisrandom();
let drando = datorandom();


/* for (prando = paisrandom(),drando = datorandom(); contienedato(prando,drando); prando = paisrandom(),drando = datorandom()){
console.log(traer(prando,drando));
}*/

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
console.log(paisdiario())