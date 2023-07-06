const puppeteer = require("puppeteer");
const random_useragent = require('random-useragent')
const fs = require('fs')
const Bancos = []
const data = require('C:/Users/augusto.machado/Desktop/Tasas/src/json/data.json')

const convertirValor = (valor) => {
  let procesado = valor.replace(/\s+/g, '');
  if (procesado.includes(',')) {
    procesado = procesado.replace(/\./g, '').replace(/,/, '.');
  }
  return procesado;
};

const OandaB = async () => {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  try {
    for (let i = 0; i < data.bancos.length; i++) {
      const banco = data.bancos[i];

      for (const pais in banco) {
        const datosPais = banco[pais];

        for (let j = 0; j < datosPais.length; j++) {
          const infoBanco = datosPais[j];
          const enlace = infoBanco.url;
          const selector = infoBanco.selector;

          await page.setUserAgent(random_useragent.getRandom());
          await page.goto(enlace, { waitUntil: 'networkidle2' });
          await page.waitForXPath(selector);

          let elHandle = await page.$x(selector);
          let valor = await page.evaluate(el => el.textContent, elHandle[0]);

          let numero = convertirValor(valor);
          Bancos.push(numero);
        }
      }
    }

    await browser.close();

    if (fs.existsSync('C:/Users/augusto.machado/Desktop/Tasas/src/uploads/BaseDate.txt')) {
      fs.appendFileSync('C:/Users/augusto.machado/Desktop/Tasas/src/uploads/BaseDate.txt', "Bancos Completado,");
    }

    console.log('BancosRate:', Bancos);
    return Bancos;
  } catch (err) {
    console.log(Bancos, "Estos tipos de cambios fueron actualizados");

    if (fs.existsSync('C:/Users/augusto.machado/Desktop/Tasas/src/uploads/BaseDate.txt')) {
      fs.appendFileSync('C:/Users/augusto.machado/Desktop/Tasas/src/uploads/BaseDate.txt', "Banco Error: " + console.error(`Error en la búsqueda: ${err}`) + ',');
    }

    await browser.close();
  }
};

OandaB()