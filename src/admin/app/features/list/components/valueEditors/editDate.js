import React from 'react';
import Datetime from 'react-datetime';
// import {DATE} from '../../../shared/constants';


export default (item, key, schema, {input}) => {
  const onChange = moment => input.onChange(moment.toDate());

  return (
    <Datetime {...input} onChange={onChange} />
  );
};
