import { Component, EventEmitter, forwardRef, HostBinding, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DayInfo } from '../../models/day-info';
import { DAY_NAMES } from '../../models/day-names';
import { MonthView } from '../../models/views/moth-view';
import { DayTemplateDirective } from '../../directives/day-template.directive';
import { DayOfWeekCaptionTemplateDirective } from '../../directives/day-of-week-caption-template.directive';
import { MonthCaptionTemplateDirective } from '../../directives/month-caption-template.directive';

/**
 * Month calendar provider.
 */
export const MONTH_CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MonthCalendarComponent),
  multi: true
};

/**
 * Control that represents a calendar.
 */
@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  providers: [MONTH_CALENDAR_VALUE_ACCESSOR]
})
export class MonthCalendarComponent implements ControlValueAccessor {
  @ContentChild(DayTemplateDirective, { read: TemplateRef }) dayTemplate;
  @ContentChild(DayOfWeekCaptionTemplateDirective, { read: TemplateRef }) dayOfWeekTemplate;
  @ContentChild(MonthCaptionTemplateDirective, { read: TemplateRef }) monthTemplate;

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
   * Formatter for days.
   */
  @Input() dayFormatter: (day: DayInfo) => string;

  /**
   * Captions of the different days of the week.
   */
  daysOfWeekCaptions = DAY_NAMES.map(d =>
    d.substr(0, 2).toUpperCase()
  );

  /**
   * Formatter for the captions of the different
   * days of the week.
   */
  @Input() dayOfWeekCaptionFormatter: (dayOfWeek: number) => string;

  /**
   * Caption of the month.
   */
  monthCaption = this.value.toDateString();

  /**
   * Formatter for the month caption.
   */
  @Input() monthCaptionFormatter: (date: Date) => string;

  /**
   * Retrieves a CSS class for the specified day.
   */
  @Input() customDayClass: (date: Date) => string;

  /**
   * CSS class for the month.
   */
  @Input() monthClass = 'month';

  /**
   * CSS class for the month caption.
   */
  @Input() monthCaptionClass = 'month__caption';

  /**
   * CSS class for the day of the week captions.
   */
  @Input() dayOfWeekCaptionClass = 'month__week-caption';

  /**
   * CSS class for day.
   */
  @Input() dayClass = 'month__day--default';

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

  /**
   * Creates a new instance of MonthCalendarComponent.
   */
  constructor() {
    this.dayOfWeekCaptionFormatter = (dayOfWeek: number): string => {
      const dayNames = DAY_NAMES.map(d =>
        d.substr(0, 2).toUpperCase()
      );

      return dayNames[dayOfWeek];
    };
  }

  writeValue(date: Date): void {
    if (date) {
      if (this.monthCaptionFormatter) {
        this.monthCaption = this.monthCaptionFormatter(date);
      }

      if (this.dayOfWeekCaptionFormatter) {
        const dayCaptions: string[] = [];

        for (let i = 0; i < DAY_NAMES.length; i++) {
          dayCaptions.push(this.dayOfWeekCaptionFormatter(i));
        }

        this.daysOfWeekCaptions = dayCaptions;
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

      if (this.customDayClass) {
        const date = new Date(this.value.valueOf());
        date.setDate(day.day);
        return this.customDayClass(date) || this.dayClass;
      }

      return this.dayClass;
    } else {
      return '';
    }
  }

  /**
   * Gets a formatted string corresponding
   * to the specified day.
   * @param day Day to format.
   */
  getFormattedDay(day: DayInfo): string {
    if (this.dayFormatter) {
      return this.dayFormatter(day);
    } else {
      return day ? day.day.toString() : '';
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
    if (!this.disabled) {
      this.monthClick.emit(this);
    }
  }
}
