connect2Server();

let botonlogin = document.getElementById("loginBtn"); 
let placeholderContraseña = document.getElementById("password");
let placeholderUsuario = document.getElementById("usuario");


function togglePassword(id) { 
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}


function realizarinicio(data) {
    if (data.login) {
        alert("Inicio de sesión completado.");
        sessionStorage.setItem("usuario", placeholderUsuario.value);
        window.location.href = "../home/index.html";
    } else {
        alert("Usuario o contraseña incorrecto.");
    }
}


botonlogin.addEventListener("click", () => {
    let infocuenta = {
        nombre: placeholderUsuario.value,
        contraseña: placeholderContraseña.value
    };
    console.log("Se activó el botón");
    postEvent("iniciarSesion", infocuenta, realizarinicio);
});

