
connect2Server();

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  const usuarioInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");

  
  window.togglePassword = function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  btn.addEventListener("click", () => {
    console.log("Botón clickeado"); 
    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    if (!usuario || !password) {
        alert("⚠️ Tenés que completar usuario y contraseña");
        return;
    }

    postEvent("login", { usuario, password }, (res) => {
        if (res.ok) {
            alert("Bienvenido " + usuario);
            window.location.href = "file:///C:/Users/49701598/Downloads/proyecto-globe-inc/Frontend/pantalla%201/index.html";
        } else {
            alert(" Usuario o contraseña incorrectos");
        }
    });
});

});
