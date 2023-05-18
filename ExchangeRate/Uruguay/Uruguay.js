const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const url = "https://www.bcu.gub.uy/Paginas/Default.aspx"

const ArrayU = [];
/* Banco Uruguay*/
const BancoUruguayUSD = async () => {
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({slowMo: 250,headless: 'new'});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
    await page.goto(url, {waitUntil: 'networkidle2'})
    
    await page.waitForXPath('//*[@id="ctl00_ctl63_g_0723770d_f942_45cc_80db_28dc7fa543a2_ctl00_lstCotizaciones"]/tbody/tr[1]/td[3]');
    let elHandle = await page.$x('//*[@id="2225"]/div/div/span[2])');
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);
    await browser.close()

    let EditComa = lamudiNewPropertyCount.replace(/,/g,'.')
    let numero = Number(EditComa)
    console.log("Banco Uruguay USD " + numero|| undefined );
    console.log(" ")
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