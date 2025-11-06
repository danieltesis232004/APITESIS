import nodemailer from 'nodemailer';

export const enviarCodigoPorCorreo = async (req, res) => {
  const { correoDestino, codigo } = req.body;

  try {
    // ✅ Configurar el transporte SMTP con Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // usar STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Configurar el correo
    const mailOptions = {
      from: `Soporte Inédita <${process.env.SMTP_USER}>`,
      to: correoDestino,
      subject: 'Código de recuperación de contraseña',
      text: `Tu código de recuperación es: ${codigo}`,
      html: `
        <div style="font-family:sans-serif; padding:10px;">
          <h2>Recuperación de contraseña</h2>
          <p>Tu código de verificación es:</p>
          <h3 style="color:#2F86EB;">${codigo}</h3>
          <p>Si no solicitaste este código, ignora este mensaje.</p>
        </div>
      `,
    };

    // ✅ Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log('📨 Correo enviado correctamente:', info.messageId);
    res.status(200).json({ message: 'Correo enviado correctamente' });

  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar correo', error: error.message });
  }
};
