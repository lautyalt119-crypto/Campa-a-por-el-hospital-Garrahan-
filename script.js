const counter = document.getElementById("counter");
const helpBtn = document.getElementById("helpBtn");

// 🔹 CONFIG
const startValue = 120000;
const ratePerSecond = 1.5;
const startDate = new Date("2024-01-01T00:00:00");

// 🔊 Crear audio correctamente (clave)
let clickSound;
let audioEnabled = false;

// 🔥 ACTIVAR AUDIO BIEN (esto soluciona tu problema)
document.body.addEventListener("click", () => {
    if (!audioEnabled) {
        clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
        clickSound.volume = 0.3;

        // reproducir y pausar para desbloquear audio en Android
        clickSound.play().then(() => {
            clickSound.pause();
            clickSound.currentTime = 0;
            audioEnabled = true;
        }).catch(() => {});
    }
}, { once: true });

function updateCounter() {
    const now = new Date();
    const secondsPassed = (now - startDate) / 1000;

    const currentValue = Math.floor(startValue + secondsPassed * ratePerSecond);

    counter.textContent = currentValue.toLocaleString("es-AR");

    // efecto visual
    counter.classList.add("bump");
    setTimeout(() => counter.classList.remove("bump"), 100);

    // 🔊 sonido + vibración
    if (audioEnabled && clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }
}

setInterval(updateCounter, 1000);
updateCounter();

// 🔘 botón
helpBtn.addEventListener("click", () => {
    window.open("https://www.garrahan.gov.ar/", "_blank");
});
