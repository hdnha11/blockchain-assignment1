import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initWeb3 } from './utils/web3';
import App from './components/App';
import configureStore from './store/configureStore';

import 'react-select/dist/react-select.css';

initWeb3().then(() => {
  const store = configureStore();

  const appMount = document.getElementById('app');

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    appMount,
  );
});
