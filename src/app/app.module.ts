import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MonthCalendarComponent } from './components/month-calendar/month-calendar.component';
import { DayTemplateDirective } from './directives/day-template.directive';

@NgModule({
  declarations: [
    AppComponent,
    MonthCalendarComponent,
    DayTemplateDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
