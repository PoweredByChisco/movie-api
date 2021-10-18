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
const cors = require('cors')

/* Debbugin with express */
const debug = require('debug')('app:app')
debug('Hello Debug')

/* only a cors example */
app.use(cors())
app.get("/products/", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

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
