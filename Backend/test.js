import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";
import { traer, contienedato, comparar, paisrandom, paisdiario, datorandom, cuentaexiste, crearcuenta, revisarlogin, actualizarstats, elegirpista } from "./Source/funciones.js";
import { listadatos, listapaises, listadias} from "./Source/listas.js";
let data = JSON.parse(fs.readFileSync("./Datos/factbook_clean.json","utf-8"));
console.log(traer("argentina","people.population.total",true));