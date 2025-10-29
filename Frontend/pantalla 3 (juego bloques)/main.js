const bloquesContainer = document.getElementById('bloques');
const slots = document.querySelectorAll('.slot');
let dragged = null;

// Arrastre de bloques
document.querySelectorAll('.bloque').forEach(bloque => {
  bloque.addEventListener('dragstart', e => {
    dragged = e.target;
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => bloque.style.opacity = "0.3", 0);
  });

  bloque.addEventListener('dragend', () => {
    dragged.style.opacity = "1";
    dragged = null;
  });
});

// Drag sobre slots
slots.forEach(slot => {
  slot.addEventListener('dragover', e => {
    e.preventDefault();
    slot.classList.add('hovered');
  });

  slot.addEventListener('dragleave', () => {
    slot.classList.remove('hovered');
  });

  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('hovered');

    // Si ya hay un bloque, lo devuelve al contenedor
    if (slot.firstChild) {
      bloquesContainer.appendChild(slot.firstChild);
    }

    // Inserta el bloque dentro del hueco
    slot.appendChild(dragged);
    dragged.style.margin = "0";
  });
});

// Permite devolver bloques al contenedor
bloquesContainer.addEventListener('dragover', e => e.preventDefault());
bloquesContainer.addEventListener('drop', e => {
  e.preventDefault();
  if (dragged) {
    bloquesContainer.appendChild(dragged);
    dragged.style.margin = "5px";
  }
});
