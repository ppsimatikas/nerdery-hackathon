import * as AWS from 'aws-sdk';
import * as fs from 'fs';

const Bucket = 'sweep-alert.com';

const s3 = new AWS.S3();

const HTMLContentType = 'text/html';
const JSContentType = 'application/javascript';
const CSSContentType = 'text/css';
const PNGContentType = 'image/png';

Promise.all([
    uploadFile('index.html', HTMLContentType),
    uploadFile('app.bundle.js', JSContentType),
    uploadFile('app.css', CSSContentType)
]).catch(() => process.exit(1));

function uploadFile(Key, ContentType) {
    return new Promise((resolve, reject) => {
        const Body = fs.readFileSync('./.build/' + Key).toString();
        s3.upload({ Bucket, Key, Body, ContentType }, (err, data) => {
            if (err) {
                console.error(`Unable to upload file ${Key}.`);
                reject(err);
            } else {
                console.log(`File ${Key} uploaded.`);
                resolve(data);
            }
        });
    });
}