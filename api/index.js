const express = require("express");
const path = require("path");

const app = express();

// Funciona tanto en local como en Vercel
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reservaController = require("../server/controllers/reservaController");

app.get("/", (req, res) => {
  res.render("Home_view", { titulo: "Bienvenido a la Home" });
});

app.get("/reservas", reservaController.listarReservas);

app.post("/reservas/update", reservaController.updateReserva);

module.exports = app;