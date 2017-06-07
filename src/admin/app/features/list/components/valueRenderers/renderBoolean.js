import React from 'react';

export default (item, key) => (item[key] ? <i className="fa fa-check" /> : null);
