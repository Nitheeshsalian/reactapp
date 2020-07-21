import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Signup from './components/signup/signup'
import LoginPage from './components/login/login'
import Home from './components/home/home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
