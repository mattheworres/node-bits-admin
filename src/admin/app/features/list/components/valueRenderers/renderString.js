import {PASSWORD} from '../../../shared/constants';

export default (item, key, schema) => {
  if (schema.type === PASSWORD) {
    return '*****';
  }

  return item[key];
};
