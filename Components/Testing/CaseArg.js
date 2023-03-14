const puppeteer = require('puppeteer');

let url = "https://www.bna.com.ar/Personas"


const CasoBancoArg = async () => {
    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();
    try {
        await page.goto(url);
        await page.waitForSelector('#billetes');

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
       console.log("Telefono Argentina ", Telefono);

       
    //Eur
    let valorDos = grabParagraphCasoEur.replace(/,/g,'.');
    let numeroDos = Number(valorDos)
    console.log("Banco Argentina Euro", numeroDos);
        
    //Usd
    let valor = grabParagraphCasoUsd.replace(/,/g,'.');
    let numero = Number(valor)
    console.log("Banco Argentina Usd ", numero);
    
 } catch (err) {
        console.log("the page didn't load")
        await browser.close()
    
} 
}

//Divisa
const CasoNumeroDos = async () => {

    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();

    try {
    await page.goto(url);
    let elementoClick ='#rightHome > div.col-md-3 > div > ul > li.active > a'
    await page.waitForSelector(elementoClick);
    page.click(elementoClick);

    const grabParagraphCaso= await page.evaluate(() =>{
        const pgTag = document.querySelector("#divisas > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML;
        return pgTag;
    })

    const grabParagraphCasoDos= await page.evaluate(() =>{
        const pgTag = document.querySelector("#divisas > table > tbody > tr:nth-child(1) > td:nth-child(3)").innerHTML;
        return pgTag;
    })

    await browser.close()

    let valorUno = grabParagraphCasoDos.replace(/,/g,'.');
    let numeroUno = Number(valorUno)
    //console.log("Banco Argentina ", numeroUno);


    // Compra
   let valor = grabParagraphCaso.replace(/,/g,'.');
   let numero = Number(valor)
   console.log("Compra ", numero + " Venta ",+ numeroUno);
    } catch (err) {
        console.log("the page didn't load")
        await browser.close()
    
    }
    
}


module.exports ={
    CasoBancoArg,
    CasoNumeroDos
}