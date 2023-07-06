
const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const ArrayCo = []
const url = "https://www.banrep.gov.co/es"

const Colombia = async () => {
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({slowMo: 250,headless: 'new'});
    const page = await browser.newPage();
    await page.setUserAgent(header)
try {
    await page.goto(url,{waitUntil: 'networkidle2'});

    await page.waitForXPath('//*[@id="block-banrepindicatorsblock"]/div/div[2]/div[2]/a');
    let elHandle = await page.$x('//*[@id="block-banrepindicatorsblock"]/div/div[2]/div[2]/a');
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

    await browser.close()
    let procesad = lamudiNewPropertyCount.replace(/\s+/g,"");
    let SinComa = procesad.replace(/\.+/g,"");
    let ConPunto = SinComa.replace(/,/g,'.')
    let numero = Number(ConPunto);
    console.log(`Banco Colombia USD ${numero}`);
    ArrayCo.push(numero)
} catch (err) { 
    console.error(`Error en la busqueda: ${err}`);
    await browser.close()
    let SegOption = 0
    ArrayCo.push(SegOption);
}}  
module.exports = {
    ArrayCo,
    Colombia
}