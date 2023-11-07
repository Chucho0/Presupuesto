let presupuesto = 0;
let gastos = 0;
const moneda = "COP";
let presupuestoSuperado = false;

document.addEventListener("DOMContentLoaded", function () {
    mostrarAlertaPresupuesto();

    document.getElementById('presupuesto-input').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            establecerPresupuesto();
        }
    });

    document.getElementById('cantidad').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            agregarGasto();
        }
    });
});

function mostrarAlertaPresupuesto() {
    document.querySelector('.alerta-presupuesto').style.display = 'block';
}

function ocultarAlerta(claseAlerta) {
    const alertaElement = document.querySelector(`.${claseAlerta}`);
    alertaElement.style.display = 'none';
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
    if (presupuestoSuperado) {
        mostrarAlerta("Has superado tu presupuesto. No puedes agregar más gastos.", "segundaalerta");
        ocultarAlerta("primeraalerta");
        return;
    }

    const nombreGasto = document.getElementById("gasto").value;
    const cantidadGasto = parseFloat(document.getElementById("cantidad").value) || 0;

    if (!nombreGasto || cantidadGasto <= 0) {
        mostrarAlerta("Por favor, ingresa un nombre y una cantidad válida para el gasto.", "primeraalerta");
        return;
    }

    if (gastos + cantidadGasto > presupuesto) {
        mostrarAlerta("Has superado tu presupuesto. No puedes agregar más gastos.", "segundaalerta");
        ocultarAlerta("primeraalerta");
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
    presupuestoSuperado = false;
}

function actualizarRestante() {
    const restante = presupuesto - gastos;

    document.querySelector(".restante").innerText = `Restante: ${formatoMoneda(restante)}`;

    if (restante < 0) {
        presupuestoSuperado = true;
        mostrarAlerta("Has superado tu presupuesto. No puedes agregar más gastos.", "segundaalerta");
        ocultarAlerta("primeraalerta");
    }
}

function formatoMoneda(valor) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: moneda }).format(valor);
}

function mostrarAlerta(mensaje, claseAlerta) {
    const alertaElement = document.querySelector(`.${claseAlerta}`);
    alertaElement.innerText = mensaje;

    alertaElement.style.display = 'block';

    setTimeout(() => {
        alertaElement.style.display = 'none';
    }, 5000);
}
