const HistorialProcesos = [
    "proceso completado Numero 1",
    "proceso completado Numero 2",
    "proceso completado Numero 3",
]

const historialLista = document.getElementById("historial");
HistorialProcesos.forEach(proces =>{
    const elementoLista = document.createElement("li");
    elementoLista.textContent = proces;
    historialLista.appendChild(elementoLista)
})