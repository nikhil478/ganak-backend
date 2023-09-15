import { Moment } from 'moment';
import { ILoan } from 'app/shared/model/loan.model';

export interface IRepayement {
  id?: number;
  repayementAmount?: number;
  zkpCode?: string;
  dateCreated?: Moment;
  createdById?: number;
  dateUpdated?: Moment;
  updatedById?: number;
  repayement?: ILoan;
}

export const defaultValue: Readonly<IRepayement> = {};
