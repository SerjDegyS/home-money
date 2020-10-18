import {Component, OnDestroy, OnInit, setTestabilityGetter} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import * as moment from 'moment';

import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {DegysEvent} from '../shared/models/event.model';
import {BillService} from '../shared/services/bill.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'degys-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
  animations: [fadeStateTrigger]
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;

  billId: number = JSON.parse(window.localStorage.getItem('user')).bill;

  categories: Category[] = [];
  events: DegysEvent[] = [];
  filteredEvents: DegysEvent[] = [];

  chartOutcomeData = [];
  chartIncomeData = [];

  isFilterVisible = false;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventService: EventsService,
              private title: Title) {
    title.setTitle('История событий');
  }

  ngOnInit() {
    // console.log(this.bill.id)
    this.sub1 = this.billService.getBill(this.billId).pipe(
      mergeMap(bill => this.categoriesService.getCategories(bill.id).pipe(
        mergeMap((cats: Category[]) => {
          this.categories = cats;
          return this.eventService.getEventsForCategories(cats);
        }))))
        .subscribe(events => {
            this.events = events;

            this.setOriginalEvents();
            this.calculateChartData();

            this.isLoaded = true;
          });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  private calculateChartData() {
    this.chartOutcomeData = this.calculateChartDataByType('outcome');
    this.chartIncomeData = this.calculateChartDataByType('income');
  }

  private calculateChartDataByType(type: string): any {
    return this.categories.map(cat => {
        return  {
          name: cat.name,
          value: this.filteredEvents.filter((e) => e.categoryId === cat.id && e.type === type)
            .reduce((total, e) => total += e.amount, 0)
        };
      }
    );
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter(e => filterData.types.indexOf(e.type) !== -1)
      .filter(e => filterData.categories.indexOf(e.categoryId.toString()) !== -1)
      .filter((e) => {
        const momentData = moment(e.date, 'DD.MM.YYYY HH.mm.ss');
        return momentData.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
