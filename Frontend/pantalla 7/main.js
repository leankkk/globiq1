connect2Server();

function togglePassword(id) {
  let input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

let contraseña1 = document.getElementById('password');
let contraseña2 = document.getElementById('password2');
let botonRegistrar = document.getElementById('btn');
let usuarioInput = document.getElementById('inputusuario'); 

botonRegistrar.addEventListener('click', () => {
    let password1 = contraseña1.value;
    let password2 = contraseña2.value;
    let usuario = usuarioInput.value;

    if (password1 === "" || password2 === "" || usuario === "") {
        alert("Por favor completá todos los campos.");
        return;
    }

    if (password1 !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let data = {
        nombre: usuario,
        contraseña: password1
    };

    postEvent("crearCuenta", data, (respuesta) => {
        if (respuesta.ok) {
            sessionStorage.setItem("usuario", usuario);
            window.location.href = "./pantalla 1/index.html";
        } else {
            alert("Error: " + respuesta.mensaje);
        }
    });
});
