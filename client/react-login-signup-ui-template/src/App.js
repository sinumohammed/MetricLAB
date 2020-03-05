import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import history from './history';
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";

function App() {

  const _state = useSelector(state => state);
  const dispatch = useDispatch();
  function logout(event) {
    event.preventDefault();
    dispatch({ type: 'LOGOUT_SUCCESS' });
    history.push('/');
  }
  return (<Router history={history}>
    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Metric LAB</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li> : null}
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li> */}
              {_state.isUserLoggedIn ?
                <div>
                  <li className="nav-item dspInBlk">
                    <a className="nav-link bold">Welcome back, {`${_state.user.name}`}</a>
                  </li>
                  <li className="nav-item dspInBlk">
                    <a onClick={(event) => { logout(event) }} className="nav-link bold">Logout</a>
                  </li>
                </div> :
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
              }


            </ul>
          </div>
        </div>
      </nav>


      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;