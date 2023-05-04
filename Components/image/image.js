const puppeteer = require("puppeteer");
const Info = require('../info')
const random_useragent = require('random-useragent')

const Imagenes = async () => {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();

  try {
    for (let i = 0; i < Info.IMGUrl.length; i++) {
      const enlace = Info.IMGUrl[i];
      await page.setUserAgent(random_useragent.getRandom());
      
        await page.goto(enlace)
        await page.setViewport({width:1920, height: 1080})
        await page.screenshot({
        path: `Bancos${i+1}.jpg`,});
        
    }
    await browser.close();
    console.log('Imagenes');
    return Bancos;

    
  } catch (err) {
        console.error(`Error en la busqueda: ${err}`)
    await browser.close();
  }
}
module.exports = {
  Imagenes
};