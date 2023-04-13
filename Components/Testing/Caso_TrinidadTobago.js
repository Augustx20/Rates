const puppeteer = require('puppeteer');

let url = "https://www.central-bank.org.tt/"

const Caso = async () => {
    //let launchOptions = { headless: false, args: ['--start-maximized'] };
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({width: 1366, height: 768});
    await page.goto(url);
    await page.waitForXPath("//*[@id='block-foobarblock']/table/tbody[1]/tr[1]/td[1]/text()");
    let elHandle = await page.$x("//*[@id='block-foobarblock']/table/tbody[1]/tr[1]/td[1]/text()");
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);
    console.log('Total Property Number is:', lamudiNewPropertyCount);

    await browser.close();
};

//Caso();