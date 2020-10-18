import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {concatMap, mergeMap, scan, takeLast, toArray} from 'rxjs/operators';
import {concat, from, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {DegysEvent} from '../shared/models/event.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'degys-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss'],
  animations: [fadeStateTrigger]
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1 = new Subscription();

  categories: Category[] = [];
  events: DegysEvent[] = [];
  billId = JSON.parse(window.localStorage.getItem('user')).bill;
  bill: Bill;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService,
              private title: Title) {
    title.setTitle('Планирование');
  }

  ngOnInit() {
    // this.sub1.add(this.billService.getBill(this.bill)
    //   .subscribe(bill => this.bill = bill ));

    this.sub1.add(this.billService.getBill(this.billId).pipe(
      concatMap( (bill: Bill) => {
        this.bill = bill;
        console.log(this.bill)
        return this.categoriesService.getCategories(this.bill.id).pipe(
          mergeMap((cats: Category[]) => {
              this.categories = cats;
              return this.eventsService.getEventsForCategories(cats);
            }));
      }))
      .subscribe(events => {
        console.log(events)
        this.events = events;
        // this.chartData = this.calculateChartData();

        this.isLoaded = true;
      })
    );
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.categoryId === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => total += e.amount, 0);
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  private getPercent(cat: Category): number {
    const percent = (this.getCategoryCost(cat) / cat.capacity) * 100;
    return percent > 100 ? 100 : percent;
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
