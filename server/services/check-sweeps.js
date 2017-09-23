var AWS = require('aws-sdk');

AWS.config.update({region:'us-east-1'});


var docClient = new AWS.DynamoDB.DocumentClient();
var sns = new AWS.SNS();
var TableName = "SweepAlert";
var precincts = require("../precincts.json");
var schedule = require("../sweep-schedule.json");
var moment = require('moment-timezone');
var Terraformer = require('terraformer');

const Message = 'Tomorrow the city of Chicago is going to be sweeping around your car. If you do not want a ticket please move your car';

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

function sendSMS(phone) {
    if (phone) {
        sns.publish({
            Message,
            PhoneNumber: fixPhone(phone)
        }, console.log);
    }
}

exports.handler = (event, context, callback) => {
    const tomorrowsSchedule = getTomorrowsSchedule();

    if (!tomorrowsSchedule.length) {
        callback(null, 'success');
    }

    docClient.scan({ TableName }, (err, data) => {
        if (err) {
            callback(err);
        } else {
            data.Items.map(item => {
                if (checkIfIsIn(item, tomorrowsSchedule)) {
                    sendSMS(item.phone);
                }
            });

            callback(null, 'success');
        }
    });
};

