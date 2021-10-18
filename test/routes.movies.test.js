const assert = require('assert'); /* verifies validations en our tests */
const proxyquire = require('proxyquire'); /* when you do a require you can choose a mock instead the real package */
const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe.only('routes - movies', () => {
  const route = proxyquire('../routes/movies', {
    '../services/movies':
      MoviesServiceMock /* Injects the mock instead the real service */,
  });

  const request = testServer(route);

  describe('GET /movies', () => {
    it('Should respond with status 200', (done) => {
      request.get('/api/movies').expect(200, done);
    });

    it('Should respond with the list of movies', (done) => {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });

        done();
      });
    });
  });

  describe('GET /movieId', () => {
    it('Should respond with status 200', (done) => {
      request.get('/api/movies/6154a24be3481b485aad1ff9').expect(200, done);
    });

    it('Should respond with the movie requested', (done) => {
      request.get('/api/movies/6154a24be3481b485aad1ff9').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[0],
          message: 'movie retrived',
        });

        done();
      });
    });
  });

  describe('POST /movie', () => {
    it('Should respond with status 201', (done) => {
      request.post('/api/movies').expect(201, done);
    });

    it('Should respond with the movie requested', (done) => {
      request.post('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[0],
          message: 'movie created',
        });

        done();
      });
    });
  });

  describe('PUT /movie', () => {
    it('Should respond with status 200', (done) => {
      request.put('/api/movies/6154a24be3481b485aad1ff9').expect(200, done);
    });

    it('Should respond with the movie requested', (done) => {
      request.put('/api/movies/6154a24be3481b485aad1ff9').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[0],
          message: 'movie updated',
        });

        done();
      });
    });
  });

  describe('DELETE /movie', () => {
    it('Should respond with status 200', (done) => {
      request.delete('/api/movies/6154a24be3481b485aad1ff9').expect(200, done);
    });

    it('Should respond with the movie requested', (done) => {
      request.delete('/api/movies/6154a24be3481b485aad1ff9').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[0],
          message: 'movie deleted',
        });

        done();
      });
    });
  });
});
