import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, mapTo} from 'rxjs/operators';

export class BaseApi {
  private baseUrl = 'http://localhost:3000/';

  constructor(public http: HttpClient) {}

  private getUrl(url: string): string {
    return this.baseUrl + url;
  }

  public get<T>(url: string = ''): Observable<T> {
    return this.http.get<T>(this.getUrl(url))
      .pipe(catchError(err => {
        console.log(err);
        return of(null);
      }));
  }

  public post<T>(url: string = '', data: T): Observable<T> {
    return this.http.post<T>(this.getUrl(url), data)
      .pipe(catchError(err => {
        console.log(err);
        return  of(null);
      }));
  }

  public put<T>(url: string = '', data: T): Observable<T> {
    return this.http.put<T>(this.getUrl(url), data)
      .pipe(catchError(err => {
        console.log(err);
        return of(null);
      }));
  }

  public delete<T>(url: string, data: T): Observable<T> {
    return this.http.delete(this.getUrl(url + '/' + data['id']))
      .pipe( mapTo(data), catchError(err => {
        console.log(err);
        return of(null);
      }));
  }
}
