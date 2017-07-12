import _ from 'lodash';
import moment from 'moment';
import stringValueForRelation from './stringValueForRelation';
import {
  DATETIME, DATE, TIME, BOOLEAN,
  INTEGER, DECIMAL, DOUBLE, FLOAT,
  LIST, DEFAULT_DATE_FORMAT,
} from '../../shared/constants';


const falseValues = ['f', 'false', 'n', '0'];

const itemValueByConfig = (item, itemValue, config) => {
  switch (config.type) {
    case DATETIME:
    case DATE:
    case TIME:
      return moment(itemValue).format(config.format || DEFAULT_DATE_FORMAT).toLowerCase();

    case INTEGER:
    case DECIMAL:
    case DOUBLE:
    case FLOAT:
      return itemValue.toString().toLowerCase();

    case LIST: {
      return stringValueForRelation(item, config);
    }

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

      return itemValueByConfig(item, itemValue, config).includes(value.toLowerCase());
    }),
    data
  );

