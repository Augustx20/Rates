const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const moment = require('moment');

let url = "https://www.central-bank.org.tt/"
const TTa = []

const isWorkingDay = () => {
    // Verificar si es lunes a viernes (días hábiles)
    const today = moment();
    const isWeekday = today.isoWeekday() >= 1 && today.isoWeekday() <= 5;
  
    if (!isWeekday) {
      return false;
    }
  
    // Verificar si es el primer día del mes
    const isFirstDayOfMonth = today.date() === 3;
  
    return isFirstDayOfMonth;
  };
const TT = async () => {

    if (!isWorkingDay()) {
    //  console.log("2")
    let number = 0 
    TTa.push(number)
        return
      }
    
      console.log("Ejecutando Tasas Mensuales...");

    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({slowMo: 250,headless: 'new',});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
        await page.goto(url, {waitUntil: 'networkidle2'}) ;
        await page.setViewport({ width: 1000, height: 800 });

        await page.waitForXPath("//*[@id='block-foobarblock']/table/tbody[2]/tr/td[1]/text()");
        let elHandle = await page.$x("//*[@id='block-foobarblock']/table/tbody[2]/tr/td[1]/text()");
        let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

        console.log('Banco Trinidad & Tobago USD', lamudiNewPropertyCount); 
        let numero = Number(lamudiNewPropertyCount); 
        TTa.push(numero) 
        await page.screenshot({ path: 'TT.png' });


        await browser.close()
            
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }}

module.exports ={
  TT,
  TTa
}