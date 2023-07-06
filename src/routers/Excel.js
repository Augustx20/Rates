const data = require('./Oanda')
const XLSX = require('xlsx');
const B = require('./Bank')

const CreateExcel = async () => {
  

  // Crear un nuevo array que contenga tanto la columna B como la columna C, y los datos de Oanda
  const worksheetData = [
    ['Oanda Process'], // encabezado
    ...Colum.map((value, index) => [value, ColumS[index], datos[index]]), // datos
    ['Banks Process'],
    ...ColumE.map((value, index)=> [value, ColumH[index],Bancos[index]])
  ];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.sheet_add_aoa(workbook.SheetNames[0], worksheetData, {origin: 'A1'});
  
  // Definir los anchos de las columnas
  worksheet['!cols'] = [
    {width: 10},
    {width: 10},
    {width: 15}
  ];
  
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'OandaRates.xlsx');
 console.log("Creacion del Excel Finalizada") 
}
module.exports = {
    CreateExcel
}