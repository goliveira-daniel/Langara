const Hapi = require('hapi')
// const Inert = require('inert');
const path = require('path');
const fs = require('fs');
// const vision = require('vision');
// const rot13 = require('rot13-transform');
const joi = require('joi');

const server = new Hapi.Server()

server.connection({
    port: Number(process.argv[2] || 8080),
    host: 'localhost'
})

// var options = {
//     views: {
//         path: path.join(__dirname, '/templates'),
//         engines: {
//             html: require('handlebars')
//         }
//     }
// };

// server.register(vision, function (err) {
//     if (err) throw err;
// });

server.route({
    method: 'POST',
    path: '/login',
    config: {
        handler: (req, reply) => { 
            reply('login successful');
        },
        validate: {
            payload: joi.object({
                isGuest: joi.boolean().required(),
                username: joi.string().when('isGuest', { is: false, then: joi.required() }),
                password: joi.string().alphanum(),
                accessToken: joi.string().alphanum()
            }).options({ allowUnknown: true }).without('password', 'accessToken')
        }
    }    
})

// server.views({
//     engines: {
//         html: require('handlebars')
//     },
//     helpersPath: path.join(__dirname, 'helpers'),
//     path: path.join(__dirname, 'template')
// });

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('server is listening at: ', server.info.uri)
})