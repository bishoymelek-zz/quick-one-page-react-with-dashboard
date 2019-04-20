import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { adminRoutes, endUserRoutes } from './routes';

class App extends Component {
    render() {
        return (
            <Switch>
                {endUserRoutes.map((route) =>
                    (<Route exact component={route.component} path={route.path} key={route.path} />)
                )}
                {adminRoutes.map((route) =>
                    (<Route exact component={route.component} path={`/admin/` + route.path} key={route.path} />)
                )}
            </Switch>
        )
    }
}

export default App