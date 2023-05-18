const puppeteer = require('puppeteer');

const url = "https://si3.bcentral.cl/Indicadoressiete/secure/Indicadoresdiarios.aspx";
const ChileArray =[];

const BancoChile = async () => {
    /* Banco Chile  Usd*/
    const browser = await puppeteer.launch({slowMo: 250,headless: 'new'});
    const page = await browser.newPage();
    try {
    await page.goto(url , {waitUntil: 'networkidle2'});
    await page.setViewport({ width: 1920, height: 1080 });

    await page.waitForXPath("//*[@id='lblValor1_3']");
    let elHandle = await page.$x("//*[@id='lblValor1_3']");
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

    let EditComa = lamudiNewPropertyCount.replace(/,/g,'.')
    let numero = Number(EditComa)
    console.log("Banco Chile USD " + numero|| undefined );
    ChileArray.push(numero);
/* Banco Chile  Eur*/

    await page.waitForXPath("//*[@id='lblValor1_5']");
    let elHandleE = await page.$x("//*[@id='lblValor1_5']");
    let lamudiNewPropertyCountE = await page.evaluate(el => el.textContent, elHandleE[0]);

    let EditComaa = lamudiNewPropertyCountE.replace(/,/g,'.')
    let numeroo = Number(EditComaa)
    console.log("Banco Chile EUR " + numeroo|| undefined );

    ChileArray.push(numeroo);
    await browser.close()
    } catch (err) {
        console.log("The page Chile didn't load");
        await browser.close();
        let SegOption = 0;
        let SegOptionx = 0;
        ChileArray.push(SegOption)
        ChileArray.push(SegOptionx)
    }}

module.exports = {
    BancoChile,
    ChileArray
    
}