let MovieModel = require('../models/movies.model');

async function createNewTable(fastify, req, reply) {
    try {
        let rows = await MovieModel.createTable(fastify.mysql);

        return reply.code(201).send({ message: 'Tabellen Movies har skapats!' });
    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt serverfel uppstod',
            error: err.message
        });
    }
}
async function getMovies(fastify, req, reply) {
    try {
        let rows = await MovieModel.getAllMovies(fastify.mysql);

        if (!rows || rows.length === 0) {
            reply.code(404).send({ message: 'Inga filmer i databasen' });
        }

        reply.code(200).send({ movies: rows });
    }   catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt serverfel uppstod',
            error: err.message
        });
    }
}

async function getMovie(fastify, req, reply) {
    try {
        let row = await MovieModel.getMovieById(fastify.mysql, req.params.id);

        if (!row) {
            return reply.code(404).send({ message: 'Filmen hittades inte' });
        }

        return reply.code(200).send({ movie: row });
    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt serverfel uppstod',
            error: err.message
        });
    }


}

async function addNewMovie(fastify, req, reply) {
    try {
        let { title, release_year, duration, watched } = req.body;

        let error = {
            message: '',
            details: '',
            http_response: {

            }
        }

        if (!title) {
            error.message = 'Titeln saknas';
            error.details = 'Du måste fylla filmens titel';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        } else if (!release_year) {
            error.message = 'Utgivningsår saknas';
            error.details = 'Du måste fylla utgivningsår';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        } else if (!duration) {
            error.message = 'Duration saknas';
            error.details = 'Du måste fylla duration';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });

        } else if (watched === undefined) {
            error.message = 'Visningstatus saknas';
            error.details = 'Du måste fylla om du tittade på filmen eller inte';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        }

        let movie = await MovieModel.addMovie(fastify.mysql, req.body);


        return reply.code(201).send({
            message: 'Filmen är tillagd',
            movie: movie
        });
    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt serverfel uppstod',
            error: err.message
        });
    }
}

async function editMovie(fastify, req, reply) {
    try {
        let { title, release_year, duration, watched } = req.body;
        let id = req.params.id;

        let error = {
            message: '',
            details: '',
            http_response: {

            }
        }

        if (!title) {
            error.message = 'Titeln saknas';
            error.details = 'Du måste fylla filmens titel';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        } else if (!release_year) {
            error.message = 'Utgivningsår saknas';
            error.details = 'Du måste fylla utgivningsår';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        } else if (!duration) {
            error.message = 'Duration saknas';
            error.details = 'Du måste fylla duration';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });

        } else if (watched === undefined) {
            error.message = 'Visningstatus saknas';
            error.details = 'Du måste fylla om du tittade på filmen eller inte';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        }

        let result = await MovieModel.updateMovie(fastify.mysql, id, req.body);

        if (result.affectedRows === 0) {
            return reply.code(404).send({ message: 'Ingen film hittades med det ID:et' });
        }

        return reply.code(200).send({ message: `Film med id: ${id} har uppdaterats` });
    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt serverfel uppstod',
            error: err.message
        });
    }

}

async function removeMovie(fastify, req, reply) {

    try {
        let id = req.params.id;

        let result = await MovieModel.deleteMovie(fastify.mysql, id);

        if (result.affectedRows === 0) {
            return reply.code(404).send({ message: 'Ingen film hittades med det ID:et' });
        }

        return reply.code(200).send({ message: `Filmen med id: ${id} har raderats` });

    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt serverfel uppstod',
            error: err.message
        });
    }

}

module.exports = { createNewTable, getMovies, getMovie, addNewMovie, editMovie, removeMovie };