const Hapi = require('hapi')
// const Inert = require('inert');
// const path = require('path');
// const vision = require('vision');
const h2o2 = require('h2o2');

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

server.register(h2o2, function (err) {
    if (err) throw err;
});

server.route({
    method: 'GET',
    path: '/proxy',
    handler: { 
        proxy: { 
            host: 'localhost',
            port: 65535
        }
    }
})

// server.views({
//     engines: {
//         html: require('handlebars')
//     },
//     path: path.join(__dirname, 'templates')
// });

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('server is listening at: ', server.info.uri)
})