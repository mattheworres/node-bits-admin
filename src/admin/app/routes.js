import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './App';
import {Admin} from './features/admin/components';
import {List} from './features/list/components';
import {NotFound} from './features/shared/components';

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={Admin} />
    <Route path="" component={Admin}>
      <Route path="list/:model" component={List} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
