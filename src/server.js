const express = require('express');
const { getCurrencies } = require('./index.js');
const path = require('path');


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

  app.get('/getcurrencies', async (req, res) => {
    try {
      await getCurrencies();
      res.send('¡Currencies obtenidas!');
    } catch (error) {
      console.error("Error durante la búsqueda:", error);
      res.status(500).send('Error durante la búsqueda');
    }
  });