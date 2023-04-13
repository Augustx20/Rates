const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const url = "https://www.bcu.gub.uy/Paginas/Default.aspx "

const ArrayU = [];
/* Banco Uruguay*/
const BancoUruguayUSD = async () => {
    const ArrayUY = [];
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({heandless: false,});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    
    try {
    await page.goto(url)
    await page.waitForSelector('#\\32 225');
    
    const grabParagraphBancoUru= await page.evaluate(() =>{
    const pgTag = document.querySelector("#\\32 225 > div > div > span:nth-child(2)").innerHTML;
    return pgTag;
    });
    ArrayUY.push(grabParagraphBancoUru)
    await browser.close()
    let valor1 = ArrayUY.pop()
    let EditComa = valor1.replace(/,/g,'.')
    let numero = Number(EditComa)
    console.log("Banco Uruguay USD " + numero|| undefined );
    console.log(" ")
    ArrayU.push(numero)}
    catch(err){
        await browser.close()
    console.log("The page Uruguay didn't load")
    let SegOption = 0;
    ArrayU.push(SegOption)
}}
module.exports = {
    BancoUruguayUSD,
    ArrayU,
}



