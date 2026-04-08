const express = require('express');
const path = require('path');
const app = express();
const puerto = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const reservaController = require('./controllers/reservaController');

app.get('/', (req, res) => {
  res.render('Home_view', { titulo: "Bienvenido a la Home" });
});

app.get('/reservas', reservaController.listarReservas);

app.post("/reservas/update", reservaController.updateReserva);

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});