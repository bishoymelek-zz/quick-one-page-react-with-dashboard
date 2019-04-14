/*
 * Redux store
 * With initialState
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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk))
  );
}