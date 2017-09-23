import { LOCATION_LOADED } from '../actions/locationCreator';

const initialState = false;

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case LOCATION_LOADED:
            return action.payload;
        default:
            return state;
    }
};
