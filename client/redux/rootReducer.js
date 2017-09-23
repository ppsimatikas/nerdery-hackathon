import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loading from './reducers/loadingReducer';
import data from './reducers/dataReducer';
import modal from './reducers/modalReducer';

export default combineReducers({
    routing: routerReducer,
    data,
    loading,
    modal
});
