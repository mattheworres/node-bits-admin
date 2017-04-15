/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  features: combineReducers({
  }),
  routing: routerReducer,
});

export default rootReducer;
