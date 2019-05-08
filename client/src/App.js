import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import allRoutes from './routes';
import withAuth from './sharedComponents/withAuth';

class App extends Component {
  render() {
    return (
      <Switch>
        {allRoutes.map((route) => {
          if (route.public) return (<Route exact component={route.component} path={route.path} key={route.path} />)
          else return (<Route exact component={withAuth(route.component)} path={route.path} key={route.path} />)
        }
        )}
      </Switch>
    )
  }
}

export default App