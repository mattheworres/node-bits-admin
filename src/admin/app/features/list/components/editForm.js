import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import autobind from 'class-autobind';

import {EditValue} from './value';

class EditForm extends Component {
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
  onSubmit(form) {
    this.props.onSubmit(form);
  }

  // render
  renderForm() {
    const {schema, model} = this.props;
    return _.map(schema.order, key => (
      <Field key={key} name={key} component={EditValue} meta={{model, key, schema}} />
    ));
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form className="editForm" onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderForm()}
      </form>
    );
  }
}

export default reduxForm({
  form: 'edit-modal',
})(EditForm);
