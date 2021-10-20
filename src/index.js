import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { AppProvider } from './context/app-context';
import {Provider} from 'react-redux'
import store from './store/store'
import App from './App';

ReactDOM.render(
  <Provider store={store}>
  <AppProvider>
  <Router basename={process.env.PUBLIC_URL}>
    <App />
    </Router></AppProvider>
    </Provider>
    ,
  document.getElementById('root')
);
