const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

let url = "https://www.central-bank.org.tt/"

const TT = async () => {
    
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
        await page.screenshot({ path: 'TT.png' });


        await browser.close()
            
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }
};

TT()