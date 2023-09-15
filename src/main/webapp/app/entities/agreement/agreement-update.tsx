import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './agreement.reducer';
import { IAgreement } from 'app/shared/model/agreement.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAgreementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAgreementUpdateState {
  isNew: boolean;
}

export class AgreementUpdate extends React.Component<IAgreementUpdateProps, IAgreementUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { agreementEntity } = this.props;
      const entity = {
        ...agreementEntity,
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
    this.props.history.push('/entity/agreement');
  };

  render() {
    const { agreementEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.agreement.home.createOrEditLabel">Create or edit a Agreement</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : agreementEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="agreement-id">ID</Label>
                    <AvInput id="agreement-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="fintechNameLabel" for="agreement-fintechName">
                    Fintech Name
                  </Label>
                  <AvField id="agreement-fintechName" type="text" name="fintechName" />
                </AvGroup>
                <AvGroup>
                  <Label id="agreementDateLabel" for="agreement-agreementDate">
                    Agreement Date
                  </Label>
                  <AvField id="agreement-agreementDate" type="date" className="form-control" name="agreementDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="fldgPerecentageLabel" for="agreement-fldgPerecentage">
                    Fldg Perecentage
                  </Label>
                  <AvField id="agreement-fldgPerecentage" type="string" className="form-control" name="fldgPerecentage" />
                </AvGroup>
                <AvGroup>
                  <Label id="guaranteeTypeLabel" for="agreement-guaranteeType">
                    Guarantee Type
                  </Label>
                  <AvField id="agreement-guaranteeType" type="text" name="guaranteeType" />
                </AvGroup>
                <AvGroup>
                  <Label id="guaranteeDetailsLabel" for="agreement-guaranteeDetails">
                    Guarantee Details
                  </Label>
                  <AvField id="agreement-guaranteeDetails" type="text" name="guaranteeDetails" />
                </AvGroup>
                <AvGroup>
                  <Label id="agreementNoLabel" for="agreement-agreementNo">
                    Agreement No
                  </Label>
                  <AvField id="agreement-agreementNo" type="text" name="agreementNo" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateCreatedLabel" for="agreement-dateCreated">
                    Date Created
                  </Label>
                  <AvField id="agreement-dateCreated" type="date" className="form-control" name="dateCreated" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByIdLabel" for="agreement-createdById">
                    Created By Id
                  </Label>
                  <AvField id="agreement-createdById" type="string" className="form-control" name="createdById" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateUpdatedLabel" for="agreement-dateUpdated">
                    Date Updated
                  </Label>
                  <AvField id="agreement-dateUpdated" type="date" className="form-control" name="dateUpdated" />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedByIdLabel" for="agreement-updatedById">
                    Updated By Id
                  </Label>
                  <AvField id="agreement-updatedById" type="string" className="form-control" name="updatedById" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/agreement" replace color="info">
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
  agreementEntity: storeState.agreement.entity,
  loading: storeState.agreement.loading,
  updating: storeState.agreement.updating,
  updateSuccess: storeState.agreement.updateSuccess
});

const mapDispatchToProps = {
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
)(AgreementUpdate);
