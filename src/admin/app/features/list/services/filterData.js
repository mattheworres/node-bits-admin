import _ from 'lodash';
import moment from 'moment';
import {DATETIME, DATE, TIME, DEFAULT_DATE_FORMAT} from '../../shared/constants';

const itemValueByConfig = (itemValue, config) => {
  switch (config.type) {
    case DATETIME:
    case DATE:
    case TIME:
      return moment(itemValue).format(config.format || DEFAULT_DATE_FORMAT).toLowerCase();

    default:
      return itemValue.toLowerCase();
  }
};

export default (data, schema, filter) =>
  _.reduce(filter, (result, value, key) =>
    _.filter(result, item => {
      const itemValue = item[key];
      if (!itemValue) {
        return value.length === 0;
      }

      const config = schema.map[key];
      return itemValueByConfig(item[key], config).includes(value.toLowerCase());
    }),
    data
  );

