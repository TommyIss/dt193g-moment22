/** Moment 2.2 för kursen DT193G, Fullstack utveckling med ramverk */
let fastify = require('fastify')({
    logger: true
});
let moviesRoutes = require('./routes/movies.routes');
let mysql = require('@fastify/mysql');
require('dotenv').config();
let cors = require('@fastify/cors');
let port = process.env.PORT || 3000;
let host = '0.0.0.0';

// Anslutningskonfigurationer till databas
fastify.register(mysql, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    promise: true,
    multipleStatements: true
});

fastify.register(cors, {
    origin: '*'
})

// Routes
fastify.get('/', (req, reply) => {
    reply.send({ message: 'Välkommen till DT193G, Moment2.2' });
});

fastify.register(moviesRoutes);


// Starta servern
fastify.listen({ port: port, host: host }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    } else {
        console.log('Server körs på adress: ' + address);
    }
});