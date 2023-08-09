

const puppeteer = require('puppeteer');
const moment = require('moment');
let hoy = moment().format('dddd');
let fechaexacta = moment('2023-02-06').add(7, 'days').format('dddd');

if( hoy == fechaexacta){
    console.log("Buscando...")
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
          "https://www.oanda.com/currency-converter/es/?from=JPY&to=HNL&amount=1",
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
  }else{
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
      Oanda();
  }  