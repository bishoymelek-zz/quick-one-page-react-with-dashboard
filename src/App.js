import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import allRoutes from './routes';

class App extends Component {
    render() {
        return (
            <Switch>
                {allRoutes.map((route) =>
                    (<Route exact  component={route.component} path={route.path} key={route.path} />  )
                )}
            </Switch>
        )
    }
}

export default App