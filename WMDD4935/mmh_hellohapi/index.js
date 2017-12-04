const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({
    port: Number(process.argv[2] || 8080),
    host: 'localhost'
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        return reply('Hello hapi')
    }
})

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('server is listening at: ', server.info.uri)
})