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
    path: '/foo/bar/baz/{filename}',
    handler: { 
        directory: {
            path: path.join(__dirname, 'public')
        }
    }
})

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('server is listening at: ', server.info.uri)
})