import {Bill} from '../../system/shared/models/bill.model';

export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public bill?: number,
    public id?: number
  ) {}
}
