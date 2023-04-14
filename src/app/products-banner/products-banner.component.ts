import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { Observable, of, tap } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductsStore } from '../services/products.store';
import { provideComponentStore } from '@ngrx/component-store';
import { Router } from '@angular/router';
@Component({
  selector: 'gumis-products-banner',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [provideComponentStore(ProductsStore)],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="w-full h-64 bg-slate-200 flex justify-center items-center">
        <div class="">
          <div class="text-center h-12 text-2xl">商品種類</div>
          <ul class="flex gap-4 flex-wrap px-8 justify-center">
            <ng-container *ngFor="let category of vm.categories">
              <li>
                <button
                  (click)="onClick(category)"
                  class="bg-white rounded-full px-4 py-2 text-gray-700 hover:bg-slate-700 hover:text-fuchsia-50 "
                >
                  {{ category }}
                </button>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
      <div class="w-full f flex-col bg-white flex justify-center items-center">
        <div class="">商品列表</div>

        <div class="grid grid-cols-3 w-full">
          <ng-container *ngFor="let product of vm.products">
            <div class=" px-4">
              <h1>{{ product.title }}</h1>
              <h1>Price :{{ product.price }}</h1>
              <h1>Price :{{ product.rating }}</h1>
              <img
                class="h-72 w-full aspect-square object-contain object-center"
                [src]="product.thumbnail"
                alt="PruductPic"
              />
            </div>
          </ng-container>
        </div>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class ProductsBannerComponent implements OnInit {
  productService = inject(ProductsService);
  productsStore = inject(ProductsStore);
  router = inject(Router);
  vm$ = this.productsStore.vm$;
  ngOnInit(): void {
    console.log('123');
  }
  onClick(category: string) {
    this.productsStore.loadProducts(category);
    console.log(category);
  }
}
