const puppeteer = require('puppeteer');
const Cr = []
const url = "https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?idioma=1&CodCuadro=%20400"
 const BancoCostaRica = async () => {
// Banco Costa Rica
const browser = await puppeteer.launch({slowMo: 250,headless: 'new'});
const page = await browser.newPage();
    
try {
    await page.goto(url , {waitUntil: 'networkidle2'});
    await page.setViewport({ width: 1920, height: 1080 });


    await page.waitForXPath('//*[@id="theTable400"]/tbody/tr[2]/td[3]/table/tbody/tr/td/table/tbody/tr[30]/td');
    let elHandle = await page.$x('//*[@id="theTable400"]/tbody/tr[2]/td[3]/table/tbody/tr/td/table/tbody/tr[30]/td');
    let lamudiNewPropertyCount = await page.evaluate(el => el.textContent, elHandle[0]);

    await browser.close()
    
    let procesado = lamudiNewPropertyCount.replace(/\s+/g,"");
    
    let valor = procesado.replace(/,/g,'.')
    let numero = Number(valor);
    console.log("Banco Costa Rica USD ", valor)
    Cr.push(numero)
} catch (err) {
    await browser.close();
    console.log("The page Costa Rica didn't load")
    let SegOption = 0;
Cr.push(SegOption)}}


module.exports ={
    Cr,
    BancoCostaRica
}