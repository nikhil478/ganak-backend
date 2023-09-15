import { Moment } from 'moment';
import { IRepayement } from 'app/shared/model/repayement.model';
import { IAgreement } from 'app/shared/model/agreement.model';

export interface ILoan {
  id?: number;
  loaneeName?: string;
  dob?: number;
  address?: string;
  contact?: string;
  disbursementDate?: Moment;
  loanAmount?: number;
  loanTenure?: number;
  interestRate?: number;
  zkpCode?: string;
  dateCreated?: Moment;
  createdById?: number;
  dateUpdated?: Moment;
  updatedById?: number;
  repayements?: IRepayement[];
  agreement?: IAgreement;
}

export const defaultValue: Readonly<ILoan> = {};
