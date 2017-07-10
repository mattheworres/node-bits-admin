import React from 'react';
import {connect} from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import {hideDeletePrompt} from '../actions';
import {deleteModalSelector} from '../selectors';
import {deleteModel} from '../../data/actions';
import {makeTitle} from '../../shared/services';

const deleteModal = ({schema, deleteModal, deleteModel, hideDeletePrompt}) => {
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

  const title = `Are you sure you want to delete this ${makeTitle(schema.title || schema.model, {plural: false}).toLowerCase()}`;

  return (
    <SweetAlert
      danger
      showCancel
      title={title}
      onConfirm={handleDelete}
      onCancel={handleCancel} />
  );
};

const mapStateToProps = state =>
({
  deleteModal: deleteModalSelector(state),
});

export default connect(mapStateToProps, {hideDeletePrompt, deleteModel})(deleteModal);
