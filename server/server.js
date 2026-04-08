const express = require('express');
const path = require('path'); // Módulo nativo para manejar rutas
const app = express();
const puerto = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../src/views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('Home_view', { titulo: "Bienvenido a la Home" });
});

app.get('/api/reservas', (req, res) => {
   
    res.render('Reserva_view', { mensaje: "Vista de reservas" });
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
