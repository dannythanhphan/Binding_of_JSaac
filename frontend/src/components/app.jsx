import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import { Switch } from 'react-router-dom';
import HomePage from './home/home_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { Route } from 'react-router';
import MainPageContainer from './main/main_page_container';

const App = () => (
    <div>
        <ProtectedRoute path="/main" component={MainPageContainer} />

        <AuthRoute exact path="/" component={HomePage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
    </div>
);

export default App;