import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {Category} from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi{
  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post<Category>('categories', category);
  }

  getCategories(billId: number): Observable<Category[]> {
    return this.get<Category[]>(`categories?billId=${billId}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put<Category>(`categories/${category.id}`, category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.delete('categories', category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`categories/${id}`);
  }
}
