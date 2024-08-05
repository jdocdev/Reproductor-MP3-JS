const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const inconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const canciones = [
    {
        titulo:'A Year Ago',
        nombre:'NEFFEX',
        fuente:'music/A Year Ago - NEFFEX.mp3'
    },
    {
        titulo:'As You Fade Away',
        nombre:'NEFFEX',
        fuente:'music/As You Fade Away - NEFFEX.mp3'
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

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata',function(){});
};

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion();
    }
};

function reproducirCancion(){
    cancion.play();
    inconoControl.classList.add('bi-pause-fill')
    inconoControl.classList.remove('bi-play-fill')
}

function pausarCancion(){
    cancion.pause();
    inconoControl.classList.remove('bi-pause-fill')
    inconoControl.classList.add('bi-play-fill')
}

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

// progreso.addEventListener('change', ()=>{
//     reproducirCancion();
// });

botonAdelante.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();
