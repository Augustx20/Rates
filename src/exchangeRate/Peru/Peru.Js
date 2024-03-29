const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const Peusd = [];
const PeruEur = []
const url = "https://www.sbs.gob.pe/app/pp/SISTIP_PORTAL/Paginas/Publicacion/TipoCambioPromedio.aspx "
const BancoPeru = async () => {

/* Banco  Peru Usd*/
const header = randomUseragent.getRandom()
const browser = await puppeteer.launch({slowMo: 250,headless: 'new',});
const page = await browser.newPage();   
await page.setUserAgent(header);
try {
    await page.goto(url, {waitUntil: 'networkidle2'});
    await page.setViewport({ width: 1920, height: 1080 });

        await page.waitForXPath('//*[@id="ctl00_cphContent_rgTipoCambio_ctl00__0"]/td[3]');
        let elHandle = await page.$x('//*[@id="ctl00_cphContent_rgTipoCambio_ctl00__0"]/td[3]');
        let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

    let numero = Number(lamudiNewPropertyCount)
    console.log("Banco Peru USD " + numero|| undefined );
    
    Peusd.push(numero);


/* Banco Peru Eur */


const Miarray2 = []
   const grabParagraphPeLineaTex5Eur = await page.evaluate((linea5) => {
            const pgTag = document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__5 > td.APLI_fila3").innerHTML;
           return pgTag;
       })
       Miarray2.push(grabParagraphPeLineaTex5Eur)
try {
   const grabParagraphPeLineaTex6Eur = await page.evaluate(() =>{
       const pgTag = document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__6 > td.APLI_fila3").innerHTML;
       return pgTag;
      })
      Miarray2.push(grabParagraphPeLineaTex6Eur)
} catch (error){};
try {
   const grabParagraphPeLineaTex7Eur = await page.evaluate(() =>{
       const pgTag = document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__7 > td.APLI_fila3").innerHTML;
       return pgTag;
      });
      Miarray2.push(grabParagraphPeLineaTex7Eur)
} catch (error) {}
try {
   const grabParagraphPeLineaTex8Eur = await page.evaluate(() =>{
       const pgTag = document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__8 > td.APLI_fila3").innerHTML;
       return pgTag.innerHTML;
      });
      Miarray2.push(grabParagraphPeLineaTex8Eur)    
} catch (error) {}
const TasaEur = "Euro";
let linea5 = Miarray2[0];
let linea6 = Miarray2[1];
let linea7 = Miarray2[2];
let linea8 =  Miarray2[3];
const Miarray = [];
Miarray.push(linea5, linea6 ,linea7 ,linea8);

switch (TasaEur) {
    case linea5:  
        const grabParagraphPeLinea5Eur = await page.evaluate(() =>{
        const pgTag = document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__5 > td:nth-child(3)");
        return pgTag.innerHTML;
    })
    Miarray.push(grabParagraphPeLinea5Eur);
    break;
    case linea6:
        const grabParagraphPeLinea6Eur = await page.evaluate(() =>{
        const pgTag = document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__6 > td:nth-child(3)");
        return pgTag.innerHTML;
        })
    Miarray.push(grabParagraphPeLinea6Eur);
    break;
    case linea7:
        const grabParagraphPeLinea7Eur = await page.evaluate(() =>{
        const pgTag = document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__7 > td:nth-child(3)");
        return pgTag.innerHTML;
        })
    Miarray.push(grabParagraphPeLinea7Eur);
    break;            
    case linea8:
        const grabParagraphPeLinea8Eur = await page.evaluate(() =>{
        const pgTag =document.querySelector("#ctl00_cphContent_rgTipoCambio_ctl00__8 > td:nth-child(3)");
        return pgTag.innerHTML;
        });
    Miarray.push(grabParagraphPeLinea8Eur);
    break;
    };
await browser.close()
let numeroDos= Miarray.pop();
let numeroX = Number(numeroDos)
console.log("Banco Peru EUR " + numeroX|| undefined );

PeruEur.push(numeroX);

} catch (err) {
    console.log("The page Peru didn't load");
    await browser.close()
    let SegOption = 0;
    let SegOptionDos = 0;
    PeruEur.push(SegOption)
    Peusd.push(SegOptionDos)
}
}
module.exports = {
    BancoPeru,
    Peusd,
    PeruEur,
}