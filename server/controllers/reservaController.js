
const fs = require("fs");
const path = require("path");

const rutaJSON = path.join(__dirname, "../../data/Reservas.json");

exports.listarReservas = (req, res) => {
  const datosReservas = JSON.parse(fs.readFileSync(rutaJSON, "utf8"));
  res.render("Reserva_view", {
    mensaje: "Panel Administrativo de Reservas",
    reservas: datosReservas
  });
};

exports.updateReserva = (req, res) => {
  const reservas = JSON.parse(fs.readFileSync(rutaJSON, "utf8"));

  const { id_reserva, nombre, email, telefono, habitacion, estado_reserva, notas } = req.body;

  const reserva = reservas.find(r => r.id_reserva === id_reserva);

  if (reserva) {
    reserva.cliente.nombre = nombre;
    reserva.cliente.email = email;
    reserva.cliente.telefono = telefono;
    reserva.detalles_estancia.tipo_habitacion = habitacion;
    reserva.estado_reserva = estado_reserva;
    reserva.notas = notas;
  }

  fs.writeFileSync(rutaJSON, JSON.stringify(reservas, null, 2));
  res.redirect("/reservas?success=actualizada");
};

exports.createReserva = (req, res) => {
  const reservas = JSON.parse(fs.readFileSync(rutaJSON, "utf8"));

  const {
    nombre, email, telefono,
    habitacion, num_huespedes, fecha_entrada, fecha_salida, noches,
    total, metodo_pago, estado_pago,
    estado_reserva, notas
  } = req.body;

  const ultimoId = reservas.length > 0
    ? parseInt(reservas[reservas.length - 1].id_reserva.replace("RES-", ""))
    : 1000;

  const nuevaReserva = {
    id_reserva: `RES-${ultimoId + 1}`,
    cliente: { nombre, email, telefono },
    detalles_estancia: {
      tipo_habitacion: habitacion,
      num_huespedes: parseInt(num_huespedes),
      fecha_entrada,
      fecha_salida,
      noches: parseInt(noches)
    },
    pago: {
      total: parseFloat(total),
      metodo: metodo_pago,
      estado_pago
    },
    estado_reserva,
    notas: notas || "Ninguna"
  };

  reservas.push(nuevaReserva);
  fs.writeFileSync(rutaJSON, JSON.stringify(reservas, null, 2));
  res.redirect("/reservas");
};