import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const isProd = process.env.NODE_ENV === 'production'; //eslint-disable-line no-undef

// Needed for React Developer Tools
if (!isProd) {
  window.React = React;
}

const store = configureStore();
const mountNode = document.getElementById('app');

const renderApp = () => {
  const Game = require('./Game').default; //eslint-disable-line no-undef

  render((
    <AppContainer>
      <Provider store={store}>
        <Game />
      </Provider>
    </AppContainer>
  ), mountNode);
};

if (module.hot) { //eslint-disable-line no-undef
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      const RedBox = require('redbox-react').default; //eslint-disable-line no-undef

      render(<RedBox error={error} />, mountNode);
    }
  };

  module.hot.accept('./Game', () => { //eslint-disable-line no-undef
    setImmediate(() => { //eslint-disable-line no-undef
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);

      reRenderApp();
    });
  });
}

renderApp();
