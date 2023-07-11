//@ts-check
const puppeteer = require("puppeteer");
const random_useragent = require('random-useragent');
const fs = require('fs');
const moment = require('moment');
const data = require('../json/bancos.json');
const dias = require('../json/dias.json');
const Bancos = [];


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

const getNumOfDays = (dayOfWeek, structure) => {
  if (structure.hasOwnProperty(dayOfWeek)) {
    return structure[dayOfWeek];
  } else {
    throw new Error(`No se encontró la cantidad de días para ${dayOfWeek}`);
  }
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


  try {
    const today = moment().format("dddd");
    //console.log(today);
    const bancosStructure = dias.banc[0];
    //console.log( bancosStructure)
    const cantidadPaginas = getNumOfDays(moment().format("dddd"), bancosStructure);
    //console.log('2' + cantidadPaginas)
    const dayOfWeek = today;
    //console.log('3' + dayOfWeek)
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
          //console.log(enlace)
          await page.setUserAgent(random_useragent.getRandom());
          await page.goto(enlace, { waitUntil: "networkidle2" });
          await page.waitForXPath(selector);

          let elHandle = await page.$x(selector);
          let valor = await page.evaluate((el) => el.textContent, elHandle[0]);

          let numero = convertirValor(valor);
          Bancos.push(numero);

          if (Bancos.length >= cantidadPaginas) {
            break;
          }
        }
        if (Bancos.length >= cantidadPaginas) {
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

const runBank = async () => {
  let bancosRate = [];
  let errorOccurred = false;

  while (!errorOccurred) {
    try {
      const bancosStructure = dias.banc[0];
      const cantidadPaginas = getNumOfDays(moment().format("dddd"), bancosStructure);
      bancosRate = await Bank();

      if (bancosRate.length >= cantidadPaginas) {
        break;
      }
    } catch (err) {
      console.log('Error:', err);
      errorOccurred = true; // Establecer la bandera de error para detener el bucle
    }
  }

  console.log('BancosRate completo:', bancosRate);
};

module.exports =  { runBank, Bancos }

