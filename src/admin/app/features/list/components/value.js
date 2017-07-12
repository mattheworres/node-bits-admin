import React, {Component} from 'react';
import {ControlLabel} from 'react-bootstrap';
import {makeTitle} from '../../shared/services';

import {
  STRING, TEXT, UUID, PASSWORD, BOOLEAN, INTEGER, DOUBLE, DECIMAL, FLOAT, LIST, DATE, TIME,
  MEDIA, RICH_TEXT,
} from '../../shared/constants';

import {
  renderString, renderBoolean, renderNumber, renderList, renderDate, renderMedia, renderRichText,
} from './valueRenderers';

import {
  editString, editNumber, editBoolean, editDate, editList, editMedia, editRichText,
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
  [TIME]: renderDate,

  [MEDIA]: renderMedia,

  [RICH_TEXT]: renderRichText,
};

export const renderValue = (item, key, schema, modelSchema) => {
  const render = renderMap[schema.type];
  return render ? render(item, key, schema, modelSchema) : null;
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

  [LIST]: editList,

  [DATE]: editDate,
  [TIME]: editDate,

  [MEDIA]: editMedia,

  [RICH_TEXT]: editRichText,
};

export class EditValue extends Component {
  render() {
    const {input, meta: {model, key, schema}} = this.props;

    const field = schema.map[key];
    const renderEdit = editMap[field.type];
    if (!renderEdit) {
      return null;
    }

    const label = makeTitle(field.title || key, {plural: false});
    return (
      <div>
        <ControlLabel>{label}</ControlLabel>
        {renderEdit(model, key, field, input, schema)}
      </div>
    );
  }
}

// this is here to satisfy the file generator
export default {};
