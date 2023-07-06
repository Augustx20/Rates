const read = require('./src/routers/info')
const create = require('./src/routers/Excel')
const oanda = require('./src/routers/Oanda')
const Bancos = require('./src/routers/Bank')
const img = require('./src/routers/image')
const fs = require('fs')
const moment = require('moment')

async function main() {
  await read.read()
  const data = await Bancos.OandaB()
  const dataOanda = await oanda.Oanda()
  //const imagen = await img.Imagenes()
  const processedData = processData(data)
  const processedDatab = processData(dataOanda)
  const processdatac = processData(imagen)
  await create.CreateExcel(processedData,processedDatab, processdatac)

  if(fs.existsSync('./BaseDate.txt')){
  fs.appendFileSync('./BaseDate.txt', "Proceso Completado," + moment().format('MMMM Do YYYY, h:mm:ss a ') + "\n" )
  }
}
function processData(data , dataOanda,  ) {
    return processData
}

main()
