let MoviesController = require('../controllers/movies.controller');

async function moviesRoutes(fastify, options) {
    
    fastify.get('/create-table-movies', (req, reply) => MoviesController.createNewTable(fastify, req, reply));
    
    fastify.get('/movies', (req, reply) => MoviesController.getMovies(fastify, req, reply));

    fastify.get('/movies/:id', (req, reply) => MoviesController.getMovie(fastify, req, reply));

    fastify.post('/movies', (req, reply) => MoviesController.addNewMovie(fastify, req, reply));

    fastify.put('/movies/:id', (req, reply) => MoviesController.editMovie(fastify, req, reply));

    fastify.delete('/movies/:id', (req, reply) => MoviesController.removeMovie(fastify, req, reply));
}

module.exports = moviesRoutes;