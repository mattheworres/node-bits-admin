import {composeWithDevTools} from 'redux-devtools-extension';
import promiseMiddlware from 'redux-promise-middleware';
import rootReducer from '../rootReducer';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

export default function () {
  const middleware = [
    thunkMiddleware,
    promiseMiddlware(),
  ];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextReducer = require('../rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
