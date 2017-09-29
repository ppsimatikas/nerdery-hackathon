var AWS = require('aws-sdk');
var mailer = require('nodemailer');

AWS.config.update({region: 'us-east-1'});

const Message = 'Tomorrow the city of Chicago is going to be sweeping around your car. It would be a great idea to move your car.';

function fixPhone(phone) {
    return phone.indexOf('+1') === 0 ? phone : '+1' + phone;
}

function sendSMS(phone) {
    return new Promise((resolve) => {
        if (phone) {
            const sns = new AWS.SNS();
            sns.publish({
                Message,
                PhoneNumber: fixPhone(phone)
            }, resolve);
        } else {
            resolve();
        }
    });
}

function sendEmail(email) {
    return new Promise((resolve) => {
        if (email) {
            const smtpTransport = mailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'sweepalertteam@gmail.com',
                    pass: 'testtest1'
                }
            });

            smtpTransport.sendMail({
                from: 'alert@sweep-alert.com',
                to: email,
                subject: 'Sweep Alert !',
                text: Message
            }, () => {
                smtpTransport.close();
                resolve();
            });
        } else {
            resolve();
        }
    });
}

module.exports.notify = (person) => {
    return Promise.all([
        sendSMS(person.phone),
        sendEmail(person.email)
    ]);
}