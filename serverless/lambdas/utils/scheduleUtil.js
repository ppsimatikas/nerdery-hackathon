const fallbackSchedule = require('./sweep-schedule.json');
const request = require('request');
const moment = require('moment-timezone');

function getSchedule(callback) {
    request.get({
        url: 'https://data.cityofchicago.org/resource/6qug-dskz.json',
        json: true
    }, (err, response) => callback(err ? fallbackSchedule : response.body));
}

module.exports.getSchedule = getSchedule;

module.exports.getTomorrowsSchedule = (callback) => {
    const tomorrow = moment.tz('America/Chicago').add(1, 'days');
    const month = tomorrow.month() + 1;
    const date = tomorrow.date();

    getSchedule((schedule) => {
        callback(schedule.filter(s => {
            return parseInt(s.month_number) === month && s.dates.split(',').includes(date.toString())
        }));
    });
}