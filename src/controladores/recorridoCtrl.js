import { sql } from '../bd.js';

export const obtenerRecorridos = async (req, res) => {
  try {
    const [result] = await sql.query('SELECT * FROM recorridos');
    res.json({ cantidad: result.length, data: result });
  } catch (error) {
    console.error('Error al obtener recorridos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const obtenerRecorridoPorId = async (req, res) => {
  const { id_recorrido } = req.params;

  try {
    const [result] = await sql.query('SELECT * FROM recorridos WHERE id_recorrido = ?', [id_recorrido]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Recorrido no encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener recorrido por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const crearRecorrido = async (req, res) => {
  try {
    const { id_usuario, punto_partida, punto_destino, tiempo, distancia, estado } = req.body;

    if (!id_usuario) {
      return res.status(400).json({ message: "Falta el campo obligatorio: id_usuario" });
    }

    const [result] = await sql.query(
      `INSERT INTO recorridos (id_usuario, punto_partida, punto_destino, tiempo, distancia, estado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_usuario, punto_partida, punto_destino, tiempo, distancia, estado || 'en_progreso']
    );

    res.status(201).json({
      message: 'Recorrido creado correctamente',
      id_recorrido: result.insertId
    });
  } catch (error) {
    console.error('Error al crear recorrido:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const actualizarRecorrido = async (req, res) => {
  const { id_recorrido } = req.params;
  const { punto_partida, punto_destino, tiempo, distancia, estado } = req.body;

  try {
    const [result] = await sql.query(
      `UPDATE recorridos
       SET punto_partida = ?, punto_destino = ?, tiempo = ?, distancia = ?, estado = ?
       WHERE id_recorrido = ?`,
      [punto_partida, punto_destino, tiempo, distancia, estado, id_recorrido]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Recorrido no encontrado' });
    }

    res.json({ message: 'Recorrido actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar recorrido:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const eliminarRecorrido = async (req, res) => {
  const { id_recorrido } = req.params;

  try {
    const [result] = await sql.query('DELETE FROM recorridos WHERE id_recorrido = ?', [id_recorrido]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Recorrido no encontrado' });
    }

    res.json({ message: 'Recorrido eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar recorrido:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
