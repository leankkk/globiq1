connect2Server();

let popup = document.getElementById("popup");
let btnOk = document.getElementById("btn-ok");
let input = document.getElementById('input');
let boton = document.getElementById('enviar');

let paisdiariolabel = "argentina";
let categoria;
let pistaactual;
let intentos = 0;

function establecerPaisDiario(data) {
    paisdiariolabel = data.label;
    paisdiarioog = data.pais;    
}

function guardarPistas(data) {
    if (pistaactual !== undefined){
window["pista"+intentos] = pistaactual;
    }
    pistaactual = data;
    intentos++;
    console.log("pistaactual");
    let popup = document.getElementById('popupPistas');
  popup.style.display = 'block';

  let nuevaPista = document.createElement('div');
  nuevaPista.classList.add('pista-item');
  nuevaPista.textContent = intentos + " - " + pistaactual.label + ": " + pistaactual.valor;

  let lista = document.getElementById('listaPistas');
  lista.appendChild(nuevaPista);
}


getEvent("obtenerPaisDiario", establecerPaisDiario);



boton.addEventListener('click', function () {
    let respuesta = input.value.trim().toLowerCase();
    if (respuesta === paisdiariolabel.toLowerCase()) {
        popup.style.display = "flex";
    } else {
        postEvent("obtenerPista", {
            pais: paisdiariolabel, 
            categoria: categoria
        }, guardarPistas);
    }
});

btnOk.addEventListener("click", () => {
    popup.style.display = "none";
  });

  document.getElementById('cerrarPopup').addEventListener('click', function () {
    document.getElementById('popupPistas').style.display = 'none';
  });
  

  
