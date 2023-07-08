//@ts-check
const puppeteer = require("puppeteer");
const random_useragent = require('random-useragent');
const fs = require('fs');
const moment = require('moment')
const data = require('../json/data.json');


const convertirValor = (valor) => {
  if (typeof valor === 'undefined') {
    return 0;
  }

  let procesado = valor.replace(/\s+/g, '');
  if (procesado.includes(',')) {
    procesado = procesado.replace(/\./g, '').replace(/,/, '.');
  }

  const numero = parseFloat(procesado);
  if (isNaN(numero)) {
    return 0;
  }

  return numero;
};
const Bank = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  const Bancos = [];

  try {
    const today = moment().format("dddd");
    console.log(today);
    const dayOfWeek = today;

    if (data.bancos.hasOwnProperty(dayOfWeek)) {
      const bancosDia = data.bancos[dayOfWeek];
      const paises = Object.keys(bancosDia);

      for (let i = 0; i < paises.length; i++) {
        const pais = paises[i];
        const banco = bancosDia[pais];
        const datosPais = Object.values(banco);

        for (let j = 0; j < datosPais.length; j++) {
          const infoBanco = datosPais[j];
          const enlace = infoBanco.url;
          const selector = infoBanco.selector;

          await page.setUserAgent(random_useragent.getRandom());
          await page.goto(enlace, { waitUntil: "networkidle2" });
          await page.waitForXPath(selector);

          let elHandle = await page.$x(selector);
          let valor = await page.evaluate((el) => el.textContent, elHandle[0]);

          let numero = convertirValor(valor);
          Bancos.push(numero);

          if (Bancos.length >= 8) {
            break;
          }
        }

        if (Bancos.length >= 8) {
          break;
        }
      }
    }

    await browser.close();

    if (fs.existsSync("C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt")) {
      fs.appendFileSync(
        "C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt",
        "Bancos Completado,"
      );
    }

    return Bancos;
  } catch (err) {
    if (fs.existsSync("C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt")) {
      fs.appendFileSync(
        "C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt",
        "Banco Error: " + console.error(`Error en la búsqueda: ${err}`) + ","
      );
    }

    await browser.close();
    throw err; // Relanzar el error para que el bucle externo se repita
  }
};


(async () => {
  let bancosRate = [];
  let errorOccurred = false;

  while (bancosRate.length < 8 && !errorOccurred) {
    try {
      bancosRate = await Bank();
    } catch (err) {
      console.log('Error:', err);
      errorOccurred = true; // Establecer la bandera de error para detener el bucle
    }
  }
  console.log('BancosRate completo:', bancosRate);
})();
