const puppeteer = require('puppeteer');
const moment = require('moment');
const randomUseragent = require('random-useragent');


let url = "https://www1.sucursalelectronica.com/redir/showLogin.go"
let hoy = moment().format('dddd');
let fechaexacta = moment('2023-01-01').add(31, 'days').format('DD');
let dia = moment().format('DD')
let fechamensual = moment('2023-01-01').add(31,'days').format('DD');




const Caso = async () => {
if (fechaexacta == fechamensual) {
 console.log("hoy es primer mes habil")
    // const header = randomUseragent.getRandom() 
    // const browser = await puppeteer.launch({heandless: false });
    // const page = await browser.newPage();
    // page.setUserAgent(header)
    // await page.goto(url);
    // await page.waitForSelector('#tipoCambioHomeAgencia');
    
    // const grabParagraphNica= await page.evaluate(() =>{
    //     const pgTag = document.querySelector("#tipoCambioHomeAgencia > div:nth-child(2) > p > span:nth-child(3)").innerHTML;
    //     return pgTag;
    // })
    // await browser.close()

   
} else {
    console.log("no se Ejecuta tasa mensual")
}};
console.log(fechamensual)
console.log(dia)
Caso();