 export const controller = {}


 controller.error = (req, res) => {
    return res.status(404).json({
      status: 'error',
      msg: 'no encontrado desde la ruta de error',
      data: {},
    });
  }