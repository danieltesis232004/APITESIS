import { sql } from '../bd.js';

export const obetenerdatosA = async (req, res) => {
 const { correo_electronico, contrasena} = req.params;

  try {
    const [result] = await sql.query(
      'SELECT * FROM usuario WHERE correo_electronico = ? AND contrasena = ? LIMIT 1',
      [correo_electronico, contrasena]
    );

    if (result.length > 0) {
      res.json({
        success: true,
        usuario: result[0]
      });
    } else {
      res.json({
        success: false,
        message: 'Usuario o clave incorrectos'
      });
    }

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message
    });
  }
};
export const obetenerdatos = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM usuario');
        res.json({ cant: result.length, data: result });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return res.status(500).json({
            message: "Error en el servidor",
            error: {
                message: error.message,
                code: error.code,
                stack: error.stack
            }
        });
    }
};
export const postUsuarios = async (req, res) => {
  try {
    const {
      correo_electronico,
      nombre,
      apellido,
      telefono,
      contrasena,
      estado,
      foto,
      fecha_de_registro
    } = req.body;

    // Validación básica de campos obligatorios
    if (!correo_electronico || !nombre || !apellido || !contrasena) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO usuario 
      (correo_electronico, nombre, apellido, telefono, contrasena, estado, foto, fecha_de_registro)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        correo_electronico,
        nombre,
        apellido,
        telefono || null,
        contrasena,
        estado || 'activo',
        foto || null,
        fecha_de_registro || new Date()
      ]
    );

    res.status(201).json({
      id_usuario: result.insertId,
      message: "Usuario registrado con éxito"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: {
        message: error.message,
        code: error.code
      }
    });
  }
};

