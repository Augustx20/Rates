const read = require('./Components/info')
const create = require('./Components/Excel')
const oanda = require('./Components/Oanda/Oanda')
const Bancos = require('./Components/Bank/Bank')


async function main() {
  await read.read()
  const data = await Bancos.OandaB()
  const dataOanda = await oanda.Oanda()
  const processedData = processData(data)
  const processedDatab = processData(dataOanda)
  await create.CreateExcel(processedData,processedDatab)

}

function processData(data , dataOanda ) {
    return processData
}

 main()
