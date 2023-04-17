const read = require('./Components/info')
const create = require('./Components/Excel')
const oanda = require('./Components/Oanda/Oanda')

read.read()
oanda.Oanda()

setTimeout(() => {
create.CreateExcel()
}, 10000);
