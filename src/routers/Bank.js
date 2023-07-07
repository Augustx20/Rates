const puppeteer = require("puppeteer");
const random_useragent = require('random-useragent')
const fs = require('fs')
const Bancos = []
const data = require('C:/Users/Usuario/Desktop/Tasas/src/json/data.json')

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
  let Bancos = [];

  try {
    while (Bancos.length < 8) {
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

            if (Bancos.length >= 8) {
              break;
            }
          }

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

    if (fs.existsSync('C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt')) {
      fs.appendFileSync('C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt', "Bancos Completado,");
    }

    //console.log('BancosRate:', Bancos);
    return Bancos;
  } catch (err) {
   // console.log(Bancos, "Estos tipos de cambios fueron actualizados");

    if (fs.existsSync('C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt')) {
      fs.appendFileSync('C:/Users/Usuario/Desktop/Tasas/src/uploads/BaseDate.txt', "Banco Error: " + console.error(`Error en la búsqueda: ${err}`) + ',');
    }

    await browser.close();
    throw err; // Relanzar el error para que el bucle externo se repita
  }
};

(async () => {
  let bancosRate = [];
  while (bancosRate.length < 8) {
    try {
      bancosRate = await OandaB();
    } catch (err) {
      console.log('Error:', err);
    }
  }
  console.log('BancosRate completo:', bancosRate);
})();


OandaB()