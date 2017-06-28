import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import autobind from 'class-autobind';

import {editModel, promptForDelete, hideDeletePrompt} from '../actions';
import {deleteModalSelector} from '../selectors';
import {deleteModel} from '../../data/actions';
import {makeTitle} from '../../shared/services';
import {LIST_DISPLAY_MODES, READ_ONLY} from '../../shared/constants';

import OptionsGear from './optionsGear';
import {renderValue} from './value';

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
    this.props.promptForDelete(item);
  }

  // helpers
  fields() {
    const {schema} = this.props;
    const fields = schema.order.map(key => ({key, ...schema.map[key]}));

    return fields.filter(field => LIST_DISPLAY_MODES.includes(field.mode));
  }

  // render
  renderGear(index, item) {
    const {schema} = this.props;

    if (schema.mode === READ_ONLY) {
      return null;
    }

    return (
      <OptionsGear index={index} item={item} onEdit={this.handleEdit} onDelete={this.handleDelete} />
    );
  }

  renderHeader() {
    return (
      <tr>
        {
          _.map(this.fields(), field => (
            <th key={field.key}>
              {makeTitle(field.title || field.key, {plural: false})}
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
          _.map(this.fields(), field => (
            <td key={`${index}-${field.key}`}>
              {renderValue(item, field.key, field, schema)}
            </td>
            ))
        }
        <td key={`${index}-options`}>
          {this.renderGear(index, item)}
        </td>
      </tr>
      ));
  }

  renderAlert() {
    const {schema, deleteModel, deleteModal, hideDeletePrompt} = this.props;
    if (!deleteModal.shown) {
      return null;
    }

    const handleCancel = () => {
      hideDeletePrompt();
    };

    const handleDelete = () => {
      deleteModel(schema, deleteModal.item.id);
      hideDeletePrompt();
    };

    const title = `Are your sure you want to delete this ${makeTitle(schema.title || schema.model, {plural: false})}`;

    return (
      <SweetAlert
        danger
        showCancel
        title={title}
        onConfirm={handleDelete}
        onCancel={handleCancel} />
    );
  }

  render() {
    return (
      <div>
        <Table striped>
          <thead>
            {this.renderHeader()}
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </Table>
        {this.renderAlert()}
      </div>
    );
  }
}

const mapStateToProps = state =>
({
  deleteModal: deleteModalSelector(state),
});

export default connect(mapStateToProps, {editModel, deleteModel, promptForDelete, hideDeletePrompt})(ModelTable);
