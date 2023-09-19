import  createExcel  from './scripts/Excel.script.js';
const Oanda = require('./scripts/Oanda.script.js');
//const Bank = require('./src/scripts/Bank.script.js');
//const img = require('./src/scripts/image.script.js');
import fs  from 'fs' 
import  moment  from 'moment'

async function main() {
  try {
    console.log("ey me estoy procesando")
    // Obtener los datos de Oanda
    const dataOanda = await Oanda.Oanda();

    // Obtener los datos de Bank
    //const dataBank = await Bank.runBank();

    // Procesar los datos
    const processedDataOanda = processData(dataOanda);
    //const processedDataBank = processData(dataBank);

    // Crear el Excel
    await createExcel(processedDataOanda, ); //processedDataBank

    // Registrar el proceso completado en el archivo de registro
    if (fs.existsSync('./src/documentation/BaseDate.txt')) {
      fs.appendFileSync('./src/documentation/BaseDate.txt', "Proceso Completado, " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n");
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function processData(data) {
  // Procesamiento de los datos aquí
  return data;
}

main();
