const create = require('./src/scripts/Excel.script.js');
const Oanda = require('./src/scripts/Oanda.script.js');
const Bank = require('./src/scripts/Bank.script.js');
// const img = require('./src/scripts/image.script.js');
const fs = require('fs');
const moment = require('moment');

async function main() {
  try {
    // Obtener los datos de Oanda
    const dataOanda = await Oanda.Oanda();

    // Obtener los datos de Bank
    const dataBank = await Bank.runBank();

    // Procesar los datos
    const processedDataOanda = processData(dataOanda);
    const processedDataBank = processData(dataBank);

    // Crear el Excel
    await create.createExcel(processedDataOanda, processedDataBank);

    // Registrar el proceso completado en el archivo de registro
    if (fs.existsSync('./BaseDate.txt')) {
      fs.appendFileSync('./BaseDate.txt', "Proceso Completado, " + moment().format('MMMM Do YYYY, h:mm:ss a') + "\n");
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
