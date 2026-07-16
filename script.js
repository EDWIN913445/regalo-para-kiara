(function () {
    "use strict";

    var videoId = "YwodhCjFbQ8";
    var frame = document.getElementById("songFrame");
    var playButton = document.getElementById("playSong");
    var openButton = document.getElementById("abrirRegalo");
    var songSection = document.getElementById("cancion");
    var note = document.getElementById("musicNote");

    function reproducir() {
        if (!frame) {
            return;
        }

        frame.src =
            "https://www.youtube.com/embed/" +
            videoId +
            "?autoplay=1&playsinline=1&rel=0&modestbranding=1";

        if (note) {
            note.textContent =
                "La cancion ya fue cargada. Si no inicia sola, presiona reproducir dentro del video.";
        }
    }

    if (playButton) {
        playButton.addEventListener("click", reproducir);
    }

    if (openButton) {
        openButton.addEventListener("click", function () {
            if (songSection) {
                songSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            window.setTimeout(reproducir, 500);
        });
    }
})();