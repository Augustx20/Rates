// Formato se imprimi la screen pero desde 1920 y 1080, la idea es crear la variable para que se vaya configurando cada resolucion

const puppeteer = require("puppeteer");
const Info = require('../info')
const random_useragent = require('random-useragent')


const Imagenes = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    slowMo:10 }) 
  const page = await browser.newPage();

  try {
    for (let i = 0; i < Info.IMGUrl.length; i++) {
      const enlace = Info.IMGUrl[i];
      const hei = Info.hei[i]
      const wid =Info.wid[i]
      const Sele = Info.SeleC[i]
      await page.setUserAgent(random_useragent.getRandom());
      await page.goto(enlace, {
        waitUntil: 'networkidle0',
        });
        const elemen = await page.$(Sele)
        await page.setViewport({width: wid, height: hei})
        await elemen.page.screenshot({
        path: `Bancos${i+1}.jpg`});
    }
    await browser.close();
    console.log('Imagenes')
    
  } catch (err) {
        console.error(`Error en la busqueda: ${err}`)
    await browser.close();
  }
}
module.exports = {
  Imagenes
};