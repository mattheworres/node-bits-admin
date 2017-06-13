import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';
import autobind from 'class-autobind';

import {editValue} from './value';
import {stopEdit} from '../actions';
import {saveModel} from '../../data/actions';
import {editModalSelector} from '../selectors';
import {makeTitle} from '../../shared/services';

class EditModal extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.loadValues(this.props.model);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model !== this.props.model) {
      this.loadValues(nextProps.model);
    }
  }

  loadValues(model) {
    this.props.initialize(model);
  }

  // actions
  handleCancel() {
    this.props.stopEdit();
  }

  handleSave(form) {
    const {schema, model, stopEdit, saveModel} = this.props;
    stopEdit();

    saveModel(schema, {...model, ...form});
  }

  // render
  renderForm() {
    const {schema, model} = this.props;
    return _.map(schema.order, key => {
      const Edit = editValue(model, key, schema);

      return (
        <Field key={key} name={key} component={Edit} />
      );
    });
  }

  render() {
    const {shown, model, schema, handleSubmit} = this.props;

    if (!shown) {
      return (
        <Modal show={shown} onHide={this.handleCancel} />
      );
    }

    return (
      <Modal show={shown} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {model ? 'Edit ' : 'New '}
            {makeTitle(schema.model, {plural: false})}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="editForm">
            {this.renderForm()}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="pull-left" bsStyle="danger" onClick={this.handleCancel}>Cancel</Button>
          <Button bsStyle="success" type="submit" onClick={handleSubmit(this.handleSave)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const form = reduxForm({
  form: 'edit-modal',
})(EditModal);

const mapStateToProps = state =>
({
  ...editModalSelector(state),
});

export default connect(mapStateToProps, {stopEdit, saveModel})(form);
