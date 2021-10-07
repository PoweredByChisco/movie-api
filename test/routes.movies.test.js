const assert = require('assert'); /* verifies validations en our tests */
const proxyquire = require('proxyquire'); /* when you do a require you can choose a mock instead the real package */
const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', () => {
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
});
