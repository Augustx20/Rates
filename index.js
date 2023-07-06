
const Excel = require('./Components/Excel');
const moment = require('moment');
const Uruguay = require('./src/ExchangeRate/Uruguay/Uruguay');
const Chile = require('./src/ExchangeRate/Chile/Chile');
const Oanda = require('./src/ExchangeRate/Oanda/Oanda');
const Peru = require('./src/ExchangeRate/Peru/Peru');
const Colombia = require('./src/ExchangeRate/Colombia/Colombia');
const CostaRica = require('./src/ExchangeRate/CostaRica/CostaRica');
const Guatemala = require('./src/ExchangeRate/Guatemala/Guatemala');
const Honduras = require('./src/ExchangeRate/Honduras/Honduras');
const GuatemalaM = require('./src/ExchangeRate/GuatemalaMensual/Promedio');
const TrinidaTobago = require('./src/ExchangeRate/Trinidad_Tobago/TT');
const TrinidaTobag = require('./src/ExchangeRate/Trinidad_Tobago/TTMonday');
const Bolivia = require('./src/ExchangeRate/Bolivia/Bolivia');
const Nicaragua = require('./src/ExchangeRate/Nicaragua/Nicaragua');

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

    console.log("Búsqueda finalizada");
  } catch (error) {
    console.error("Error durante la búsqueda:", error);
  }
};

getCurrencies()

// module.exports ={
//   getCurrencies
  
// }