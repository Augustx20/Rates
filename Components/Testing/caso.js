const puppeteer = require('puppeteer');

let url = "https://www.bcb.gob.bo/?q=cotizaciones_tc"

const Caso = async () => {
    let launchOptions = { headless: false, args: ['--start-maximized'] };
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.setViewport({width: 1920, height: 1080});
    await page.goto(url);
    const selector = '/html/body/div[1]/table/tbody/tr[2]/td[4]/div'
    await page.waitForXPath(selector);
    let elHandle = await page.$x("/html/body/div[1]/table/tbody/tr[2]/td[4]/div");
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);
    console.log('Total Property Number is:', lamudiNewPropertyCount);

    await browser.close();
};
 Caso()