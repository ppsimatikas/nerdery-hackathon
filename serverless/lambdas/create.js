'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region:'us-east-1' });

const { getSchedule } = require('./utils/scheduleUtil');
const { checkIfIsIn } = require('./utils/locationUtil');

const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'SweepAlert';

module.exports = (event, context, callback) => {
    const Item = event['body-json'];
    if (Item && Item.location) {
        docClient.put({TableName, Item}, (err) => {
            if(err) {
                callback(err);
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                getSchedule((schedule) => {
                    const section = checkIfIsIn(Item, schedule);
                    if (section) {
                        let message = 'You parked at a sweeping zone, you will have to move your car before these dates: ';
                        const dates = schedule.find(s => section.properties.code === s.ward_section_concatenated);
                        message += dates.dates.split(',').map(d => `${dates.month_number}/${d}`);
                        message += '.';

                        callback(null, { message });
                    } else {
                        callback(null, { message: 'Your car is safe from street sweeping tickets.' });
                    }
                });
            }
        });
    } else {
        callback({message: 'Please add location.'});
    }
};
