let presupuesto = 0;
let gastos = 0;
const moneda = "COP";

document.addEventListener("DOMContentLoaded", function () {
    mostrarAlertaPresupuesto();
});

function mostrarAlertaPresupuesto() {
    document.querySelector('.alerta-presupuesto').style.display = 'block';
}

function establecerPresupuesto() {
    presupuesto = parseFloat(document.getElementById('presupuesto-input').value) || 0;

    if (presupuesto <= 0) {
        mostrarAlerta("Por favor, ingresa un presupuesto válido.", "primeraalerta");
        return;
    }

    document.querySelector('.alerta-presupuesto').style.display = 'none';

    document.querySelector(".presupuesto").innerText = `Presupuesto: ${formatoMoneda(presupuesto)}`;
    actualizarRestante();
}

function agregarGasto() {
    const nombreGasto = document.getElementById("gasto").value;
    const cantidadGasto = parseFloat(document.getElementById("cantidad").value) || 0;

    if (!nombreGasto || cantidadGasto <= 0) {
        mostrarAlerta("Por favor, ingresa un nombre y una cantidad válida para el gasto.", "primeraalerta");
        return;
    }

    const nuevaCarta = document.createElement("div");
    nuevaCarta.classList.add("cartas");

    nuevaCarta.innerHTML = `
        <p class="gastos"><b>${nombreGasto}</b></p>
        <p class="cantidad" data-cantidad="${cantidadGasto}">${formatoMoneda(cantidadGasto)}</p>
        <button type="button" class="borrar" onclick="borrarGasto(this)">Borrar</button>
    `;

    document.getElementById("listado").appendChild(nuevaCarta);

    gastos += cantidadGasto;
    actualizarRestante();

    document.getElementById("gasto").value = "";
    document.getElementById("cantidad").value = "";

    mostrarAlerta("Correcto", "primeraalerta");
}

function borrarGasto(elemento) {
    const cantidadGastoBorrado = parseFloat(elemento.parentNode.querySelector('.cantidad').dataset.cantidad) || 0;
    gastos -= cantidadGastoBorrado;
    elemento.parentNode.remove();
    actualizarRestante();
}

function actualizarRestante() {
    const restante = presupuesto - gastos;

    document.querySelector(".restante").innerText = `Restante: ${formatoMoneda(restante)}`;

    if (restante < 0) {
        mostrarAlerta("Has superado tu presupuesto.", "segundaalerta");
    }
}

function formatoMoneda(valor) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: moneda }).format(valor);
}

function mostrarAlerta(mensaje, claseAlerta) {
    document.querySelector(`.${claseAlerta}`).innerText = "";
    document.querySelector(`.${claseAlerta}`).innerText = mensaje;
}