import { sql } from '../bd.js';

export const obtenerEventos = async (req, res) => {
  try {
    const [result] = await sql.query('SELECT * FROM eventos');
    res.json({ cantidad: result.length, data: result });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const obtenerEventoPorId = async (req, res) => {
  const { id_eventos } = req.params;

  try {
    const [result] = await sql.query('SELECT * FROM eventos WHERE id_eventos = ?', [id_eventos]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener evento por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const crearEvento = async (req, res) => {
  try {
    const { id_usuario, tipo_de_evento, id_recorrido, fecha, frecuencia_cardiaca } = req.body;

    if (!id_usuario || !tipo_de_evento || !id_recorrido || !fecha) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const [result] = await sql.query(
      `INSERT INTO eventos (id_usuario, tipo_de_evento, id_recorrido, fecha, frecuencia_cardiaca) VALUES (?, ?, ?, ?, ?)`,
      [id_usuario, tipo_de_evento, id_recorrido, fecha, frecuencia_cardiaca || null]
    );

    res.status(201).json({
      message: 'Evento creado correctamente',
      id_eventos: result.insertId
    });
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const actualizarEvento = async (req, res) => {
  const { id_eventos } = req.params;
  const { id_usuario, tipo_de_evento } = req.body;

  try {
    const [result] = await sql.query(
      `UPDATE eventos SET id_usuario = ?, tipo_de_evento = ? WHERE id_eventos = ?`,
      [id_usuario, tipo_de_evento, id_eventos]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const eliminarEvento = async (req, res) => {
  const { id_eventos } = req.params;

  try {
    const [result] = await sql.query('DELETE FROM eventos WHERE id_eventos = ?', [id_eventos]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const crearTiempoReaccion = async (req, res) => {
  try {
    const { 
      id_usuario, 
      id_recorrido, 
      tipo_de_evento, 
      frecuencia_cardiaca, 
      hora_inicio, 
      hora_fin, 
      tiempo_reaccion_ms 
    } = req.body;

    if (!id_usuario || !id_recorrido || !tipo_de_evento || !hora_inicio || !hora_fin || tiempo_reaccion_ms === undefined) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO tiempos_reaccion 
      (id_usuario, id_recorrido, tipo_de_evento, frecuencia_cardiaca, hora_inicio, hora_fin, tiempo_reaccion_ms) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_usuario, id_recorrido, tipo_de_evento, frecuencia_cardiaca || null, hora_inicio, hora_fin, tiempo_reaccion_ms]
    );

    res.status(201).json({
      message: 'Tiempo de reacción registrado exitosamente',
      id_reaccion: result.insertId
    });
  } catch (error) {
    console.error('Error al registrar tiempo de reacción:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};