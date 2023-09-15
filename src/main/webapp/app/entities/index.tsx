import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Repayement from './repayement';
import Agreement from './agreement';
import Loan from './loan';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/repayement`} component={Repayement} />
      <ErrorBoundaryRoute path={`${match.url}/agreement`} component={Agreement} />
      <ErrorBoundaryRoute path={`${match.url}/loan`} component={Loan} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
