const puppeteer = require("puppeteer");
const Info = require('../info')

const Bancos = [];
const OandaB = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    for (let i = 0; i < Info.DataBank.length; i++) {
      const enlace = Info.DataBank[i];
      const Sele = Info.HTMLS[i];

      await page.goto(enlace);
      // await page.waitForSelector("#cc-time-series-plot");

      const book = await page.evaluate(Sele => {
        return document.querySelector(Sele).innerHTML;
      }, Sele);
      
      const valor = book.replace(/,/g, ".");
      const numero = Number(valor) || 0;
      Bancos.push(numero);
    }
    
    await browser.close();

    console.log('BancosRate :', Bancos);
    return Bancos;
  } catch (err) {
    console.error(`Error en la busqueda: ${err}`);
    console.log(Bancos, "Estos tipos de cambios fueron actualizados");
    await browser.close();
  }
};

module.exports = {
  Bancos,
  OandaB
};