import { getData, setAlert } from '../../services/dataService';
import { showLoader, hideLoader } from './loadingCreator';
import { showModal } from './modalCreator';

export const DATA_LOADED = 'DATA_LOADED';

export const dataLoaded = (activity) => {
    return {
        type: DATA_LOADED,
        payload: activity
    }
};

export const loadData = () => {
    return (dispatch) => {
        dispatch(showLoader());
        return getData((err, data) => {
            if (!err) {
                dispatch(dataLoaded(data));
            } else {
                throw(err);
            }
            dispatch(hideLoader());
        });
    }
}

export const justParked = (info, location) => {
    return (dispatch) => {
        localStorage.setItem("email", info.email)
        localStorage.setItem("phone", info.phone)
        return setAlert({
            email: info.email,
            phone: info.phone,
            location
        }, (err, data) => {
            if (!err) {
                dispatch(showModal(data.message));
            } else {
                dispatch(showModal('An error occurred'));
            }
        });
    }
}
