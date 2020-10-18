import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {Bill} from '../models/bill.model';

import {catchError} from 'rxjs/operators';
import {BaseApi} from '../../../shared/core/base-api';
import {User} from '../../../shared/models/user.model';


@Injectable()
export class BillService extends BaseApi {
  // WARENTY
  // apiKey = '3ea719d58dbe67bb3e35c62eabf90744';
  // apiUR = 'http://data.fixer.io/api/latest?access_key=3ea719d58dbe67bb3e35c62eabf90744' +
  //   '?access_key =' + this.apiKey +
  //   '&base =' +
  //   '&symbols = GBP,JPY,EUR';
  apiURL = `https://api.exchangerate-api.com/v4/latest/`;

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(id: number): Observable<Bill> {
    return this.get<Bill>(`bills/${id}`);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put(`bills/${bill.id}`, bill);
  }

  getCurrency(base: string = 'UAH'): Observable<any> {
    return this.http.get(
      // '../../../../assets/currency.json')
      this.apiURL + `${base}`)
      .pipe(catchError(err => {
        console.log(err.message);
        return of(null);
      }));
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.post('bills', bill);
  }
}
