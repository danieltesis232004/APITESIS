import { sql } from '../bd.js';

export const actualizarContrasena = async (req, res) => {
  const { id_usuario, contrasena } = req.params;

  if (!id_usuario || !contrasena) {
    return res.status(400).json({ message: "Faltan parámetros: id_usuario o contrasena" });
  }

  try {
    const [result] = await sql.query(
      'UPDATE usuario SET contrasena = ? WHERE id_usuario = ?',
      [contrasena, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
export const verificarCorreo = async (req, res) => {
  const { correo_electronico } = req.params;

  if (!correo_electronico) {
    return res.status(400).json({ message: "Falta el parámetro 'correo_electronico'" });
  }

  try {
    const [result] = await sql.query('SELECT * FROM usuario WHERE correo_electronico = ? LIMIT 1', [correo_electronico]);
    if (result.length > 0) {
      res.json({ existe: true, usuario: result[0] });
    } else {
      res.json({ existe: false });
    }
  } catch (error) {
    console.error('Error al verificar correo:', error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
export const actualizarUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const {
    correo_electronico,
    nombre,
    apellido,
    telefono,
    contrasena,
    estado,
    foto
  } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ message: "Falta el parámetro 'id_usuario'" });
  }

  try {
    const [result] = await sql.query(
      `UPDATE usuario
       SET correo_electronico = ?, nombre = ?, apellido = ?, telefono = ?, contrasena = ?, estado = ?, foto = ?
       WHERE id_usuario = ?`,
      [correo_electronico, nombre, apellido, telefono, contrasena, estado, foto, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [usuarioActualizado] = await sql.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario]);
    res.json({ message: "Usuario actualizado correctamente", usuario: usuarioActualizado[0] });

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};
export const crearUsuario = async (req, res) => {
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
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message
    });
  }
};
export const loginUsuario = async (req, res) => {
  const { correo_electronico, contrasena } = req.params;

  try {
    const [result] = await sql.query(
      'SELECT * FROM usuario WHERE correo_electronico = ? AND contrasena = ? LIMIT 1',
      [correo_electronico, contrasena]
    );

    if (result.length > 0) {
      res.json({ success: true, usuario: result[0] });
    } else {
      res.json({ success: false, message: 'Correo o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res.status(400).json({ message: "Falta el parámetro 'id_usuario'" });
  }

  try {
    const [result] = await sql.query('SELECT * FROM usuario WHERE id_usuario = ? LIMIT 1', [id_usuario]);
    if (result.length > 0) {
      res.json({ existe: true, usuario: result[0] });
    } else {
      res.status(404).json({ existe: false, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
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

