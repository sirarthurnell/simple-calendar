import { Component, OnInit } from '@angular/core';
import { DayInfo, DayOfWeek } from 'projects/simple-calendar/src/public_api';

/**
 * Shows the use of formatters.
 */
@Component({
  selector: 'app-formatters',
  templateUrl: './formatters.component.html',
  styleUrls: ['./formatters.component.scss']
})
export class FormattersComponent {

  // Adds zero in the case of one digit
  // number.
  dayFormatter = (dayInfo?: DayInfo) => {
    if (dayInfo) {
      return ('0' + dayInfo.day).slice(-2);
    }
  }

  // Three letter names for the names
  // of the days of the week.
  dayOfWeekFormatter = (dayOfWeek: DayOfWeek) => {
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return dayNames[dayOfWeek.valueOf()];
  }

  // Locale string for the date.
  monthFormatter = (date: Date) => {
    return date.toLocaleDateString();
  }

}
