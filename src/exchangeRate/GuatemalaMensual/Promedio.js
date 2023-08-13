const puppeteer = require('puppeteer');
const moment = require('moment');


const GTa = []

const isWorkingDay = () => {
  const today = moment();
  const isWeekday = today.isoWeekday() >= 1 && today.isoWeekday() <= 5;

  if (!isWeekday) {
    return false;
  }

  // Verificar si es el primer, segundo o tercer día del mes
  const dayOfMonth = today.date();
  const isFirstDayOfMonth = dayOfMonth === 1;
  const isSecondDayOfMonth = dayOfMonth === 2;
  const isThirdDayOfMonth = dayOfMonth === 3;

  return isFirstDayOfMonth || isSecondDayOfMonth || isThirdDayOfMonth;
};


const GT = async () => {

  if (!isWorkingDay()) {
   // console.log("1")
   let number = 0
   GTa.push(number)
    return
  }
  const browser = await puppeteer.launch({slowMo: 250,headless: 'new',});
  const page = await browser.newPage();


  const today = moment();
  const firstDayOfLastMonth = today.clone().subtract(1, 'month').startOf('month').format('DD/MM/YYYY');
  const lastDayOfLastMonth = today.clone().subtract(1, 'month').endOf('month').format('DD/MM/YYYY');

  await page.goto('http://www.banguat.gob.gt/tipo_cambio');  

  await page.evaluate((firstDay) => {
    const inputStartDate = document.querySelector('#fecha_apartir');
    inputStartDate.value = firstDay;
  }, firstDayOfLastMonth);

  
  await page.evaluate((lastDay) => {
    const inputEndDate = document.querySelector('#fecha_hasta');
    inputEndDate.value = lastDay;
  }, lastDayOfLastMonth);

  await page.click('body > div.table-responsive > div > div > div > form:nth-child(4) > table > tbody > tr.detalle_banguat > td > div:nth-child(4) > div > input');

  const tdElements = await page.$$eval('#table_Data > tbody > tr:nth-child(2) > td td', (elements) => 
    {
        return elements.filter((_, index) => index % 2 === 1).map((element) => {
            const value = element.textContent.trim();
            return parseFloat(value);
          });
        });

     // Calcular el promedio de los elementos
  const sum = tdElements.reduce((acc, value) => acc + value, 0);
  const average = sum / tdElements.length;

  console.log('Promedio:', average);
  GTa.push(average)
  console.log(tdElements);  
  
const tableBoundingBox = await page.evaluate(() => {
    const table = document.querySelector('#table_Data > tbody > tr:nth-child(2) > td'); 
    const { x, y, width, height } = table.getBoundingClientRect();
    return { x, y, width, height };
  });

  // Tomar una captura de pantalla de la tabla
  await page.screenshot({
    path: 'tabla.png', 
    clip: {
      x: tableBoundingBox.x,
      y: tableBoundingBox.y,
      width: tableBoundingBox.width,
      height: tableBoundingBox.height,
    },
  });

  await browser.close();
};

module.exports = {
  GT,
  GTa
}