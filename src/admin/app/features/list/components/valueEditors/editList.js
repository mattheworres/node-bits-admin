import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import autobind from 'class-autobind';
import Select from 'react-select';

import {loadData} from '../../../data/actions';
import {listDataSelector} from '../../selectors';
import {ONE_TO_ONE} from '../../../shared/constants';

class EditList extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.schema !== nextProps.schema) {
      this.loadData(nextProps);
    }
  }

  // load
  loadData(props) {
    const {loadData, schema: {source}} = props;

    loadData(source.reference);
  }

  // actions
  handleChange(input, multiselect) {
    const {change, schema: {source}, data} = this.props;
    const referenceForValue = value => _.find(data, d => d[source.referenceKey] == value); // eslint-disable-line

    return args => {
      if (multiselect) {
        input.onChange(args.map(arg => referenceForValue(arg.value)));
        return;
      }

      input.onChange(args.value);
      change('edit-modal', source.reference, referenceForValue(args.value));
    };
  }

  // render
  renderSelect(value, multiselect, clearable) {
    const {input, data, schema: {source}} = this.props;

    const options = data.map(value => ({
      value: value[source.referenceKey],
      label: value[source.referenceDisplay],
    }));

    return (
      <Select
        options={options}
        value={value}
        onChange={this.handleChange(input, multiselect)}
        searchable
        clearable={clearable}
        multi={multiselect} />
    );
  }

  renderEdit1To1() {
    const {input} = this.props;

    return this.renderSelect(input.value, false, false);
  }

  renderEditNtoM() {
    const {input, schema: {source}} = this.props;
    const value = (input.value || []).map(item => item[source.referenceKey]);

    return this.renderSelect(value, true, true);
  }

  render() {
    const {schema: {source}} = this.props;

    if (source.type === ONE_TO_ONE) {
      return this.renderEdit1To1();
    }

    return this.renderEditNtoM();
  }
}

const mapStateToProps = (state, props) => ({
  data: listDataSelector(state, props),
});

const ConnectedEditList = connect(mapStateToProps, {loadData, change})(EditList);

export default (item, key, schema, input) => (
  <ConnectedEditList item={item} itemKey={key} schema={schema} input={input} />
);

