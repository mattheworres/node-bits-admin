/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import auth from './features/auth/reducers';
import data from './features/data/reducers';
import list from './features/list/reducers';
import menu from './features/menu/reducers';
import schema from './features/schema/reducers';

const rootReducer = combineReducers({
  features: combineReducers({
    auth,
    data,
    list,
    menu,
    schema,
  }),
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
