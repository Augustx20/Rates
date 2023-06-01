const Excel = require('./Components/Excel');
const moment = require('moment');
const Uruguay = require('./ExchangeRate/Uruguay/Uruguay');
const Chile = require('./ExchangeRate/Chile/Chile');
const Oanda = require('./ExchangeRate/Oanda/Oanda');
const Peru = require('./ExchangeRate/Peru/Peru');
const Colombia = require('./ExchangeRate/Colombia/Colombia');
const CostaRica = require('./ExchangeRate/CostaRica/CostaRica');
const Guatemala = require('./ExchangeRate/Guatemala/Guatemala');
const Honduras = require('./ExchangeRate/Honduras/Honduras');
const GuatemalaM = require('./ExchangeRate/GuatemalaMensual/Promedio')
const TrinidaTobago = require('./ExchangeRate/Trinidad_Tobago/TT')
const Bolivia = require('./ExchangeRate/Bolivia/Bolivia')
const Nicaragua = require('./ExchangeRate/Nicaragua/Nicaragua')

const getCurrencies = async () => {
  const hoy = moment().format('dddd');
  console.log("Inicio de Búsqueda " + hoy);

  try {
    await Promise.all([
      Colombia.Colombia(),
      CostaRica.BancoCostaRica(),
      Peru.BancoPeru(),
      Chile.BancoChile(),
      Uruguay.BancoUruguayUSD(),
      Guatemala.PageGuatemala(),
      Honduras.Honduras(),
      GuatemalaM.GT(),
      TrinidaTobago.TT(),
      Bolivia.BO(),
      Nicaragua.Ni()
    ]);

    await Oanda.Oanda();
    await Excel.saveExcel();

    console.log("Búsqueda finalizada");
  } catch (error) {
    console.error("Error durante la búsqueda:", error);
  }
};

getCurrencies();
