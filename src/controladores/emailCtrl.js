import Brevo from '@getbrevo/brevo';

export const enviarCodigoPorCorreo = async (req, res) => {
  const { correoDestino, codigo } = req.body;

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const sendSmtpEmail = {
      sender: { name: 'Soporte Inédita', email: 'danieltesis232004@gmail.com' },
      to: [{ email: correoDestino }],
      subject: 'Código de recuperación',
      htmlContent: `
        <div style="font-family:sans-serif; padding:10px;">
          <h2>Recuperación de contraseña</h2>
          <p>Tu código de verificación es:</p>
          <h3 style="color:#2F86EB;">${codigo}</h3>
          <p>Si no solicitaste este código, ignora este mensaje.</p>
        </div>
      `,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('📨 Correo enviado correctamente:', data.messageId);
    res.status(200).json({ message: 'Correo enviado correctamente' });

  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar correo', error: error.message });
  }
};
