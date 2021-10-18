const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

/* Debbugin with express */
const debug = require('debug')('app:app')
debug('Hello Debug')

//body parser
app.use(express.json());

// routes
moviesApi(app);


// catch 404
app.use(notFoundHandler);

/* Errors middleware */
// next
app.use(logErrors);
// next
app.use(wrapErrors);
// next
app.use(
  errorHandler
); /* The middleware of errror always should be next of the middleware moviesApi */

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
