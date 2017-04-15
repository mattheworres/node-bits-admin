/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import auth from './features/auth/reducers';
import menu from './features/menu/reducers';
import schema from './features/schema/reducers';

const rootReducer = combineReducers({
  features: combineReducers({
    auth,
    menu,
    schema,
  }),
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
