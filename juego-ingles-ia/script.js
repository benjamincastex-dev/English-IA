const palabras = [
    { pregunta: "HOUSE", correcta: "CASA" },
    { pregunta: "DOG", correcta: "PERRO" },
    { pregunta: "BOOK", correcta: "LIBRO" },
    { pregunta: "WATER", correcta: "AGUA" },
    { pregunta: "SCHOOL", correcta: "ESCUELA" },
    { pregunta: "FRIEND", correcta: "AMIGO" },
    { pregunta: "MOTHER", correcta: "MADRE" },
    { pregunta: "FOOD", correcta: "COMIDA" },
    { pregunta: "SUN", correcta: "SOL" },
    { pregunta: "CAR", correcta: "AUTO" }
];
const oraciones = [
    { pregunta: "I LIKE MUSIC", correcta: "ME GUSTA LA MÚSICA" },
    { pregunta: "SHE IS MY FRIEND", correcta: "ELLA ES MI AMIGA" },
    { pregunta: "I GO TO SCHOOL", correcta: "VOY A LA ESCUELA" },
    { pregunta: "HE HAS A DOG", correcta: "ÉL TIENE UN PERRO" },
    { pregunta: "THE WEATHER IS COLD", correcta: "EL CLIMA ESTÁ FRÍO" },
    { pregunta: "WE ARE HAPPY", correcta: "NOSOTROS ESTAMOS FELICES" },
    { pregunta: "THE BOY IS TALL", correcta: "EL CHICO ES ALTO" },
    { pregunta: "I WANT SOME WATER", correcta: "QUIERO AGUA" },
    { pregunta: "SHE LIKES TO READ", correcta: "A ELLA LE GUSTA LEER" },
    { pregunta: "THE CAT IS UNDER THE TABLE", correcta: "EL GATO ESTÁ DEBAJO DE LA MESA" }
];
const completar = [
    { pregunta: "I ___ a student.", correcta: "AM" },
    { pregunta: "She ___ my sister.", correcta: "IS" },
    { pregunta: "They ___ happy.", correcta: "ARE" },
    { pregunta: "I ___ a dog.", correcta: "HAVE" },
    { pregunta: "He ___ football.", correcta: "PLAYS" },
    { pregunta: "We ___ English.", correcta: "STUDY" },
    { pregunta: "She ___ coffee.", correcta: "LIKES" },
    { pregunta: "They ___ to school.", correcta: "GO" },
    { pregunta: "I ___ hungry.", correcta: "AM" },
    { pregunta: "He ___ a new book.", correcta: "HAS" }
];
const listening = [
    { pregunta: "Good morning, how are you?", correcta: "Buenos días, ¿cómo estás?" },
    { pregunta: "I like playing football.", correcta: "Me gusta jugar al fútbol." },
    { pregunta: "Where is the school?", correcta: "¿Dónde está la escuela?" },
    { pregunta: "My name is John.", correcta: "Mi nombre es John." },
    { pregunta: "I have two brothers.", correcta: "Tengo dos hermanos." },
    { pregunta: "She is reading a book.", correcta: "Ella está leyendo un libro." },
    { pregunta: "The dog is very small.", correcta: "El perro es muy pequeño." },
    { pregunta: "I want to drink water.", correcta: "Quiero tomar agua." },
    { pregunta: "We are going home.", correcta: "Estamos yendo a casa." },
    { pregunta: "What is your favorite color?", correcta: "¿Cuál es tu color favorito?" }
];
let nivelActual = 1;
let puntos = 0;
let vidas = 3;
let combo = 0;
let correctas = 0;
let incorrectas = 0;
let dificultad = "medio";
let preguntaActual = null;
let pistaUsada = false;
const configuracion = {
    facil: {
        puntos: 10,
        vidas: 5
    },
    medio: {
        puntos: 15,
        vidas: 3
    },
    dificil: {
        puntos: 20,
        vidas: 2
    }
};
const menu = document.getElementById("menu");
const juego = document.getElementById("juego");
const final = document.getElementById("final");
const facilBtn = document.getElementById("facilBtn");
const medioBtn = document.getElementById("medioBtn");
const dificilBtn = document.getElementById("dificilBtn");
const continuarBtn = document.getElementById("continuarBtn");
const nuevaBtn = document.getElementById("nuevaBtn");
const salirBtn = document.getElementById("salirBtn")
const inicioBtn = document.getElementById("inicioBtn");
const escucharBtn = document.getElementById("escucharBtn");
const pistaBtn = document.getElementById("pistaBtn");
const nivelTexto = document.getElementById("nivel");
const puntosTexto = document.getElementById("puntos");
const comboTexto = document.getElementById("combo");
const vidasTexto = document.getElementById("vidas");
const preguntaTexto = document.getElementById("pregunta");
const instruccion = document.getElementById("instruccion");
const categoria = document.getElementById("categoria");
const respuestasDiv = document.getElementById("respuestas");
const barraProgreso = document.getElementById("barra-progreso");
const mensaje = document.getElementById("mensaje");
facilBtn.addEventListener("click", function () {
    seleccionarDificultad("facil");
});
medioBtn.addEventListener("click", function () {
    seleccionarDificultad("medio");
});
dificilBtn.addEventListener("click", function () {
    seleccionarDificultad("dificil");
});
nuevaBtn.addEventListener("click", function () {
    mostrarDificultades();
});
continuarBtn.addEventListener("click", function () {
    continuarPartida();
});
salirBtn.addEventListener("click", function () {
    volverMenu();
});
inicioBtn.addEventListener("click", function () {
    volverAlInicio();
});
escucharBtn.addEventListener("click", function () {
    escuchar();
});
pistaBtn.addEventListener("click", function () {
    usarPista();
});
function mezclar(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temporal = copia[i];
        copia[i] = copia[j];

        copia[j] = temporal;
    }
    return copia;
}
function seleccionarDificultad(nuevaDificultad) {
    dificultad = nuevaDificultad;
    comenzarPartida();
}
function mostrarDificultades() {
    document.querySelector(".dificultades").scrollIntoView({
        behavior: "smooth"
    });
}
function comenzarPartida() {
    nivelActual = 1;
    puntos = 0;
    combo = 0;
    correctas = 0;
    incorrectas = 0;
    vidas = configuracion[dificultad].vidas;
    menu.classList.add("oculto");
    final.classList.add("oculto");
    juego.classList.remove("oculto");
    guardarPartida();
    cargarPregunta();
}
function cargarPregunta() {
    mensaje.textContent = "";
    mensaje.className = "mensaje";
    pistaUsada = false;
    pistaBtn.disabled = false;
    pistaBtn.style.opacity = "1";
    respuestasDiv.innerHTML = "";
    escucharBtn.classList.add("oculto");
    if (nivelActual <= 10) {
        categoria.textContent = "VOCABULARIO";
        instruccion.textContent =
            "Elegí la traducción correcta";
        preguntaActual =
            palabras[
                Math.floor(
                    Math.random() * palabras.length
                )
            ];
    }
    else if (nivelActual <= 20) {
        categoria.textContent = "ORACIONES";
        instruccion.textContent =
            "Elegí la traducción correcta";
        preguntaActual =
            oraciones[
                Math.floor(
                    Math.random() * oraciones.length
                )
            ];
    }
    else if (nivelActual <= 30) {
        categoria.textContent =
            "COMPLETÁ LA ORACIÓN";
        instruccion.textContent =
            "Elegí la palabra que falta";
        preguntaActual =
            completar[
                Math.floor(
                    Math.random() * completar.length
                )
            ];
    }
    else {
        categoria.textContent = "LISTENING";
        instruccion.textContent =
            "Escuchá y elegí la traducción correcta";
        preguntaActual =
            listening[
                Math.floor(
                    Math.random() * listening.length
                )
            ];
        escucharBtn.classList.remove("oculto");
    }
    preguntaTexto.textContent =
        preguntaActual.pregunta;
    generarRespuestas();
    actualizarHUD();
}
function generarRespuestas() {
    let datos;
    if (nivelActual <= 10) {
        datos = palabras;
    }
    else if (nivelActual <= 20) {
        datos = oraciones;
    }
    else if (nivelActual <= 30) {
        datos = completar;
    }
    else {
        datos = listening;
    }
    let incorrectasDisponibles =
        datos
            .filter(function (item) {
                return item.correcta !==
                    preguntaActual.correcta;
            })
            .map(function (item) {
                return item.correcta;
            });
    incorrectasDisponibles =
        mezclar(incorrectasDisponibles)
            .slice(0, 3);
    let respuestas = [
        preguntaActual.correcta,
        ...incorrectasDisponibles
    ];
    respuestas = mezclar(respuestas);
    respuestas.forEach(function (respuesta, indice) {
        const boton =
            document.createElement("button");
        boton.className = "respuesta";
        boton.textContent =
            String.fromCharCode(65 + indice)
            + ". "
            + respuesta;
        boton.addEventListener(
            "click",
            function () {
                verificarRespuesta(
                    respuesta,
                    boton
                );
            }
        );
        respuestasDiv.appendChild(boton);
    });
}
function verificarRespuesta(respuesta, boton) {
    const botones =
        document.querySelectorAll(".respuesta");
    botones.forEach(function (b) {
        b.disabled = true;
    });
    if (respuesta === preguntaActual.correcta) {
        boton.classList.add("correcta");
        correctas++;
        combo++;
        let puntosGanados =
            configuracion[dificultad].puntos;
        if (combo >= 3) {
            puntosGanados += 5;
        }
        if (combo >= 5) {
            puntosGanados += 10;
        }
        puntos += puntosGanados;
        mensaje.textContent =
            "✓ ¡CORRECTO! +" +
            puntosGanados +
            " puntos";
        mensaje.classList.add("correcto");
    }
    else {
        boton.classList.add("incorrecta");
        incorrectas++;
        vidas--;
        combo = 0;
        botones.forEach(function (b) {
            if (
                b.textContent.includes(
                    preguntaActual.correcta
                )
            ) {
                b.classList.add("correcta");
            }
        });
        mensaje.textContent =
            "✕ Incorrecto. Era: " +
            preguntaActual.correcta;
        mensaje.classList.add("error");
    }
    actualizarHUD();
    guardarPartida();
    setTimeout(function () {
        if (vidas <= 0) {
            terminarPartida();
        }
        else if (nivelActual >= 40) {
            terminarPartida();
        }
        else {
            nivelActual++;
            cargarPregunta();
        }
    }, 1200);
}
function usarPista() {
    if (pistaUsada) {
        return;
    }
    pistaUsada = true;
    pistaBtn.disabled = true;
    pistaBtn.style.opacity = "0.4";
    const botones =
        Array.from(
            document.querySelectorAll(".respuesta")
        );
    const incorrectos =
        botones.filter(function (boton) {
            return !boton.textContent.includes(
                preguntaActual.correcta
            );
        });
    const seleccionados =
        mezclar(incorrectos).slice(0, 2);
    seleccionados.forEach(function (boton) {
        boton.disabled = true;
        boton.style.opacity = "0.2";
        boton.style.textDecoration =
            "line-through";
    });
    puntos =
        Math.max(0, puntos - 5);
    puntosTexto.textContent = puntos;
    mensaje.textContent =
        "💡 Pista utilizada.";
}
function escuchar() {
    if (!("speechSynthesis" in window)) {
        alert(
            "Tu navegador no permite reproducir audio."
        );
        return;
    }
    const voz =
        new SpeechSynthesisUtterance(
            preguntaActual.pregunta
        );
    voz.lang = "en-US";
    voz.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(voz);
}
function actualizarHUD() {
    nivelTexto.textContent =
        String(nivelActual).padStart(2, "0");
    puntosTexto.textContent =
        puntos;
    comboTexto.textContent =
        combo + " 🔥";
    let corazones = "";
    for (let i = 0; i < vidas; i++) {
        corazones += "❤️";
    }
    if (corazones === "") {
        corazones = "💀";
    }
    vidasTexto.textContent =
        corazones;
    const porcentaje =
        (nivelActual / 40) * 100;
    barraProgreso.style.width =
        porcentaje + "%";
}
function guardarPartida() {
    const partida = {
        nivel: nivelActual,
        puntos: puntos,
        combo: combo,
        vidas: vidas,
        dificultad: dificultad,
        correctas: correctas,
        incorrectas: incorrectas
    };
    localStorage.setItem(
        "englishAIPartida",
        JSON.stringify(partida)
    );
}
function continuarPartida() {
    const datos =
        localStorage.getItem(
            "englishAIPartida"
        );
    if (!datos) {
        alert(
            "No hay una partida guardada."
        );
        return;
    }
    const partida =
        JSON.parse(datos);
    nivelActual = partida.nivel;
    puntos = partida.puntos;
    combo = partida.combo;
    vidas = partida.vidas;
    dificultad = partida.dificultad;
    correctas = partida.correctas;
    incorrectas = partida.incorrectas;
    menu.classList.add("oculto");
    final.classList.add("oculto");
    juego.classList.remove("oculto");
    cargarPregunta();
}
function volverMenu() {
    guardarPartida();
    juego.classList.add("oculto");
    final.classList.add("oculto");
    menu.classList.remove("oculto");
}
function terminarPartida() {
    juego.classList.add("oculto");
    final.classList.remove("oculto");
    document.getElementById(
        "resultadoPuntos"
    ).textContent = puntos;
    document.getElementById(
        "resultadoAciertos"
    ).textContent = correctas;
    document.getElementById(
        "resultadoErrores"
    ).textContent = incorrectas;
    analizarConMachinelearn();
    localStorage.removeItem(
        "englishAIPartida"
    );
}
function analizarConMachinelearn() {
    const perfil =
        document.getElementById(
            "perfilJugador"
        );
    const recomendacion =
        document.getElementById(
            "recomendacion"
        );
    try {
        const X = [
            [8, 2, 100, 10],
            [6, 4, 80, 10],
            [10, 0, 150, 10],

            [15, 5, 200, 20],
            [12, 8, 160, 20],
            [20, 0, 300, 20],

            [25, 5, 350, 30],
            [22, 8, 300, 30],
            [30, 0, 450, 30]
        ];
        const Y = [
            0, 0, 2,
            1, 1, 2,
            2, 2, 2
        ];
        const datosJugador = [[
            correctas,
            incorrectas,
            puntos,
            nivelActual
        ]];
        if (
            typeof ml === "undefined" ||
            !ml.ensemble
        ) {
            throw new Error(
                "Machinelearn no está disponible."
            );
        }
        const modelo =
            new ml.ensemble.RandomForestClassifier();
        modelo.fit(X, Y);
        const resultado =
            modelo.predict(datosJugador);
        const clase =
            resultado[0];
        if (clase === 0) {
            perfil.textContent =
                "JUGADOR PRINCIPIANTE";
            recomendacion.textContent =
                "La IA recomienda practicar vocabulario y oraciones básicas.";
        }
        else if (clase === 1) {
            perfil.textContent =
                "JUGADOR INTERMEDIO";
            recomendacion.textContent =
                "La IA detectó un rendimiento intermedio.";
        }
        else {
            perfil.textContent =
                "JUGADOR AVANZADO";
            recomendacion.textContent =
                "La IA detectó un rendimiento avanzado.";
        }
    }
    catch (error) {
        console.log(
            "Machinelearn:",
            error
        );
        const porcentaje =
            correctas /
            Math.max(
                1,
                correctas + incorrectas
            );
        if (porcentaje >= 0.8) {
            perfil.textContent =
                "JUGADOR AVANZADO";
            recomendacion.textContent =
                "Tu porcentaje de respuestas correctas fue muy alto.";
        }
        else if (porcentaje >= 0.5) {
            perfil.textContent =
                "JUGADOR INTERMEDIO";
            recomendacion.textContent =
                "Tu rendimiento fue intermedio.";
        }
        else {
            perfil.textContent =
                "JUGADOR PRINCIPIANTE";
            recomendacion.textContent =
                "Conviene seguir practicando.";
        }
    }
}
function volverAlInicio() {
    final.classList.add("oculto");
    menu.classList.remove("oculto");
}6