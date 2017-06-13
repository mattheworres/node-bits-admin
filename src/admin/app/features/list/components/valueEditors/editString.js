import React from 'react';
import {FormControl} from 'react-bootstrap';
import {PASSWORD} from '../../../shared/constants';

export default (item, key, schema, input) => (
  <FormControl {...input.input} type={schema.type === PASSWORD ? 'password' : 'text'} />
);
