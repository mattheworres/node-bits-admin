import _ from 'lodash';

export default (data, filter) =>
  _.reduce(filter, (result, value, key) =>
    _.filter(result, item => {
      const itemValue = item[key];
      if (!itemValue) {
        return value.length === 0;
      }

      return itemValue.toLowerCase().includes(value.toLowerCase());
    }),
    data
  );

