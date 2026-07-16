(function () {
    "use strict";

    function normalizar(valor) {
        return valor.trim().toLowerCase().replace(/\s+/g, "");
    }

    document.addEventListener("submit", function (evento) {
        var formulario = evento.target;

        if (
            formulario.id !== "loginKiaraForm" &&
            formulario.id !== "accessForm"
        ) {
            return;
        }

        evento.preventDefault();
        evento.stopImmediatePropagation();

        var campo =
            document.getElementById("loginKiaraPassword") ||
            document.getElementById("accessPassword");

        var mensaje =
            document.getElementById("loginKiaraMessage") ||
            document.getElementById("accessError");

        var pantalla =
            document.getElementById("loginKiara") ||
            document.getElementById("accessGate");

        if (!campo || !pantalla) {
            return;
        }

        if (normalizar(campo.value) === "minena") {
            document.body.classList.remove("login-locked");
            document.documentElement.classList.remove("access-loading");

            pantalla.classList.add("is-hidden");
            pantalla.classList.add("access-granted");

            if (mensaje) {
                mensaje.classList.remove("is-visible");
                mensaje.classList.remove("access-show-error");
            }

            window.setTimeout(function () {
                pantalla.remove();
            }, 700);

            return;
        }

        if (mensaje) {
            mensaje.textContent = "Contrasena incorrecta. Intenta nuevamente.";
            mensaje.classList.add("is-visible");
            mensaje.classList.add("access-show-error");
        }

        campo.value = "";
        campo.focus();
    }, true);
})();