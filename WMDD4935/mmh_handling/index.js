const Hapi = require('hapi')
const Inert = require('inert');
const path = require('path');


const server = new Hapi.Server()

server.connection({
    port: Number(process.argv[2] || 8080),
    host: 'localhost'
})

server.register(Inert, function (err) {
    if (err) throw err;
});

server.route({
    method: 'GET',
    path: '/',
    // handler: (request, reply) => {
    //     return reply('Hello ' + request.params.name)
    // }
    handler: {file: path.join(__dirname, '/index.html')}
})

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('server is listening at: ', server.info.uri)
})