import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './agreement.reducer';
import { IAgreement } from 'app/shared/model/agreement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAgreementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AgreementDetail extends React.Component<IAgreementDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { agreementEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Agreement [<b>{agreementEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="fintechName">Fintech Name</span>
            </dt>
            <dd>{agreementEntity.fintechName}</dd>
            <dt>
              <span id="agreementDate">Agreement Date</span>
            </dt>
            <dd>
              <TextFormat value={agreementEntity.agreementDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fldgPerecentage">Fldg Perecentage</span>
            </dt>
            <dd>{agreementEntity.fldgPerecentage}</dd>
            <dt>
              <span id="guaranteeType">Guarantee Type</span>
            </dt>
            <dd>{agreementEntity.guaranteeType}</dd>
            <dt>
              <span id="guaranteeDetails">Guarantee Details</span>
            </dt>
            <dd>{agreementEntity.guaranteeDetails}</dd>
            <dt>
              <span id="agreementNo">Agreement No</span>
            </dt>
            <dd>{agreementEntity.agreementNo}</dd>
            <dt>
              <span id="dateCreated">Date Created</span>
            </dt>
            <dd>
              <TextFormat value={agreementEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdById">Created By Id</span>
            </dt>
            <dd>{agreementEntity.createdById}</dd>
            <dt>
              <span id="dateUpdated">Date Updated</span>
            </dt>
            <dd>
              <TextFormat value={agreementEntity.dateUpdated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedById">Updated By Id</span>
            </dt>
            <dd>{agreementEntity.updatedById}</dd>
          </dl>
          <Button tag={Link} to="/entity/agreement" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/agreement/${agreementEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ agreement }: IRootState) => ({
  agreementEntity: agreement.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgreementDetail);
