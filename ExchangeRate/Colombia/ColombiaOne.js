const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const ArrayCo = []
const url = "https://www.banrep.gov.co/"
const selectorCO = "#block-banrepindicatorsblock > div > div.column.large-3.indicator.indicator--trm"

const Colombia = async () => {
const ArrayC = [];
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({ handless: false });
    const page = await browser.newPage();
    await page.setUserAgent(header)
    await page.goto(url);
    await page.setViewport({ width: 1920, height: 1500 });

try {
    const grabParagraphBANCOco = await page.evaluate(() =>{
        const pgTag = document.querySelector("#block-banrepindicatorsblock > div > div.column.large-3.indicator.indicator--trm > div.indicator__value > a").innerHTML;
        return pgTag;
    });
    ArrayC.push(grabParagraphBANCOco);
} catch (error) {}
    await browser.close()

    let valor1 = ArrayC.pop()

    if ((valor1 == undefined) && (valor1 == NaN)) {
        grabParagraphBANCOco = 0    
        console.log(`Banco colombia ${grabParagraphBANCOco}`);
        ArrayCo.push(grabParagraphBANCOco)
    }else{
        
        let procesad = valor1.replace(/\s+/g,"");
        let SinComa = procesad.replace(/\.+/g,"");
        let ConPunto = SinComa.replace(/,/g,'.');
        let numero = Number(ConPunto);
        console.log(`Banco colombia ${numero}`);
        ArrayCo.push(numero)
    };
}  
Colombia();
