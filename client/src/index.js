import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// State (redux)
import { Provider } from 'react-redux';
// Routing (react-router-dom)
import { BrowserRouter } from 'react-router-dom';
import store from './store-redux';
import { PersistGate } from 'redux-persist/integration/react'

// Reset browser styling
import './reset.scss';
import 'bootstrap/dist/css/bootstrap.css';

import './index.scss';
import App from './App';
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store().store}>
            <PersistGate loading={null} persistor={store().persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
