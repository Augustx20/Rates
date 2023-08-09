const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const moment = require('moment');

let url = "https://www.baccredomatic.com/es-ni/personas/otros-servicios?"

const NIa = []

const isWorkingDay = () => {
    // Verificar si es lunes a viernes (días hábiles)
    const today = moment();
    const isWeekday = today.isoWeekday() >= 1 && today.isoWeekday() <= 5;
  
    if (!isWeekday) {
      return false;
    }
  
    // Verificar si es el primer día del mes
    const isFirstDayOfMonth = today.date() === 1;
  
    return isFirstDayOfMonth;
  };

const Ni = async () => {

    if (!isWorkingDay()) {
     // console.log("3")
     let number = 0
     NIa.push(number)
        return
      }
    
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({slowMo: 250,headless: 'new'});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
        await page.goto(url, {waitUntil: 'networkidle2'}) ;
        await page.setViewport({ width: 1000 , height: 800 });

        await page.waitForXPath('//*[@id="exchangeRate"]/div[2]/div[1]/span[2]/text()');
        let elHandle = await page.$x('//*[@id="exchangeRate"]/div[2]/div[1]/span[2]/text()');
        let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

        await page.screenshot({ path: 'Nicaragua.png' });


        await browser.close()

        let procesado = lamudiNewPropertyCount.replace(/\s+/g,"");
        const newStr = procesado.slice(2)
    
        let valor = newStr.replace(/,/g,'.')
        let numero = Number(valor);
        
        
        console.log('Banco Nicaragua USD', numero);
        NIa.push(numero)
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }
};

module.exports ={
  Ni,
  NIa
}