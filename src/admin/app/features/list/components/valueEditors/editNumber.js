import React from 'react';
import {FormControl} from 'react-bootstrap';
import {INTEGER, DECIMAL, DOUBLE, FLOAT} from '../../../shared/constants';

const defaultPatternMap = {
  [INTEGER]: '[0-9]*',
  [DECIMAL]: '[0-9]*.[0-9]*',
  [DOUBLE]: '[0-9]*.[0-9]*',
  [FLOAT]: '[0-9]*.[0-9]*',
};

const pattern = schema => schema.inputPattern || defaultPatternMap[schema.type];

export default (item, key, schema, input) => (
  <FormControl {...input} type="number" pattern={pattern(schema)} inputMode="numeric" />
);
