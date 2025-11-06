import nodemailer from 'nodemailer';

export const enviarCodigoPorCorreo = async (req, res) => {
  const { correoDestino, codigo } = req.body; 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'notificacionesti2025@gmail.com',
      pass: 'immp umzm xpdz frkl',
    },
  });

  const mailOptions = {
    from: 'Soporte <notificacionesti2025@gmail.com>',
    to: correoDestino,
    subject: 'Código de recuperación',
    text: `Tu código de recuperación es: ${codigo}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo: 1', error);
    res.status(500).json({ message: 'Error al enviar correo' });
  }
};
