// import { Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, mapTo} from 'rxjs/operators';

import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi{
  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get<User[]>(`users?email=${email}`)
      .pipe( map((users: User[]) => users[0] ? users[0] : undefined));
  }

  createNewUser(user: User): Observable<User> {
    return this.post<User>('users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.put(`users/${user.uid}`, user);
  }
}
