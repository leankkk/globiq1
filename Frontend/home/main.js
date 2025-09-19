let usuario = sessionStorage.getItem("usuario");

if (usuario) {
  // oculto la foto y el link al login
  document.getElementById("linkLogin").style.display = "none";

  // muestro el nombre del usuario
  let nombreUsuario = document.getElementById("nombreUsuario");
  nombreUsuario.style.display = "inline-block";
  nombreUsuario.textContent = usuario;
}