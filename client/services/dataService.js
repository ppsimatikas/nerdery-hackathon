import { get, put } from './requestService';

export function getData(callback) {
    callback(null, 'Hello World');
}

export function setAlert(info, callback) {
    put('https://hgoz9y86d0.execute-api.us-east-1.amazonaws.com/v1', info, callback);
}
