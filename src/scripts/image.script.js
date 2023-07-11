// @ts-nocheck
// Formato se imprimi la screen pero desde 1920 y 1080, la idea es crear la variable para que se vaya configurando cada resolucion
const puppeteer = require("puppeteer");
const data = require('C:/Users/augusto.machado/Desktop/Tasas/src/json/image.json')


const Imagenes = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ]}) 
  const page = await browser.newPage();

  try {
    for (let i = 0; i < data.imagen.length; i++) {
      const enlace = data.imagen[i];
    for(const pais in enlace){
      const datosPais = enlace[pais]
      for (let j = 0; j < datosPais.length; j++) {
        const info = datosPais[j]
        const enlace = info.url
        const selector = info.selector;
        const sele = info.selejs


        await page.goto(enlace, { waitUntil: 'domcontentloaded' });
        await page.waitForXPath(selector,{ timeout: 5_000 });
        const logo = await page.$(sele)
        await logo.screenshot({
        path: `./src/image/Bancos${"_"+pais}.jpg`}); 
      }
    }
  }
    await browser.close();
    console.log('Imagenes')
    
  } catch (err) {
        console.error(`Error en la busqueda: ${err}`)
    await browser.close();
  }
}
Imagenes()