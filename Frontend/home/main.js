let usuario = sessionStorage.getItem("usuario");
let ayudaBtn = document.querySelector('.ayuda');
let popup = document.getElementById('popup');
let cerrarBtn = document.querySelector('.cerrar');
let cuentaBtn = document.getElementById("cuentaBtn");

/*   NO FUNCIONA ESTE BLOQUE
if (usuario) {
  document.getElementById("linkLogin").style.display = "none";
  let nombreUsuario = document.getElementById("nombreUsuario");
  nombreUsuario.style.display = "inline-block";
  nombreUsuario.textContent = usuario;
}*/

cuentaBtn.addEventListener("click",()=>{
  console.log(usuario);
 if (usuario === "Sin usuario" || !usuario){
  window.location.href = "/Frontend/pantalla 6 (login)/index.html";
} else {window.location.href = "/Frontend/cuenta/index.html"}
} 

)

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