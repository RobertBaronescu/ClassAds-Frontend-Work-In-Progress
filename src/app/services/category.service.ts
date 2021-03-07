import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { Subcategory } from '../interfaces/subcategory.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  getSubcategories(categoryId: string): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(
      `http://localhost:3000/categories/subcategories/${categoryId}`
    );
  }
}
