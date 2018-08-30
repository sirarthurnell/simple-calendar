import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.scss']
})
export class StylingComponent {

  /**
   * CSS class for the month.
   */
  monthClass = 'custom-month';

  /**
   * CSS class for the month caption.
   */
  monthCaptionClass = 'custom-month__caption';

  /**
   * CSS class for the day of the week captions.
   */
  dayOfWeekCaptionClass = 'custom-month__week-caption';

  /**
   * CSS class for the day captions.
   */
  dayCaptionClass = 'custom-month__day';

  /**
   * CSS class for day.
   */
  defaultDayClass = 'custom-month__day--default';

  /**
   * CSS class for the current day.
   */
  currentDayClass = 'custom-month__day--today';

  /**
   * CSS class for the selected day.
   */
  selectedDayClass = 'custom-month__day--selected';

  /**
   * Defines CSS classes for specific days.
   * @param date Date.
   */
  customDayClass(date: Date): string {
    const classes = {
      1: 'first-day',
      15: 'important-appointment'
    };

    let classesToApply = classes[date.getDate()];

    if (date.getDay() === 0) {
      classesToApply += ' ' + 'sundays';
    }

    return classesToApply;
  }

}
