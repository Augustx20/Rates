
const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

let url = "https://www.bcb.gob.bo/"

const TT = async () => {
    
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
        await page.screenshot({ path: 'Bolivia.png' });  
        await browser.close()
            
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }
};

TT()