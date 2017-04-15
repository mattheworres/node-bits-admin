import promiseMiddlware from 'redux-promise-middleware';
import rootReducer from '../rootReducer';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

export default function () {
  const middleware = [
    thunkMiddleware,
    promiseMiddlware(),
  ];

  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );
}
