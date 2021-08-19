const express = require('express');
const app = express();
const { config } = require('./config/index')

app.get('/', function (req, res) {
  res.send('Hello world');
}); /* Recibimos la ruta del home, y despues recibe una funcion similar a  */

app.get('/json', function (req, res) {
  res.send({ hello: 'world' });
}); /* Creamos otra ruta para probar */

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port} `);
});
