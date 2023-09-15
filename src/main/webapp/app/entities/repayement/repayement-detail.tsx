import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './repayement.reducer';
import { IRepayement } from 'app/shared/model/repayement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRepayementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RepayementDetail extends React.Component<IRepayementDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { repayementEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Repayement [<b>{repayementEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="repayementAmount">Repayement Amount</span>
            </dt>
            <dd>{repayementEntity.repayementAmount}</dd>
            <dt>
              <span id="zkpCode">Zkp Code</span>
            </dt>
            <dd>{repayementEntity.zkpCode}</dd>
            <dt>
              <span id="dateCreated">Date Created</span>
            </dt>
            <dd>
              <TextFormat value={repayementEntity.dateCreated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdById">Created By Id</span>
            </dt>
            <dd>{repayementEntity.createdById}</dd>
            <dt>
              <span id="dateUpdated">Date Updated</span>
            </dt>
            <dd>
              <TextFormat value={repayementEntity.dateUpdated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedById">Updated By Id</span>
            </dt>
            <dd>{repayementEntity.updatedById}</dd>
            <dt>Repayement</dt>
            <dd>{repayementEntity.repayement ? repayementEntity.repayement.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/repayement" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/repayement/${repayementEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ repayement }: IRootState) => ({
  repayementEntity: repayement.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepayementDetail);
