const Hapi = require('hapi')
const AuthBearer = require('hapi-auth-bearer-token')

const server = new Hapi.Server()

server.connection({
    port: 3000,
    host: 'localhost'
})

const simpleAuth = (token, callback) => {
    // for testing purposes I am just setting the token to secret
    // in a real API you would want to get a value from a database
    if (token === 'secret') {
        return callback(null, true, {token: token})
    }
    return callback(null, false)
}

server.register(AuthBearer, (err) => {
    // this creates a new strategy, api that is using a 'bearer-access-token' scheme
    server.auth.strategy('api', 'bearer-access-token', {
        validateFunc: simpleAuth
    })

    server.route(require('./routes'))

    server.start((err) => {
        if (err) {
            throw err
        }
        console.log('server is listening at: ', server.info.uri)
})
})