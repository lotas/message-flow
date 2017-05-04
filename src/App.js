import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import Nav from './components/Nav';

import Messages from './containers/Messages';
import About from './containers/About';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Container fluid className="App">
          {/* <Nav /> */}

          <Route exact path="/" component={Messages} />
          <Route path="/about" component={About} />
        </Container>
      </Router>
    );
  }
}

export default App;
