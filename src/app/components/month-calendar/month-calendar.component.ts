import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit {

  /**
   * Date to show, by default, the current date.
   */
  @Input() date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
