'use strict';
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

var docClient = new AWS.DynamoDB.DocumentClient();
var sns = new AWS.SNS();
var TableName = "SweepAlert";
var TopicArn = "arn:aws:sns:us-east-1:491279493326:sweep-alert";
var precincts = require("./precincts.json");
var schedule = require("./sweep-schedule.json");
var moment = require('moment-timezone');
var Terraformer = require('terraformer');

const Message = 'Tomorrow the city of Chicago is going to be sweeping around your car. If you do not want a ticket please move your car.';
const tomorrow = moment.tz('America/Chicago').add(1, 'days');

function checkIfIsIn(item, areas) {
    if (!item.location) {
        return false;
    }

    const { lng, lat } = item.location;
    const loc = new Terraformer.Point([lng, lat]);
    const filteredFeatures = precincts.features.filter(f => {
        return areas.find(a => a.ward_section_concatenated === f.properties.code);
    });
    return filteredFeatures.find(p => loc.within(new Terraformer.Primitive(p)));
}

function getTomorrowsSchedule() {
    const month = tomorrow.month() + 1;
    const date = tomorrow.date();

    return schedule.filter(s => {
        return parseInt(s.month_number) === month && s.dates.split(',').includes(date.toString())
    });
}

function fixPhone(phone) {
    return phone.indexOf('+1') === 0 ? phone : '+1' + phone;
}

function sendSMS(phone, callback) {
    if (phone) {
        sns.publish({
            Message,
            PhoneNumber: fixPhone(phone)
        }, callback);
    }
}

function subscribeEmail(email, callback) {
    sns.subscribe({
        Protocol: 'email',
        TopicArn,
        Endpoint: email
    }, callback);
}

function subscribeSMS(phone, callback) {
    sns.subscribe({
        Protocol: 'sms',
        TopicArn,
        Endpoint: phone
    }, callback);
}

module.exports.create = (event, context, callback) => {
    var Item = event['body-json'];
    if (Item.location) {
        docClient.put({TableName, Item}, (err) => {
            if(err) {
                callback(err);
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                const section = checkIfIsIn(Item, schedule);
                if (section) {
                    console.log(section);
                    let message = 'You parked at a sweeping zone, you will have to move your car before these dates: '
                    const dates = schedule.find(s => section.properties.code === s.ward_section_concatenated);
                    message += dates.dates.split(',').map(d => `${dates.month_number}/${d}`);
                    callback(null, { message });
                } else {
                    callback(null, {message: 'Your car is safe from tickets'});
                }
            }
        });
    } else {
        callback({message: 'please add location'});
    }
};

module.exports.check = (event, context, callback) => {
    const tomorrowsSchedule = getTomorrowsSchedule();

    if (!tomorrowsSchedule.length) {
        callback(null, {message: 'success'});
    }

    docClient.scan({ TableName }, (err, data) => {
        if (err) {
            callback({message: err });
        } else {
            data.Items.map(item => {
                if (checkIfIsIn(item, tomorrowsSchedule)) {
                    sendSMS(item.phone, () => callback(null, {message: 'success'}));
                }
            });
        }
    });
};