'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region:'us-east-1' });

const { getTomorrowsSchedule } = require('./utils/scheduleUtil');
const { checkIfIsIn } = require('./utils/locationUtil');
const { notify } = require('./utils/notificationUtil');

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (event, context, callback) => {
    const TableName = process.env.table;
    const success = { message: 'success' };

    getTomorrowsSchedule((tomorrowsSchedule) => {
        if (!tomorrowsSchedule.length) {
            return callback(null, success);
        }

        docClient.scan({ TableName }, (err, data) => {
            if (err) {
                callback({ message: err });
            } else {
                const notifyUsers = data.Items.filter((user) => checkIfIsIn(user, tomorrowsSchedule));

                if (!notifyUsers.length) {
                    return callback(null, success);
                }

                Promise.all(notifyUsers.map(notify)).then(() => callback(null, success));
            }
        });
    });
};
