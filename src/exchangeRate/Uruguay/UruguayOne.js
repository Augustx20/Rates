const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const url = "https://www.bcu.gub.uy/Paginas/Default.aspx "
const selectorUY = "#ctl00_ctl63_g_8899d5e6_dcfc_4225_83da_4a766737a409 > div > div > div"  

/* Banco Uruguay*/
const BancoUruguayUSD = async () => {
    console.log("Buscando...")
    const ArrayUY = [];
   
        const header = randomUseragent.getRandom()
        const browser = await puppeteer.launch(
            {heandless: false,});
            const page = await browser.newPage();
            await page.setUserAgent(header)
            page.setDefaultNavigationTimeout(0);
            await page.goto(url);
            await page.waitForSelector('#\\32 225');
            try {
                    const grabParagraphBancoUru= await page.evaluate(() =>{
                    const pgTag = document.querySelector("#\\32 225 > div > div > span:nth-child(2)").innerHTML;
                    return pgTag;
                    });
                    ArrayUY.push(grabParagraphBancoUru)} 
                    catch(error){}
                     await browser.close();

                     let valor1 = ArrayUY.pop()
                        let EditComa = valor1.replace(/,/g,'.')
                        let numero = Number(EditComa)
                        console.log("Banco Uruguay " + numero );

                    }           
BancoUruguayUSD();

