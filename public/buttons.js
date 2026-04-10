let visibles = 5


function mostrarMas(){

const filas = document.querySelectorAll(".fila-reserva")

let contador = 0

filas.forEach(fila=>{

if(fila.style.display==="none" && contador<5){

fila.style.display="table-row"
contador++

}

})

visibles+=contador

if(visibles>=filas.length){

document.getElementById("btnMostrarMas").style.display="none"

}

}




function abrirModal(boton){

const reserva = JSON.parse(boton.dataset.reserva)

document.getElementById("id_reserva").value = reserva.id_reserva

const cuerpo = document.getElementById("detalleContenido")

cuerpo.innerHTML = `

<div class="info-grupo">

<label>Nombre</label>
<input type="text" name="nombre" value="${reserva.cliente.nombre}" required>

<label>Email</label>
<input type="email" name="email" value="${reserva.cliente.email}" required>

<label>Teléfono</label>
<input type="text" name="telefono" value="${reserva.cliente.telefono}">

<label>Tipo habitación</label>

<select name="habitacion">

<option ${reserva.detalles_estancia.tipo_habitacion==="Suite"?"selected":""}>Suite</option>

<option ${reserva.detalles_estancia.tipo_habitacion==="Deluxe"?"selected":""}>Deluxe</option>

<option ${reserva.detalles_estancia.tipo_habitacion==="Junior Suite"?"selected":""}>Junior Suite</option>

<option ${reserva.detalles_estancia.tipo_habitacion==="Individual"?"selected":""}>Individual</option>

</select>


<label>Estado reserva</label>

<select name="estado_reserva">

<option ${reserva.estado_reserva==="Confirmada"?"selected":""}>Confirmada</option>

<option ${reserva.estado_reserva==="Pendiente"?"selected":""}>Pendiente</option>

<option ${reserva.estado_reserva==="Cancelada"?"selected":""}>Cancelada</option>

<option ${reserva.estado_reserva==="Check-in"?"selected":""}>Check-in</option>

</select>


<label>Notas</label>

<textarea name="notas">${reserva.notas || ""}</textarea>

</div>

`

document.getElementById("miModal").style.display="flex"

}


function cerrarModal(){

document.getElementById("miModal").style.display="none"

}


window.onclick = function(event){

  const modal = document.getElementById("miModal");
  const registro = document.getElementById("registroModal");

  if (event.target === modal) cerrarModal();
  if (event.target === registro) cerrarRegistro();

}

function abrirRegistro() {
  document.getElementById("registroModal").style.display = "flex";
}

function cerrarRegistro() {
  document.getElementById("registroModal").style.display = "none";
}


 const params = new URLSearchParams(window.location.search);

  if (params.get("success") === "actualizada") {
    Swal.fire({
      title: "Reserva actualizada",
      icon: "success",
      draggable: true
    });
  }

  if (params.get("success") === "creada") {
    Swal.fire({
      title: "Reserva creada",
      icon: "success",
      draggable: true
    });
  }


  function eliminarReserva(boton) {
  const id = boton.dataset.id;

  Swal.fire({
    title: "¿Eliminar reserva?",
    text: `La reserva ${id} será eliminada permanentemente.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#c0392b",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/reservas/delete/${id}`, { method: "DELETE" })
        .then(() => {
          window.location.href = "/reservas?success=eliminada";
        });
    }
  });
}
