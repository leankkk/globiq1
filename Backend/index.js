import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  traer, contienedato, comparar, paisrandom, paisdiario,
  iniciarBloques, cambiarCategoria, paisdiariofront, datorandom,
  cuentaexiste, crearcuenta, revisarlogin, actualizarstats,
  elegirpista, iniciarMayorMenor, compararMayorMenor,
  enviarCategorias, enviarStats, recibirInputBloques,
  crearRecords
} from "./Source/funciones.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// Servir el frontend (carpeta Frontend está un nivel arriba del Backend)
app.use(express.static(path.join(__dirname, "..", "Frontend")));

// Ruta raíz → redirige al home
app.get("/", (req, res) => {
  res.redirect("/home/index.html");
});

// PANTALLA 3 (juego bloques)
app.get("/iniciarBloques", (req, res) => {
  res.json(iniciarBloques());
});
app.post("/evaluarRespuestaBloques", (req, res) => {
  res.json(recibirInputBloques(req.body));
});

// PANTALLA 4 (higher or lower)
app.post("/iniciarMayorMenor", (req, res) => {
  res.json(iniciarMayorMenor(req.body));
});
app.post("/obtenerCategorias", (req, res) => {
  res.json(enviarCategorias(req.body));
});
app.post("/evaluarRespuesta", (req, res) => {
  res.json(compararMayorMenor(req.body));
});
app.post("/guardarStatsEnElBack", (req, res) => {
  actualizarstats(req.body);
  res.json({ ok: true });
});
app.post("/enviarStatsAlFront", (req, res) => {
  res.json(enviarStats(req.body));
});
app.post("/cambiarCategoria", (req, res) => {
  res.json(cambiarCategoria(req.body));
});

// PANTALLA 5 (modo diario)
app.get("/obtenerPaisDiario", (req, res) => {
  res.json(paisdiariofront());
});
app.post("/obtenerPista", (req, res) => {
  res.json(elegirpista(req.body));
});

// PANTALLA 6 (login)
app.post("/iniciarSesion", (req, res) => {
  res.json(revisarlogin(req.body));
});

// PANTALLA 7 (registro)
app.post("/crearCuenta", (req, res) => {
  res.json(crearcuenta(req.body));
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});