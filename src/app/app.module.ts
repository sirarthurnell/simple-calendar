import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MonthCalendarComponent } from './components/month-calendar/month-calendar.component';
import { DayTemplateDirective } from './directives/day-template.directive';
import { DayOfWeekCaptionTemplateDirective } from './directives/day-of-week-caption-template.directive';
import { MonthCaptionTemplateDirective } from './directives/month-caption-template.directive';

@NgModule({
  declarations: [
    AppComponent,
    MonthCalendarComponent,
    DayTemplateDirective,
    DayOfWeekCaptionTemplateDirective,
    MonthCaptionTemplateDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
