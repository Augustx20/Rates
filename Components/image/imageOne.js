const puppeteer = require('puppeteer');
const moment = require('moment');
const randomUseragent = require('random-useragent');

let hoy = moment().format('dddd');
let fechaexacta = moment('2023-02-06').add(7, 'days').format('dddd');
const url = "https://www.bcu.gub.uy/Paginas/Default.aspx "
const urlChile = "https://www.bcentral.cl/inicio";
const urlColombia = "https://www.banrep.gov.co/es/"
const urlCostaRica = "https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?idioma=1&CodCuadro=%20400"
const urlPeru = "https://www.sbs.gob.pe/app/pp/SISTIP_PORTAL/Paginas/Publicacion/TipoCambioPromedio.aspx "
const selectorCO = "#block-banrepindicatorsblock > div > div.column.large-3.indicator.indicator--trm"
const selectorUY = "#ctl00_ctl63_g_8899d5e6_dcfc_4225_83da_4a766737a409 > div > div > div"  


if( hoy == fechaexacta){
  console.log("Buscando...")
  const BancosImg = async () => {
          // Banco Peru USD EUR

    const header = randomUseragent.getRandom()
    const browser = await puppeteer.launch({heandless: false });
    const page = await browser.newPage();   
    await page.setUserAgent(header)
    await page.goto(urlPeru);
    await page.setViewport({ width: 600, height: 600 });
    await page.screenshot({ path: `BancoPeru.jpg` });


    //Banco Uruguay

    await page.setUserAgent(header)
    await page.goto(url);
    await page.setViewport({ width: 1920, height: 1080 });
    const elemen = await page.$(selectorUY)
    await elemen.screenshot({ path: `BancoUruguay.jpg` });

    //Banco Chile

    await page.setUserAgent(header)
    await page.goto(urlChile);
    await page.setViewport({ width: 1000, height: 500 });
    await page.screenshot({ path: `BancoChile.jpg` });

    // Banco Colombia 

    await page.setUserAgent(header)
    await page.goto(urlColombia);
    const element = await page.$(selectorCO);
    await element.screenshot({ path: `BancoColombia.jpg` });

    // Banco Costa Rica

    await page.setUserAgent(header)
    await page.goto(urlCostaRica);
    await page.setViewport({ width: 500, height: 680 });
    await page.screenshot({ path: `BancoCostaRica.jpg` });
  await browser.close()

  }

  const Oanda = async () => {

    console.log("Buscando imagenes")


    const urlArray = [
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=CNY&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=CNY&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=JPY&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Jpy&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Brl&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Krw&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Eur&to=Clp&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Usd&to=Clp&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Brl&to=Hnl&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Cny&to=Hnl&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Eur&to=Hnl&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Gbp&to=Hnl&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Mxn&to=Hnl&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Hkd&to=Usd&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Hkd&to=Hnl&amount=1"
    
    ];
    
    
    const selector = '#scroll-wrap > main > div.block.content-cards-lite-row.card-cheat_sheet_row.background--white > div > div > div.col.cheat_sheet > div > div:nth-child(2) > div';
    
    
    (async () => {
      // Create a browser instance
      const browser = await puppeteer.launch();
    
      // Create a new page
      const page = await browser.newPage();
    
      // Set viewport width and height
      await page.setViewport({ width: 1280, height: 720 });
    
      for(var i = 0; i < urlArray.length; i++) {
    
        const website_url = urlArray[i];
    
        // Open URL in current page
        await page.goto(website_url);
        await page.waitForSelector(selector);
        
        // Capture screenshot
        await page.screenshot({
          path: `Oanda_${i+1}.jpg`,
        });
      }
    
      // Close the browser instance
      await browser.close();

      console.log("Busqueda finalizada")
    })();
    }
    Oanda();
    BancosImg();
} else{

  const BancosImg = async () => {
    // Banco Peru USD EUR

const header = randomUseragent.getRandom()
const browser = await puppeteer.launch({heandless: false });
const page = await browser.newPage();   
await page.setUserAgent(header)
await page.goto(urlPeru);
await page.setViewport({ width: 600, height: 600 });
await page.screenshot({ path: `BancoPeru.jpg` });


//Banco Uruguay

await page.setUserAgent(header)
await page.goto(url);
await page.setViewport({ width: 1920, height: 1080 });
const elemen = await page.$(selectorUY)
await elemen.screenshot({ path: `BancoUruguay.jpg` });

//Banco Chile

await page.setUserAgent(header)
await page.goto(urlChile);
await page.setViewport({ width: 1000, height: 500 });
await page.screenshot({ path: `BancoChile.jpg` });

// Banco Colombia 

await page.setUserAgent(header)
await page.goto(urlColombia);
const element = await page.$(selectorCO);
await element.screenshot({ path: `BancoColombia.jpg` });

// Banco Costa Rica

await page.setUserAgent(header)
await page.goto(urlCostaRica);
await page.setViewport({ width: 500, height: 680 });
await page.screenshot({ path: `BancoCostaRica.jpg` });
await browser.close()

}
  const Oanda = async () => {

    const urlArray = [
        "https://www.oanda.com/currency-converter/es/?from=Jpy&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Brl&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Krw&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Eur&to=Clp&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=Usd&to=Clp&amount=1"
    
    ];
    
    
    const selector = '#cc-time-series-plot > div > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)';
    
    
    (async () => {

      let result = [];
    let errorOccurred = false;
  const maxRetries = 3; // Número máximo de intentos antes de fallar
  const browser = await puppeteer.launch();

  for (var i = 0; i < urlArray.length; i++) {
    const website_url = urlArray[i];
    let retries = 0;
    let pageLoaded = false;
    let page;
    while (!pageLoaded && retries < maxRetries) {
      try {
        // Create a new page
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        await page.goto(website_url);
        await page.waitForSelector(selector);
        pageLoaded = true;

        await page.screenshot({
          path: `Oanda_${i + 1}.jpg`,
        });
      } catch (error) {
        console.log(
          `No se pudo capturar la imagen de la página ${website_url}. Error: ${error}`
        );
        retries++;
      } finally {
        if (page) {
          // Close the page instance
          await page.close();
        }
      }
    }
  }

  // Close the browser instance
  await browser.close();

  console.log("Búsqueda finalizada");
    })();
    }
    Oanda();
    BancosImg();

}

