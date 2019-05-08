/*
 * Redux store
 * With initialState
 * And Presistant data (defined in compineReducers file)
 * And thunk middleware
 * And Redux dev tools connected
 */
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './compineReducers';
import { persistStore } from 'redux-persist'
// Enable redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer =  rootReducer;
export default (initialState = {}) => {
  let store = createStore(persistedReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)))
  let persistor = persistStore(store)
  return { store, persistor }
}