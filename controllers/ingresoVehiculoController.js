export const registrarIngresoVehiculo = async (req, res) => {
    try {
      const { espacio_id, patente } = req.body;
      
      const espacio = await Espacio.findByPk(espacio_id);
      if (!espacio) {
        return res.status(404).json({ message: 'Espacio no encontrado' });
      }
      if (espacio.estado === 1) {
        return res.status(400).json({ message: 'Espacio ya está ocupado' });
      }
      
      espacio.estado = 1;
      await espacio.save();
      
      const ingreso = await IngresoVehiculo.create({ patente, espacio_id });
      
      res.status(200).json({ message: 'Vehículo ingresado correctamente', ingreso });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el ingreso', error: error.message });
    }
};