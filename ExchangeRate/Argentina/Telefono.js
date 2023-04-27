const puppeteer = require('puppeteer');
let url = "https://www.bna.com.ar/Personas"

const CasoTelefono = async () => {
    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();
    try {
        await page.goto(url);
        await page.waitForSelector('#billetes')

        const grabParagraphCaso= await page.evaluate(() =>{
            const pgTag = document.querySelector("#billetes > table > tbody > tr:nth-child(1) > td:nth-child(3)").innerHTML;
            return pgTag;
        })
    await browser.close()
        //Telefono
       let valorTres = grabParagraphCaso.replace(/,/g,'.');
       let numeroTres = Number(valorTres)
       let Telefono = (numeroTres*(3.3/100) + numeroTres);
       let roundedNumber = Math.round(Telefono * 1000) / 1000;
       console.log("Tasa KN Telefono ", roundedNumber);
       console.log("Cotizacion Billete Venta USD", numeroTres);
    
} catch (err) {
        console.log("the page didn't load")
        await browser.close()  
}}
CasoTelefono();

