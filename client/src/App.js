import './App.css';
import React, { Fragment } from 'react';
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login'
import Login2 from './components/login/Login_Container'
import Register from './components/auth/Register'

const App = () => (
  <Router>
    <Fragment>
      <h1>App</h1>
      <Route exact path='/' component={Landing} />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/login2' component={Login2} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
