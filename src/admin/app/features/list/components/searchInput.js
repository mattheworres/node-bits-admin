import React from 'react';
import {connect} from 'react-redux';

import {searchList} from '../actions';
import {searchKeySelector, searchValueForKeySelector} from '../selectors';
import {PASSWORD} from '../../shared/constants';

const handleClick = e => {
  e.stopPropagation();
};

const searchInput = ({searchKey, schema, searchValue, searchList}) => {
  const handleChange = e => {
    searchList(searchKey, e.target.value);
  };

  return (
    <input onClick={handleClick} value={searchValue} onChange={handleChange} disabled={schema.type === PASSWORD} />
  );
};

const mapStateToProps = (state, props) =>
({
  searchKey: searchKeySelector(state, props),
  searchValue: searchValueForKeySelector(state, props),
});

export default connect(mapStateToProps, {searchList})(searchInput);
