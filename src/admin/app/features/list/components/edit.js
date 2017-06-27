import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import autobind from 'class-autobind';
import {submit} from 'redux-form';

import {stopEdit} from '../actions';
import {saveModel} from '../../data/actions';
import {editModalSelector} from '../selectors';
import {makeTitle} from '../../shared/services';

import EditForm from './editForm';


class EditModal extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // actions
  handleCancel() {
    this.props.stopEdit();
  }

  handleSubmit() {
    this.props.submit('edit-modal');
  }

  handleSave(form) {
    const {schema, model, stopEdit, saveModel} = this.props;
    stopEdit();

    saveModel(schema, {...model, ...form});
  }

  // render
  render() {
    const {shown, model, schema} = this.props;

    if (!shown) {
      return null;
    }

    return (
      <Modal show={shown} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {model ? 'Edit ' : 'New '}
            {makeTitle(schema.title || schema.model, {plural: false})}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm schema={schema} model={model} onSubmit={this.handleSave} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="pull-left" bsStyle="danger" onClick={this.handleCancel}>Cancel</Button>
          <Button bsStyle="success" type="submit" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = state =>
({
  ...editModalSelector(state),
});

export default connect(mapStateToProps, {stopEdit, saveModel, submit})(EditModal);
