let estudiantes = [
    { nombre: "María",  apellido: "Rodríguez", nota: 92 },
    { nombre: "José",   apellido: "Vargas",    nota: 85 },
    { nombre: "Ana",    apellido: "Jiménez",   nota: 78 },
    { nombre: "Carlos", apellido: "Mora",      nota: 88 },
    { nombre: "Lucía",  apellido: "Solano",    nota: 95 }
];

let contenedorLista = document.getElementById("listaEstudiantes");
let contenedorPromedio = document.getElementById("promedio");

function calcularPromedio(arreglo) {
    if (arreglo.length === 0) {
        return 0;
    }
    let suma = 0;
    for (let i = 0; i < arreglo.length; i++) {
        suma = suma + arreglo[i].nota;
    }
    return suma / arreglo.length;
}

function mostrarEstudiantes() {
    contenedorLista.textContent = "";

    estudiantes.forEach(function (estudiante) {
        let div = document.createElement("div");
        div.className = "estudiante";

        let nombreCompleto = document.createElement("strong");
        nombreCompleto.textContent = estudiante.nombre + " " + estudiante.apellido;
        div.appendChild(nombreCompleto);

        let detalle = document.createElement("span");
        detalle.className = "detalle";
        detalle.textContent = "Nota: " + estudiante.nota;
        div.appendChild(detalle);

        contenedorLista.appendChild(div);
    });

    let promedio = calcularPromedio(estudiantes);
    contenedorPromedio.textContent = "Promedio de notas: " + promedio.toFixed(2);
}

mostrarEstudiantes();
