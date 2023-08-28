const puppeteer = require('puppeteer');
const moment = require('moment');

let hoy = moment().format('dddd');
let fechaexacta = moment('2023-02-06').add(7, 'days').format('dddd');
const url = "https://www.bcu.gub.uy/Paginas/Default.aspx "
const urlChile = "https://www.bcentral.cl/inicio";
const urlCostaRica = "https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?idioma=1&CodCuadro=%20400"
const urlPeru = "https://www.sbs.gob.pe/app/pp/SISTIP_PORTAL/Paginas/Publicacion/TipoCambioPromedio.aspx "
const urlhonduras = "https://www.ficohsa.com/hn/honduras/tipo-cambio/"

if( hoy == fechaexacta){
  console.log("Buscando...")
  const BancosImg = async () => {
    // Banco Peru USD EUR
    const browser = await puppeteer.launch({slowMo:250, ignoreHTTPSErrors: true});
    const page = await browser.newPage();   

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
  await browser.close()
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
 // Honduras
 try {
  await page.goto(urlhonduras);
  await page.setViewport({ width: 1000, height: 500 });
  await page.waitForSelector('#site-banco-honduras > div:nth-child(10) > div.col-8.col-md-8.col-sm-12.padding-main.padding-right-10.tab1-padding-right-0')
  const exchange = await page.$('#site-banco-honduras > div:nth-child(10) > div.col-8.col-md-8.col-sm-12.padding-main.padding-right-10.tab1-padding-right-0')
  await exchange.screenshot({ path: 'bancohonduras.jpg' });
  await browser.close()
} catch (err) {
  console.log("Error en la busqueda en la imagen de Honduras")
  await browser.close() 
}
  }
BancosImg();
} else{
  const BancosImg = async () => {
        // Banco Peru USD EUR
        const browser = await puppeteer.launch({slowMo:250, ignoreHTTPSErrors: true});
        const page = await browser.newPage();   
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
      console.log(err)
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
BancosImg();
}  