import Brevo from '@getbrevo/brevo';

export const enviarCodigoPorCorreo = async (req, res) => {
  const { correoDestino, codigo } = req.body;

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const sendSmtpEmail = {
      sender: { name: 'Soporte Inédita', email: 'soportetecnicoaplicacion2025@gmail.com' },
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

export const enviarAlertaSomnolencia = async (req, res) => {
  const { correoDestino, nombreConductor, latitud, longitud, fecha, hora } = req.body;

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    // Generar enlace directo a Google Maps con las coordenadas recibidas
    const enlaceGoogleMaps = (latitud && longitud) 
      ? `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`
      : '#';

    const sendSmtpEmail = {
      sender: { name: 'Alerta Somnolencia App', email: 'soportetecnicoaplicacion2025@gmail.com' },
      to: [{ email: correoDestino }],
      subject: `🚨 ALERTA CRÍTICA: Somnolencia detectada en ${nombreConductor || 'Conductor'}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #E53E3E; border-radius: 8px; max-width: 500px; margin: auto;">
          <h2 style="color: #E53E3E; text-align: center; margin-top: 0;">🚨 ALERTA DE SOMNOLENCIA</h2>
          <p style="font-size: 15px; color: #2D3748;">
            Se ha detectado un estado crítico de somnolencia durante la conducción. A continuación los detalles del evento:
          </p>

          <div style="background-color: #FFF5F5; padding: 15px; border-left: 4px solid #E53E3E; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 5px 0;"><strong>Conductor:</strong> ${nombreConductor || 'No especificado'}</p>
            <p style="margin: 5px 0;"><strong>Fecha:</strong> ${fecha || 'No disponible'}</p>
            <p style="margin: 5px 0;"><strong>Hora:</strong> ${hora || 'No disponible'}</p>
            <p style="margin: 5px 0;"><strong>Coordenadas:</strong> ${latitud || '--'}, ${longitud || '--'}</p>
          </div>

          ${(latitud && longitud) ? `
            <div style="text-align: center; margin-top: 25px;">
              <a href="${enlaceGoogleMaps}" target="_blank" style="background-color: #E53E3E; color: white; padding: 12px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">
                📍 Ver Ubicación en Google Maps
              </a>
            </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #E2E8F0; margin-top: 30px;" />
          <p style="font-size: 11px; color: #A0AEC0; text-align: center;">
            Mensaje automático generado por el Sistema de Telemetría y Monitoreo de Somnolencia.
          </p>
        </div>
      `,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('🚨 Alerta por correo enviada exitosamente:', data.messageId);
    res.status(200).json({ message: 'Alerta de somnolencia enviada por correo', messageId: data.messageId });

  } catch (error) {
    console.error('❌ Error al enviar alerta por correo:', error);
    res.status(500).json({ message: 'Error al enviar alerta por correo', error: error.message });
  }
};