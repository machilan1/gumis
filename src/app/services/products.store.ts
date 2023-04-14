import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  tapResponse,
} from '@ngrx/component-store';
import { Observable, tap, switchMap, map } from 'rxjs';
import { ProductsService } from './products.service';
// define interfaces

interface Product {
  title: string;
  id: string;
  rating: number;
  price: number;
  thumbnail: string;
}

interface ProductListState {
  products: Product[];
  loading: boolean;
  categories: string[];
  current: string;
}

const initialState: ProductListState = {
  loading: true,
  products: [],
  categories: [],
  current: '',
};

// define store

@Injectable()
export class ProductsStore
  extends ComponentStore<ProductListState>
  implements OnStateInit
{
  readonly productService = inject(ProductsService);

  // 為所有要用的state建立一個變數
  readonly current$ = this.select((state) => state.current);
  readonly categories$ = this.productService.fetchCategories();
  readonly products$ = this.select((state) => state.products);
  readonly loading$ = this.select((state) => state.loading);
  readonly vm$ = this.select({
    categories: this.categories$,
    loading: this.loading$,
    products: this.products$,
    current: this.current$,
  });
  // 初始化state
  constructor() {
    super(initialState);
  }

  //   建立動作、如讀取資料、更新資料等

  readonly loadProducts = this.effect((categoryID$: Observable<string>) => {
    //
    return categoryID$.pipe(
      tap(() => {
        console.log('load products');
        // 更新state load = true
        this.patchState({ loading: true });
      }),
      switchMap((categortyID) =>
        // 使用id去讀取資料
        this.productService.fetchProducts(categortyID).pipe(
          tap(console.log),
          tapResponse(
            (obj) => {
              this.patchState({
                current: obj.categortyID,
                products: obj.products,
                loading: false,
              });
            },

            (err) => {
              alert(err);
            }
          )
        )
      )
    );
  });

  ngrxOnStateInit() {}
}
