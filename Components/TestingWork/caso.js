const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

let url = "https://www.baccredomatic.com/es-ni"

const Caso = async () => {
    
    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({slowMo: 250});
    const page = await browser.newPage();
    await page.setUserAgent(header)
    try {
        await page.goto(url, {waitUntil: 'networkidle2'}) ;
        await page.setViewport({ width: 1920, height: 1080 });


        const grabParagraphNica = await page.evaluate(() =>{
            const pgTag = document.querySelector("#selling-rate");
            if (pgTag !== null) {
                return pgTag.textContent;
            } else {
                throw new Error("El elemento no existe en la página");
            }
        });
        
        console.log(grabParagraphNica)     
        await browser.close()
            
    } catch (err) {
        console.error(`Error en la busqueda: ${err}`);
        await browser.close()
    }
};

Caso();

