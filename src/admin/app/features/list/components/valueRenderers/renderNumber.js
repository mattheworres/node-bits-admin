import numeral from 'numeral';
import {INTEGER, DECIMAL, DOUBLE, FLOAT} from '../../../shared/constants';

const defaultFormatMap = {
  [INTEGER]: '0',
  [DECIMAL]: '0.00',
  [DOUBLE]: '0.00',
  [FLOAT]: '0.00',
};

const defaultFormat = type => defaultFormatMap[type] || '0';

export default (item, key, schema) => {
  const value = item[key] || 0;
  const format = schema.format || defaultFormat(schema.type);

  return numeral(value).format(format);
};
