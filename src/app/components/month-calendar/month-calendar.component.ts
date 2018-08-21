import { Component, OnInit, Input } from '@angular/core';
import { Month } from '../../models/month';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit {

  /**
   * Month to show.
   */
  @Input() month = new Month<any>();

  /**
   * View of the current month.
   */
  view = this.month.createView(true);

  constructor() { }

  ngOnInit() {
  }

}
