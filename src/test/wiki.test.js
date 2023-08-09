require('dotenv').config()

async function main() {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] });

  const page = await browser.newPage();
  await page.goto('https://wiki.int.kn/pages/resumedraft.action?draftId=565385229&draftShareId=dbcad12c-8fda-4d07-8a6d-df724595ff8f&');
  // await page.click('#login-link');
  // await page.waitForNavigation();
  
    //sesion
    await page.type('#username','Augusto.Machado' );
    await page.type('#password', 'Sistemas24');
    
    await page.click('#logIn');
    await page.waitForNavigation();// <------------------------- Wait for Navigation
   // await page.type('#main-content > div.table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(1)','Jluy')
    await page.click('#rte-source-editor-button');
  //   // await page.waitForNavigation();
  //   //Edit
  //   await page.click('#editPageLink');
  //   //Corrompoe
  //   await page.waitForSelector('#wysiwyg');
  //   await page.keyboard.press('Enter')

    //Key
    // await page.keyboard.press('alt')
    // await keyboard.down()

    // //type data
    // await page.type("#tinymce > table > tbody > tr:nth-child(18) > td:nth-child(1)", "19/07/2023");
    // await pagef.type("#tinymce > table > tbody > tr:nth-child(18) > td:nth-child(2)", "1.12365");

    // //save
    // await page.click('#rte-button-publish')


  console.log('New Page URL:', page.url());
}

main();