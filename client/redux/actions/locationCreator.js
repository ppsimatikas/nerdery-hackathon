export const LOCATION_LOADED = 'LOCATION_LOADED';

export const locationLoaded = (payload) => {
    return {
        type: LOCATION_LOADED,
        payload
    };
};
