const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx-populate');
const CostaRica = require('../exchangeRate/CostaRica/CostaRica.js');
const Uruguay = require('../exchangeRate/Uruguay/Uruguay.js');
const Colombia = require('../exchangeRate/Colombia/Colombia.js');
const Peru = require('../exchangeRate/Peru/Peru.Js');
const Chile = require('../exchangeRate/Chile/Chile.Js');
const Guatemala = require('../exchangeRate/Guatemala/Guatemala.js');
const Oanda = require('../exchangeRate/Oanda/Oanda.js');
const Honduras = require('../exchangeRate/Honduras/Honduras.js');
const GuatemalaM = require('../exchangeRate/GuatemalaMensual/Promedio.js');
const TrinidaTobago = require('../exchangeRate/Trinidad_Tobago/TT.js');
const TrinidadMon = require('../exchangeRate/Trinidad_Tobago/TTMonday.js');
const Bolivia = require('../exchangeRate/Bolivia/Bolivia.js');
const Nicaragua = require('../exchangeRate/Nicaragua/Nicaragua.js');


const createExcelFile = async (data) => {
  const workbook = await xlsx.fromBlankAsync('Datos.xlsx');
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
    const excelFilePath = '../documentation/Datos.xlsx';

    // Carpeta "validaciones"
    const folderPath = path.resolve('../validations');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

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
    const [eurusd, eurcop, cnyusd, jpyusd, cnycop, jpycop, brlusd, usdclp, eurclp, brlhnl, cnyhnl, gbphnl, jpyhnl, mxnhnl, hkdusd, hkdhn, sgdusd, usdeur, krwusd, myrusd, vndusd, twdusd ,jpycrc ,twdhnl] = oanda;
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
      ["HN79", "USD HNL", "", "", "","VND USD", vndusd],
      ["UY77", "EUR UYU", "", "", "","TWD USD", twdusd],
      ["", "", "", "", "","JPY CRC", jpycrc],
      ["", "", "", "", "","TWD HNL", twdhnl],
      ["", "", "", "", "","CNY GTQ",""],
    ];
    const excelBuffer = await createExcelFile(data);

    fs.writeFileSync(excelFilePath, excelBuffer, 'binary');
    console.log('Archivo de Excel guardado correctamente');


    // Crear el archivo de Excel con fecha en la carpeta "validaciones"
    const excelFileName = `Datos_${dateString}.xlsx`;
    const excelFilePathWithDate = path.resolve(folderPath, excelFileName);
    const wbBufWithDate = await createExcelFile(data);
    fs.writeFileSync(excelFilePathWithDate, wbBufWithDate);
    console.log(`El archivo '${excelFileName}' se ha guardado correctamente en '${excelFilePathWithDate}'.`);
    
  } catch (err) {
    console.error(`Se produjo un error al guardar el archivo de Excel: ${err}`);
  }
};
module.exports = {
  saveExcel
};
