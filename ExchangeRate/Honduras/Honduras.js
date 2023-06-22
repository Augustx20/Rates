const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const moment = require('moment');       


let hoy = moment().format('dddd');
let fechaexacta = moment('2023-01-04').add(7, 'days').format('dddd');
const ArrayHn = []
const url = "https://www.ficohsa.com/hn/honduras/tipo-cambio/"

const Honduras = async () => {

    if (hoy == fechaexacta) {
    console.log("Se ejecutara la tasa de Honduras")
    console.log(" ")
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
        await page.goto(url);
    await page.waitForSelector('#site-banco-honduras');

        const grabParagraphBancHn = await page.evaluate(() =>{
        const pgTag = document.querySelector("#site-banco-honduras > div:nth-child(10) > div.col-8.col-md-8.col-sm-12.padding-main.padding-right-10.tab1-padding-right-0 > article:nth-child(1) > p:nth-child(4) > span > span > span > span > span > span > span").innerHTML;
        return pgTag;
    });

    const grabParagraphBancHnEur = await page.evaluate(() =>{
        const pgTag = document.querySelector("#site-banco-honduras > div:nth-child(10) > div.col-8.col-md-8.col-sm-12.padding-main.padding-right-10.tab1-padding-right-0 > article:nth-child(1) > p:nth-child(10) > span:nth-child(2) > span > span > span > span > span > span").innerHTML;
        return pgTag;
    });

    await browser.close()
    let arr = grabParagraphBancHn.split(' ')
    let numero = Number(arr);
    console.log(`Banco Honduras USD ${numero}`);
    ArrayHn.push(numero)

    let arrE = grabParagraphBancHnEur.split(' ')
    let numeroE = Number(arrE);
    console.log(`Banco Honduras EUR ${numeroE}`);
    ArrayHn.push(numeroE)

} catch (err) {
        await browser.close()
        console.log("The page Honduras didn't load")
        let SegOption = 0;
        ArrayHn.push(SegOption)
    }} else {}}  ;

module.exports = {
    ArrayHn,
    Honduras
}