let formulario = document.getElementById("formularioEdad");
let campoEdad = document.getElementById("edad");
let mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    if (tipo === "error") {
        mensaje.className = "mensaje resultado-edad mensaje-error";
    } else if (tipo === "aviso") {
        mensaje.className = "mensaje resultado-edad mensaje-aviso";
    } else {
        mensaje.className = "mensaje resultado-edad mensaje-bien";
    }
}

function validarEdad(texto) {
    if (texto.trim() === "") {
        mostrarMensaje("Debe ingresar su edad.", "error");
        return false;
    }
    let edad = Number(texto);
    if (isNaN(edad)) {
        mostrarMensaje("La edad debe ser un número.", "error");
        return false;
    }
    if (Number.isInteger(edad) === false) {
        mostrarMensaje("La edad debe ser un número entero.", "error");
        return false;
    }
    if (edad < 0 || edad > 120) {
        mostrarMensaje("La edad debe estar entre 0 y 120 años.", "error");
        return false;
    }
    return true;
}

function evaluarEdad() {
    let texto = campoEdad.value;
    if (validarEdad(texto) === false) {
        campoEdad.focus();
        return;
    }

    let edad = Number(texto);
    if (edad > 18) {
        mostrarMensaje("Eres mayor de edad.", "bien");
    } else {
        mostrarMensaje("Eres menor de edad.", "aviso");
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    evaluarEdad();
});
