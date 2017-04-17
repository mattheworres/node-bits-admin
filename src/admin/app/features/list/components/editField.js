import React, {Component} from 'react';
import autobind from 'class-autobind';
import {
  ControlLabel, FormControl,
  Checkbox,
} from 'react-bootstrap';

import {makeTitle} from '../../shared/services';

const INTEGER = 'INTEGER';
const DECIMAL = 'DECIMAL';
const DOUBLE = 'DOUBLE';
const FLOAT = 'FLOAT';
const UUID = 'UUID';
const STRING = 'STRING';
const PASSWORD = 'PASSWORD';
const DATE = 'DATE';
const BOOLEAN = 'BOOLEAN';
const TEXT = 'TEXT';
const LIST = 'LIST';
const MEDIA = 'MEDIA';
const RICH_TEXT = 'RICH_TEXT';
const TIME = 'TIME';

export default class EditField extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.renderMap = {
      [TEXT]: this.renderFormControl,
      [BOOLEAN]: this.renderCheckbox,
    };
  }

  renderCheckbox(input) {
    return (<Checkbox {...input} />);
  }

  renderFormControl(input) {
    return (<FormControl {...input} />);
  }

  render() {
    const {input, detail} = this.props;
    const label = makeTitle(input.name, {plural: false});
    const renderDetail = this.renderMap[detail.type];

    return (
      <div>
        <ControlLabel>{label}</ControlLabel>
        {renderDetail ? renderDetail(input, detail) : this.renderFormControl(input, detail)}
      </div>
    );
  }
}
