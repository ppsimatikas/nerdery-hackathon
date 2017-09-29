export const LOCATION_LOADED = 'LOCATION_LOADED';
import { showModal } from './modalCreator';
import { hideLoader } from './loadingCreator';

export const locationLoaded = (position) => {
    return (dispatch) => {
        dispatch(hideLoader());

        if (position) {
            dispatch({
                type: LOCATION_LOADED,
                payload: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        } else {
            dispatch(showModal('Please enable your location.'));
        }
    }
};
