const express = require('express');
const { getCurrencies } = require('..');
const path = require('path');


const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
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