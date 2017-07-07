import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Well} from 'react-bootstrap';
import autobind from 'class-autobind';
import {submit} from 'redux-form';
import Spinner from 'react-spinkit';

import {stopEdit} from '../actions';
import {saveModel, resetSaveProcess} from '../../data/actions';
import {editModalSelector} from '../selectors';
import {saveProcessSelector} from '../../data/selectors';
import {makeTitle} from '../../shared/services';
import {PROCESSING, SUCCESS, FAILURE} from '../../shared/constants';

import EditForm from './editForm';

class EditModal extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentWillReceiveProps(newProps) {
    const {stopEdit, resetSaveProcess} = this.props;
    const {saveProcess} = newProps;

    if (saveProcess && saveProcess.status === SUCCESS) {
      stopEdit();
      resetSaveProcess();
    }
  }

  // actions
  handleCancel() {
    this.props.stopEdit();
  }

  handleSubmit() {
    this.props.submit('edit-modal');
  }

  handleSave(form) {
    const {schema, model, saveModel} = this.props;

    // by default it will push empty strings which wont fire the "required flags"
    _.forOwn(form, (value, key) => {
      if (value === '') {
        form[key] = null;
      }
    });

    saveModel(schema, {...model, ...form});
  }

  // render
  renderErrors() {
    const {saveProcess} = this.props;

    if (!saveProcess || saveProcess.status !== FAILURE) {
      return null;
    }

    return (
      <Well bsSize="sm">
        <h1 className="edit-error-header">
          Please fix the following errors:
        </h1>
        <ul>
          {
            saveProcess.errors.map((err, i) => (
              <li key={i}>
                {err.message}
              </li>
            ))
          }
        </ul>
      </Well>
    );
  }

  render() {
    const {shown, schema, model, saveProcess} = this.props;
    if (!shown) {
      return null;
    }

    const isProcessingSave = saveProcess && saveProcess.status === PROCESSING;
    const title = makeTitle(schema.title || schema.model, {plural: false});
    const modelState = model ? 'Edit' : 'New';
    const action = isProcessingSave ? 'Saving' : null;

    return (
      <Modal show={shown} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action} {modelState} {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderErrors()}
          <div className={isProcessingSave ? 'hidden' : ''}>
            <EditForm schema={schema} model={model} onSubmit={this.handleSave} />
          </div>
          <div className={isProcessingSave ? 'saving' : 'hidden'}>
            <Spinner name="ball-clip-rotate-multiple" color="#000" />
          </div>
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
  saveProcess: saveProcessSelector(state),
});

export default connect(mapStateToProps, {saveModel, submit, stopEdit, resetSaveProcess})(EditModal);
