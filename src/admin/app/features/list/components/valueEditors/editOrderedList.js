import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import autobind from 'class-autobind';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';

import {loadData} from '../../../data/actions';
import {listDataSelector} from '../../selectors';

class EditOrderedList extends Component {
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
    loadData(source.reference, null, [source.referenceKey, source.referenceDisplay]);
  }

  // actions
  handleChange(input) {
    const {change, schema: {source}, data} = this.props;
    const referenceForValue = value => _.find(data, d => d[source.referenceKey] == value); // eslint-disable-line

    return args => {
      const value = args ? args.value : null;

      input.onChange(value);
      change('edit-modal', source.reference, value ? referenceForValue(value) : null);
    };
  }

  // render
  renderList() {
    const {value, schema: {source}} = this.props;

    const items = value.map(value => ({
      index: value[source.orderingColumn],
      value: value[source.referenceKey],
    }));

    return (
      <SortableList
        items={items}
        onSortEnd={this.handleChange} />
    );
  }

  //value (from props) = selected items; data (from props) = all possible options

  render() {
    //const {input, schema: {source}} = this.props;
    //const value = (input.value || []).map(item => item[source.referenceKey]);

    return this.renderList(/*value*/);
  }
}

const SortableItem = sortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = sortableContainer(({items}) => { //eslint-disable-line
  return (
    <ul>
      {items.map(value => (
        <SortableItem key={`item-${value.index}`} index={value.index} value={value.value} />
      ))}
    </ul>
  );
});

const mapStateToProps = (state, props) => ({
  data: listDataSelector(state, props),
});

const ConnectedEditOrderedList = connect(mapStateToProps, {loadData, change})(EditOrderedList);

export default (item, key, schema, input) => (
  <ConnectedEditOrderedList item={item} itemKey={key} schema={schema} input={input} />
);

