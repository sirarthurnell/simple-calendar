import { Component, OnInit } from '@angular/core';
import { DayClasses } from './models/day-classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  date = new Date();

  monthCaptionFormatter(date: Date): string {
    return date.toLocaleDateString();
  }

  dayOfWeekCaptionFormatter(dayOfWeek: number): string {
    return Math.random().toString().substr(2, 2);
  }

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
}
