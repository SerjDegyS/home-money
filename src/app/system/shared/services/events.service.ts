import {BaseApi} from '../../../shared/core/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DegysEvent} from '../models/event.model';
import {forkJoin, from, Observable, of, pipe, timer} from 'rxjs';
import {
  catchError,
  combineAll,
  concatAll,
  concatMap,
  debounceTime,
  delay,
  map,
  mergeAll,
  mergeMap, scan, subscribeOn,
  switchAll, switchMap, takeLast,
  toArray
} from 'rxjs/operators';
// import {error} from 'util';
// import {subscribeTo, subscribeToObservable, subscribeToResult} from 'rxjs/internal-compatibility';
import {Category} from '../models/category.model';

@Injectable()
export class EventsService extends BaseApi{
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvents(events: DegysEvent[]): Observable<DegysEvent[]> {
    return from(events).pipe(concatMap( e => this.postEvent(e).pipe(delay(1000))
    ), toArray());
  }

  getEvents(categoryId: number): Observable<DegysEvent[]> {
    return this.get<DegysEvent[]>(`events?categoryId=${categoryId}`);
  }

  private postEvent = (e) => {
    console.log('request')
    return this.post<DegysEvent>('events', e)
      .pipe(
        map(res => {
          return (res === null) ? e : res;
        }),
        catchError(err => {
            console.log(err);
            return of(null);
          }
        ));
  }

    getEventsById(id: string): Observable<DegysEvent> {
      return this.get(`events/${id}`);
    }

    deleteEvent(event: DegysEvent) {
     return this.delete('events', event);
    }

    getEventsForCategories(cats: Category[]): Observable<DegysEvent[]> {
      return from(cats).pipe(
        mergeMap(cat => this.getEvents(cat.id)),
        scan((acum, cur) => Array.of(...acum, ...cur), []),
        takeLast(1));
    }

    deleteEventsOfCategory(cat: Category): Observable<DegysEvent[]> {
    return this.getEventsForCategories([cat]).pipe(
      mergeMap(events => from(events).pipe(
        mergeMap( ev => this.deleteEvent(ev)),
        toArray()
      ))
    )
    }

}
