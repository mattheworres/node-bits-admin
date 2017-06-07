import React, {Component} from 'react';
import autobind from 'class-autobind';
import {ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Datetime from 'react-datetime';

import {makeTitle} from '../../shared/services';

const INTEGER = 'INTEGER';
const DECIMAL = 'DECIMAL';
const DOUBLE = 'DOUBLE';
const FLOAT = 'FLOAT';
const UUID = 'UUID';
const STRING = 'STRING';
const PASSWORD = 'PASSWORD';
const DATE = 'DATE';
const TIME = 'TIME';
const BOOLEAN = 'BOOLEAN';
const TEXT = 'TEXT';
// const LIST = 'LIST';
// const MEDIA = 'MEDIA';
// const RICH_TEXT = 'RICH_TEXT';

export default class EditField extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.renderMap = {
      [TEXT]: this.renderInput,
      [STRING]: this.renderInput,
      [UUID]: this.renderInput,
      [PASSWORD]: this.renderInput,

      [INTEGER]: this.renderNumber,
      [DECIMAL]: this.renderNumber,
      [DOUBLE]: this.renderNumber,
      [FLOAT]: this.renderNumber,

      [DATE]: this.renderDateTime,
      [TIME]: this.renderDateTime,

      [BOOLEAN]: this.renderCheckbox,
    };
  }

  renderCheckbox(input) {
    return (<Checkbox {...input} />);
  }

  renderInput(input, detail) {
    const type = detail.type === PASSWORD ? 'password' : 'text';
    return (<FormControl {...input} type={type} />);
  }

  renderNumber(input, detail) {
    const pattern = detail.type === INTEGER ? '[0-9]*' : '[0-9].[0-9]*';
    return (<FormControl {...input} type="number" pattern={pattern} inputMode="numeric" />);
  }

  renderDateTime(input, detail) {
    const dateFormat = detail.type === DATE;
    const onChange = moment => input.onChange(moment.toDate());

    return (<Datetime {...input} dateFormat={dateFormat} onChange={onChange} />);
  }

  render() {
    const {input, detail} = this.props;
    const label = makeTitle(input.name, {plural: false});
    const renderDetail = this.renderMap[detail.type];

    return (
      <div>
        <ControlLabel>{label}</ControlLabel>
        {renderDetail ? renderDetail(input, detail) : this.renderInput(input, detail)}
      </div>
    );
  }
}
