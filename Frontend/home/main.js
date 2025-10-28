let usuario = sessionStorage.getItem("usuario");

if (usuario) {

  document.getElementById("linkLogin").style.display = "none";


  let nombreUsuario = document.getElementById("nombreUsuario");
  nombreUsuario.style.display = "inline-block";
  nombreUsuario.textContent = usuario;
}