const Hapi = require('hapi');
const MySQL = require('mysql');
const Joi=require('joi');
const Bcrypt=require('bcrypt');

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
connection.connect();
connection.query("SET SESSION wait_timeout = 604800");

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        return reply('hello')
    }
});

server.route({
    method: 'GET',
    path: '/users/{uid}',
    handler: function (request, reply) {
        const uid=request.params.uid;

        connection.query('SELECT uid, username, email FROM users WHERE uid="'+uid+'"',
        function (err, results, fields) {
            if(err) throw error;

            reply(results);
        })
    },
    config:{
        validate:{
            params: {
                uid: Joi.number().integer()
            }
        }
    }
});

server.route({
    method: 'POST',
    path: '/messages',
    handler: function (request, reply) {
        const uid=request.payload.uid;
        connection.query('SELECT * FROM messages WHERE uid_fk="'+uid+'"',
        function (error, results, fields) {
            if(error) throw error;

            reply(results);
        })
    },
    config: {
        validate:{
            payload:{
                uid:Joi.number().integer()
            }
        }
    }
});

server.route({
    method: 'DELETE',
    path:'/message/{uid}/{mid}',
    handler: function (request, reply) {
        const uid=request.params.uid;
        const mid=request.params.mid;
        connection.query('DELETE FROM messages WHERE uid_fk="'+uid+'" and mid="'+mid+'"',
        function (error, result, fields) {
            if(error) throw error;

            if(result.affectedRows){
                reply(true);
            }else{
                reply(false);
            }
        })
    },
    config:{
        validate:{
            params:{
                uid:Joi.number().integer(),
                mid:Joi.number().integer()
            }
        }
    }
});

server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, reply) {
        const username = request.payload.username;
        const email = request.payload.email;
        const password = request.payload.password;

        console.log(username, email, password);
        // reply(username);
        // //Encryption
        // var salt = Bcrypt.genSaltSync();
        // var encryptedPassword = Bcrypt.hashSync(password, salt);
        //
        // //Decrypt
        // var orgPassword = Bcrypt.compareSync(password, encryptedPassword);
        //
        connection.query('INSERT INTO users (username,email,password) VALUES ("' + username + '","' + email + '","' + password + '")',
            function (error, results, fields) {
            if (error) throw error;

            reply(results);
        });
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['access-control-allow', 'true']
        }
    }
});




server.start(function (err) {
    if(err){
        throw err;
    }
    console.log("running");
});