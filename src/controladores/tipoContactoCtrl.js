import { sql } from '../bd.js';

export const obtenerTipoContacto = async (req, res) => {
  try {
    const [result] = await sql.query('SELECT * FROM tipo_contacto');
    res.json({ cantidad: result.length, data: result });
  } catch (error) {
    console.error('Error al obtener tipo_contacto:', error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

export const obtenerTipoContactoPorId = async (req, res) => {
  const { id_contacto } = req.params;

  if (!id_contacto) {
    return res.status(400).json({ message: "Falta el parámetro 'id_contacto'" });
  }

  try {
    const [result] = await sql.query('SELECT * FROM tipo_contacto WHERE id_contacto = ?', [id_contacto]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Tipo de contacto no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener tipo_contacto por ID:', error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};
