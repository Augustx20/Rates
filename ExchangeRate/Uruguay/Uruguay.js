const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const url = "https://www.bcu.gub.uy/Paginas/Default.aspx"

const ArrayU = [];
/* Banco Uruguay*/
const BancoUruguayUSD = async () => {
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
    await page.goto(url, { timeout: 60000 })
    
    await page.waitForXPath('//*[@id="2225"]/div/div/span[2]')
    let elHandle = await page.$x('//*[@id="2225"]/div/div/span[2]');
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);
    await browser.close()

    let EditComa = lamudiNewPropertyCount.replace(/,/g,'.')
    let numero = Number(EditComa)
    console.log("Banco Uruguay USD " + numero|| undefined );
    ArrayU.push(numero)}
    catch(err){
        await browser.close()
    console.error(`Error en la busqueda: ${err}`);
    let SegOption = 0;
    ArrayU.push(SegOption)
}}
module.exports = {
    BancoUruguayUSD,
    ArrayU,
}