(function () {
    "use strict";

    function revealElements() {
        var elements = document.querySelectorAll(
            ".section, .story-card, .letter, .paulo-video-card, .song-message-card"
        );

        elements.forEach(function (element) {
            element.classList.add("premium-reveal");
        });

        if (!("IntersectionObserver" in window)) {
            elements.forEach(function (element) {
                element.classList.add("is-visible");
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }

    function createParticle() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        var particle = document.createElement("span");
        particle.className = "premium-particle";
        particle.textContent = "\u2665";

        var size = 12 + Math.random() * 18;
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.fontSize = size + "px";
        particle.style.animationDuration = 8 + Math.random() * 7 + "s";

        document.body.appendChild(particle);

        window.setTimeout(function () {
            particle.remove();
        }, 16000);
    }

    function initializePremiumDesign() {
        revealElements();

        window.setInterval(function () {
            if (document.visibilityState === "visible") {
                createParticle();
            }
        }, 1800);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializePremiumDesign);
    } else {
        initializePremiumDesign();
    }
})();