const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }

  async createMovie() {
    const createMovieId = await Promise.resolve(moviesMock[0]);
    return createMovieId || {};
  }

  async updateMovie() {
    const updateMovieId = await Promise.resolve(moviesMock[0]);
    return updateMovieId || {};
  }

  async deleteMovie() {
    const deleteMovieId = await Promise.resolve(moviesMock[0]);
    return deleteMovieId || {};
  }

  async patchMovie() {
    const patchMovieId = await Promise.resolve(moviesMock[0].id);
    return patchMovieId || {};
  }
}

module.exports = MoviesService;
