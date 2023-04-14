import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  fetchCategories() {
    const a = this.http.get<string[]>(
      'https://dummyjson.com/products/categories'
    );
    return a;
  }

  fetchProducts(categoryID: string) {
    return this.http.get<object>(
      `https://dummyjson.com/products/category/${categoryID}`
    );
  }
}
