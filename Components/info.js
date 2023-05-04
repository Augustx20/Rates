const XLSX = require("xlsx");

const columnA = [];
const columnB = [];
const columnC = [];
const DataBank = [];
const columnG = [];
const columnH = [];
const HTMLS = [];
const data = [];
const IMGUrl = [];

const read = async () => {
  const workbook = XLSX.readFile('C:/Users/Usuario/Desktop/Tasas/config.xlsx');

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const range = XLSX.utils.decode_range(worksheet['!ref']);
  range.s.r = 1; // comienza en la fila 2
  range.e.c = 13; // lee hasta la columna I (índice 8)

  for (let row = range.s.r; row <= range.e.r; row++) {
    const cellA = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c })];
    if (cellA && cellA.v !== undefined && cellA.v !== null && cellA.v !== '') {
      data.push(cellA.v);
    }

    const cellB = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 1 })];
    if (cellB && cellB.v !== undefined && cellB.v !== null && cellB.v !== '') {
      columnB.push(cellB.v);
    }

    const cellC = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 2 })];
    if (cellC && cellC.v !== undefined && cellC.v !== null && cellC.v !== '') {
      columnC.push(cellC.v);
    }

    const cellF = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 5 })];
    if (cellF && cellF.v !== undefined && cellF.v !== null && cellF.v !== '') {
      DataBank.push(cellF.v);
    }

    const cellG = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 6 })];
    if (cellG && cellG.v !== undefined && cellG.v !== null && cellG.v !== '') {
      columnG.push(cellG.v);
    }

    const cellH = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 7 })];
    if (cellH && cellH.v !== undefined && cellH.v !== null && cellH.v !== '') {
      columnH.push(cellH.v);
    }

    const cellI = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 8 })];
    if (cellI && cellI.v !== undefined && cellI.v !== null && cellI.v !== '') {
      HTMLS.push(cellI.v);
    }
    const cellK = worksheet[XLSX.utils.encode_cell({ r: row, c: range.s.c + 10 })];
    if (cellK && cellK.v !== undefined && cellK.v !== null && cellK.v !== '') {
      IMGUrl.push(cellK.v);
    }

  }
  
  console.log('Oanda :',data);
  console.log(IMGUrl);
  //console.log('Columna C:', columnC);
  console.log('Bancos :', DataBank);
  //console.log('Columna G:', columnG);
  //console.log('Columna H:', columnH);
  //console.log('Columna I:', columnI);
};

module.exports = {
  read,
  columnA,
  columnB,
  columnC,
  DataBank,
  columnG,
  columnH,
  HTMLS,
  data,
  IMGUrl
};