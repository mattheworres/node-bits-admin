import {get} from 'truefit-react-utils';

export const LOAD_SCHEMA = 'LOAD_SCHEMA';

export const loadSchema = () =>
({
  type: LOAD_SCHEMA,
  payload: get('schema_info'),
});
