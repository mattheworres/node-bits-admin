import _ from 'lodash';
import {LIST} from '../../shared/constants';

export default schema => {
  if (!schema) {
    return [];
  }

  const listBasedKeys = _.filter(_.keys(schema.map), key => schema.map[key].type === LIST);
  return listBasedKeys.map(key => ({
    key,
    ...schema.map[key],
  }));
};
