import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';
import {Message} from '../../../shared/models/message.model';
import {Bill} from '../../shared/models/bill.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'degys-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class AddCategoryComponent implements OnInit{

  @Output() onCategoryAdd = new EventEmitter<Category>();
  billId: number = JSON.parse(window.localStorage.getItem('user')).bill;
  message = new Message();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let { name, capacity } = form.value;
    if (capacity < 0) { capacity *= -1; }
    console.log(form)

    const category = new Category(name, capacity, this.billId);
    this.categoriesService.addCategory(category)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
        this.message.showMessage('success', 'Каткгория успешно создана.', 5000);
        console.log(category);
      });
  }
}
