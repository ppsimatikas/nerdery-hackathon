'use strict';

module.exports.create = (event, context, callback) => {
    event.body = event.body ? JSON.parse(event.body) : {};
    require('./lambdas/create')(event, context, (err, response) => {
        callback(null, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: err ? 500 : 200,
            body: JSON.stringify(err || response)
        });
    });
};
module.exports.check = require('./lambdas/check');