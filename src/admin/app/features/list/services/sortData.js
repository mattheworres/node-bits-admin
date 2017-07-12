/* eslint-disable radix */
import moment from 'moment';
import {SortDirection} from 'react-virtualized';
import stringValueForRelation from './stringValueForRelation';
import {
  INTEGER, DECIMAL, DOUBLE, FLOAT,
  UUID, STRING, PASSWORD, RICH_TEXT, TEXT,
  DATETIME, DATE, TIME,
  LIST, MEDIA, BOOLEAN,
} from '../../shared/constants';

const ID = 'id';

const compare = (x, y, config) => {
  if (x === y) {
    return 0;
  }

  if (!x && y) {
    return -1;
  }

  if (x && !y) {
    return 1;
  }

  switch (config.type) {
    case BOOLEAN:
    case INTEGER:
      return parseInt(x) < parseInt(y) ? -1 : 1;

    case DECIMAL:
    case DOUBLE:
    case FLOAT:
      return parseFloat(x) < parseFloat(y) ? -1 : 1;

    case DATETIME:
    case DATE:
    case TIME:
      return moment(x).isBefore(moment(y)) ? -1 : 1;

    case LIST:
      return stringValueForRelation(x, config) < stringValueForRelation(y, config) ? -1 : 1;

    case MEDIA:
      return 0;

    default:
    case UUID:
    case STRING:
    case PASSWORD:
    case RICH_TEXT:
    case TEXT:
      return x < y ? -1 : 1;
  }
};


export default (data, schema, {sortBy = ID, sortDirection}) => {
  const sortDirectionMultiplier = sortDirection === SortDirection.DESC ? -1 : 1;

  const comparator = (x, y) => {
    const config = schema.map[sortBy];
    const result = compare(x[sortBy], y[sortBy], config);
    if (result !== 0 || sortBy === ID) {
      return result * sortDirectionMultiplier;
    }

    return compare(x[ID], y[ID], {type: INTEGER});
  };

  return data.sort(comparator);
};
