// Sección 1 → Sección 2
function verificarClave() {
  const clave = "corazon"; // ← Cambia por tu palabra clave
  const entrada = document.getElementById("respuesta").value.toLowerCase().trim();
  if (entrada === clave) {
    mostrarSeccion("seccionJuego");
  } else {
    alert("Hmm... no es la palabra. Intenta otra vez 🌙");
  }
}

// Sección 2 → Sección 3
const secretoFacil = "12345";    // Código para modo fácil
const secretoDificil = "67890";  // Código para modo difícil

// Historial de intentos por modo
let historialFacil = [];
let historialDificil = [];

function actualizarHistorial() {
  const modo = document.getElementById("modo").value;
  const historialDiv = document.getElementById("historial");
  const historial = modo === "facil" ? historialFacil : historialDificil;
  if (historial.length === 0) {
    historialDiv.innerHTML = "<b>Historial:</b> (vacío)";
    return;
  }
  historialDiv.innerHTML = "<b>Historial:</b><ul style='padding-left:18px; margin:0;'>";
  // Mostrar todos los intentos, el scroll lo controla el CSS
  historial.forEach((item) => {
    historialDiv.innerHTML += `<li><code>${item}</code></li>`;
  });
  historialDiv.innerHTML += "</ul>";
}

function reiniciarHistorial() {
  // Al cambiar de modo, solo actualiza la vista, no borra el historial del otro modo
  actualizarHistorial();
  document.getElementById("resultado").textContent = "";
}

// Modifica verificarCodigo para guardar el intento
function verificarCodigo() {
  const modo = document.getElementById("modo").value;
  const entrada = document.getElementById("entrada").value.trim();
  const resultado = document.getElementById("resultado");

  if (entrada.length !== 5 || isNaN(entrada)) {
    resultado.textContent = "Por favor, ingresa 5 números válidos.";
    return;
  }

  // Guardar intento en el historial correspondiente
  if (modo === "facil") {
    historialFacil.push(entrada);
  } else {
    historialDificil.push(entrada);
  }
  actualizarHistorial();

  let correctos = 0;
  // Selecciona el código secreto según el modo
  const secreto = modo === "facil" ? secretoFacil : secretoDificil;

  if (modo === "facil") {
    let correctosTemporales = 0;
    let enOrden = 0;

    let secretoTemp = secreto.split('');
    let entradaTemp = entrada.split('');

    for (let i = 0; i < 5; i++) {
      const index = secretoTemp.indexOf(entradaTemp[i]);
      if (index !== -1) {
        correctosTemporales++;
        secretoTemp[index] = null;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (entrada[i] === secreto[i]) {
        enOrden++;
      }
    }

    if (entrada === secreto) {
      mostrarSeccion("seccionFinal");
    } else if (correctosTemporales === 5) {
      resultado.textContent = `✅ Todos los números están correctos, pero el orden no.\n🔢 Números en su posición: ${enOrden}/5`;
    } else {
      resultado.textContent = `✔️ ${correctosTemporales} número(s) correctos.\n🔢 ${enOrden} en la posición correcta.`;
    }
  } else {
    for (let i = 0; i < 5; i++) {
      if (entrada[i] === secreto[i]) {
        correctos++;
      }
    }
    resultado.textContent = `${correctos} número(s) en la posición correcta.`;
  }

  if (entrada === secreto) {
    mostrarSeccion("seccionFinal");
  }
}

// Mostrar secciones con animación
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach(s => s.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
  if (id === "seccionJuego") {
    actualizarHistorial();
  }
}

function volver(seccionActual) {
  if (seccionActual === "seccionJuego") {
    mostrarSeccion("seccionClave");
  } else if (seccionActual === "seccionFinal") {
    mostrarSeccion("seccionJuego");
  } else {
    // Si está en la primera sección, no hace nada o puedes ocultar el botón
  }
}