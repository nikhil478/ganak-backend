import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILoan } from 'app/shared/model/loan.model';
import { getEntities as getLoans } from 'app/entities/loan/loan.reducer';
import { getEntity, updateEntity, createEntity, reset } from './repayement.reducer';
import { IRepayement } from 'app/shared/model/repayement.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRepayementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRepayementUpdateState {
  isNew: boolean;
  repayementId: string;
}

export class RepayementUpdate extends React.Component<IRepayementUpdateProps, IRepayementUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      repayementId: '0',
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

    this.props.getLoans();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { repayementEntity } = this.props;
      const entity = {
        ...repayementEntity,
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
    this.props.history.push('/entity/repayement');
  };

  render() {
    const { repayementEntity, loans, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.repayement.home.createOrEditLabel">Create or edit a Repayement</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : repayementEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="repayement-id">ID</Label>
                    <AvInput id="repayement-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="repayementAmountLabel" for="repayement-repayementAmount">
                    Repayement Amount
                  </Label>
                  <AvField id="repayement-repayementAmount" type="string" className="form-control" name="repayementAmount" />
                </AvGroup>
                <AvGroup>
                  <Label id="zkpCodeLabel" for="repayement-zkpCode">
                    Zkp Code
                  </Label>
                  <AvField id="repayement-zkpCode" type="text" name="zkpCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateCreatedLabel" for="repayement-dateCreated">
                    Date Created
                  </Label>
                  <AvField id="repayement-dateCreated" type="date" className="form-control" name="dateCreated" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByIdLabel" for="repayement-createdById">
                    Created By Id
                  </Label>
                  <AvField id="repayement-createdById" type="string" className="form-control" name="createdById" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateUpdatedLabel" for="repayement-dateUpdated">
                    Date Updated
                  </Label>
                  <AvField id="repayement-dateUpdated" type="date" className="form-control" name="dateUpdated" />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedByIdLabel" for="repayement-updatedById">
                    Updated By Id
                  </Label>
                  <AvField id="repayement-updatedById" type="string" className="form-control" name="updatedById" />
                </AvGroup>
                <AvGroup>
                  <Label for="repayement-repayement">Repayement</Label>
                  <AvInput id="repayement-repayement" type="select" className="form-control" name="repayement.id">
                    <option value="" key="0" />
                    {loans
                      ? loans.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/repayement" replace color="info">
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
  loans: storeState.loan.entities,
  repayementEntity: storeState.repayement.entity,
  loading: storeState.repayement.loading,
  updating: storeState.repayement.updating,
  updateSuccess: storeState.repayement.updateSuccess
});

const mapDispatchToProps = {
  getLoans,
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
)(RepayementUpdate);
