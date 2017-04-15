import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './App';
import {Dashboard} from './features/dashboard/components';
import {NotFound} from './features/shared/components';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="*" component={NotFound} />
  </Route>
);
