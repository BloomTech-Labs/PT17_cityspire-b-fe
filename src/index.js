import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './state/reducers';

import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';

const store = configureStore({
  reducer: reducers,
  composeWithDevlTools: composeWithDevTools(applyMiddleware(thunk)),
});

console.log('store', store);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
