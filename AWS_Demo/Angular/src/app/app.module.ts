import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { PagingComponent, SortableTableDirective, SortableColumnComponent } from './shared';

import {
  HomeComponent,
  StudentComponent
} from './component';

import {
  DataService,
  SortService
} from './shared';

const APP_COMPONENTS = [
  HomeComponent,
  StudentComponent
];

const APP_PROVIDERS = [
  DataService,
  SortService
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_COMPONENTS,
    PagingComponent,
    SortableTableDirective,
    SortableColumnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ...APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
