let estudiantes = [
    { nombre: "Maria", apellidos: "Mora Perez",    nota: 90 },
    { nombre: "Pedro", apellidos: "Sibaja Lopez",  nota: 60 },
    { nombre: "Marco", apellidos: "Rojas Castro",  nota: 78 }
];
let formulario = document.getElementById("formularioEstudiante");
let campoNombre = document.getElementById("nombre");
let campoApellidos = document.getElementById("apellidos");
let campoNota = document.getElementById("nota");
let cuerpoTabla = document.getElementById("cuerpoTabla");
let mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    if (tipo === "error") {
        mensaje.className = "mensaje mensaje-error";
    } else if (tipo === "aviso") {
        mensaje.className = "mensaje mensaje-aviso";
    } else {
        mensaje.className = "mensaje mensaje-bien";
    }
}

function validarEstudiante(nombre, apellidos, textoNota) {
    if (nombre === "" || apellidos === "" || textoNota === "") {
        mostrarMensaje("Todos los campos son obligatorios.", "error");
        return false;
    }

    let nota = Number(textoNota);
    if (isNaN(nota)) {
        mostrarMensaje("La nota debe ser un valor numérico.", "error");
        return false;
    }
    if (nota < 0 || nota > 100) {
        mostrarMensaje("La nota debe estar entre 0 y 100.", "error");
        return false;
    }
    return true;
}

function agregarEstudiante() {
    let nombre = campoNombre.value.trim();
    let apellidos = campoApellidos.value.trim();
    let textoNota = campoNota.value.trim();

    if (validarEstudiante(nombre, apellidos, textoNota) === false) {
        return;
    }

    let nuevoEstudiante = {
        nombre: nombre,
        apellidos: apellidos,
        nota: Number(textoNota)
    };
    estudiantes.push(nuevoEstudiante);

    campoNombre.value = "";
    campoApellidos.value = "";
    campoNota.value = "";

    mostrarEstudiantes();
    mostrarMensaje("Estudiante agregado correctamente.", "bien");
    campoNombre.focus();
}

function calcularResumen() {
    if (estudiantes.length === 0) {
        return null;
    }
    let mayor = estudiantes[0];
    let menor = estudiantes[0];
    let suma = 0;

    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].nota > mayor.nota) {
            mayor = estudiantes[i];
        }
        if (estudiantes[i].nota < menor.nota) {
            menor = estudiantes[i];
        }
        suma = suma + estudiantes[i].nota;
    }

    return {
        mayor: mayor,
        menor: menor,
        promedio: suma / estudiantes.length
    };
}

function mostrarEstudiantes() {
    cuerpoTabla.textContent = "";

    for (let i = 0; i < estudiantes.length; i++) {
        let estudiante = estudiantes[i];

        let fila = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = estudiante.nombre;
        fila.appendChild(celdaNombre);

        let celdaApellidos = document.createElement("td");
        celdaApellidos.textContent = estudiante.apellidos;
        fila.appendChild(celdaApellidos);

        let celdaNota = document.createElement("td");
        celdaNota.textContent = estudiante.nota;
        celdaNota.className = "col-nota";
        if (estudiante.nota >= 80) {
            celdaNota.className = "col-nota nota-alta";
        } else if (estudiante.nota < 65) {
            celdaNota.className = "col-nota nota-baja";
        }
        fila.appendChild(celdaNota);
        cuerpoTabla.appendChild(fila);
    }

    mostrarResumen();
}

function mostrarResumen() {
    let resumen = calcularResumen();
    let resMayor = document.getElementById("resMayor");
    let resPromedio = document.getElementById("resPromedio");
    let resMenor = document.getElementById("resMenor");

    if (resumen === null) {
        resMayor.textContent = "-";
        resPromedio.textContent = "-";
        resMenor.textContent = "-";
        return;
    }

    resMayor.textContent = resumen.mayor.nombre + " " + resumen.mayor.apellidos +
        " (" + resumen.mayor.nota + ")";
    resPromedio.textContent = resumen.promedio.toFixed(2);
    resMenor.textContent = resumen.menor.nota;
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    agregarEstudiante();
});

mostrarEstudiantes();
