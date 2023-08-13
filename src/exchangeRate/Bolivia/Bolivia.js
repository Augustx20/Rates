const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const moment = require('moment');

let url = "https://www.bcb.gob.bo/"

const BOa = []

const isWorkingDay = () => {
  const today = moment();
  const isWeekday = today.isoWeekday() >= 1 && today.isoWeekday() <= 5;

  if (!isWeekday) {
    return false;
  }

  // Verificar si es el primer, segundo o tercer día del mes
  const dayOfMonth = today.date();
  const isFirstDayOfMonth = dayOfMonth === 1;
  const isSecondDayOfMonth = dayOfMonth === 2;
  const isThirdDayOfMonth = dayOfMonth === 3;

  return isFirstDayOfMonth || isSecondDayOfMonth || isThirdDayOfMonth;
};


const BO = async () => {

    if (!isWorkingDay()) {
     // console.log("4")
     let number = 0
     BOa.push(number)
        return
      }
    
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({slowMo: 250,headless: 'new',});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
        await page.goto(url, {waitUntil: 'networkidle2'}) ;
        await page.setViewport({ width: 1000, height: 800 });

        await page.waitForXPath("//*[@id='content']/div[2]/div/div[1]/div[1]/div/div[2]/div/div/div[3]/div/div/div[1]/div[2]/strong");
        let elHandle = await page.$x("//*[@id='content']/div[2]/div/div[1]/div[1]/div/div[2]/div/div/div[3]/div/div/div[1]/div[2]/strong");
        let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

        console.log('Banco Bolivia USD', lamudiNewPropertyCount);
        let procesado = lamudiNewPropertyCount.replace(/\s+/g,"");
    
        let valor = procesado.replace(/,/g,'.')
        let numero = Number(valor);
        
        
        BOa.push(numero)
        await page.screenshot({ path: 'Bolivia.png' });  
        await browser.close()
            
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }
};

module.exports ={
    BO,
    BOa
}
