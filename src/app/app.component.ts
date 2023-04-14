import { Component } from '@angular/core';
import { ProductsBannerComponent } from './products-banner/products-banner.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  standalone: true,
  imports: [ProductsBannerComponent],
  selector: 'gumis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gumis';
}
