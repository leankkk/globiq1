// script.js
import fs from 'fs';

// Leer el archivo original
const raw = fs.readFileSync('factbook - copia.json', 'utf8');
const json = JSON.parse(raw);

// Quitar la capa "data" de cada país
for (const country in json) {
  if (json[country].data) {
    json[country] = json[country].data;
  }
}

// Guardar el JSON limpio
fs.writeFileSync('factbook_limpio.json', JSON.stringify(json, null, 2), 'utf8');

console.log('Archivo procesado ✅. Resultado en factbook_limpio.json');
