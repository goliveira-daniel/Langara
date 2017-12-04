const Hapi = require('hapi')
// const Inert = require('inert');
const path = require('path');
const vision = require('vision');

const server = new Hapi.Server()

server.connection({
    port: Number(process.argv[2] || 8080),
    host: 'localhost'
})

var options = {
    views: {
        path: path.join(__dirname, '/templates'),
        engines: {
            html: require('handlebars')
        }
    }
};

server.register(vision, function (err) {
    if (err) throw err;
});

server.route({
    method: 'GET',
    path: '/',
    handler: { 
        view: 'index.html'
    }
})

server.views({
    engines: {
        html: require('handlebars')
    },
    path: path.join(__dirname, 'templates')
});

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('server is listening at: ', server.info.uri)
})