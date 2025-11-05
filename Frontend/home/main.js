let usuario = sessionStorage.getItem("usuario");
let ayudaBtn = document.querySelector('.ayuda');
let popup = document.getElementById('popup');
let cerrarBtn = document.querySelector('.cerrar');

if (usuario) {

  document.getElementById("linkLogin").style.display = "none";


  let nombreUsuario = document.getElementById("nombreUsuario");
  nombreUsuario.style.display = "inline-block";
  nombreUsuario.textContent = usuario;
}

ayudaBtn.addEventListener('click', () => {
  popup.classList.add('mostrar');
});

cerrarBtn.addEventListener('click', () => {
  popup.classList.remove('mostrar');
});


window.addEventListener('click', () => {
  if (e.target === popup) {
    popup.classList.remove('mostrar');
  }
});