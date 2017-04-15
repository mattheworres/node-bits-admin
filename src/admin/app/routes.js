import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './App';
import {Admin} from './features/admin/components';
import {NotFound} from './features/shared/components';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Admin} />
    <Route path="*" component={NotFound} />
  </Route>
);
