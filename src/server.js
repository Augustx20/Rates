const express = require('express');
const path = require('path');
const { getCurrencies } = require('..');
const xl = require(`excel4node`);

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
  });

  const server = app.listen(3000, '127.0.0.1', () => {
    const { address, port } = server.address();
    const link = `http://${address}:${port}`;
    console.log(`Servidor escuchando en ${link}`);
  });

app.get('/getcurrencies', async (req, res,) => {
    try {
      await getCurrencies();
      res.send('¡Currencies obtenidas!');

    } catch (error) {
      console.error("Error durante la búsqueda:", error);
      res.status(500).send('Error durante la búsqueda');
    }

  });

  app.get('/download', function(req, res){
    const file = `${__dirname}/tools/Datos.xlsx`;
    res.download(file); // Set disposition and send it.
  })   