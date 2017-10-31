import * as s3 from 's3';
import webpack from 'webpack';
import config from 'config';

import { exec } from 'child_process';

let apiGatewayEndpoint;

function deployWebSite() {
    const client = s3.createClient();
    const Bucket = config.bucket;

    const uploader = client.uploadDir({
        localDir: ".build/",
        deleteRemoved: true,
        followSymlinks: false,
        s3Params: {
            Bucket
        }
    });

    uploader.on('error', (err) => {
        console.error("Unable to deploy:", err.stack);
        process.exit(1);
    });

    uploader.on('end', () => {
        console.log("deployed");
    });
}

function getAPIGatewayEndpoint(data) {
    const lastEndpoint = data.split(' - ').pop();
    const paths = lastEndpoint.split('/');

    return lastEndpoint.replace(`/${paths.pop()}`, '');
}

const serverlessDeploy = exec('cd ./serverless && serverless deploy');
serverlessDeploy.stdout.on('data', (data) => {
    console.log(data);

    if (data.indexOf('endpoints') === 0) {
        apiGatewayEndpoint = getAPIGatewayEndpoint(data);
    }
});

serverlessDeploy.stderr.on('data',  console.error);

serverlessDeploy.on('close', (code) => {
    if (code) {
        console.error("Unable to deploy:", code);
        process.exit(code);
    }

    console.log(apiGatewayEndpoint);

    const webpackConfig = require('../webpack.config');
    webpackConfig.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'API_URL': JSON.stringify(apiGatewayEndpoint)
        }
    }));
    webpack(webpackConfig, (err) => {
        if (err) {
            console.error("Unable to deploy:", err);
            process.exit(1);
        }

        deployWebSite();
    });
});
