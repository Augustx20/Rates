const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const ArrayCo = []
const url = "https://www.banrep.gov.co/es"

const Colombia = async () => {
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({ handless: false });
    const page = await browser.newPage();
    await page.setUserAgent(header)
try {
    await page.goto(url);
    await page.waitForSelector('#block-banrepindicatorsblock');
        const grabParagraphBANCOco = await page.evaluate(() =>{
        const pgTag = document.querySelector("#block-banrepindicatorsblock > div > div.column.large-3.indicator.indicator--trm > div.indicator__value > a").innerHTML;
        return pgTag});
    await browser.close()
    let procesad = grabParagraphBANCOco.replace(/\s+/g,"");
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