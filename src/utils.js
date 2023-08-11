const path = require('path'); // Importa el módulo 'path'
const file = path.join(__dirname, 'documentation', 'Datos.xlsx');
 
 function downloadFile(req, res) {
    res.download(file);
    console.log(file)
}

module.exports = {downloadFile}
