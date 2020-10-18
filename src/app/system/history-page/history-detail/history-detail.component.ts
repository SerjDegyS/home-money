import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {concatMap, mergeMap} from 'rxjs/operators';
import {DegysEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
// import {id} from '@swimlane/ngx-charts';

@Component({
  selector: 'degys-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: DegysEvent;
  category: Category;
  user = window.localStorage.getItem('user');

  isLoaded = false;
  sub1: Subscription;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoriesService: CategoriesService) { }

  ngOnInit() {
    console.log(this.user)
    this.sub1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.eventsService.getEventsById(params.id)),
        mergeMap((event: DegysEvent) => {
           this.event = event;
           return this.categoriesService.getCategoryById(event.categoryId);
        })
      ).subscribe((category: Category) => {
          this.category = category;
          this.isLoaded = true;
        });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
