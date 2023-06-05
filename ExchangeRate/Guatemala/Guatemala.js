const puppeteer = require('puppeteer');
const moment = require('moment');


let url = "https://www.bancopromerica.com.gt/"
let hoy = moment().format('dddd');
let fechaexacta = moment('2023-01-06').add(7, 'days').format('dddd');

const GTQ = [];

const PageGuatemala = async () => {
//Guatemala Viernes
if (hoy == fechaexacta) {
    console.log("Hoy se ejecuta la Tasa de Guatemala");
    const browser = await puppeteer.launch({heandless: 'new' });
    const page = await browser.newPage();
    try {
    await page.goto(url);
    await page.waitForSelector('#tipoCambioHomeAgencia');
    const grabParagraphBancoGua= await page.evaluate(() =>{
        const pgTag = document.querySelector("#tipoCambioHomeAgencia > div:nth-child(2) > p > span:nth-child(3)").innerHTML;
        return pgTag;
    })
    await browser.close()
    let numero = Number(grabParagraphBancoGua)
    GTQ.push(numero);
    console.log("Banco Guatemala USD ", numero);
    } catch (err) {
        console.log("The page Guatemala didn't load")
        await browser.close()
        let SegOption = 0;
        GTQ.push(SegOption)
    }} else {}};

module.exports = {
    GTQ,
    PageGuatemala
}