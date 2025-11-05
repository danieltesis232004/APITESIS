import { sql } from '../bd.js';

export const obtenerTiposDeEventos = async (req, res) => {
  try {
    const [result] = await sql.query('SELECT * FROM tipo_de_eventos');
    res.json({ cantidad: result.length, data: result });
  } catch (error) {
    console.error('Error al obtener tipos de eventos:', error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

export const obtenerTipoDeEventoPorId = async (req, res) => {
  const { id_tipo } = req.params;

  if (!id_tipo) {
    return res.status(400).json({ message: "Falta el parámetro 'id_tipo'" });
  }

  try {
    const [result] = await sql.query(
      'SELECT * FROM tipo_de_eventos WHERE id_tipo = ?',
      [id_tipo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Tipo de evento no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener tipo de evento por ID:', error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};
