import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducer';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(allReducers, composeWithDevTools(
  applyMiddleware(thunk),
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={
      store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

