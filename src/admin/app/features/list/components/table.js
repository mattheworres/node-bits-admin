import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import autobind from 'class-autobind';

import {editModel} from '../actions';
import {deleteModel} from '../../data/actions';
import {makeTitle} from '../../shared/services';

import OptionsGear from './optionsGear';
import renderValue from './renderValue';

class ModelTable extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // actions
  handleEdit(item) {
    const {schema, editModel} = this.props;
    editModel(schema, item);
  }

  handleDelete(item) {
    const {schema, deleteModel} = this.props;
    deleteModel(schema, item.id);
  }

  // render
  renderHeader() {
    const {schema} = this.props;

    return (
      <tr>
        {
          _.map(schema.map, (value, key) => (
            <th key={key}>
              {makeTitle(key, {plural: false})}
            </th>
          ))
        }
        <th key="options" />
      </tr>
    );
  }

  renderBody() {
    const {schema, data} = this.props;

    return data.map((item, index) => (
      <tr key={index}>
        {
          _.map(schema.map, (value, key) => (
            <td key={`${index}-${key}`}>
              {renderValue(item, key, value)}
            </td>
          ))
        }
        <td key={`${index}-options`}>
          <OptionsGear index={index} item={item} onEdit={this.handleEdit} onDelete={this.handleDelete} />
        </td>
      </tr>
      ));
  }

  render() {
    return (
      <Table striped>
        <thead>
          {this.renderHeader()}
        </thead>
        <tbody>
          {this.renderBody()}
        </tbody>
      </Table>
    );
  }
}

export default connect(null, {editModel, deleteModel})(ModelTable);
