const data = require('./Oanda/Oanda')
const dataColum = require('./info')
const XLSX = require('xlsx');

const CreateExcel = async () => {
    const datos = data.OandaArray;
    const Colum = dataColum.columnB;
    const ColumS = dataColum.columnC;
  
    // Transponer la data para mostrarla horizontalmente
    const datosTranspuesta = [(datos[0]), ...datos.map()];
    // Agregar la columna B y la columna C a la transpuesta
    const worksheetData = [Colum, ColumS, ...datosTranspuesta];
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.sheet_add_aoa([], worksheetData, {origin: 'A1'});
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    XLSX.writeFile(workbook, "usuarios.xlsx");
  }

module.exports = {

    CreateExcel
}