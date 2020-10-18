import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/models/category.model';
import {CategoriesService} from '../shared/services/categories.service';
import {LoginComponent} from '../../auth/login/login.component';
import {Bill} from '../shared/models/bill.model';
import {Subscription} from 'rxjs';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Title} from '@angular/platform-browser';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'degys-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss'],
  animations: [fadeStateTrigger]
})
export class RecordsPageComponent implements OnInit {
  sub1: Subscription;

  categories: Category[] = [];
  billId: number = JSON.parse(window.localStorage.getItem('user')).bill;
  isLoaded = false;
  message = new Message();

  constructor(
              private categoriesService: CategoriesService,
              private title: Title) {
    title.setTitle('Запись категорий и событий');
  }

  ngOnInit() {
    if (this.billId === 1) {
      console.log('11111')
      this.message.showMessage('warning', 'Функционал этой страницы доступен только для зарегистрированых пользователей!', 100000);
    }
    this.sub1 = this.categoriesService.getCategories(this.billId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories.findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

  categoryWasDeleted(category: Category) {
    const idx = this.categories.findIndex(c => c.id === category.id);
    this.categories.splice(idx, 1);
    console.log(this.categories);
  }
}
