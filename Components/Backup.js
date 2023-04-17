const fs = require('fs');

// Ruta del archivo de origen
const source = 'C:/Users/Usuario/Desktop/Tasas/usuarios.xlsx';

// Ruta de la carpeta de destino
const destination = 'C:/Users/Usuario/Desktop/Tasas/Components/BackUp/';

// Nombre del archivo de destino con la fecha actual
const now = new Date();
const dateStr = now.toISOString().substring(0, 10);
const filename = `usuario_backup_${dateStr}.xlsx`;

// Leer el contenido del archivo de origen
fs.readFile(source, (err, data) => {
  if (err) throw err;

  // Escribir el contenido en el archivo de destino
  fs.writeFile(destination + filename, data, (err) => {
    if (err) throw err;
    console.log(`El archivo ${source} se ha copiado correctamente a la carpeta ${destination}`);
  });
});