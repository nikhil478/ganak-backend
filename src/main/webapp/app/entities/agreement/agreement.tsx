import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './agreement.reducer';
import { IAgreement } from 'app/shared/model/agreement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAgreementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Agreement extends React.Component<IAgreementProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { agreementList, match } = this.props;
    return (
      <div>
        <h2 id="agreement-heading">
          Agreements
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Agreement
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fintech Name</th>
                <th>Agreement Date</th>
                <th>Fldg Perecentage</th>
                <th>Guarantee Type</th>
                <th>Guarantee Details</th>
                <th>Agreement No</th>
                <th>Date Created</th>
                <th>Created By Id</th>
                <th>Date Updated</th>
                <th>Updated By Id</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {agreementList.map((agreement, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${agreement.id}`} color="link" size="sm">
                      {agreement.id}
                    </Button>
                  </td>
                  <td>{agreement.fintechName}</td>
                  <td>
                    <TextFormat type="date" value={agreement.agreementDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{agreement.fldgPerecentage}</td>
                  <td>{agreement.guaranteeType}</td>
                  <td>{agreement.guaranteeDetails}</td>
                  <td>{agreement.agreementNo}</td>
                  <td>
                    <TextFormat type="date" value={agreement.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{agreement.createdById}</td>
                  <td>
                    <TextFormat type="date" value={agreement.dateUpdated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{agreement.updatedById}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${agreement.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${agreement.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${agreement.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ agreement }: IRootState) => ({
  agreementList: agreement.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Agreement);
