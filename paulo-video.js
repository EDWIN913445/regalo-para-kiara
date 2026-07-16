(function () {
    "use strict";

    var boton = document.getElementById("playPauloVideo");
    var video = document.getElementById("pauloVideo");
    var mensaje = document.getElementById("pauloVideoMessage");

    if (!boton || !video) {
        return;
    }

    boton.addEventListener("click", function () {
        video.play().then(function () {
            boton.textContent = "Reproduciendo";

            if (mensaje) {
                mensaje.textContent =
                    "El video se esta reproduciendo sin anuncios.";
            }
        }).catch(function () {
            if (mensaje) {
                mensaje.textContent =
                    "Pulsa reproducir directamente dentro del video.";
            }
        });
    });

    video.addEventListener("pause", function () {
        if (!video.ended) {
            boton.textContent = "Continuar video";
        }
    });

    video.addEventListener("ended", function () {
        boton.textContent = "Ver nuevamente";
    });
})();