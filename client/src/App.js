import './App.css';
import React, { Fragment, useEffect } from 'react';
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/login/Login_Container'
import Alert from './components/layout/Alert'
import Profile from './components/Profile/Profile_Container'
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/routing/PrivateRoute';

//Important Reason for duplicate check here
//UseEffect actually runs after the component mounts, but also after the render
//If a user enters a private route, the app component hasn't finished rendering yet. So by the time it does render,
//The user has already entered the route, but the app hasn't gotten the token yet, so the user will get blocked
//To fix this, we check for the token before the app component has even initialized. This way, if the user does have
// a valid token, then they will be authorized to access the private route, if not, the then the app will appropriate prevent them
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  // Empty array means it will only run on component mounting and after render
  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
