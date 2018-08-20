import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonthCalendarComponent } from './components/month-calendar/month-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthCalendarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
