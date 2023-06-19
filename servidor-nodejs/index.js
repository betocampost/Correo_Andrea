const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configura el transporte de correo con Nodemailer
const transporter = nodemailer
.createTransport({
  host: "smtp.gmail.com",
  post: 587,
  auth: {
    user: "royalasadoa@gmail.com",
    pass: "wodzejhabesiopwh",
  }
});

// Define la ruta POST para recibir los datos del formulario de reservas
app.post('/reservas', (req, res) => {
  const { nombre, telefono, email, fecha, hora } = req.body;

  // Crea el contenido del correo
  const mailOptions = {
    from: 'royalasadoa@gmail.com',
    to: email,
    subject: 'Confirmación de reservación',
    text: `¡Gracias por reservar con nosotros, ${nombre}! Tu reserva está confirmada para el día ${fecha} a las ${hora}.`
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al enviar el correo electrónico' });
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Correo enviado correctamente' });
    }
  });
});

// Define la ruta POST para recibir los comentarios del formulario de contacto
app.post('/enviar-correo', (req, res) => {
  const comentario = req.body.comentario;

  const mailOptions = {
    from: 'royalasadoa@gmail.com',
    to: 'al292578@edu.uaa.mx',
    subject: 'Formulario de contacto',
    text: `Se ha recibido un nuevo comentario: ${comentario}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Correo enviado correctamente' });
    }
  });
});

// Inicia el servidornpm
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
