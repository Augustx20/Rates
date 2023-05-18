const puppeteer = require('puppeteer');

let url = "https://www.bna.com.ar/Personas"

const Billete =[];
const Divisa = [];
const TelefonoArg = [];

const SelectorAr = "#billetes"
const Selector = "#rightHome > div.col-md-3 > div > div"

const CasoBancoArg = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(url);
        await page.waitForSelector(SelectorAr);
        const element = await page.$(SelectorAr);
        await element.screenshot({path:`Billete.jpg`});
        
        const grabParagraphCasoUsd = await page.evaluate(() =>{
            const pgTag = document.querySelector("#billetes > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML;
            return pgTag;
        })
    
        const grabParagraphCasoEur = await page.evaluate(() =>{
            const pgTag = document.querySelector("#billetes > table > tbody > tr:nth-child(2) > td:nth-child(2)").innerHTML;
            return pgTag;
        });

        const grabParagraphCaso= await page.evaluate(() =>{
            const pgTag = document.querySelector("#billetes > table > tbody > tr:nth-child(1) > td:nth-child(3)").innerHTML;
            return pgTag;
        })
    await browser.close()

        //Telefono
       let valorTres = grabParagraphCaso.replace(/,/g,'.');
       let numeroTres = Number(valorTres)
       let Telefono = (numeroTres*(2.63/100) + numeroTres);
       let roundedNumber = Math.round(Telefono * 1000) / 1000;
       console.log("Tasa KN Telefono ", roundedNumber);

       console.log("Cotizacion Billete Venta USD", numeroTres);
       TelefonoArg.push(numeroTres) 

    //Eur
    let valorDos = grabParagraphCasoEur.replace(/,/g,'.');
    let numeroDos = Number(valorDos)
    console.log("Cotizacion Billete Compra EUR", numeroDos);
    Billete.push(numeroDos)
    //Usd
    let valor = grabParagraphCasoUsd.replace(/,/g,'.');
    let numero = Number(valor)
    console.log("Cotizacion Billete Compra USD ", numero)
    Billete.push(numero)
} catch (err) {         
    console.error(`Se produjo un error: ${err}`);
    await browser.close()
}}
//Divisa
const CasoNumeroDos = async () => {

    const browser = await puppeteer.launch({
        //headless: false,
        // args: ["--disable-setuid-sandbox", "--start-maximized"],
        // 'ignoreHTTPSErrors': true,
        slowMo: 250,
    });
    const page = await browser.newPage();
    //await page.setViewport({width: 1920, height: 1080})
    try {
        await page.goto(url);
        await page.waitForXPath(`//*[@id="rightHome"]/div[1]/div/ul/li[2]/a`, {
            visible: true,
        })
        const [Search] = await page.$x(`//*[@id="rightHome"]/div[1]/div/ul/li[2]/a`);
        if(Search){
            await Search.click()
        }
        const element = await page.$(Selector);
        await element.screenshot({path:`Divisa.jpg`});
                       
    const grabParagraphCasoVenta= await page.evaluate(() =>{
        const pgTag = document.querySelector("#divisas > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML;
        return pgTag;
    })

    const grabParagraphCasoDos= await page.evaluate(() =>{
        const pgTag = document.querySelector("#divisas > table > tbody > tr:nth-child(1) > td:nth-child(3)").innerHTML;
        return pgTag;
    });

    let valorCinco = grabParagraphCasoDos.replace(/,/g,'.');
    let numeroCinco = Number(valorCinco)
    

    //Compra
   let valorCuatro = grabParagraphCasoVenta.replace(/,/g,'.');
   let numeroCuatro = Number(valorCuatro)
   console.log("Cotizacion Divisa Compra USD ", numeroCuatro);
   Divisa.push(numeroCuatro)
   console.log("Cotizacion Divisa Venta USD ", numeroCinco);
   Divisa.push(numeroCinco)

   await browser.close()
   } catch (err) {
    console.error(`Se produjo un error: ${err}`);
       await browser.close()
}}

module.exports = {
    Billete,
    CasoBancoArg,
    CasoNumeroDos,
    Divisa,
    TelefonoArg,
}