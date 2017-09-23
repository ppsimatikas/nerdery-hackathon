import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './reducers/loadingReducer';
import data from './reducers/dataReducer';
import modal from './reducers/modalReducer';
import location from './reducers/locationReducer';

export default combineReducers({
    routing: routerReducer,
    data,
    loading,
    modal,
    location
});
