import { Component, EventEmitter, forwardRef, HostBinding, Input, Output, ContentChild, TemplateRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DayInfo } from '../../models/day-info';
import { DAY_NAMES } from '../../models/day-names';
import { MonthView } from '../../models/views/moth-view';
import { DayTemplateDirective } from '../../directives/day-template.directive';
import { DayOfWeekCaptionTemplateDirective } from '../../directives/day-of-week-caption-template.directive';
import { MonthCaptionTemplateDirective } from '../../directives/month-caption-template.directive';
import { DayOfWeek } from '../../models/day-of-week';
import { defaultDayOfWeekCaptionFormatterFactory } from '../../models/formatters/day-of-week-caption-formatter';
import { GrowMode } from '../../models/grow-mode';

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
  selector: 'sc-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  providers: [MONTH_CALENDAR_VALUE_ACCESSOR]
})
export class MonthCalendarComponent implements ControlValueAccessor, OnInit {
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
   * Specifies how a day cell should grow.
   */
  private _grow: GrowMode = { mode: 'stretch' };

  @Input() set grow (mode: GrowMode) {
    if (mode) {
      this._grow = mode;
    } else {
      this._grow = { mode: 'stretch' };
    }
  }

  get grow(): GrowMode {
    return this._grow;
  }

  private defaultFirstDayOfWeek = DayOfWeek.Sunday;

  private defaultDayOfWeekCaptionFormatter = defaultDayOfWeekCaptionFormatterFactory(this.defaultFirstDayOfWeek);

  /**
   * First day of the week.
   */
  private _firstDayOfWeek: DayOfWeek = this.defaultFirstDayOfWeek;

  @Input() set firstDayOfWeek (dayOfWeek: DayOfWeek) {
    this._firstDayOfWeek = dayOfWeek;
    this.defaultDayOfWeekCaptionFormatter = defaultDayOfWeekCaptionFormatterFactory(this._firstDayOfWeek);
    this.refresh();
  }

  get firstDayOfWeek(): DayOfWeek {
    return this._firstDayOfWeek;
  }

  /**
   * Formatter for days.
   */
  private _dayFormatter: (day?: DayInfo) => string;

  @Input() set dayFormatter (formatter: (day?: DayInfo) => string) {
    this._dayFormatter = formatter;
    this.refresh();
  }

  get dayFormatter(): (day?: DayInfo) => string {
    return this._dayFormatter;
  }

  /**
   * Captions of the different days of the week.
   */
  daysOfWeekCaptions;

  /**
   * Formatter for the captions of the different
   * days of the week.
   */
  private _dayOfWeekCaptionFormatter: (dayOfWeek: DayOfWeek) => string;

  @Input() set dayOfWeekCaptionFormatter (formatter: (dayOfWeek: DayOfWeek) => string) {
    this._dayOfWeekCaptionFormatter = formatter;
    this.refresh();
  }

  get dayOfWeekCaptionFormatter(): (dayOfWeek: DayOfWeek) => string {
    return this._dayOfWeekCaptionFormatter;
  }

  /**
   * Caption of the month.
   */
  monthCaption;

  /**
   * Formatter for the month caption.
   */
  private _monthCaptionFormatter: (date: Date) => string;

  @Input() set monthCaptionFormatter (formatter: (date: Date) => string) {
    this._monthCaptionFormatter = formatter;
    this.refresh();
  }

  get monthCaptionFormatter(): (date: Date) => string {
    return this._monthCaptionFormatter;
  }

  /**
   * Retrieves a CSS class for the specified day.
   */
  @Input() customDayClass: (date: Date) => string;

  /**
   * CSS class for the month.
   */
  @Input() monthClass = 'sc-month';

  /**
   * CSS class for the disabled state.
   */
  @Input() disabledClass = 'sc-month--disabled';

  /**
   * CSS class for the month caption.
   */
  @Input() monthCaptionClass = 'sc-month__caption';

  /**
   * CSS class for the day of the week captions.
   */
  @Input() dayOfWeekCaptionClass = 'sc-month__week-caption';

  /**
   * CSS class for the day captions.
   */
  @Input() dayCaptionClass = 'sc-month__day';

  /**
   * CSS class for the current day.
   */
  @Input() currentDayClass = 'sc-month__day--today';

  /**
   * CSS class for the day when the state is disabled.
   */
  @Input() disabledDayClass = 'sc-month__day--disabled';

  /**
   * CSS class for the selected day.
   */
  @Input() selectedDayClass = 'sc-month__day--selected';

  /**
   * View of the current month.
   */
  view;

  private defaultMonthCaptionFormatter = (date: Date) => date.toDateString();
  private defaultDayFormatter = (day?: DayInfo) => day ? day.day.toString() : '';
  private onChange = (date: Date) => { };
  private onTouched = () => { };

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.refresh();
  }

  writeValue(date: Date): void {
    if (date) {
      this._value = date;
      this.refresh();
      this.onChange(date);
    }
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
   * Refreshes the component.
   */
  private refresh(): void {
    this.refreshMonthCaption(this.value);
    this.refreshDayOfWeekCaptions();
    this.refreshView(this.value);
  }

  /**
   * Refreshes the month caption.
   * @param date Date.
   */
  private refreshMonthCaption(date: Date): void {
    if (this.monthCaptionFormatter) {
      this.monthCaption = this.monthCaptionFormatter(date);
    } else {
      this.monthCaption = this.defaultMonthCaptionFormatter(date);
    }
  }

  /**
   * Refreshes the day of week captions.
   */
  private refreshDayOfWeekCaptions(): void {
    const dayCaptions: string[] = [];

    const dayOfWeekFormatter = this.dayOfWeekCaptionFormatter ?
      this.dayOfWeekCaptionFormatter :
      this.defaultDayOfWeekCaptionFormatter;

    for (let i = 0; i < DAY_NAMES.length; i++) {
      dayCaptions.push(dayOfWeekFormatter(i));
    }

    this.daysOfWeekCaptions = dayCaptions;
  }

  /**
   * Refreshes the calendar view.
   * @param date Date.
   */
  private refreshView(date: Date): void {
    this.view = new MonthView(date).createView(false, this.firstDayOfWeek);
  }

  /**
   * Gets the CSS classes to apply to the month.
   */
  getClassForMonth(): string {
    let classesToApply = this.monthClass;

    if (this.disabled) {
      classesToApply = this.monthClass + ' ' + this.disabledClass;
    }

    return classesToApply;
  }

  /**
   * Gets the CSS class applicable to
   * the specified day.
   * @param day Day.
   */
  getClassForDay(day?: DayInfo): string {
    let dayClassToApply = '';

    if (day) {

      if (day.day === this.value.getDate()) {
        dayClassToApply = this.selectedDayClass;
      } else if (day.isToday) {
        dayClassToApply = this.currentDayClass;
      } else if (this.customDayClass) {
        const date = new Date(this.value.valueOf());
        date.setDate(day.day);
        dayClassToApply = this.customDayClass(date);
      }

      if (this.disabled) {
        dayClassToApply = dayClassToApply + ' ' + this.disabledDayClass;
      }

      return this.dayCaptionClass + ' ' + dayClassToApply;
    } else {
      return this.dayCaptionClass;
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
      return this.defaultDayFormatter(day);
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
