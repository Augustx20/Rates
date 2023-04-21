const read = require('./Components/info')
const create = require('./Components/Excel')
const oanda = require('./Components/Oanda/Oanda')


async function main() {
  await read.read()
  const data = await oanda.Oanda()
  const processedData = processData(data)
  await create.CreateExcel(processedData)

}

function processData(data) {
    // procesar los datos de la API de Oanda para su uso en el archivo Excel
    return processData
  }


main()