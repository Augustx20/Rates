// @ts-nocheck
const moment = require('moment');
const fs = require('fs');
const path = require('path'); 
const Excel = require('./src/components/Excel.js');
const Uruguay = require('./src/exchangeRate/Uruguay/Uruguay.js');
const Chile = require('./src/exchangeRate/Chile/Chile.Js');
const Peru = require('./src/exchangeRate/Peru/Peru.Js');
const Colombia = require('./src/exchangeRate/Colombia/Colombia.js');
const CostaRica = require('./src/exchangeRate/CostaRica/CostaRica.js');
const Guatemala = require('./src/exchangeRate/Guatemala/Guatemala.js');
const Honduras = require('./src/exchangeRate/Honduras/Honduras.js');
const GuatemalaM = require('./src/exchangeRate/GuatemalaMensual/Promedio.js');
const TrinidaTobago = require('./src/exchangeRate/Trinidad_Tobago/TT.js');
const TrinidaTobag = require('./src/exchangeRate/Trinidad_Tobago/TTMonday.js');
const Bolivia = require('./src/exchangeRate/Bolivia/Bolivia.js');
const Nicaragua = require('./src/exchangeRate/Nicaragua/Nicaragua.js');
const  Oanda  = require('./src/exchangeRate/Oanda/Oanda.js');


const finishedProcesses = [];

const getCurrencies = async () => {
  const hoy = moment().format('dddd');
  console.log("Inicio de Búsqueda " + hoy);

  try {
    await Promise.all([
      Uruguay.BancoUruguayUSD(),
      CostaRica.BancoCostaRica(),
      Colombia.Colombia(),
      Peru.BancoPeru(),
      Chile.BancoChile(),
      Guatemala.PageGuatemala(),
      Honduras.Honduras(),
      TrinidaTobag.TTMon()
    ]);

    await GuatemalaM.GT();
    await TrinidaTobago.TT();
    await Bolivia.BO();
    await Nicaragua.Ni();
    await Oanda.Oanda();
    await Excel.saveExcel();

    finishedProcesses.push(`Proceso terminado con fecha y hora: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    const filePath = path.join(__dirname, 'src', 'public', 'uploads', 'finishedProcesses.json');

    try {
      const existingData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
      const dataArray = JSON.parse(existingData);
    
      dataArray.push(`Process completed with date and time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    
      const finishedProcessesJSON = JSON.stringify(dataArray, null, 2);
    
      fs.writeFileSync(filePath, finishedProcessesJSON);
    
      console.log("Mensaje de proceso terminado agregado al archivo JSON");
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error);
    }
  } catch (error) {
    console.error("Error durante la búsqueda:", error);
  }
};

//getCurrencies()

 module.exports ={
  getCurrencies
 }