import { badImplementation } from 'boom';
import YAML from 'yamljs';
import { values, compact } from 'lodash';
import * as handler from '../../serverless/handler';
import config from 'config';

function toLambdaRequest(http, request) {
    return {
        resource: `/${http.path}`,
        path: `/${http.path}`,
        httpMethod: http.method,
        headers: request.headers,
        queryStringParameters: request.params,
        body: JSON.stringify(request.payload)
    };
}

export const getControllers = () => {
    const functions = YAML.load('./serverless/serverless.yml').functions;

    process.env.table = config.table;

    return compact(values(functions).map((controller) => {
        const http = controller.events[0].http;
        if (http) {
            return {
                method: http.method,
                path: `/api/${http.path}`,
                handler: (request, reply) => {
                    const replace = controller.handler.replace('handler.', '');
                    try {
                        handler[replace](toLambdaRequest(http, request), null, (err, response) => {
                            const message = response.body && JSON.parse(response.body);
                            response.statusCode === 500 ? reply(badImplementation(message)) : reply(message)
                        });
                    } catch (e) {
                        reply(badImplementation(e));
                    }
                }
            };
        }
    }));
};
