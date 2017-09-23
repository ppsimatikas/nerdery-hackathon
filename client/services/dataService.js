import { get, put } from './requestService';

export function getData(callback) {
    callback(null, 'Hello World');
}

export function setAlert(info, callback) {
    put('https://8wtfsna9kh.execute-api.us-east-1.amazonaws.com/v1', info, callback);
}
