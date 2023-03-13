const Uruguay = require('./TasasUruguay/Uruguay');
const Chile = require('./TasasChile/Chile');
const Oanda = require('./Oanda/Oanda');
const Peru = require('./TasasPeru/Peru');
const Colombia = require('./TasaColombia/Colombia');
const CostaRica = require('./TasasCostaRica/CostaRica');
const Guatemala = require('./TasaGuatemala/Guatemala')
const Honduras = require('./TasaHonduras/Honduras')
const Excel = require('./ExcelScript/Excel')
const ARG = require('./Testing/CaseArg')
const moment = require('moment');

let hoy = moment().format('dddd');
console.log("Incio de Busqueda " + hoy );

// Colombia.Colombia();
// CostaRica.BancoCostaRica();
// Peru.BancoPeruUSD();
// Peru.BancoPeruEur();
// Chile.BancoChile();
ARG.CasoBancoArg();
ARG.CasoNumeroDos();
// Uruguay.BancoUruguayUSD();
// Guatemala.PageGuatemala();
// Honduras.Honduras()
// setTimeout(() => { 
// Oanda.Oanda();
// }, 10000); 
// setTimeout(() => { 
// Excel.SaveExcel()
// }, 50000); 
    