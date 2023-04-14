import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  HttpClientModule,
  HttpClient,
  HttpHandler,
  provideHttpClient,
} from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).catch((err) => console.error(err));
