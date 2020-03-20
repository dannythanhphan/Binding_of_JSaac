import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import { create, join, leave } from './actions/lobby_actions';
import openSocket from "socket.io-client";

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // if (localStorage.jwtToken) {
  //   setAuthToken(localStorage.jwtToken);

  //   const decodedUser = jwt_decode(localStorage.jwtToken);

  //   const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

  //   store = configureStore(preloadedState);

  //   const currentTime = Date.now() / 1000;

  //   if (decodedUser.exp < currentTime) {

  //     store.dispatch(logout());
  //     window.location.href = '/';
  //   }
  // } else {

    store = configureStore({});
  // }
  const socket = openSocket("http://localhost:8000/lobby");
  window.socket = socket;
  window.create = create;
  window.join = join;
  window.leave = leave;
  window.dispatch = store.dispatch;

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});