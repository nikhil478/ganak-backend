import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Repayement from './repayement';
import RepayementDetail from './repayement-detail';
import RepayementUpdate from './repayement-update';
import RepayementDeleteDialog from './repayement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RepayementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RepayementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RepayementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Repayement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RepayementDeleteDialog} />
  </>
);

export default Routes;
