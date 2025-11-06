import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const enviarCodigoPorCorreo = async (req, res) => {
  const { correoDestino, codigo } = req.body;

  try {
    // 🔹 Envía el correo
    const data = await resend.emails.send({
      from: 'Soporte <notificacionesti2025@gmail.com>', 
      to: correoDestino,
      subject: 'Código de recuperación',
      text: `Tu código de recuperación es: ${codigo}`,
    });

    console.log('Correo enviado:', data);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar correo' });
  }
};
