const xlsx = require("xlsx");
const CostaRica = require('../ExchangeRate/CostaRica/CostaRica');
const Uruguay = require('../ExchangeRate/Uruguay/Uruguay');
const Colombia = require('../ExchangeRate/Colombia/Colombia');
const Peru = require('../ExchangeRate/Peru/Peru');
const Chile = require('../ExchangeRate/Chile/Chile');
const Guatemala = require('../ExchangeRate/Guatemala/Guatemala');
const Oanda = require('../ExchangeRate/Oanda/Oanda');
const Honduras = require('../ExchangeRate/Honduras/Honduras');
const fs = require('fs');
const path = require('path');

const createExcelFile = async (data) => {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, "Datos");
  const wbBuf = xlsx.write(wb, { type: 'buffer' });
  return wbBuf;
};

const saveExcel = async () => {
  try {
    // Bancos
    const [cr, uy, co, peEur, PeUsd, cl, gt, hn, oanda] = await Promise.all([
      CostaRica.Cr[0],
      Uruguay.ArrayU[0],
      Colombia.ArrayCo[0],
      Peru.PeruEur[0],
      Peru.Peusd[0],
      Chile.ChileArray,
      Guatemala.GTQ[0],
      Honduras.ArrayHn,
      Oanda.OandaArray,
    ]);
    //  Oanda
    const [eurusd, eurcop, cnyusd, jpyusd, cnycop, jpycop, brlusd, krwusd, usdclp, eurclp, brlhnl, cnyhnl, gbphnl, jpyhnl, mxnhnl, hkdusd, hkdhn] = oanda;

    const data = [     
      ["", "Bancos", "", "", "", "Oanda"],
      ["Country", "To /From", "Amount", "", "", "To/From", "Amount"],
      ["CR79", "USD CRC", cr, "", "", "EUR USD", eurusd],
      ["UY77", "USD UYU", uy, "", "", "EUR COP", eurcop],
      ["CO75 CO76", "USD COP", co, "", "", "CNY USD", cnyusd],
      ["PE83", "USD PEN", PeUsd, "", "", "JPY USD", jpyusd],
      ["PE83", "EUR PEN", peEur, "", "", "CNY COP", cnycop],
      ["CL70", "USD CLP", cl[0], "", "", "JPY COP", jpycop],
      ["CL70", "EUR CLP", cl[1], "", "", "BRL USD", brlusd],
      ["GT79","USD GTQ",gt,"","","KRW USD",krwusd],
      ["HN79","USD HNL",hn[0],"","","USD CLP",usdclp],
      ["HN79","EUR HNL",hn[1],"","","EUR CLP",eurclp],
      ["AR71","USD Billete ARS","","","","BRL HNL",brlhnl],
      ["AR71","EUR Billete ARS","","","","CNY HNL",cnyhnl],
      ["AR71","USD Divisa COMPRA","","","","GBP HNL",gbphnl],
      ["AR71","USD Divisa VENTA","","","","JPY HNL",jpyhnl],
      ["AR71","USD Billete VENTA","","","","MXN HNL",mxnhnl],
      ["","","","","","HKD USD",hkdusd],
      ["","","","","","HKD HNL",hkdhn]
    ];

    const wbBuf = await createExcelFile(data);

  // Guardar el archivo de Excel en el disco
  const filename = 'Datos.xlsx';
  const filepath = path.resolve( filename);
  fs.writeFileSync(filepath, wbBuf);

  console.log(`El archivo '${filename}' se ha guardado correctamente en '${filepath}'.`);
}
catch(err) {
  console.error(`Se produjo un error al guardar el archivo de Excel: ${err}`);
}}

module.exports = {
  saveExcel,
}