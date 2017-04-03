const Hapi = require('hapi');
const MySQL = require('mysql');

const server = new Hapi.Server();

const connection=MySQL.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});

server.connection({
    host: 'localhost',
    port: 3000
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        return reply('hello')
    }
});

server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
        connection.query('SELECT uid, username, email FROM users',
        function (err, results, fields) {
            if(err) throw error;

            reply(results);
        })
    }
});

connection.connect();

server.start(function (err) {
    if(err){
        throw err;
    }
    console.log("running");
});