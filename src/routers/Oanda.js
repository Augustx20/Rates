const puppeteer = require("puppeteer");
const fs = require('fs');

const OandaArray = [];

const Oanda = async (json) => {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  try {
    const oandaUrls = json.oanda;
    for (const currency in oandaUrls) {
      const url = oandaUrls[currency];
      await page.goto(url);
      await page.waitForSelector("#cc-time-series-plot");
      const book = await page.evaluate(() => {
        const tmp = {};
        tmp.Data = document.querySelector(
          "#cc-time-series-plot > div > div > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)"
        ).innerHTML;
        return tmp;
      });

      let valor = book.Data.replace(/,/g, ".");
      let numero = Number(valor);
      OandaArray.push(numero);
    }
    await browser.close();

    console.log('OandaRate:', OandaArray);

  } catch (err) {
    await browser.close();
    //envio de respuesta a la BaseDate.txt
    if (fs.existsSync('C:/Users/augusto.machado/Desktop/Tasas/src/uploads/BaseDate.txt')) {
      fs.appendFileSync('C:/Users/augusto.machado/Desktop/Tasas/src/uploads/BaseDate.txt', "Oanda Error," + console.error(`Error en la búsqueda: ${err}`) + ',');
    }
  }
};

// Lee el archivo JSON
// Analizar los json para difernecias de los lunes martes viernes y sabado para directamente depender del dia en el estamos y que se actualice acorda el json
 
fs.readFile('C:/Users/augusto.machado/Desktop/Tasas/src/json/urltwo.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON:', err);
    return;
  }

  try {
    const json = JSON.parse(data);
    // Llama a la función Oanda pasando el JSON como argumento
    Oanda(json);
  } catch (error) {
    console.error('Error al analizar el archivo JSON:', error);
  }
});
