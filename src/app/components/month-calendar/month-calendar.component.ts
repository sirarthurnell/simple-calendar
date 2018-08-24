import { Component, EventEmitter, forwardRef, HostBinding, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DayClasses } from '../../models/day-classes';
import { DayInfo } from '../../models/day-info';
import { DAY_NAMES } from '../../models/day-names';
import { MonthView } from '../../models/views/moth-view';

/**
 * Month calendar provider.
 */
export const MONTH_CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MonthCalendarComponent),
  multi: true
};

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  providers: [MONTH_CALENDAR_VALUE_ACCESSOR]
})
export class MonthCalendarComponent implements ControlValueAccessor {
  /**
   * Event raised when the user selects a date.
   */
  @Output('change') change = new EventEmitter<Date>();

  /**
   * Event raised when the user clicks the calendar.
   */
  @Output('monthClick') monthClick = new EventEmitter<MonthCalendarComponent>();

  /**
   * Sets if the control should be in a
   * disabled state.
   */
  @Input() disabled = false;
  @HostBinding('style.opacity') get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  /**
   * Date to show.
   */
  private _value = new Date();

  get value(): Date {
    return this._value;
  }

  @Input() set value(date: Date) {
      this.writeValue(date);
  }

  /**
   * Captions to apply to the days of the week.
   */
  @Input() dayOfWeekCaptions: string[] = DAY_NAMES.map(d =>
    d.substr(0, 2).toUpperCase()
  );

  /**
   * Sets if the calendar should not change the caption
   * of the month automatically.
   */
  @Input() manualMonthCaption = false;

  /**
   * Caption of the month.
   */
  @Input() monthCaption = this.value.toDateString();

  /**
   * CSS classes for different days inside the month.
   */
  @Input() dayClasses: DayClasses = {};

  /**
   * CSS class for day.
   */
  @Input() dayClass = '';

  /**
   * CSS class for the current day.
   */
  @Input() currentDayClass = 'month__day--today';

  /**
   * CSS class for the selected day.
   */
  @Input() selectedDayClass = 'month__day--selected';

  /**
   * View of the current month.
   */
  view = new MonthView(this.value).createView();

  private onChange = (date: Date) => {};
  private onTouched = () => {};

  writeValue(date: Date): void {
    if (date) {
      if (!this.manualMonthCaption) {
        this.monthCaption = date.toDateString();
      }

      this.view = new MonthView(date).createView();
      this._value = date;
    }

    this.onChange(date);
  }

  registerOnChange(fn: (date: Date) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Gets the CSS class applicable to
   * the specified day.
   * @param day Day.
   */
  getClassForDay(day: DayInfo): string {
    if (day) {
      if (day.day === this.value.getDate()) {
        return this.selectedDayClass;
      }

      if (day.isToday) {
        return this.currentDayClass;
      }

      return this.dayClasses[day.day] || this.dayClass;
    } else {
      return '';
    }
  }

  /**
   * Controls the click event of a day cell.
   * @param dayInfo Info about the selected day.
   */
  onDayClick(dayInfo: DayInfo): void {
    if (!this.disabled && dayInfo) {
      const selectedDate = new Date(this.value.valueOf());
      selectedDate.setDate(dayInfo.day);

      this.value = new Date(selectedDate.valueOf());

      this.change.emit(selectedDate);
    }
  }

  /**
   * Controls the click event of the month.
   */
  onMonthClick(): void {
    this.monthClick.emit(this);
  }
}
