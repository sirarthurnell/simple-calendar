import { Component, Input } from '@angular/core';
import { MonthView } from '../../models/views/moth-view';
import { DayInfo } from '../../models/day-info';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent {

  /**
   * Date to show.
   */
  private _date = new Date();

  get date(): Date {
    return this._date;
  }

  @Input() set date(date: Date) {
    this._date = date;
    this.view = (new MonthView(this._date)).createView();
  }

  /**
   * View of the current month.
   */
  view = (new MonthView(this._date)).createView();

  /**
   * Controls the click event of a day cell.
   * @param dayInfo Info about the selected day.
   */
  onDayClicked(dayInfo: DayInfo): void {
    console.log(dayInfo);
  }

}
