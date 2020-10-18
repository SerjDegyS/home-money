import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {DegysEvent} from '../../shared/models/event.model';
import {toArray} from 'rxjs/operators';

@Component({
  selector: 'degys-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: DegysEvent[] = [];

  nameMap = {
    date: 'Дата',
    category: 'Категория',
    type: 'Тип',
    amount: 'Сумма'
  };
  objectKey = Object.keys;

  searchValue = '';
  searchPlaceholder = this.nameMap[this.objectKey(this.nameMap)[0]];
  searchField = this.objectKey(this.nameMap)[0];

  constructor() { }

  ngOnInit() {

    // console.log('hist-ev', this.events.forEach(e => ))
    this.events.forEach( e => e.catName = this.categories.find(c => c.id === e.categoryId).name);
  }

  changeCriteria(field: string) {

    this.searchPlaceholder = this.nameMap[field];
    this.searchField = field;
    console.log(this.searchField);
  }
}
