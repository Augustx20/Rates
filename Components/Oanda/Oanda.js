const puppeteer = require("puppeteer");
const Info = require('../info');
const { info } = require("console");

const h = [];
const OandaArray = [];

const Oanda = async () => {
const browser = await puppeteer.launch();
const page = await browser.newPage();

try {
  for (let i = 0; i < Info.data.length; i++) {
    const enlace = Info.data[i]
    await page.goto(enlace);
    await page.waitForSelector("#cc-time-series-plot");
    const book = await page.evaluate(() => {
    const tmp = {};
    tmp.Data = document.querySelector(
    "#cc-time-series-plot > div > div > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)"
    ).innerHTML;
    return tmp;
    });

    // Capture screenshot
    await page.screenshot({
    path: `Oanda_${i+1}.jpg`,
    });

    let valor = book.Data.replace(/,/g, ".");
    let numero = Number(valor);
    h.push(numero);
  };
  
  var j = h.map(i =>{ return isNaN(i) ? 0 : i});
  OandaArray.push(...j);

await browser.close();

console.log('OandaRate :', OandaArray) 
  
} catch (err) {
  console.error(`Error en la busqueda: ${err}`);
  await browser.close();
}};

module.exports = {
  OandaArray,
  Oanda
}