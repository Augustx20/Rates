



//  dATOS ANTERIORES
const xlsx = require("xlsx")
const CostaRica = require('../ExchangeRate/CostaRica/CostaRica');
const Uruguay = require('../ExchangeRate/Uruguay/Uruguay');
const Colombia = require('../ExchangeRate/Colombia/Colombia');
const Peru = require('../ExchangeRate/Peru/Peru')
const Chile = require('../ExchangeRate/Chile/Chile');
const Guatemala = require('../ExchangeRate/Guatemala/Guatemala')
const Oanda = require('../ExchangeRate/Oanda/Oanda');
const Honduras = require('../ExchangeRate/Honduras/Honduras')
const SaveExcel = async () => {

  setTimeout(() => {
    // Bancos
    let caso = CostaRica.Cr[0];
    let caso2 = Uruguay.ArrayU[0];
    let caso3 = Colombia.ArrayCo[0];
    let caso4 = Peru.Peusd[0];
    let caso5 = Peru.PeruEur[0];
    let caso6 = Chile.ChileArray[0];
    let caso7 = Chile.ChileArray[1];
    let caso8 = Guatemala.GTQ[0];
    let caso9 = Honduras.ArrayHn[0];
   
    //  Oanda
    let EURUSD = Oanda.OandaArray[0];
    let EURCOP = Oanda.OandaArray[1];
    let CNYUSD = Oanda.OandaArray[2];
    let JPYUSD = Oanda.OandaArray[3];
    let CNYCOP = Oanda.OandaArray[4];
    let JPYCOP = Oanda.OandaArray[5];
    let BRLUSD = Oanda.OandaArray[6];
    let KRWUSD = Oanda.OandaArray[7];
    let USDCLP = Oanda.OandaArray[8];
    let EURCLP = Oanda.OandaArray[9];
    //  Honduras Oanda
    let BRLHNL = Oanda.OandaArray[10];
    let CNYHNL = Oanda.OandaArray[11];
    let EURHNL = Oanda.OandaArray[12];
    let GBPHNL = Oanda.OandaArray[13];
    let JPYHNL = Oanda.OandaArray[14];
    let MXNHNL = Oanda.OandaArray[15];
    let HKDUSD = Oanda.OandaArray[16];
    let HKDHNL = Oanda.OandaArray[17];
    const wb = xlsx.readFile("Datos.xlsx");

const datos = [
    ["","Bancos","","","","Oanda"],
    ["Country","To /From","Amount","","","To/From","Amount"],
    ["CR79","USD CRC",caso,"","","EUR USD",EURUSD],
    ["UY77","USD UYU",caso2,"","","EUR COP",EURCOP],
    ["CO75 CO76","USD COP",caso3,"","","CNY USD",CNYUSD],
    ["PE83","USD PEN",caso4,"","","JPY USD",JPYUSD],
    ["PE83","EUR PEN",caso5,"","","CNY COP",CNYCOP],
    ["CL70","USD CLP",caso6,"","","JPY COP",JPYCOP],
    ["CL70","EUR CLP",caso7,"","","BRL USD",BRLUSD],
    ["GT79","USD GTQ",caso8,"","","KRW USD",KRWUSD],
    ["HN79","USD HNL",caso9,"","","USD CLP",USDCLP],
    ["AR71","USD Billete ARS","","","","EUR CLP",EURCLP],
    ["AR71","EUR Billete ARS","","","","BRL HNL",BRLHNL],
    ["AR71","USD Divisa COMPRA","","","","CNY HNL",CNYHNL],
    ["AR71","USD Divisa VENTA","","","","EUR HNL",EURHNL],
    ["AR71","USD Billete VENTA","","","","GBP HNL",GBPHNL],
    ["","","","","","JPY HNL",JPYHNL],
    ["","","","","","MXN HNL",MXNHNL],
    ["","","","","","HKD USD",HKDUSD],
    ["","","","","","HKD HNL",HKDHNL],
  ];

  var ws = xlsx.utils.aoa_to_sheet(datos);

wb.Sheets['Datos'] = ws;

  xlsx.writeFile(wb, "Datos.xlsx"); 
  
  console.log("Excel Actualizado")
}, 6500)

}