import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './loan.reducer';
import { ILoan } from 'app/shared/model/loan.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoanDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LoanDetail extends React.Component<ILoanDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { loanEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Loan [<b>{loanEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="loaneeName">Loanee Name</span>
            </dt>
            <dd>{loanEntity.loaneeName}</dd>
            <dt>
              <span id="dob">Dob</span>
            </dt>
            <dd>{loanEntity.dob}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{loanEntity.address}</dd>
            <dt>
              <span id="contact">Contact</span>
            </dt>
            <dd>{loanEntity.contact}</dd>
            <dt>
              <span id="disbursementDate">Disbursement Date</span>
            </dt>
            <dd>
              <TextFormat value={loanEntity.disbursementDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="loanAmount">Loan Amount</span>
            </dt>
            <dd>{loanEntity.loanAmount}</dd>
            <dt>
              <span id="loanTenure">Loan Tenure</span>
            </dt>
            <dd>{loanEntity.loanTenure}</dd>
            <dt>
              <span id="interestRate">Interest Rate</span>
            </dt>
            <dd>{loanEntity.interestRate}</dd>
            <dt>
              <span id="zkpCode">Zkp Code</span>
            </dt>
            <dd>{loanEntity.zkpCode}</dd>
            <dt>
              <span id="dateCreated">Date Created</span>
            </dt>
            <dd>
              <TextFormat value={loanEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdById">Created By Id</span>
            </dt>
            <dd>{loanEntity.createdById}</dd>
            <dt>
              <span id="dateUpdated">Date Updated</span>
            </dt>
            <dd>
              <TextFormat value={loanEntity.dateUpdated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedById">Updated By Id</span>
            </dt>
            <dd>{loanEntity.updatedById}</dd>
            <dt>Agreement</dt>
            <dd>{loanEntity.agreement ? loanEntity.agreement.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/loan" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/loan/${loanEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ loan }: IRootState) => ({
  loanEntity: loan.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanDetail);
