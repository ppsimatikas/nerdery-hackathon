import { getData } from '../../services/dataService';
import { showLoader, hideLoader } from './loadingCreator';

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
