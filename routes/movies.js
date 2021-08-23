const express = require('express');
const {
  moviesMock,
} = require('../utils/mocks/movies'); /* Los archivos mocks son archivos de datos falsos */

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  router.get('/', async function (req, res, next) {
    try {
      const movies = await Promise.resolve(moviesMock);

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  }); /* Cuando se le haga un get a la ruta home, la ruta home la definimos con app.user */
}

module.exports = moviesApi;
