const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx-populate');
const CostaRica = require('../src//ExchangeRate/CostaRica/CostaRica.js');
const Uruguay = require('../src//ExchangeRate/Uruguay/Uruguay');
const Colombia = require('../src//ExchangeRate/Colombia/Colombia');
const Peru = require('../src//ExchangeRate/Peru/Peru');
const Chile = require('../src//ExchangeRate/Chile/Chile.js');
const Guatemala = require('../src//ExchangeRate/Guatemala/Guatemala');
const Oanda = require('../src//ExchangeRate/Oanda/Oanda');
const Honduras = require('../src//ExchangeRate/Honduras/Honduras');
const GuatemalaM = require('../src//ExchangeRate/GuatemalaMensual/Promedio');
const TrinidaTobago = require('../src//ExchangeRate/Trinidad_Tobago/TT');
const TrinidadMon = require('../src//ExchangeRate/Trinidad_Tobago/TTMonday.js');
const Bolivia = require('../src//ExchangeRate/Bolivia/Bolivia');
const Nicaragua = require('../src//ExchangeRate/Nicaragua/Nicaragua');

const createExcelFile = async (data) => {
  const workbook = await xlsx.fromBlankAsync();
  const sheet = workbook.sheet(0);
  sheet.name('Datos');

  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      sheet.cell(row + 1, col + 1).value(data[row][col]);
    }
  }

  const excelBuffer = await workbook.outputAsync();
  return excelBuffer;
};

const saveExcel = async () => {
  try {
    // Obtener la fecha actual
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);

    // Ruta del archivo 'Datos.xlsx'
    const excelFilePath = 'C:/Users/augusto.machado/Desktop/Tasas/Datos.xlsx';
    

    // Carpeta "validaciones"
    // const folderPath = path.resolve('c:/Users/Usuario/Desktop/Tasas/validaciones');
    // if (!fs.existsSync(folderPath)) {
    //   fs.mkdirSync(folderPath);
    // }

    // Bancos
    const [cr, uy, co, peEur, PeUsd, cl, oanda] = await Promise.all([
      CostaRica.Cr[0],
      Uruguay.ArrayU[0],
      Colombia.ArrayCo[0],
      Peru.PeruEur[0],
      Peru.Peusd[0],
      Chile.ChileArray,
      Oanda.OandaArray,
    ]);
    // Oanda
    const [eurusd, eurcop, cnyusd, jpyusd, cnycop, jpycop, brlusd, usdclp, eurclp, brlhnl, cnyhnl, gbphnl, jpyhnl, mxnhnl, hkdusd, hkdhn, sgdusd, usdeur, krwusd, myrusd,vndusd,twdusd,jpycrc,twdhnl] = oanda;
    // MENSUALES Y SEMANALES
    const [TT93] = await Promise.all([TrinidaTobago.TTa[0]]);
    const [TT94] = await Promise.all([TrinidadMon.TtMons]);
    const [BO78] = await Promise.all([Bolivia.BOa[0]]);
    const [NI79] = await Promise.all([Nicaragua.NIa[0]]);
    const [GT79] = await Promise.all([GuatemalaM.GTa[0]]);
    const [HN79] = await Promise.all([Honduras.ArrayHn]);
    const [GT791] = await Promise.all([Guatemala.GTQ[0]]);
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
      ["GT79", "USD GTQ", GT791, "", "", "USD CLP", usdclp],
      ["HN79", "USD HNL", HN79[0], "", "", "EUR CLP", eurclp],
      ["HN79", "EUR HNL", HN79[1], "", "", "BRL HNL", brlhnl],
      ["TT93", "USD TTD", TT94[0], "", "", "CNY HNL", cnyhnl],
      ["TT93", "EUR TTD", TT94[1], "", "", "GBP HNL", gbphnl],
      ["AR71", "USD Divisa COMPRA", "", "", "", "JPY HNL", jpyhnl],
      ["AR71", "USD Divisa VENTA", "", "", "", "MXN HNL", mxnhnl],
      ["AR71", "USD Billete VENTA", "", "", "", "HKD USD", hkdusd],
      ["", "Mensuales", "", "", "", "HKD HNL", hkdhn],
      ["NI79", "USD NIO", NI79, "", "", "SGD USD", sgdusd],
      ["TT93", "USD TTD", TT93, "", "", "USD EUR", usdeur],
      ["BO78", "USD BOB", BO78, "", "", "KRW USD", krwusd],
      ["GT79", "USD GTQ", GT79, "", "","MYR USD", myrusd],
      ["", "", "", "", "","VND USD", vndusd],
      ["", "", "", "", "","TWD USD", twdusd],
      ["", "", "", "", "","JPY CRC", jpycrc],
      ["", "", "", "", "","TWD HNL", twdhnl],
    ];
    const excelBuffer = await createExcelFile(data);

    fs.writeFileSync(excelFilePath, excelBuffer, 'binary');
    console.log('Archivo de Excel guardado correctamente');
  } catch (err) {
    console.error(`Se produjo un error al guardar el archivo de Excel: ${err}`);
  }
};

module.exports = {
  saveExcel
};
