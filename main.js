const AR71 = require('./ExchangeRate/Argentina/CaseArg')
const Excel = require('./ExchangeRate/Argentina/src/ExceArg')
console.log("Search Argentina..")
AR71.CasoBancoArg();
AR71.CasoNumeroDos();
setTimeout(() => {
Excel.saveExcel()
}, 20000);
