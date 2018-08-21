import { DateMath } from '../core/date/date-math';
import { DayOfWeek } from './day-of-week';
import { MonthView } from './views/moth-view';
import { MonthState } from './month-state';
import { DayInfo } from './day-info';

/**
 * Creates a data representation of a month.
 */
export class Month<T> {
  private _firstDayOfMonth: number;
  private _lastDayOfMonth: number;
  private _state = new MonthState<T>();

  /**
   * Creates a new instance of MonthGrid.
   */
  constructor(private date = new Date()) {
    this._firstDayOfMonth = DateMath.getFirstDayOfMonth(this.date).getDate();
    this._lastDayOfMonth = DateMath.getLastDayOfMonth(this.date).getDate();
  }

  /**
   * Sets the data associated with a specified
   * day.
   * @param day Day that the data is related to.
   * @param data Data associated with the specified
   * day.
   */
  setData(day: number, data: T): void {
    this.checkInRange(day);
    this._state[day] = data;
  }

  /**
   * Gets the data associated with the specified
   * day.
   * @param day Day which data will be
   * recovered.
   */
  getData(day: number): T {
    this.checkInRange(day);
    return this._state[day];
  }

  /**
   * Checks that the day specified is within the
   * bounds of the month this instance represents.
   * @param day Day to check.
   */
  private checkInRange(day: number): void {
    if (day < this._firstDayOfMonth || this._lastDayOfMonth < day) {
      throw new Error(`The specified day ${day} is not a valid day for the month specified`);
    }
  }

  /**
   * Creates the grid corresponding to the month specified
   * by the date.
   * @param completeHoles Indicates if the beginning and end
   * of the grid should be completed with the days of the
   * adjacent months.
   * @param weekStart Day of week to be considered the beginning
   * of the week.
   */
  createView(completeHoles = false, weekStart = DayOfWeek.Monday): Array<Array<DayInfo<T>>> {
    const view = new MonthView(this.date, this._state);
    return view.createView(completeHoles, weekStart);
  }
}
