const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Configurar encabezados CORS para habilitar pruebas locales (e.g. Angular en puerto 4200 llamando a netlify local en puerto 8888 o 9000)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Responder de inmediato a peticiones preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Solo permitir peticiones POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido. Solo se acepta POST.' })
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Todos los campos (nombre, correo, mensaje) son requeridos.' })
      };
    }

    // Configuración del transporte SMTP utilizando variables de entorno de Netlify
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io', // Valor por defecto para pruebas
      port: parseInt(process.env.SMTP_PORT || '2525'),
      secure: process.env.SMTP_SECURE === 'true', // true para puerto 465, false para otros
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Configurar cuerpo del correo electrónico
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.TO_EMAIL || 'mateo.dev.test@gmail.com', // Correo destinatario configurado
      replyTo: email,
      subject: `📬 Portafolio: Nuevo mensaje de ${name}`,
      text: `Has recibido un nuevo mensaje desde tu portafolio:\n\nNombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px;">
          <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
          <p><strong>Remitente:</strong> ${name} (&lt;${email}&gt;)</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; margin-top: 15px; font-family: monospace;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
        </div>
      `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Mensaje enviado exitosamente mediante SMTP.' })
    };
  } catch (error) {
    console.error('Error al enviar correo mediante SMTP:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Fallo al procesar o enviar el mensaje: ' + error.message })
    };
  }
};
