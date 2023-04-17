const XLSX = require("xlsx");


const columnB = ["TO"];
const columnC = ["FROM"];
const data = [];


const read = async () => {

const workbook = XLSX.readFile('C:/Users/Usuario/Desktop/Tasas/config.xlsx');

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const range = XLSX.utils.decode_range(worksheet['!ref']);
range.s.r = 1; // 2 fila
range.e.c = 0; // 1 columna;

for (let row = range.s.r; row <= range.e.r; row++) {
  const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c })];
  if (cell && cell.v !== undefined && cell.v !== null && cell.v !== '') {
    data.push(cell.v);
  }
}
for (let row = range.s.r; row <= range.e.r; row++) {
  const cellB = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 1})];
  const cellC = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 2 })];
  if (cellB && cellB.v !== undefined && cellB.v !== null && cellB.v !== '') {
    columnB.push(cellB.v);
  }
  if (cellC && cellC.v !== undefined && cellC.v !== null && cellC.v !== '') {
    columnC.push(cellC.v);
  }
}

console.log(data);
//console.log('Columna B:', columnB);
//console.log('Columna C:', columnC);
}

module.exports = {
  data,
  read,
  columnB,
  columnC
}