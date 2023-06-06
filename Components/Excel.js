const xlsx = require("xlsx");
const CostaRica = require('../ExchangeRate/CostaRica/CostaRica');
const Uruguay = require('../ExchangeRate/Uruguay/Uruguay');
const Colombia = require('../ExchangeRate/Colombia/Colombia');
const Peru = require('../ExchangeRate/Peru/Peru');
const Chile = require('../ExchangeRate/Chile/Chile.js');
const Guatemala = require('../ExchangeRate/Guatemala/Guatemala');
const Oanda = require('../ExchangeRate/Oanda/Oanda');
const Honduras = require('../ExchangeRate/Honduras/Honduras');
const GuatemalaM = require('../ExchangeRate/GuatemalaMensual/Promedio')
const TrinidaTobago = require('../ExchangeRate/Trinidad_Tobago/TT')
const TrinidadMon = require('../ExchangeRate/Trinidad_Tobago/TTMonday.js')
const Bolivia = require('../ExchangeRate/Bolivia/Bolivia')
const Nicaragua = require('../ExchangeRate/Nicaragua/Nicaragua')
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
    const [cr, uy, co, peEur, PeUsd, cl, oanda ] = await Promise.all([
      CostaRica.Cr[0],
      Uruguay.ArrayU[0],
      Colombia.ArrayCo[0],
      Peru.PeruEur[0],
      Peru.Peusd[0],
      Chile.ChileArray,
      Oanda.OandaArray,
    ]);
    //  Oanda
    const [eurusd, eurcop, cnyusd, jpyusd, cnycop, jpycop, brlusd, usdclp, eurclp, brlhnl, cnyhnl, gbphnl, jpyhnl, mxnhnl, hkdusd, hkdhn, krwusd, sgdusd, usdeur] = oanda;
    //MENSUALES Y SEMANALES
    const [TT93] = await Promise.all([TrinidaTobago.TTa[0]]);
    const [TT94] = await Promise.all([TrinidadMon.TtMons]);
    const [BO78] = await Promise.all([Bolivia.BOa[0]]);
    const [NI79] = await Promise.all([Nicaragua.NIa[0]]);
    const [GT79] = await Promise.all([GuatemalaM.GTa[0]]);
    const [HN79] = await Promise.all([Honduras.ArrayHn]);
    const [GT791] = await Promise.all([Guatemala.GTQ[0]]);
    const data = [     
      ["","Bancos", "", "", "","Oanda"],
      ["Country", "To /From", "Amount", "", "", "To/From", "Amount"],
      ["CR79", "USD CRC", cr, "", "", "EUR USD", eurusd],
      ["UY77", "USD UYU", uy, "", "", "EUR COP", eurcop],
      ["CO75 CO76", "USD COP", co, "", "", "CNY USD", cnyusd],
      ["PE83", "USD PEN", PeUsd, "", "", "JPY USD", jpyusd],
      ["PE83", "EUR PEN", peEur, "", "", "CNY COP", cnycop],
      ["CL70", "USD CLP", cl[0], "", "", "JPY COP", jpycop],
      ["CL70", "EUR CLP", cl[1], "", "", "BRL USD", brlusd],
      ["GT79","USD GTQ",GT791,"","","KRW USD",krwusd],
      ["HN79","USD HNL",HN79[0],"","","USD CLP",usdclp],
      ["HN79","EUR HNL",HN79[1],"","","EUR CLP",eurclp],
      ["TT93","USD TTD",TT94[0],"","","BRL HNL",brlhnl],
      ["TT93","EUR TTD",TT94[1],"","","CNY HNL",cnyhnl],
      ["AR71","USD Divisa COMPRA","","","","GBP HNL",gbphnl],
      ["AR71","USD Divisa VENTA","","","","JPY HNL",jpyhnl],
      ["AR71","USD Billete VENTA","","","","MXN HNL",mxnhnl],
      ["","Mensuales","","","","HKD USD",hkdusd],
      ["NI79","USD NIO",NI79,"","","HKD HNL",hkdhn],
      ["TT93","USD TTD",TT93,"","","SGD USD",sgdusd],
      ["BO78","USD BOB",BO78,"","","USD EUR",usdeur],
      ["GT79","USD GTQ",GT79,"","","",""]
    ];
    "TT93","USD TTD"
    const wbBuf = await createExcelFile(data);

  // Guardar el archivo de Excel en el disco
  const filename = 'Datos.xlsx';
  const filepath = path.resolve(filename);
  fs.writeFileSync(filepath,wbBuf);

  console.log(`El archivo '${filename}' se ha guardado correctamente en '${filepath}'.`);
}
catch(err) {
  console.error(`Se produjo un error al guardar el archivo de Excel: ${err}`);
}}

module.exports = {
  saveExcel,
}