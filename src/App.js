import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react'

import Nav from './components/Nav';
import Login from './containers/Login';
import Messages from './containers/Messages';

import configureStore from './redux/configureStore';
import {loadAuth} from './redux/modules/auth';
import {loadStats} from './redux/modules/stats';

import './App.css';

const store = configureStore();
store.dispatch(loadAuth());
store.dispatch(loadStats());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container fluid className="App">
            <Route exact path="/" component={Messages} />
            <Route exact path="/login" component={Login} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
