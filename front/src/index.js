import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './global.scss';
import reportWebVitals from './reportWebVitals';

import NavigationBar from './organisms/NavigationBar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <header>
          <NavigationBar />
        </header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/dashboard" component={AdminPage} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
