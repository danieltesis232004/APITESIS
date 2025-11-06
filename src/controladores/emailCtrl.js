import nodemailer from 'nodemailer';

export const enviarCodigoPorCorreo = async (req, res) => {
  const { correoDestino, codigo } = req.body;

  try {
    // 🔹 Configura el transporte SMTP con Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // tu correo Gmail
        pass: process.env.GMAIL_APP_PASSWORD // contraseña de aplicación
      },
    });

    // 🔹 Configura el correo
    const mailOptions = {
      from: `Soporte <${process.env.GMAIL_USER}>`,
      to: correoDestino,
      subject: 'Código de recuperación',
      text: `Tu código de recuperación es: ${codigo}`,
    };

    // 🔹 Envía el correo
    const info = await transporter.sendMail(mailOptions);

    console.log('📨 Correo enviado correctamente:', info.response);
    res.status(200).json({ message: 'Correo enviado correctamente' });

  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar correo', error: error.message });
  }
};
