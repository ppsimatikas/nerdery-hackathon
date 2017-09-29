import { setAlert } from '../../services/dataService';
import { showModal } from './modalCreator';
import { showLoader, hideLoader } from './loadingCreator';

export const DATA_LOADED = 'DATA_LOADED';

export const justParked = (info, location) => {
    return (dispatch) => {
        localStorage.setItem("email", info.email);
        localStorage.setItem("phone", info.phone);

        if (!location) {
            return dispatch(showModal('Please enable your location.'));
        }

        if (!info.email) {
            return dispatch(showModal('Please add an email.'));
        }

        dispatch(showLoader());
        setAlert({
            email: info.email,
            phone: info.phone,
            location
        }, (err, data) => {
            dispatch(hideLoader());

            if (!err) {
                dispatch(showModal(data.message));
            } else {
                dispatch(showModal('An error occurred'));
            }
        });
    }
}
