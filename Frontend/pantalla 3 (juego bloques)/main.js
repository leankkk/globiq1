connect2Server();

// Función para obtener las pistas desde el backend cuando se carga el juego
subscribeGETEvent("obtenerPaisDiario", (paisDiario) => {
    console.log("Pais del día: ", paisDiario);
    // Aquí podemos mostrar o usar el país del día para iniciar el juego
});

// Función para obtener las pistas (categorías) desde el backend
subscribePOSTEvent("obtenerPista", (pista) => {
    agregarPista(pista);
});

// Aquí se añaden las pistas a la interfaz
function agregarPista(pista) {
    const contenedorPistas = document.getElementById("bloques");

    // Crear el bloque dinámicamente
    const bloque = document.createElement("div");
    bloque.classList.add("bloque");
    bloque.textContent = pista.label;  // La pista tiene una etiqueta
    bloque.setAttribute("data-dato", pista.dato);  // Guardar el dato asociado para usarlo al formar preguntas

    // Hacer que el bloque sea arrastrable
    bloque.setAttribute("draggable", "true");

    // Agregar el bloque a la caja de bloques
    contenedorPistas.appendChild(bloque);

    // Agregar el evento para manejar cuando se arrastra y suelta el bloque
    bloque.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData('text', e.target.dataset.dato);
    });
}

// Función para procesar la pregunta y obtener la respuesta
const botonPregunta = document.getElementById('botonPregunta');
const inputPregunta = document.getElementById('inputPregunta');
const respuestaTexto = document.getElementById('respuesta');

botonPregunta.addEventListener('click', () => {
    const categoria = inputPregunta.value;  // Valor de la categoría que el jugador elige
    if (categoria) {
        // Enviar la pregunta al backend para ser procesada
        const datosPregunta = {
            pais: "Argentina",  // Aquí deberías usar el país objetivo o el país del día
            dato: categoria,    // El dato que está preguntando el jugador
            comparacion: "mayor" // O "menor", dependiendo de cómo se haya formado la pregunta
        };

        postEvent("recibirInputBloques", datosPregunta, (respuesta) => {
            // Mostrar la respuesta al jugador (Sí/No)
            actualizarRespuesta(respuesta);
        });
    }
});

// Función para actualizar la respuesta en la UI
function actualizarRespuesta(respuesta) {
    respuestaTexto.textContent = respuesta; // Aquí puedes mostrar la respuesta del backend (Sí o No)
}

// Event listener para actualizar el color de los países al hacer clic
const paths = document.querySelectorAll('.mapa svg path');
paths.forEach(path => {
    path.addEventListener('click', () => {
        // Aquí se podría marcar el país como "adivinado" o "descartado"
        path.style.fill = "green"; // Cambiar el color a verde si el país es correcto
    });
});


