import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

import {DATETIME, DATE, TIME, DEFAULT_DATE_FORMAT} from '../../../shared/constants';

const showDate = [DATETIME, DATE];
const showTime = [DATETIME, TIME];

export default (item, key, schema, input) => {
  const onChange = moment => input.onChange(moment.toDate());

  const dateFormat = showDate.includes(schema.type);
  const timeFormat = showTime.includes(schema.type);

  const format = schema.format || DEFAULT_DATE_FORMAT;
  const value = input.value ? moment(input.value).format(format) : null;

  return (
    <Datetime
      value={value}
      onChange={onChange}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      displayFormat={format} />
  );
};
