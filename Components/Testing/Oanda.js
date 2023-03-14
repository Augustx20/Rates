const puppeteer = require("puppeteer");
const moment = require("moment");

let hoy = moment().format("dddd");
let fechaexacta = moment("2023-01-02").add(7, "days").format("dddd");

const oandax = [];
const Oanda = async () => {
  const enlaces = [
    "https://www.oanda.com/currency-converter/es/?from=EUR&to=USD&amount=1",
    "https://www.oanda.com/currency-converter/es/?from=EUR&to=COP&amount=1",
    "https://www.oanda.com/currency-converter/es/?from=CNY&to=USD&amount=1",
    "https://www.oanda.com/currency-converter/es/?from=JPY&to=USD&amount=1",
    "https://www.oanda.com/currency-converter/es/?from=CNY&to=COP&amount=1",
    "https://www.oanda.com/currency-converter/es/?from=JPY&to=COP&amount=1",
    "https://www.oanda.com/currency-converter/es/?from=BRL&to=USD&amount=1",
    "https://www.oanda.com/currency-converter/es/?from=KRW&to=USD&amount=1",
  ];

  const books = [];
  const browser = await puppeteer.launch({
    handless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  for (let enlace of enlaces) {
    await page.goto(enlace);
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
    oandax.push(numero);

   // console.log(oandax);
    
    //var i = [NaN, 1,2,3];

    var j = oandax.map(i =>{ return isNaN(i) ? 0 : i});
    
    console.log(j)


  }
await browser.close();

};
Oanda();