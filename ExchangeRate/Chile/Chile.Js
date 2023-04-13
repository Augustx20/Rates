const puppeteer = require('puppeteer');

const url = "https://si3.bcentral.cl/Indicadoressiete/secure/Indicadoresdiarios.aspx";
const ChileArray =[];

const BancoChile = async () => {
    /* Banco Chile  Usd*/
    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();
    try {
    await page.goto(url);
    await page.setViewport({ width: 1920, height: 1080 });

    const grabParagraphBancoChileUsd = await page.evaluate(() =>{
        const pgTag = document.querySelector("#lblValor1_3").innerHTML;
        return pgTag;
    });

    let EditComa = grabParagraphBancoChileUsd.replace(/,/g,'.')
    let numero = Number(EditComa)
    console.log("Banco Chile USD " + numero|| undefined );

    ChileArray.push(numero);

/* Banco Chile  Eur*/
    await page.goto(url);
    await page.setViewport({ width: 1920, height: 1080 });

    const grabParagraphBancoChileEur= await page.evaluate(() =>{
        const pgTag = document.querySelector("#lblValor1_5").innerHTML;
        return pgTag;
    });

    let EditComaa = grabParagraphBancoChileEur.replace(/,/g,'.')
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