connect2Server(); 

function togglePassword(id) {
  const input = document.getElementById(id);
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const contraseña1 = document.getElementById('password');
  const contraseña2 = document.getElementById('password2');
  const botonRegistrar = document.getElementById('loginBtn');
  const usuarioInput = document.getElementById('usuario');

  if (!botonRegistrar) {
    console.error("No se encontró el botón de registrarse.");
    return;
  }

  botonRegistrar.addEventListener('click', () => {
    console.log("Botón clickeado"); 

    const password1 = contraseña1.value.trim();
    const password2 = contraseña2.value.trim();
    const usuario = usuarioInput.value.trim();

    if (!usuario || !password1 || !password2) {
      alert("Por favor completá todos los campos.");
      return;
    }

    if (password1 !== password2) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const data = {
      nombre: usuario,
      contraseña: password1
    };

    postEvent("crearCuenta", data, (respuesta) => {
      if (respuesta.ok) {
        sessionStorage.setItem("usuario", usuario);
        window.location.href = "../home/index.html";

      } else {
        alert("Error: " + respuesta.mensaje);
      }
    });
  });
});

  