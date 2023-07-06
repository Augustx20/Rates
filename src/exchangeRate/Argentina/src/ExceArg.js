const xlsx = require("xlsx")
const Argentina = require('../CaseArg')
const fs = require('fs');
const path = require('path');

    const createExcelFile = async (data) => {
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.aoa_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, "Datos");
      const wbBuf = xlsx.write(wb, { type: 'buffer' });
      return wbBuf;
    };
    
    const saveExcel = async () => {
      try {
        // Bancos
        const [Ar,ArD,ArT] = await Promise.all([
        Argentina.Billete,
        Argentina.Divisa,
        Argentina.TelefonoArg          
        ]);
        //  Oanda
        
    
        const data = [     
          ["", "Bancos", "", "", "", "Oanda"],
          ["Country", "To /From", "Amount", "", "", "To/From", "Amount"],
          ["CR79", "USD CRC", , "", "", "EUR USD", ],
          ["UY77", "USD UYU", , "", "", "EUR COP", ],
          ["CO75 CO76", "USD COP", , "", "", "CNY USD", ],
          ["PE83", "USD PEN", , "", "", "JPY USD", ],
          ["PE83", "EUR PEN", , "", "", "CNY COP", ],
          ["CL70", "USD CLP", , "", "", "JPY COP", ],
          ["CL70", "EUR CLP", ,"", "", "BRL USD", ],
          ["GT79","USD GTQ",,"","","KRW USD",],
          ["HN79","USD HNL",,"","","USD CLP",],
          ["AR71","USD Billete ARS",Ar[1],"","","EUR CLP",],
          ["AR71","EUR Billete ARS",Ar[0],"","","BRL HNL",],
          ["AR71","USD Divisa COMPRA",ArD[0],"","","CNY HNL",],
          ["AR71","USD Divisa VENTA",ArD[1],"","","EUR HNL",],
          ["AR71","USD Billete VENTA",ArT[0],"","","GBP HNL",],
          ["","","","","","JPY HNL",],
          ["","","","","","MXN HNL",],
          ["","","","","","HKD USD",],
          ["","","","","","HKD HNL",]
        ];
    
        const wbBuf = await createExcelFile(data);
    
      // Guardar el archivo de Excel en el disco
      const filename = 'Datos.xlsx';
      const filepath = path.resolve( filename);
      fs.writeFileSync(filepath, wbBuf);
    
      console.log(`El archivo '${filename}' se ha guardado correctamente en '${filepath}'.`);
    }
    catch(err) {
      console.error(`Se produjo un error al guardar el archivo de Excel: ${err}`);
    }}
    
    module.exports = {
      saveExcel,
    }