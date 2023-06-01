const xlsx = require('xlsx');

// Crear un libro de Excel
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.aoa_to_sheet([
  ['Datos combinados'],
  ['Celda A1', 'Celda B1'],
  ['Celda A2', 'Celda B2'],
]);

// Combinar celdas
const range = { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } };
const merges = [{ s: range.s, e: range.e }];
ws['!merges'] = merges;

// Agregar la hoja al libro de Excel
xlsx.utils.book_append_sheet(wb, ws, 'Hoja1');

// Guardar el libro de Excel
xlsx.writeFile(wb, 'archivo.xlsx');