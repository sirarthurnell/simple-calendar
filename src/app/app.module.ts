import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MonthCalendarModule } from 'simple-calendar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonthCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
