import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAgreement } from 'app/shared/model/agreement.model';
import { getEntities as getAgreements } from 'app/entities/agreement/agreement.reducer';
import { getEntity, updateEntity, createEntity, reset } from './loan.reducer';
import { ILoan } from 'app/shared/model/loan.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILoanUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILoanUpdateState {
  isNew: boolean;
  agreementId: string;
}

export class LoanUpdate extends React.Component<ILoanUpdateProps, ILoanUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      agreementId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getAgreements();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { loanEntity } = this.props;
      const entity = {
        ...loanEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/loan');
  };

  render() {
    const { loanEntity, agreements, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.loan.home.createOrEditLabel">Create or edit a Loan</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : loanEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="loan-id">ID</Label>
                    <AvInput id="loan-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="loaneeNameLabel" for="loan-loaneeName">
                    Loanee Name
                  </Label>
                  <AvField id="loan-loaneeName" type="text" name="loaneeName" />
                </AvGroup>
                <AvGroup>
                  <Label id="dobLabel" for="loan-dob">
                    Dob
                  </Label>
                  <AvField id="loan-dob" type="string" className="form-control" name="dob" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="loan-address">
                    Address
                  </Label>
                  <AvField id="loan-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="contactLabel" for="loan-contact">
                    Contact
                  </Label>
                  <AvField id="loan-contact" type="text" name="contact" />
                </AvGroup>
                <AvGroup>
                  <Label id="disbursementDateLabel" for="loan-disbursementDate">
                    Disbursement Date
                  </Label>
                  <AvField id="loan-disbursementDate" type="date" className="form-control" name="disbursementDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="loanAmountLabel" for="loan-loanAmount">
                    Loan Amount
                  </Label>
                  <AvField id="loan-loanAmount" type="string" className="form-control" name="loanAmount" />
                </AvGroup>
                <AvGroup>
                  <Label id="loanTenureLabel" for="loan-loanTenure">
                    Loan Tenure
                  </Label>
                  <AvField id="loan-loanTenure" type="string" className="form-control" name="loanTenure" />
                </AvGroup>
                <AvGroup>
                  <Label id="interestRateLabel" for="loan-interestRate">
                    Interest Rate
                  </Label>
                  <AvField id="loan-interestRate" type="string" className="form-control" name="interestRate" />
                </AvGroup>
                <AvGroup>
                  <Label id="zkpCodeLabel" for="loan-zkpCode">
                    Zkp Code
                  </Label>
                  <AvField id="loan-zkpCode" type="text" name="zkpCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateCreatedLabel" for="loan-dateCreated">
                    Date Created
                  </Label>
                  <AvField id="loan-dateCreated" type="date" className="form-control" name="dateCreated" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByIdLabel" for="loan-createdById">
                    Created By Id
                  </Label>
                  <AvField id="loan-createdById" type="string" className="form-control" name="createdById" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateUpdatedLabel" for="loan-dateUpdated">
                    Date Updated
                  </Label>
                  <AvField id="loan-dateUpdated" type="date" className="form-control" name="dateUpdated" />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedByIdLabel" for="loan-updatedById">
                    Updated By Id
                  </Label>
                  <AvField id="loan-updatedById" type="string" className="form-control" name="updatedById" />
                </AvGroup>
                <AvGroup>
                  <Label for="loan-agreement">Agreement</Label>
                  <AvInput id="loan-agreement" type="select" className="form-control" name="agreement.id">
                    <option value="" key="0" />
                    {agreements
                      ? agreements.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/loan" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  agreements: storeState.agreement.entities,
  loanEntity: storeState.loan.entity,
  loading: storeState.loan.loading,
  updating: storeState.loan.updating,
  updateSuccess: storeState.loan.updateSuccess
});

const mapDispatchToProps = {
  getAgreements,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanUpdate);
