const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const hubScreen = document.getElementById("hubScreen");
const wavepointsScreen = document.getElementById("wavepointsScreen");

const waveTransition = document.getElementById("waveTransition");
const expandTransition = document.getElementById("expandTransition");

const animatedItems = document.querySelectorAll("#hubScreen .animated-item");
const wavepointsAnimatedItems = document.querySelectorAll("#wavepointsScreen .wp-animated");

const openWavepointsBtn = document.getElementById("openWavepointsBtn");
const wpCancelBtn = document.getElementById("wpCancelBtn");
const homeBtn = document.getElementById("homeBtn");

let currentWavepoints = 0;

const wavepointsAmount = document.getElementById("wavepointsAmount");
updateWavepointsDisplay();

/* EVENTOS PRINCIPALES */
loginBtn.addEventListener("click", () => {
    startWaveTransition();
});

registerBtn.addEventListener("click", () => {
    alert("Después conectaremos esta opción con la pantalla de registro.");
});

openWavepointsBtn.addEventListener("click", () => {
    startExpandTransition(openWavepointsBtn, hubScreen, wavepointsScreen, true);
});

wpCancelBtn.addEventListener("click", () => {
    startExpandTransition(wpCancelBtn, wavepointsScreen, hubScreen, false);
});

homeBtn.addEventListener("click", () => {
    startExpandTransition(homeBtn, wavepointsScreen, hubScreen, false);
});

/* FUNCIONES */
function updateWavepointsDisplay() {
    wavepointsAmount.textContent = `$${currentWavepoints.toFixed(2)}`;
}

function startWaveTransition() {
    waveTransition.classList.add("active");

    setTimeout(() => {
        switchScreen(welcomeScreen, hubScreen);
        triggerHubAnimation();
    }, 700);

    setTimeout(() => {
        waveTransition.classList.remove("active");
    }, 1300);
}

function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.add("hidden");
    hideScreen.classList.remove("screen-active");

    showScreen.classList.remove("hidden");
    showScreen.classList.add("screen-active");
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

function triggerWavepointsAnimation() {
    wavepointsAnimatedItems.forEach((item, index) => {
        item.classList.remove("wp-show", "d1", "d2", "d3", "d4", "d5");

        void item.offsetWidth;

        item.classList.add("wp-show");

        if (index === 1) item.classList.add("d1");
        if (index === 2) item.classList.add("d2");
        if (index === 3) item.classList.add("d3");
        if (index === 4) item.classList.add("d4");
        if (index === 5) item.classList.add("d5");
    });
}

function startExpandTransition(triggerElement, fromScreen, toScreen, isGoingToWavepoints) {
    const rect = triggerElement.getBoundingClientRect();

    expandTransition.style.left = `${rect.left}px`;
    expandTransition.style.top = `${rect.top}px`;
    expandTransition.style.width = `${rect.width}px`;
    expandTransition.style.height = `${rect.height}px`;

    expandTransition.classList.remove("expand-in", "shrink-out");
    void expandTransition.offsetWidth;

    expandTransition.classList.add("expand-in");

    setTimeout(() => {
        switchScreen(fromScreen, toScreen);

        if (isGoingToWavepoints) {
            expandTransition.style.left = `50%`;
            expandTransition.style.top = `50%`;
            expandTransition.style.width = `170px`;
            expandTransition.style.height = `58px`;
            expandTransition.style.transform = `translate(-50%, -50%) scale(18)`;
            triggerWavepointsAnimation();
        } else {
            expandTransition.style.left = `50%`;
            expandTransition.style.top = `50%`;
            expandTransition.style.width = `170px`;
            expandTransition.style.height = `58px`;
            expandTransition.style.transform = `translate(-50%, -50%) scale(18)`;
            triggerHubAnimation();
        }

        expandTransition.classList.remove("expand-in");
        void expandTransition.offsetWidth;
        expandTransition.classList.add("shrink-out");
    }, 500);

    setTimeout(() => {
        expandTransition.classList.remove("shrink-out");
        expandTransition.style.opacity = "0";
        expandTransition.style.transform = "scale(1)";
    }, 980);
}