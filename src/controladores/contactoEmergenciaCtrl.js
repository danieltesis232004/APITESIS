import { sql } from '../bd.js';

export const obtenerContactoEmergenciaPorId = async (req, res) => {
  const { id_contacto_emergencia } = req.params;

  if (!id_contacto_emergencia) {
    return res.status(400).json({ message: "Falta el parámetro 'id_contacto_emergencia'" });
  }

  try {
    const [result] = await sql.query(
      'SELECT * FROM contactos_emergencia WHERE id_contacto_emergencia = ?',
      [id_contacto_emergencia]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Contacto de emergencia no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener contacto de emergencia:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const obtenerContactosPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res.status(400).json({ message: "Falta el parámetro 'id_usuario'" });
  }

  try {
    const [result] = await sql.query(
      'SELECT * FROM contactos_emergencia WHERE id_usuario = ?',
      [id_usuario]
    );

    res.json({ cantidad: result.length, data: result });
  } catch (error) {
    console.error('Error al obtener contactos por usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const crearContactoEmergencia = async (req, res) => {
  try {
    const { id_usuario, tipo_de_contacto, numero } = req.body;

    if (!id_usuario || !tipo_de_contacto || !numero) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO contactos_emergencia (id_usuario, tipo_de_contacto, numero)
       VALUES (?, ?, ?)`,
      [id_usuario, tipo_de_contacto, numero]
    );

    res.status(201).json({
      message: 'Contacto de emergencia creado con éxito',
      id_contacto_emergencia: result.insertId
    });
  } catch (error) {
    console.error('Error al crear contacto de emergencia:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const actualizarContactoEmergencia = async (req, res) => {
  const { id_contacto_emergencia } = req.params;
  const { id_usuario, tipo_de_contacto, numero } = req.body;

  if (!id_contacto_emergencia) {
    return res.status(400).json({ message: "Falta el parámetro 'id_contacto_emergencia'" });
  }

  try {
    const [result] = await sql.query(
      `UPDATE contactos_emergencia
       SET id_usuario = ?, tipo_de_contacto = ?, numero = ?
       WHERE id_contacto_emergencia = ?`,
      [id_usuario, tipo_de_contacto, numero, id_contacto_emergencia]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    res.json({ message: 'Contacto de emergencia actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar contacto de emergencia:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const eliminarContactoEmergencia = async (req, res) => {
  const { id_contacto_emergencia } = req.params;

  if (!id_contacto_emergencia) {
    return res.status(400).json({ message: "Falta el parámetro 'id_contacto_emergencia'" });
  }

  try {
    const [result] = await sql.query(
      'DELETE FROM contactos_emergencia WHERE id_contacto_emergencia = ?',
      [id_contacto_emergencia]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contacto de emergencia no encontrado" });
    }

    res.json({ message: 'Contacto de emergencia eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar contacto de emergencia:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
