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

class List extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentWillMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model !== this.props.model) {
      this.loadData(nextProps);
    }
  }

  // actions
  loadData(props) {
    props.loadData(props.model);
  }

  handleNewModel() {
    this.props.editModel(this.props.schema);
  }

  // render
  render() {
    const {data, schema, model} = this.props;
    if (!data || !schema) {
      return null;
    }

    return (
      <div className="list">
        <Button bsStyle="success" className="pull-right" onClick={this.handleNewModel}>
          <FontAwesome name="plus-circle" /> &nbsp;New {makeTitle(model, {plural: false})}
        </Button>

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
