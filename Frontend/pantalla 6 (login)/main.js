connect2Server(3001);

let botonlogin = document.getElementById("loginBtn");

let placeholderContraseña = document.getElementById("password");

let placeholderUsuario = document.getElementById("usuario");

let botonregistro = document.getElementById("registroBtn");

let popup = document.getElementById("popupBienvenida");

let mensaje = document.getElementById("mensajeBienvenida");

let botonAceptar = document.getElementById("btnAceptarPopup");





function togglePassword(id) {

  let input = document.getElementById(id);

  let icono = input.nextElementSibling;

  if (input.type === "password") {

    input.type = "text";

    icono.style.backgroundImage =
      "url('https://cdn-icons-png.flaticon.com/512/565/565655.png')";

  } else {

    input.type = "password";

    icono.style.backgroundImage =
      "url('https://cdn-icons-png.flaticon.com/512/159/159604.png')";

  }

}





function realizarinicio(data) {

  if (data.login) {

    sessionStorage.setItem("usuario", placeholderUsuario.value);

    mensaje.textContent = `¡Bienvenido, ${placeholderUsuario.value}!`;

    popup.style.display = "flex";

  } else {

    alert("Usuario o contraseña incorrectos.");

  }

}





botonAceptar.addEventListener("click", () => {

  popup.style.display = "none";

  window.location.href = "../home/index.html";

});





botonlogin.addEventListener("click", () => {

  let usuario = placeholderUsuario.value.trim();

  let contraseña = placeholderContraseña.value.trim();

  if (usuario === "" || contraseña === "") {

    alert("Completa todos los campos.");

    return;

  }

  let infocuenta = {

    nombre: usuario,

    contraseña: contraseña

  };

  console.log("Se activó el botón");

  postEvent("iniciarSesion", infocuenta, realizarinicio);

});





placeholderContraseña.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    botonlogin.click();

  }

});





botonregistro.addEventListener("click", () => {

  window.location.href = "../pantalla 7 (registro)/index.html";

});