import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MonthCalendarComponent } from './components/month-calendar/month-calendar.component';
import { MonthCaptionTemplateDirective } from './directives/month-caption-template.directive';
import { DayOfWeekCaptionTemplateDirective } from './directives/day-of-week-caption-template.directive';
import { DayTemplateDirective } from './directives/day-template.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    MonthCalendarComponent,
    MonthCaptionTemplateDirective,
    DayOfWeekCaptionTemplateDirective,
    DayTemplateDirective
  ],
  exports: [
    MonthCalendarComponent,
    MonthCaptionTemplateDirective,
    DayOfWeekCaptionTemplateDirective,
    DayTemplateDirective
  ]
})
export class MonthCalendarModule { }
