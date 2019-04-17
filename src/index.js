import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// State (redux)
import { Provider } from 'react-redux';
// Routing (react-router-dom)
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import configureStore from './store-redux';
import allRoutes from './routes';

// Reset browser styling
import './reset.scss';
import 'bootstrap/dist/css/bootstrap.css';
// Styling
import './index.scss';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={configureStore()}>
            <Switch>
                {allRoutes.map((route) => (
                    <Route component={route.component} path={route.path} key={route.path} />
                ))}
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
