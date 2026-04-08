const app = require("../api/index");

const puerto = 3000;

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});