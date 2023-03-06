const puppeteer = require('puppeteer');
const moment = require('moment');
const randomUseragent = require('random-useragent');


let url = "https://www.bna.com.ar/Personas"



const CasoBancoArg = async () => {

    const header = randomUseragent.getRandom() 
    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();
    page.setUserAgent(header)
    await page.goto(url);
    await page.waitForSelector('#billetes');
    
    const grabParagraphCasoUsd = await page.evaluate(() =>{
        const pgTag = document.querySelector("#billetes > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML;
        return pgTag;
    })

    const grabParagraphCasoEur = await page.evaluate(() =>{
        const pgTag = document.querySelector("#billetes > table > tbody > tr:nth-child(2) > td:nth-child(2)").innerHTML;
        return pgTag;
    })

    await browser.close()
//Eur
let valorDos = grabParagraphCasoEur.replace(/,/g,'.');
let numeroDos = Number(valorDos)
console.log("Banco Argentina Euro", numeroDos);


    //Usd
   let valor = grabParagraphCasoUsd.replace(/,/g,'.');
   let numero = Number(valor)
   console.log("Banco Argentina Usdc xdsfb3  ", numero);
}
CasoBancoArg();

const CasoTelefono = async () => {

    const header = randomUseragent.getRandom() 
    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();
    page.setUserAgent(header)
    await page.goto(url);
    await page.waitForSelector('#billetes');
    
    const grabParagraphCaso= await page.evaluate(() =>{
        const pgTag = document.querySelector("#billetes > table > tbody > tr:nth-child(1) > td:nth-child(3)").innerHTML;
        return pgTag;
    })
    await browser.close()

   let valor = grabParagraphCaso.replace(/,/g,'.');
   let numero = Number(valor)
   console.log("Telefono Argentina ", numero);
}
CasoTelefono();

const CasoNumeroDos = async () => {

    const header = randomUseragent.getRandom() 
    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();
    page.setUserAgent(header)
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
}
CasoNumeroDos();