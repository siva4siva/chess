import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Alert from './Alert';
import Navigation from './header/Navigation';
import LandingPage from './home/Landing';
import * as routes from './_constants/routes';
import SignUpPage from './authentication/SignUp';
import SignInPage from './authentication/SignIn';
import Chess from './game/Chess';
//import Video from './video/Video';
//import PasswordForgetPage from './authenication/PasswordForget';
//import HomePage from './home/Home';
//import AccountPage from './authenication/Account';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Navigation />
          <Alert />
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.CHESS_GAME} component={Chess} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
