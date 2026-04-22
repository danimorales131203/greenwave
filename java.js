const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const hubScreen = document.getElementById("hubScreen");
const wavepointsScreen = document.getElementById("wavepointsScreen");
const mapScreen = document.getElementById("mapScreen");

const waveTransition = document.getElementById("waveTransition");
const expandTransition = document.getElementById("expandTransition");

const animatedItems = document.querySelectorAll("#hubScreen .animated-item");
const wavepointsAnimatedItems = document.querySelectorAll("#wavepointsScreen .wp-animated");
const mapAnimatedItems = document.querySelectorAll("#mapScreen .map-animated");

const openWavepointsBtn = document.getElementById("openWavepointsBtn");
const wpCancelBtn = document.getElementById("wpCancelBtn");
const homeBtn = document.getElementById("homeBtn");
const wpMapBtn = document.getElementById("wpMapBtn");
const hubMapBtn = document.getElementById("hubMapBtn");
const mapToWavepointsBtn = document.getElementById("mapToWavepointsBtn");
const mapHomeBtn = document.getElementById("mapHomeBtn");

const wavepointsAmount = document.getElementById("wavepointsAmount");
const locationStatus = document.getElementById("locationStatus");

const eventPanel = document.getElementById("eventPanel");
const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");
const eventImage = document.getElementById("eventImage");
const eventMaterialsList = document.getElementById("eventMaterialsList");
const eventBackBtn = document.getElementById("eventBackBtn");
const eventJoinBtn = document.getElementById("eventJoinBtn");

let currentWavepoints = 0;
let mapInstance = null;
let userMarker = null;
let accuracyCircle = null;
let eventMarkersLayer = null;
let selectedEvent = null;

const ecoEvents = [
    {
        id: 1,
        title: "Limpieza Debut GreenWave",
        description: "Este es un ejemplo del texto utilizado para explicar un poco del evento seleccionado por el usuario.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
        materials: ["Guantes", "Bolsas", "Cubrebocas"],
        lat: 31.8727,
        lng: -116.6170
    },
    {
        id: 2,
        title: "Recolección en Arroyo",
        description: "Jornada comunitaria enfocada en retirar residuos del arroyo y separar materiales reciclables.",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80",
        materials: ["Guantes", "Botellas de agua", "Bolsas resistentes"],
        lat: 31.8684,
        lng: -116.6102
    },
    {
        id: 3,
        title: "Limpieza de Parque Local",
        description: "Actividad vecinal para recuperar espacios públicos y mejorar la imagen del parque.",
        image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
        materials: ["Guantes", "Escoba", "Bolsas"],
        lat: 31.8758,
        lng: -116.6058
    }
];

updateWavepointsDisplay();

/* EVENTOS PRINCIPALES */
loginBtn?.addEventListener("click", () => {
    startWaveTransition();
});

registerBtn?.addEventListener("click", () => {
    alert("Después conectaremos esta opción con la pantalla de registro.");
});

openWavepointsBtn?.addEventListener("click", () => {
    startExpandTransition(openWavepointsBtn, hubScreen, wavepointsScreen, "wavepoints");
});

wpCancelBtn?.addEventListener("click", () => {
    startExpandTransition(wpCancelBtn, wavepointsScreen, hubScreen, "hub");
});

homeBtn?.addEventListener("click", () => {
    startExpandTransition(homeBtn, wavepointsScreen, hubScreen, "hub");
});

wpMapBtn?.addEventListener("click", () => {
    startExpandTransition(wpMapBtn, wavepointsScreen, mapScreen, "map");
});

hubMapBtn?.addEventListener("click", () => {
    startExpandTransition(hubMapBtn, hubScreen, mapScreen, "map");
});

mapToWavepointsBtn?.addEventListener("click", () => {
    startExpandTransition(mapToWavepointsBtn, mapScreen, wavepointsScreen, "wavepoints");
});

mapHomeBtn?.addEventListener("click", () => {
    startExpandTransition(mapHomeBtn, mapScreen, hubScreen, "hub");
});

eventBackBtn?.addEventListener("click", () => {
    hideEventPanel();
});

eventJoinBtn?.addEventListener("click", () => {
    if (selectedEvent) {
        alert(`Te has inscrito a: ${selectedEvent.title}`);
    }
});

/* FUNCIONES PRINCIPALES */
function updateWavepointsDisplay() {
    if (wavepointsAmount) {
        wavepointsAmount.textContent = `$${currentWavepoints.toFixed(2)}`;
    }
}

function startWaveTransition() {
    if (!waveTransition) return;

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
    hideEventPanel();

    if (hideScreen) {
        hideScreen.classList.add("hidden");
        hideScreen.classList.remove("screen-active");
    }

    if (showScreen) {
        showScreen.classList.remove("hidden");
        showScreen.classList.add("screen-active");
    }
}

function triggerHubAnimation() {
    animatedItems.forEach((item, index) => {
        item.classList.remove("show-up", "delay-1", "delay-2", "delay-3", "delay-4", "delay-5", "delay-6");
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

function triggerMapAnimation() {
    mapAnimatedItems.forEach((item, index) => {
        item.classList.remove("map-show", "m1", "m2");
        void item.offsetWidth;
        item.classList.add("map-show");

        if (index === 1) item.classList.add("m1");
        if (index === 2) item.classList.add("m2");
    });
}

function startExpandTransition(triggerElement, fromScreen, toScreen, destination) {
    if (!triggerElement || !expandTransition) {
        switchScreen(fromScreen, toScreen);

        if (destination === "wavepoints") {
            triggerWavepointsAnimation();
        } else if (destination === "hub") {
            triggerHubAnimation();
        } else if (destination === "map") {
            triggerMapAnimation();
            setTimeout(() => {
                initOrUpdateMap();
            }, 250);
        }

        return;
    }

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

        expandTransition.style.left = "50%";
        expandTransition.style.top = "50%";
        expandTransition.style.width = "170px";
        expandTransition.style.height = "58px";

        if (destination === "wavepoints") {
            triggerWavepointsAnimation();
        } else if (destination === "hub") {
            triggerHubAnimation();
        } else if (destination === "map") {
            triggerMapAnimation();

            setTimeout(() => {
                initOrUpdateMap();
            }, 250);
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

/* MAPA */
function initOrUpdateMap() {
    if (typeof L === "undefined") {
        if (locationStatus) {
            locationStatus.textContent = "Leaflet no cargó. Revisa la conexión o los imports.";
        }
        return;
    }

    if (!mapInstance) {
        mapInstance = L.map("map", {
            zoomControl: true,
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true,
            tap: true,
            touchZoom: true
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(mapInstance);
    }

    setTimeout(() => {
        mapInstance.invalidateSize();
        getUserLocation();
        renderEcoEventMarkers();
    }, 300);
}

function getUserLocation() {
    if (!navigator.geolocation) {
        if (locationStatus) {
            locationStatus.textContent = "Tu navegador no soporta geolocalización.";
        }
        setDefaultMapView();
        return;
    }

    if (locationStatus) {
        locationStatus.textContent = "Solicitando ubicación...";
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            if (locationStatus) {
                locationStatus.textContent = `Ubicación detectada: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            }

            mapInstance.setView([lat, lng], 16);

            if (userMarker) {
                userMarker.setLatLng([lat, lng]);
            } else {
                userMarker = L.marker([lat, lng]).addTo(mapInstance);
                userMarker.bindPopup("Tu ubicación actual");
            }

            if (accuracyCircle) {
                accuracyCircle.setLatLng([lat, lng]);
                accuracyCircle.setRadius(accuracy);
            } else {
                accuracyCircle = L.circle([lat, lng], {
                    radius: accuracy,
                    color: "#41b31c",
                    fillColor: "#41b31c",
                    fillOpacity: 0.15
                }).addTo(mapInstance);
            }
        },
        (error) => {
            if (locationStatus) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationStatus.textContent = "Permiso de ubicación denegado.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationStatus.textContent = "Ubicación no disponible.";
                        break;
                    case error.TIMEOUT:
                        locationStatus.textContent = "Tiempo de espera agotado.";
                        break;
                    default:
                        locationStatus.textContent = "No se pudo obtener tu ubicación.";
                        break;
                }
            }

            setDefaultMapView();
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function setDefaultMapView() {
    if (!mapInstance) return;
    mapInstance.setView([31.8667, -116.5964], 13);
}

/* EVENTOS ECOLÓGICOS EN MAPA */
function createEventIcon() {
    return L.divIcon({
        className: "custom-event-marker-wrapper",
        html: `
            <div class="event-marker">
                <div class="pin-body"></div>
            </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30]
    });
}

function renderEcoEventMarkers() {
    if (!mapInstance) return;

    if (eventMarkersLayer) {
        eventMarkersLayer.clearLayers();
    } else {
        eventMarkersLayer = L.layerGroup().addTo(mapInstance);
    }

    ecoEvents.forEach((eventData) => {
        const marker = L.marker([eventData.lat, eventData.lng], {
            icon: createEventIcon()
        });

        marker.on("click", () => {
            showEventPanel(eventData);
        });

        marker.addTo(eventMarkersLayer);
    });
}

function showEventPanel(eventData) {
    selectedEvent = eventData;

    if (eventTitle) {
        eventTitle.textContent = eventData.title;
    }

    if (eventDescription) {
        eventDescription.textContent = eventData.description;
    }

    if (eventImage) {
        eventImage.src = eventData.image;
        eventImage.alt = eventData.title;
    }

    if (eventMaterialsList) {
        eventMaterialsList.innerHTML = "";

        eventData.materials.forEach((material) => {
            const li = document.createElement("li");
            li.textContent = material;
            eventMaterialsList.appendChild(li);
        });
    }

    if (eventPanel) {
        eventPanel.classList.remove("hidden");

        const scrollContainer = eventPanel.querySelector(".event-panel-scroll");
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
    }
}

function hideEventPanel() {
    if (!eventPanel) return;

    eventPanel.classList.add("hidden");
    selectedEvent = null;

    const scrollContainer = eventPanel.querySelector(".event-panel-scroll");
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}