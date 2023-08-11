
    // Agrega un evento de clic al botón
  
    document.getElementById('executeButton').addEventListener('click', async () => {
        try {
          await fetch('/getcurrencies');  // Hace una solicitud GET a la ruta /getcurrencies en el servidor
          alert('getCurrencies ejecutado');
          } catch (error) {
          console.error("Error durante la ejecución de getCurrencies:", error);
        }
      });
      document.getElementById('AttachmentExcel').addEventListener('click', async () => {
        try {
          await fetch('/download');  // Hace una solicitud GET a la ruta /getcurrencies en el servidor
          alert('Download Excel...');
        } catch (error) {
          console.error("something went wrong...", error);
        }
      });