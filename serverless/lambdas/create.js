'use strict';
const AWS = require('aws-sdk');
const config = require('config');
const moment = require('moment-timezone');

AWS.config.update({ region:'us-east-1' });

const { getSchedule } = require('./utils/scheduleUtil');
const { checkIfIsIn } = require('./utils/locationUtil');

const docClient = new AWS.DynamoDB.DocumentClient();

function addYear(day, month) {
    const today = moment.tz('America/Chicago').startOf('day');
    const date = moment.tz('America/Chicago').startOf('day');
    date.date(day);
    date.month(month - 1);

    if (date.isBefore(today)) {
        date.add(1, 'year');
    }

    return date.format('MM/DD/YYYY');
}

module.exports = (event, context, callback) => {
    const TableName = process.env.table || config.table;
    const Item = event.body;

    if (Item.location) {
        docClient.put({TableName, Item}, (err) => {
            if(err) {
                callback(err);
            } else {
                getSchedule((schedule) => {
                    const section = checkIfIsIn(Item, schedule);
                    if (section) {
                        let message = 'You parked at a sweeping zone, you will have to move your car before these dates: ';
                        const dates = schedule.find(s => section.properties.code === s.ward_section_concatenated);
                        message += dates.dates.split(',').map(d => addYear(d, dates.month_number)).join(', ');
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
