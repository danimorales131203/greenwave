const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const hubScreen = document.getElementById("hubScreen");
const waveTransition = document.getElementById("waveTransition");

const animatedItems = document.querySelectorAll("#hubScreen .animated-item");

loginBtn.addEventListener("click", () => {
    startWaveTransition();
});

registerBtn.addEventListener("click", () => {
    alert("Después conectaremos esta opción con la pantalla de registro.");
});

function startWaveTransition() {
    waveTransition.classList.add("active");

    setTimeout(() => {
        welcomeScreen.classList.add("hidden");
        welcomeScreen.classList.remove("screen-active");

        hubScreen.classList.remove("hidden");
        hubScreen.classList.add("screen-active");

        triggerHubAnimation();
    }, 700);

    setTimeout(() => {
        waveTransition.classList.remove("active");
    }, 1300);
}

function triggerHubAnimation() {
    animatedItems.forEach((item, index) => {
        item.classList.remove(
            "show-up",
            "delay-1",
            "delay-2",
            "delay-3",
            "delay-4",
            "delay-5",
            "delay-6"
        );

        void item.offsetWidth;

        item.classList.add("show-up");

        if (index === 1) item.classList.add("delay-1");
        if (index === 2) item.classList.add("delay-2");
        if (index === 3) item.classList.add("delay-3");
        if (index === 4) item.classList.add("delay-4");
        if (index === 5) item.classList.add("delay-5");
        if (index === 6) item.classList.add("delay-6");
    });
}