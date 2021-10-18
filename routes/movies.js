const express = require('express');
const MoviesService = require('../services/movies');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONS,
} = require('../utils/time');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query; /* Un metodo del response */

    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  }); /* Cuando se le haga un get a la ruta home, la ruta home la definimos con app.user */

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONS);

      const { movieId } = req.params;

      try {
        const movies = await moviesService.getMovie({ movieId });

        res.status(200).json({
          data: movies,
          message: 'movie retrived',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async function (req, res, next) {
      const { body: movie } = req;
      try {
        const createMovieId = await moviesService.createMovie({ movie });

        res.status(201).json({
          data: createMovieId,
          message: 'movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler(
      { movieId: movieIdSchema },
      'params'
    ) /* you validate both */,
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });

        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });

        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  ); /* Este metodo parchea solo el atributo id de una pelicula */

  /*  router.patch('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const patchMovieId = await moviesService.patchMovie({ movieId, movie });

      res.status(200).json({
        data: patchMovieId,
        message: 'movie patched',
      });
    } catch (error) {
      next(error);
    }
  }); */
}

module.exports = moviesApi;
