import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';
import {EventsService} from '../../shared/services/events.service';
import {mergeMap} from 'rxjs/operators';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'degys-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  @Output() onCategoryDelete = new EventEmitter<Category>();

  sub = new Subscription();

  currentCategoryId = 1;
  currentCategory: Category;
  billId: number = JSON.parse(window.localStorage.getItem('user')).bill;
  message: Message = new Message();

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    // this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let {name, capacity} = form.value;
    if (capacity < 0) { capacity *= -1; }

    const category = new Category(name, capacity, this.billId, +this.currentCategory.id);

    this.sub.add(this.categoriesService.updateCategory(category)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((category: Category) => {
        if (category) {
          this.onCategoryEdit.emit(category);
          this.message.showMessage('success', 'Каткгория успешно отредактирована.', 5000);
        } else {
          this.message.showMessage('danger', 'Произошла ошибка! Попробуйте еще раз...');
        }
      }));
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  deleteGategory() {
    this.onCategoryChange();
    if (window.confirm(`Вы действительно хотите уалить категорию ${this.currentCategory.name.toUpperCase()} и связаные с нею события?`)) {
      this.sub.add(this.eventsService.getEventsForCategories([this.currentCategory]).pipe(
        mergeMap(() => this.categoriesService.deleteCategory(this.currentCategory))
      )
        .subscribe(catgory => {
          this.onCategoryDelete.emit(catgory);
          this.message.showMessage('danger', 'Каткгория и ее события успешно удалины.', 5000);
          console.log(catgory);
        }));
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
