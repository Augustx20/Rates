const companyData = require('../json/company.json');
const XLSX = require('xlsx');
const Oanda = require('./Oanda.script');
const Bank = require('./Bank.script');

const getCompany = (name) => {
  const companies = companyData.bancos[0];
  return companies[name] || '';
};

const createExcel = async () => {
  try {
    // Obtener los datos de Oanda y Bank
    const [oandaData, bankData] = await Promise.all([Oanda.OandaArray, Bank.Bancos]);

    // Verificar que los datos estén en el formato esperado
    if (!Array.isArray(oandaData) || !Array.isArray(bankData)) {
      throw new Error('Los datos no están en el formato esperado');
    }

    // Crear el array de datos para el Excel
    const worksheetData = [
      ['Oanda Process', 'Company'],
      ...oandaData.map(({ valor, name }) => [valor, getCompany(name)]),
      ['Banks Process', 'Company'],
      ...bankData.map(({ valor, name }) => [valor, getCompany(name)]),
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Definir los anchos de las columnas
    const columnWidths = [{ wpx: 100 }, { wpx: 100 }];
    worksheet['!cols'] = columnWidths;

    // Agregar el worksheet al workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Guardar el archivo Excel
    XLSX.writeFile(workbook, 'OandaBankRates.xlsx');

    console.log('Creación del Excel Finalizada');
  } catch (error) {
    console.error('Error al crear el Excel:', error);
  }
};

module.exports = {
  createExcel,
};
