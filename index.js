const Uruguay = require('./ExchangeRate/Uruguay/Uruguay');
const Chile = require('./ExchangeRate/Chile/Chile');
const Oanda = require('./ExchangeRate/Oanda/Oanda');
const Peru = require('./ExchangeRate/Peru/Peru');
const Colombia = require('./ExchangeRate/Colombia/Colombia');
const CostaRica = require('./ExchangeRate/CostaRica/CostaRica');
const Guatemala = require('./ExchangeRate/Guatemala/Guatemala')
const Honduras = require('./ExchangeRate/Honduras/Honduras')
const Excel = require('./Components/Excel');
const moment = require('moment');

let hoy = moment().format('dddd');
console.log("Incio de Busqueda " + hoy );


Colombia.Colombia();
CostaRica.BancoCostaRica();
Peru.BancoPeru();
Chile.BancoChile();
Uruguay.BancoUruguayUSD();
Guatemala.PageGuatemala();
Honduras.Honduras();

setTimeout(() => {
  Oanda.Oanda();
}, 12000);

setTimeout(() => {
  Excel.saveExcel();
}, 78000)   