

const puppeteer = require('puppeteer');
const moment = require('moment');


let hoy = moment().format('dddd');
let fechaexacta = moment('2023-02-06').add(7, 'days').format('dddd');
const url = "https://www.bcu.gub.uy/Paginas/Default.aspx "
const urlChile = "https://www.bcentral.cl/inicio";
const urlColombia = "https://www.banrep.gov.co/es/"
const urlCostaRica = "https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?idioma=1&CodCuadro=%20400"
const urlPeru = "https://www.sbs.gob.pe/app/pp/SISTIP_PORTAL/Paginas/Publicacion/TipoCambioPromedio.aspx "
const selectorCO = ""  
const SelectorCR = "#Form1"

if( hoy == fechaexacta){
  console.log("Buscando...")
  const BancosImg = async () => {
          // Banco Peru USD EUR
          const browser = await puppeteer.launch({});
          const page = await browser.newPage();   
      try {

      await page.goto(urlPeru);
      await page.setViewport({ width: 600, height: 600 });
      await page.screenshot({ path: `BancoPeru.jpg` });
      await page.close()
                
    } catch (err) {
      console.log("Error de busqueda en la imagen de Peru")
      await browser.close()  
    }
    //Banco Uruguay
    try {
      await page.goto(url);
      await page.setViewport({ width: 1920, height: 1080 });
      await page.waitForSelector('#ctl00_ctl63_g_8899d5e6_dcfc_4225_83da_4a766737a409 > div > div > div')
      const exchange = await page.$('#ctl00_ctl63_g_8899d5e6_dcfc_4225_83da_4a766737a409 > div > div > div')
      await exchange.screenshot({ path: 'BancoUruguay.jpg' });
    await page.close()
    } catch (err) {
      console.log("Error en la busqueda en la imagen de Uruguay")
      await browser.close() 
    }
    // // Banco Colombia 
    // try {
    //   await page.goto(urlColombia);
    //   const element = await page.$(selectorCO);
    //   await element.screenshot({ path: 'BancoColombia.jpg' });
    //   await page.close() 
    // } catch (err) {
    //   console.log("Error en la busqueda en la imagen de Colombia")
    //   await browser.close()   
    // }

    //Banco Chile
    try {
      await page.goto(urlChile);
      await page.setViewport({ width: 1000, height: 500 });
      await page.screenshot({ path: 'BancoChile.jpg' });
      await page.close()
    } catch (err) {
      console.log("Error en la busqueda en la imagen de Chile")
      await browser.close() 
    }

    // Banco Costa Rica
    try {
    await page.goto(urlCostaRica);
    await page.setViewport({ width: 500, height: 680 });
    const element = await page.$(SelectorCR)
    await element.screenshot({ path: 'BancoCostaRica.jpg' });
    await page.close()
    await browser.close()
} catch (err) {
  console.log("Error en la busqueda en la imagen de Costa Rica")
  await browser.close()
}    
}
  const Oanda = async () => {

    console.log("Buscando imagenes")


    const urlArray = [
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=CNY&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=CNY&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=JPY&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=JPY&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=BRL&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=KRW&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=CLP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=USD&to=CLP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=BRL&to=HNL&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=CNY&to=HNL&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=HNL&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=GBP&to=HNL&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=MXN&to=HNL&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=HKD&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=HKD&to=HNL&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=SGD&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=USD&to=EUR&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=MYR&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=VND&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=TWD&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=JPY&to=CRC&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=TWD&to=HNL&amount=1",

    
    ];
    
    
    const selector = '#scroll-wrap > main > div.block.content-cards-lite-row.card-cheat_sheet_row.background--white > div > div > div.col.cheat_sheet > div > div:nth-child(2) > div';
    
    
    (async () => {
      // Create a browser instance
      const browser = await puppeteer.launch();
    

      try {
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
      } catch (error) {
        await browser.close()
        console.log("Error de busqueda en la tasa de Oanda")
      }
      
    })();
    }
    Oanda();
    //BancosImg();
} else{
  const BancosImg = async () => {
        // Banco Peru USD EUR
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();   

     // Banco Colombia 
    //  try {
    //   await page.goto(urlColombia);
    //   await page.waitForSelector('#block-banrepindicatorsblock > div > div.column.large-3.indicator.indicator--trm')
    //   const element = await page.$('#block-banrepindicatorsblock > div > div.column.large-3.indicator.indicator--trm');
    //   await element.screenshot({ path: 'BancoColombia.jpg' }); 
    // } catch (err) {
    //   console.log("Error en la busqueda en la imagen de Colombia")
    //   await browser.close()   
    // }       
    try {
      await page.goto(urlPeru);
      await page.setViewport({ width: 600, height: 600 });
      await page.screenshot({ path: `BancoPeru.jpg` })
    } catch (err) {
      console.log("Error de busqueda en la imagen de Peru")
      await browser.close()  
    }
    //Banco Uruguay
    try {
      await page.goto(url);
      await page.setViewport({ width: 1920, height: 1080 });
      await page.waitForSelector('#ctl00_ctl63_g_8899d5e6_dcfc_4225_83da_4a766737a409 > div > div > div')
      const exchange = await page.$('#ctl00_ctl63_g_8899d5e6_dcfc_4225_83da_4a766737a409 > div > div > div')
      await exchange.screenshot({ path: 'BancoUruguay.jpg' });
    } catch (err) {
      console.log("Error en la busqueda en la imagen de Uruguay")
      await browser.close() 
    }
    //Banco Chile
    try {
      await page.goto(urlChile);
      await page.setViewport({ width: 1000, height: 500 });
      await page.screenshot({ path: 'BancoChile.jpg' });

    } catch (err) {
      console.log("Error en la busqueda en la imagen de Chile")
      await browser.close() 
    }
    // Banco Costa Rica
  try {
    await page.goto(urlCostaRica);
    await page.setViewport({ width: 500, height: 680 });
    await page.screenshot({ path: 'BancoCostaRica.jpg' });
    await browser.close()
  } catch (err) {
  console.log("Error en la busqueda en la imagen de Costa Rica")
  await browser.close()
  }
    }
  const Oanda = async () => {

    const urlArray = [
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=CNY&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=CNY&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=JPY&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=JPY&to=COP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=BRL&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=KRW&to=USD&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=EUR&to=CLP&amount=1",
        "https://www.oanda.com/currency-converter/es/?from=USD&to=CLP&amount=1"
    ];
     
    const selector = '#scroll-wrap > main > div.block.content-cards-lite-row.card-cheat_sheet_row.background--white > div > div > div.col.cheat_sheet > div > div:nth-child(2) > div';
    
    
    (async () => {

      console.log("Buscando imagenes")
      // Create a browser instance
      const browser = await puppeteer.launch();
    try {
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
      console.log(".")
    } catch (err) {
      await browser.close();
      console.log("Error en la busqueda de Oanda")
    }
      // Create a new page
      
    })();
    }
    BancosImg();
    //Oanda();
}  
