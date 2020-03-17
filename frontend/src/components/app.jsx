import React from 'react';
// import { AuthRoute } from '../util/route_util';
// import { Switch } from 'react-router-dom';
import HomePage from './home/home_page';
// import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { Route } from 'react-router';

const App = () => (
    <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginFormContainer} />
        <Route exact path="/register" component={SignupFormContainer} />
    </div>
);

export default App;