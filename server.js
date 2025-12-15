/** Moment 2.2 för kursen DT193G, Fullstack utveckling med ramverk */
require('dotenv').config();
let fastify = require('fastify')({
    logger: true
});
let mysql = require('@fastify/mysql');

let port = process.env.PORT || 3000;

// Anslutningskonfigurationer till databas
fastify.register(mysql, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

fastify.get('/', (req, reply) => {
    reply.send({message: 'Välkommen till DT193G'});
});


// Starta servern
fastify.listen({port: port}, (err, address) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    } else {
        console.log('Server körs på port: ' + port);
        console.log(address);
    }
});