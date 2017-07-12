import _ from 'lodash';
import moment from 'moment';
import {
  DATETIME, DATE, TIME, BOOLEAN,
  DEFAULT_DATE_FORMAT,
} from '../../shared/constants';

const falseValues = ['f', 'false', 'n', '0'];

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
      const config = schema.map[key];
      const itemValue = item[key];

      if (!value || value.length === 0) {
        return true;
      }

      if (config.type === BOOLEAN) {
        return falseValues.includes(value) ? !itemValue : itemValue;
      }

      if (!itemValue) {
        return value.length === 0;
      }

      return itemValueByConfig(itemValue, config).includes(value.toLowerCase());
    }),
    data
  );

