import { get, del } from './requestService';

export function getData(callback) {
    callback(null, {
        data: 'Hello World'
    });
}
