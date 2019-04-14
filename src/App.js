import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.scss';
import { simpleAction } from './store-redux/SAMPLE/actions';
const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.simpleAction}>Test redux action</button>
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
