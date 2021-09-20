const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers.js')

//body parser
app.use(express.json())

moviesApi(app);
// next
app.use(logErrors)
//next
app.use(errorHandler) /* The middleware of errror always should be next of the middleware moviesApi */

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
