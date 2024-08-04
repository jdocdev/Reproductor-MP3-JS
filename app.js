const progreso = document.getElementById("progreso");
const cancion = document.getElementById("cancion");
const iconoControl = document.getElementById("iconoControl");
const botonReproducirPausar = document.querySelector(".boton-reproducir-pausar");
const botonAdelante = document.querySelector(".controles button.adelante");
const botonAtras = document.querySelector(".controles button.atras");
const tituloCancion = document.querySelector(".reproductor-musica h1");
const nombreArtista = document.querySelector(".reproductor-musica p");

const canciones = [
    {
        titulo: "A Year Ago",
        nombre: "NEFFEX",
        fuente: "music/A Year Ago - NEFFEX.mp3",
    },
    {
        titulo: "As You Fade Away",
        nombre: "NEFFEX",
        fuente: "music/As You Fade Away - NEFFEX.mp3",
    },
    {
        titulo: "Catch Me If I Fall",
        nombre: "NEFFEX",
        fuente: "music/Catch Me If I Fall - NEFFEX.mp3",
    },
    {
        titulo: "Chasing",
        nombre: "NEFFEX",
        fuente: "music/Chasing - NEFFEX.mp3",
    },
    {
        titulo: "Play Dead",
        nombre: "NEFFEX",
        fuente: "music/Play Dead - NEFFEX.mp3",
    },

];

let indiceCancionActual = 0;

function actualizarInfoCancion() {
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener("loadeddata", function () { });
}

cancion.addEventListener("timeupdate", function () {
    if (!cancion.paused) {
        progreso.value = cancion.currentTime;
    }
});

cancion.addEventListener("loadedmetadata", function () {
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

function pausarCancion() {
    cancion.pause();
    iconoControl.classList.remove("bi-pause-fill");
    iconoControl.classList.add("bi-play-fill");
}

function reproducirCancion() {
    cancion.play();
    iconoControl.classList.add("bi-pause-fill");
    iconoControl.classList.remove("bi-play-fill");
}

function reproducirPausar() {
    if (cancion.paused) {
        reproducirCancion();
    } else {
        pausarCancion();
    }
}

botonReproducirPausar.addEventListener("click", reproducirPausar);

progreso.addEventListener("input", function () {
    cancion.currentTime = progreso.value;
});

progreso.addEventListener("change", function () {
    reproducirCancion();
});

botonAdelante.addEventListener("click", function () {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirPausar();
});

botonAtras.addEventListener("click", function () {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirPausar();
});

actualizarInfoCancion();
