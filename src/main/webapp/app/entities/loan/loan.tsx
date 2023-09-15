import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './loan.reducer';
import { ILoan } from 'app/shared/model/loan.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoanProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Loan extends React.Component<ILoanProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { loanList, match } = this.props;
    return (
      <div>
        <h2 id="loan-heading">
          Loans
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Loan
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Loanee Name</th>
                <th>Dob</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Disbursement Date</th>
                <th>Loan Amount</th>
                <th>Loan Tenure</th>
                <th>Interest Rate</th>
                <th>Zkp Code</th>
                <th>Date Created</th>
                <th>Created By Id</th>
                <th>Date Updated</th>
                <th>Updated By Id</th>
                <th>Agreement</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loanList.map((loan, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${loan.id}`} color="link" size="sm">
                      {loan.id}
                    </Button>
                  </td>
                  <td>{loan.loaneeName}</td>
                  <td>{loan.dob}</td>
                  <td>{loan.address}</td>
                  <td>{loan.contact}</td>
                  <td>
                    <TextFormat type="date" value={loan.disbursementDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{loan.loanAmount}</td>
                  <td>{loan.loanTenure}</td>
                  <td>{loan.interestRate}</td>
                  <td>{loan.zkpCode}</td>
                  <td>
                    <TextFormat type="date" value={loan.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{loan.createdById}</td>
                  <td>
                    <TextFormat type="date" value={loan.dateUpdated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{loan.updatedById}</td>
                  <td>{loan.agreement ? <Link to={`agreement/${loan.agreement.id}`}>{loan.agreement.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${loan.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${loan.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${loan.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loan }: IRootState) => ({
  loanList: loan.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loan);
