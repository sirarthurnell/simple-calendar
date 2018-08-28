import { Component, OnInit } from '@angular/core';
import { DayOfWeek } from 'simple-calendar/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  date = new Date();

  monthFormatter = (date: Date) => date.toLocaleDateString();

  dayOfWeekFormatter = (dayOfWeek: DayOfWeek) => Math.random().toString().substr(2, 2);

  customDayClass(date: Date): string {
    const classes = {
      1: 'raised',
      2: 'raised-again'
    };

    return classes[date.getDate()];
  }

  createNewMonth(): void {
    this.date = new Date(2014, 1, 1);
  }

  createNewFormatters(): void {
    this.monthFormatter = (date: Date) => 'Blah';
    this.dayOfWeekFormatter = (dayOfWeek: DayOfWeek) => 'XX';
  }
}
