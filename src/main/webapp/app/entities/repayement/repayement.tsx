import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './repayement.reducer';
import { IRepayement } from 'app/shared/model/repayement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRepayementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Repayement extends React.Component<IRepayementProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { repayementList, match } = this.props;
    return (
      <div>
        <h2 id="repayement-heading">
          Repayements
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Repayement
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Repayement Amount</th>
                <th>Zkp Code</th>
                <th>Date Created</th>
                <th>Created By Id</th>
                <th>Date Updated</th>
                <th>Updated By Id</th>
                <th>Repayement</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {repayementList.map((repayement, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${repayement.id}`} color="link" size="sm">
                      {repayement.id}
                    </Button>
                  </td>
                  <td>{repayement.repayementAmount}</td>
                  <td>{repayement.zkpCode}</td>
                  <td>
                    <TextFormat type="date" value={repayement.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{repayement.createdById}</td>
                  <td>
                    <TextFormat type="date" value={repayement.dateUpdated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{repayement.updatedById}</td>
                  <td>{repayement.repayement ? <Link to={`loan/${repayement.repayement.id}`}>{repayement.repayement.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${repayement.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${repayement.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${repayement.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ repayement }: IRootState) => ({
  repayementList: repayement.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repayement);
