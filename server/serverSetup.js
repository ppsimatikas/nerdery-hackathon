import Hapi from 'hapi';
import config from 'config';
import { getControllers } from './controllers/serverlessControllers';

let server = new Hapi.Server();

function loadControllers() {
    server.route({
        method: 'GET',
        path: '/{params*}',
        config: {
            auth: false
        },
        handler: {
            directory: {
                path: '.build'
            }
        }
    });

    server.route(getControllers());
}

server.connection({
    port: parseInt(process.env.PORT, 10) || config.port,
    host: '0.0.0.0'
});

function addViews() {
    server.views({
        engines: {
            js: require('hapi-react-views')
        },
        relativeTo: __dirname,
        path: 'views'
    });
}

function getPlugins() {
    return [
        require('vision'),
        require('inert')
    ];
}

export function setup(callback) {
    server.register(getPlugins(), (err) => {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

        loadControllers();
        addViews();

        callback(server);
    });
}
