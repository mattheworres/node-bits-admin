import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'class-autobind';
import {Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import Table from './table';
import EditModal from './edit';

import {editModel} from '../actions';
import {loadData} from '../../data/actions';

import {modelSelector} from '../selectors';
import {modelDataSelector} from '../../data/selectors';
import {modelSchemaSelector} from '../../schema/selectors';

import {makeTitle} from '../../shared/services';
import {READ_ONLY} from '../../shared/constants';

class List extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentWillMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model !== this.props.model || nextProps.schema !== this.props.schema) {
      this.loadData(nextProps);
    }
  }

  // actions
  loadData(props) {
    if (props.model && props.schema) {
      props.loadData(props.model, props.schema);
    }
  }

  handleNewModel() {
    this.props.editModel(this.props.schema);
  }

  // render
  renderNewButton() {
    const {schema, model} = this.props;

    if (schema.mode === READ_ONLY) {
      return null;
    }

    return (
      <Button bsStyle="success" className="pull-right" onClick={this.handleNewModel}>
        <FontAwesome name="plus-circle" /> &nbsp;New {makeTitle(model, {plural: false})}
      </Button>
    );
  }

  render() {
    const {data, schema, model} = this.props;
    if (!data || !schema) {
      return null;
    }

    return (
      <div className="list">
        {this.renderNewButton()}

        <h1>{makeTitle(model)}</h1>

        <Table data={data} schema={schema} />
        <EditModal />
      </div>
    );
  }
}

const mapStateToProps = (state, props) =>
({
  model: modelSelector(state, props),
  data: modelDataSelector(state, props),
  schema: modelSchemaSelector(state, props),
});

export default connect(mapStateToProps, {loadData, editModel})(List);