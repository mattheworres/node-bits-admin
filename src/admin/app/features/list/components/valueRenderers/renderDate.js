import moment from 'moment';

const defaultFormat = 'MMM Do YYYY, h:mm:ss a';

export default (item, key, schema) => {
  const date = item[key];
  if (!date) {
    return null;
  }

  return moment(date).format(schema.format || defaultFormat);
};
