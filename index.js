const read = require('./Components/info')
const create = require('./Components/Excel')
const oanda = require('./Components/Oanda/Oanda')

read.read()
oanda.Oanda()

function ejecutarProceso() {
    const datos = read.data;
    const cantidadDatos = datos.length;
    let tiempoEspera = cantidadDatos * 2500; 
  
    tiempoEspera = Math.min(tiempoEspera, 100000);
    setTimeout(() => {
        create.CreateExcel()
    }, tiempoEspera);
    console.log(tiempoEspera)
  }
  
  ejecutarProceso()