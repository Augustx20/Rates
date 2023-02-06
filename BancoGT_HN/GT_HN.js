const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const PageHondurasGuatemala = async () => {
 
        //Guatemala Lunes
        const header = randomUseragent.getRandom()
        const browser = await puppeteer.launch({heandless: false });
        const page = await browser.newPage();
        await page.setUserAgent(header)
        await page.goto("https://www.oanda.com/currency-converter/es/?from=USD&to=HNL&amount=1");
        page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({path: '15-Tasa BRLHNL.png'});
        
        const grabParagraphBancoGua= await page.evaluate(() =>{
            const pgTag = document.querySelector("#cc-time-series-plot > div > div > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(3)");
            return pgTag.innerHTML;
        
        })
        console.log("Banco Guatemala", grabParagraphBancoGua);
        
        //Honduras lunes 
        
        //Banco Honduras
        await page.setUserAgent(header)
        await page.goto("https://www.ficohsa.com/hn/honduras/tipo-cambio/");
        await page.setViewport({ width: 1920, height: 1080 });
        await page.screenshot({path: '16-Banco Honduras.png'});
        
        const grabParagraphUSDHNL= await page.evaluate(() =>{
            const pgTag = document.querySelector("#site-banco-honduras > div:nth-child(10) > div.col-8.col-md-8.col-sm-12.padding-main.padding-right-10.tab1-padding-right-0 > article:nth-child(1) > p:nth-child(4) > span:nth-child(2) > span > span > span > span > span > span");
            return pgTag.innerHTML;
        })
        console.log("Banco Honduras", grabParagraphUSDHNL);
    
        
        await browser.close()
    
}

module.exports = {
    PageHondurasGuatemala
}