let parrafo = document.getElementById("parrafo");
let boton = document.getElementById("botonCambiar");
let mensaje = document.querySelector("#mensaje");

const TEXTO_ORIGINAL = "Este es el texto original del párrafo. Presione el botón para cambiarlo.";
const TEXTO_NUEVO = "¡El contenido cambió! JavaScript modificó este párrafo usando el DOM.";
let mostrandoOriginal = true;

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    if (tipo === "aviso") {
        mensaje.className = "mensaje mensaje-aviso";
    } else {
        mensaje.className = "mensaje mensaje-bien";
    }
}

function cambiarParrafo() {
    if (mostrandoOriginal === true) {
        parrafo.textContent = TEXTO_NUEVO;
        boton.textContent = "Restaurar contenido";
        mostrarMensaje("El párrafo fue modificado.", "bien");
        mostrandoOriginal = false;
    } else {
        parrafo.textContent = TEXTO_ORIGINAL;
        boton.textContent = "Cambiar contenido";
        mostrarMensaje("El párrafo volvió a su texto original.", "aviso");
        mostrandoOriginal = true;
    }
}

boton.addEventListener("click", cambiarParrafo);
