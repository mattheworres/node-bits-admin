import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import autobind from 'class-autobind';
import {AutoSizer, Column, Table, SortIndicator} from 'react-virtualized';

import {editModel, promptForDelete, hideDeletePrompt, sortList} from '../actions';
import {sortSelector, deleteModalSelector} from '../selectors';
import {deleteModel} from '../../data/actions';
import {makeTitle, getAtIndex, rowClassName, sortData} from '../../shared/services';
import {LIST_DISPLAY_MODES, READ_ONLY, HEADER_HEIGHT, ROW_HEIGHT} from '../../shared/constants';

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

  onSort({sortBy, sortDirection}) {
    this.props.sortList(sortBy, sortDirection);
  }

  // helpers
  fields() {
    const {schema} = this.props;
    const fields = schema.order.map(key => ({key, ...schema.map[key]}));

    return fields.filter(field => LIST_DISPLAY_MODES.includes(field.mode));
  }

  // render
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

    const title = `Are you sure you want to delete this ${makeTitle(schema.title || schema.model, {plural: false})}`;

    return (
      <SweetAlert
        danger
        showCancel
        title={title}
        onConfirm={handleDelete}
        onCancel={handleCancel} />
    );
  }

  renderNoData() {
    return (<div className="no-rows"><h3>No data available</h3></div>);
  }

  renderGear({dataKey, rowData}) {
    return <OptionsGear index={dataKey} item={rowData} onEdit={this.handleEdit} onDelete={this.handleDelete} />;
  }

  renderHeader({dataKey, label, sortBy, sortDirection}) {
    return (
      <div>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  renderColumns(width) {
    const {schema} = this.props;
    const fields = this.fields();

    const gearKey = 'gear-options';
    const gearWidth = 30;
    const columnWidth = (width - gearWidth) / fields.length;

    const valueRenderer = ({dataKey, rowData}) => {
      const field = schema.map[dataKey];

      return renderValue(rowData, dataKey, field, schema);
    };

    const columns = _.map(fields, field => {
      const title = makeTitle(field.title || field.key, {plural: false});
      return (
        <Column key={field.key} dataKey={field.key} width={columnWidth} flexGrow={1} label={title} cellRenderer={valueRenderer} headerRenderer={this.renderHeader} />
      );
    });

    if (schema.mode === READ_ONLY) {
      return columns;
    }

    columns.push(
      <Column key={gearKey} dataKey={gearKey} width={gearWidth} flexGrow={0} label="" cellRenderer={this.renderGear} />
    );

    return columns;
  }

  render() {
    const {data, sort} = this.props;

    return (
      <div className="no-select">
        <AutoSizer disableHeight>
          {
            ({width}) =>
              (<Table
                _data={sortData(data, sort)}
                width={width}
                height={HEADER_HEIGHT + ROW_HEIGHT * data.length}
                headerHeight={HEADER_HEIGHT}
                rowHeight={ROW_HEIGHT}

                rowCount={data.length}
                rowGetter={getAtIndex(data)}
                rowClassName={rowClassName}
                sortBy={sort.sortBy}
                sortDirection={sort.sortDirection}
                sort={this.onSort}
                noRowsRenderer={this.renderNoData}>
                {this.renderColumns(width)}
              </Table>)
          }
        </AutoSizer>
        {this.renderAlert()}
      </div>
    );
  }
}

const mapStateToProps = state =>
({
  sort: sortSelector(state),
  deleteModal: deleteModalSelector(state),
});

export default connect(mapStateToProps, {editModel, deleteModel, promptForDelete, hideDeletePrompt, sortList})(ModelTable);
