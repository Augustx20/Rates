const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

let let1 = "#block-bac-theme-content > article > div.layout.layout--onecol.layout--fixed-width.layout__mg-bottom--medium > div > div > div"
let url = "https://www.baccredomatic.com/es-ni"
let let2 = "#block-bac-theme-content"

const Caso = async () => {
    
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({ handless: false });
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
        await page.goto(url);
        await page.waitForSelector(let2)
        await page.setViewport({ width: 1920, height: 1080 });
        const elemen = await page.$(let1)
        await elemen.screenshot({ path: `Nicaragua.jpg`});
    

    //     const grabParagraphNica= await page.evaluate(() =>{
    //     const pgTag = document.querySelector("#money-converter > span").innerHTML;
    //     return pgTag;
    // })
    //  console.log(grabParagraphNica)    // await page.click("#childrenspan565385228-0  > a");
        
        await browser.close()
            
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }
    
    // await page.waitForSelector('#block-foobarblock');


};
//Caso();
