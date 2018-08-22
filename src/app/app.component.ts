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

  dayClasses: DayClasses = {
    1: 'raised'
  };

  createNewMonth(): void {
    this.date = new Date(2014, 1, 1);
    this.dayClasses = {
      1: 'raised',
      2: 'raised-again'
    };
  }
}
