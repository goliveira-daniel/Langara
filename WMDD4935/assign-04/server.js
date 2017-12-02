const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({
    port: 3000,
    host: 'localhost'
})

server.route(require('./routes'))

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('server is listening at: ', server.info.uri)
})