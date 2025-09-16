connect2Server();


function realizarinicio(data){
if (data.login){
    alert("inicio de sesión completado")
    window.location.href = "./pantalla 1/index.html";
} else {
    alert("Usuario o contraseña incorrecto")
 }


function iniciarsesion(){
let infocuenta  = {
nombre: placeholderUsuario,
contraseña: placeholderContraseña
}
postEvent("iniciarSesion",infocuenta,realizarinicio)
}
    

let botonlogin = document.getElementById("loginBtn");

let placeholderContraseña = document.getElementById("password");
let placeholderUsuario = document.getElementById("usuario");

botonlogin.addEventListener("click",iniciarsesion); }