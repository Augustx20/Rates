const data = require('./Oanda/Oanda')
const dataColum = require('./info')
const XLSX = require('xlsx');

const CreateExcel = async () => {
  const datos = data.OandaArray;
  const Colum = dataColum.columnB;
  const ColumS = dataColum.columnC;

  // Crear un nuevo array que contenga tanto la columna B como la columna C, y los datos de Oanda
  const worksheetData = [
    ['Oanda Process'], // encabezado
    ...Colum.map((value, index) => [value, ColumS[index], datos[index]]) // datos
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
  XLSX.writeFile(workbook, 'usuarios.xlsx');
}

module.exports = {
    CreateExcel
}