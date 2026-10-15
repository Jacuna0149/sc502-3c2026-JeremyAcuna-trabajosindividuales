const PORCENTAJE_SEM = 0.055;     
const PORCENTAJE_IVM = 0.0433;     
const PORCENTAJE_BANCO_POPULAR = 0.01;

const TRAMOS_RENTA = [
    { desde: 0,       hasta: 918000,  porcentaje: 0 },
    { desde: 918000,  hasta: 1347000, porcentaje: 0.10 },
    { desde: 1347000, hasta: 2364000, porcentaje: 0.15 },
    { desde: 2364000, hasta: 4727000, porcentaje: 0.20 },
    { desde: 4727000, hasta: null,    porcentaje: 0.25 }
];

let formulario = document.getElementById("formularioSalario");
let campoSalario = document.getElementById("salarioBruto");
let mensaje = document.getElementById("mensaje");
let resCargas = document.getElementById("resCargas");
let resRenta = document.getElementById("resRenta");
let resNeto = document.getElementById("resNeto");
let detalleCargas = document.getElementById("detalleCargas");
let detalleRenta = document.getElementById("detalleRenta");

function formatearColones(monto) {
    return monto.toLocaleString("es-CR", {
        style: "currency",
        currency: "CRC",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

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

function validarSalario(texto) {
    if (texto.trim() === "") {
        mostrarMensaje("Debe ingresar el salario bruto.", "error");
        return false;
    }
    let salario = Number(texto);
    if (isNaN(salario)) {
        mostrarMensaje("El salario debe ser un número.", "error");
        return false;
    }
    if (salario <= 0) {
        mostrarMensaje("El salario debe ser mayor que cero.", "error");
        return false;
    }
    if (salario > 1000000000) {
        mostrarMensaje("El salario ingresado es demasiado grande.", "error");
        return false;
    }
    return true;
}

function calcularCargasSociales(salario) {
    let sem = salario * PORCENTAJE_SEM;
    let ivm = salario * PORCENTAJE_IVM;
    let bancoPopular = salario * PORCENTAJE_BANCO_POPULAR;
    return {
        sem: sem,
        ivm: ivm,
        bancoPopular: bancoPopular,
        total: sem + ivm + bancoPopular
    };
}

function calcularRenta(salario) {
    let total = 0;
    let detalle = [];
    for (let i = 0; i < TRAMOS_RENTA.length; i++) {
        let tramo = TRAMOS_RENTA[i];
        if (salario > tramo.desde) {
            let limiteSuperior = salario;
            if (tramo.hasta !== null && salario > tramo.hasta) {
                limiteSuperior = tramo.hasta;
            }
            let baseTramo = limiteSuperior - tramo.desde;
            let impuestoTramo = baseTramo * tramo.porcentaje;
            total = total + impuestoTramo;
            detalle.push({
                porcentaje: tramo.porcentaje,
                base: baseTramo,
                impuesto: impuestoTramo
            });
        }
    }
    return { total: total, detalle: detalle };
}

function crearTabla(encabezados, filas) {
    let tabla = document.createElement("table");
    tabla.className = "tabla";
    let cabecera = document.createElement("tr");
    for (let i = 0; i < encabezados.length; i++) {
        let th = document.createElement("th");
        th.textContent = encabezados[i];
        if (i > 0) {
            th.className = "derecha";
        }
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);
    for (let f = 0; f < filas.length; f++) {
        let tr = document.createElement("tr");
        for (let c = 0; c < filas[f].length; c++) {
            let td = document.createElement("td");
            td.textContent = filas[f][c];
            if (c > 0) {
                td.className = "derecha";
            }
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
    return tabla;
}

function mostrarDetalle(cargas, renta) {
    detalleCargas.textContent = "";
    detalleRenta.textContent = "";

    let titulo1 = document.createElement("h3");
    titulo1.textContent = "Cargas sociales (10,83 %)";
    detalleCargas.appendChild(titulo1);
    detalleCargas.appendChild(crearTabla(
        ["Concepto", "Monto"],
        [
            ["SEM (5,50 %)", formatearColones(cargas.sem)],
            ["IVM (4,33 %)", formatearColones(cargas.ivm)],
            ["Banco Popular (1,00 %)", formatearColones(cargas.bancoPopular)],
            ["Total", formatearColones(cargas.total)]
        ]
    ));

    let titulo2 = document.createElement("h3");
    titulo2.textContent = "Impuesto sobre la renta por tramo";
    detalleRenta.appendChild(titulo2);
    let filas = [];
    for (let i = 0; i < renta.detalle.length; i++) {
        let d = renta.detalle[i];
        filas.push([
            (d.porcentaje * 100) + " % sobre " + formatearColones(d.base),
            formatearColones(d.impuesto)
        ]);
    }
    filas.push(["Total", formatearColones(renta.total)]);
    detalleRenta.appendChild(crearTabla(["Tramo", "Impuesto"], filas));
}

function calcularSalario() {
    let texto = campoSalario.value;
    if (validarSalario(texto) === false) {
        campoSalario.focus();
        return;
    }

    let salarioBruto = Number(texto);
    let cargas = calcularCargasSociales(salarioBruto);
    let renta = calcularRenta(salarioBruto);
    let salarioNeto = salarioBruto - cargas.total - renta.total;

    resCargas.textContent = formatearColones(cargas.total);
    resRenta.textContent = formatearColones(renta.total);
    resNeto.textContent = formatearColones(salarioNeto);
    mostrarDetalle(cargas, renta);
    mostrarMensaje("Cálculo realizado para un salario bruto de " +
        formatearColones(salarioBruto) + ".", "bien");
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    calcularSalario();
});
