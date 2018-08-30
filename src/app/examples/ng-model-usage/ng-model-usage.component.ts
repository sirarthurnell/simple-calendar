import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-model-usage',
  templateUrl: './ng-model-usage.component.html',
  styleUrls: ['./ng-model-usage.component.scss']
})
export class NgModelUsageComponent {

  /**
   * Sets the date to the current one.
   */
  date = new Date();

  /**
   * Date to show.
   */
  newDate = '';

  /**
   * Message to show in case of error.
   */
  message = '';

  /**
   * Sets the new date to show.
   */
  showDate(): void {
    const dateToApply = Date.parse(this.newDate);

    if (isNaN(dateToApply) === false) {
      this.date = new Date(dateToApply);
      this.message = '';
    } else {
      this.message = 'Invalid date, try again.';
    }
  }

}
