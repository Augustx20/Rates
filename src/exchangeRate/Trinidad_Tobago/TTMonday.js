const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const moment = require('moment');

const TtMons = []
let url = "https://www.central-bank.org.tt/"

let hoy = moment().format('dddd');
let fechaexacta = moment('2023-01-02').add(7, 'days').format('dddd');
const TTMon = async () => {


    if (hoy == fechaexacta) {
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({slowMo: 250,headless: 'new',});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
        await page.goto(url, {waitUntil: 'networkidle2'}) ;
        await page.setViewport({ width: 1000, height: 800 });

        await page.waitForXPath("//*[@id='block-foobarblock']/table/tbody[2]/tr/td[1]/text()");
        let elHandle = await page.$x("//*[@id='block-foobarblock']/table/tbody[2]/tr/td[1]/text()");
        let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

        console.log('Banco Trinidad & Tobago USD', lamudiNewPropertyCount); 
        let numero = Number(lamudiNewPropertyCount); 
        TtMons.push(numero) 
        await page.screenshot({ path: 'TT.png' });

        await page.waitForXPath("//*[@id='block-foobarblock']/table/tbody[2]/tr/td[4]/text()");
        let elHandleTwo = await page.$x("//*[@id='block-foobarblock']/table/tbody[2]/tr/td[4]/text()");
        let lamudiNewPropertyCountTwo = await page.evaluate(el => el.textContent, elHandleTwo[0]);

        console.log('Banco Trinidad & Tobago EUR', lamudiNewPropertyCountTwo); 
        let numeroTwo = Number(lamudiNewPropertyCountTwo); 
        TtMons.push(numeroTwo) 

        await browser.close()
            
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }} else {}}  ;

    module.exports ={
        TTMon,
        TtMons
}