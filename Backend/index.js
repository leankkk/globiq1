import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";
import { traer, contienedato, comparar, paisrandom, paisdiario, paisdiariofront, datorandom, cuentaexiste, crearcuenta, revisarlogin, actualizarstats, elegirpista, iniciarMayorMenor, compararMayorMenor} from "./Source/funciones.js";
import { listadatos, listapaises, listadias, listalabels, listalabelsPaises} from "./Source/listas.js";

//PANTALLA 4 (higher or lower)
subscribePOSTEvent("iniciarMayorMenor",iniciarMayorMenor);
subscribePOSTEvent("evaluarRespuesta",compararMayorMenor);
//subscribeGETEvent("obtenerPaisDiario",paisdiariofront);

//PANTALLA 5 (diario)
subscribeGETEvent("obtenerPaisDiario",paisdiariofront);
subscribePOSTEvent("obtenerPista",elegirpista);

//PANTALLA 6 (login)
subscribePOSTEvent("iniciarSesion",revisarlogin);

//PANTALLA 7 (registro)
subscribePOSTEvent("crearCuenta",crearcuenta);



startServer();