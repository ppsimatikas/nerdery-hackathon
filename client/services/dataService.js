import { put } from './requestService';

const url = process.env.API_URL || '/api';

export function setAlert(info, callback) {
    put(`${url}/create`, info, callback);
}
