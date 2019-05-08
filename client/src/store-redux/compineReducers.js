/*
    Compine Redux reducers here
*/
import { combineReducers } from 'redux';
import sAdminHomeReducer from './Home/reducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage,
}

const sAdminHomeReducerConfig = {
    key: 'sAdminHomeReducer',
    storage: storage,
    whitelist: ['listOfEntriesLoaded']
}

const rootReducer = combineReducers({
    sAdminHomeReducer: persistReducer(sAdminHomeReducerConfig,sAdminHomeReducer),
});

export default persistReducer(rootPersistConfig, rootReducer)
