import { Moment } from 'moment';
import { ILoan } from 'app/shared/model/loan.model';

export interface IAgreement {
  id?: number;
  fintechName?: string;
  agreementDate?: Moment;
  fldgPerecentage?: number;
  guaranteeType?: string;
  guaranteeDetails?: string;
  agreementNo?: string;
  dateCreated?: Moment;
  createdById?: number;
  dateUpdated?: Moment;
  updatedById?: number;
  loans?: ILoan[];
}

export const defaultValue: Readonly<IAgreement> = {};
