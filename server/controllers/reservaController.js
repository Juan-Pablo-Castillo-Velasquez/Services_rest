const fs = require("fs");
const path = require("path");

const rutaJSON = path.join(__dirname, "../../data/Reservas.json");

exports.listarReservas = (req, res) => {

const datosReservas = JSON.parse(fs.readFileSync(rutaJSON,"utf8"))

res.render("Reserva_view",{
    mensaje:"Panel Administrativo de Reservas",
    reservas:datosReservas
})

};


exports.updateReserva = (req,res)=>{

const reservas = JSON.parse(fs.readFileSync(rutaJSON,"utf8"))

const {id_reserva,nombre,email,telefono,habitacion,estado_reserva,notas} = req.body

const reserva = reservas.find(r=>r.id_reserva===id_reserva)

if(reserva){

reserva.cliente.nombre = nombre
reserva.cliente.email = email
reserva.cliente.telefono = telefono

reserva.detalles_estancia.tipo_habitacion = habitacion

reserva.estado_reserva = estado_reserva

reserva.notas = notas

}

fs.writeFileSync(rutaJSON,JSON.stringify(reservas,null,2))

res.redirect("/reservas")

};