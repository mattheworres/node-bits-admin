import moment from 'moment';
import {DEFAULT_DATE_FORMAT} from '../../../shared/constants';


export default (item, key, schema) => {
  const date = item[key];
  if (!date) {
    return null;
  }

  return moment(date).format(schema.format || DEFAULT_DATE_FORMAT);
};
