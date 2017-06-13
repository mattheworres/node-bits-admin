import React from 'react';
import {ControlLabel} from 'react-bootstrap';
import {makeTitle} from '../../shared/services';

import {
  STRING, TEXT, UUID, PASSWORD, BOOLEAN, INTEGER, DOUBLE, DECIMAL, FLOAT, LIST, DATE,
} from '../../shared/constants';

import {
  renderString, renderBoolean, renderNumber, renderList, renderDate,
} from './valueRenderers';

import {
  editString, editNumber, editBoolean, editDate,
} from './valueEditors';

// render value
const renderMap = {
  [STRING]: renderString,
  [TEXT]: renderString,
  [UUID]: renderString,
  [PASSWORD]: renderString,

  [BOOLEAN]: renderBoolean,

  [INTEGER]: renderNumber,
  [DECIMAL]: renderNumber,
  [DOUBLE]: renderNumber,
  [FLOAT]: renderNumber,

  [LIST]: renderList,

  [DATE]: renderDate,
};

export const renderValue = (item, key, schema) => {
  const render = renderMap[schema.type];
  return render ? render(item, key, schema) : null;
};

// edit value
const editMap = {
  [STRING]: editString,
  [TEXT]: editString,
  [UUID]: editString,
  [PASSWORD]: editString,

  [BOOLEAN]: editBoolean,

  [INTEGER]: editNumber,
  [DECIMAL]: editNumber,
  [DOUBLE]: editNumber,
  [FLOAT]: editNumber,

  [DATE]: editDate,
};

export const editValue = (item, key, schema) => input => {
  const field = schema.map[key];
  const renderEdit = editMap[field.type];
  if (!renderEdit) {
    return null;
  }

  const label = makeTitle(key, {plural: false});
  return (
    <div>
      <ControlLabel>{label}</ControlLabel>
      {renderEdit(item, key, field, input)}
    </div>
  );
};
