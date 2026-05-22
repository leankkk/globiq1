async function getEvent(ruta, callback) {
  try {
    const res = await fetch("/" + ruta);
    const data = await res.json();
    callback(data);
  } catch (err) {
    console.error("Error en getEvent /" + ruta, err);
  }
}

async function postEvent(ruta, datos, callback) {
  try {
    const res = await fetch("/" + ruta, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const data = await res.json();
    if (callback) callback(data);
  } catch (err) {
    console.error("Error en postEvent /" + ruta, err);
  }
}

// connect2Server ya no hace falta, pero lo dejamos vacío
// para no tener que borrar la línea en cada HTML
function connect2Server() {}