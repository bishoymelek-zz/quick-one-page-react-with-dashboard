/*
    Compine Redux reducers here
*/
import { combineReducers } from 'redux';
import sAdminHomeReducer from './Home/reducer';
export default combineReducers({
    sAdminHomeReducer
});
