const express = require('express');
const path = require('path');
const { getCurrencies } = require('..');

const app = express();
let publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//PAGINA PRINCIPAL
app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
  });

  const server = app.listen(3000, '127.0.0.1', () => {
    const { address, port } = server.address();
    const link = `http://${address}:${port}`;
    console.log(`Servidor escuchando en ${link}`);
  });


//DIRECTO A LA BUSUQEDA
app.get('/getcurrencies', async (req, res,) => { 
    try {
      await getCurrencies();
      res.send('¡Currencies obtenidas!');

    } catch (error) {
      console.error("Error durante la búsqueda:", error);
      res.status(500).send('Error durante la búsqueda');
}});


// Le pegamos a la descargar del Datos
  app.get('/download', function(req, res){
    const file = `${__dirname}/tools/Datos.xlsx`;
    res.download(file); // Set disposition and send it.
  })   