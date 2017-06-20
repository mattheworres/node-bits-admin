import './styles/styles.scss';
import 'react-select/dist/react-select.css';

import './babelHelpers';
import 'core-js/es6/symbol';
import 'core-js/es6/promise';
import 'core-js/es6/array';
import 'core-js/es6/number';
import 'core-js/es6/object';

import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import {render} from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';

import {configureHttp, configureToastr} from './util';
import configureStore from './store/configureStore';
import routes from './routes';

// configure stuff
const store = configureStore();
configureHttp(store);
configureToastr();

const history = syncHistoryWithStore(browserHistory, store);

// render
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
