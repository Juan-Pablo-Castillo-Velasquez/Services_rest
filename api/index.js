const express = require("express");
const path = require("path");

const app = express();

const basePath = process.cwd(); // importante en vercel

app.set("view engine", "ejs");
app.set("views", path.join(basePath, "src/views"));

app.use(express.static(path.join(basePath, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reservaController = require("../server/controllers/reservaController");

app.get("/", (req, res) => {
  res.render("Home_view", { titulo: "Bienvenido a la Home" });
});

app.get("/reservas", reservaController.listarReservas);

app.post("/reservas/update", reservaController.updateReserva);

module.exports = app;