import { DateMath } from '../core/date/date-math';
import { DayOfWeek } from './day-of-week';

/**
 * Creates a data representation of a month.
 */
export class MonthGrid {
  private readonly WEEKS_PER_MONTH = 5;
  private readonly DAYS_PER_WEEK = 7;

  /**
   * Creates a new instance of MonthGrid.
   */
  constructor(private date: Date) {}

  /**
   * Creates the grid corresponding to the month specified
   * by the date.
   * @param completeHoles Indicates if the beginning and end
   * of the grid should be completed with the days of the
   * adjacent months.
   * @param weekStart Day of week to be considered the beginning
   * of the week.
   */
  create(completeHoles = false, weekStart = DayOfWeek.Monday): Array<Array<number>> {
    const currentMonthGrid = this.createGrid(this.date, weekStart);

    if (completeHoles) {
      const needsToBeFilledFromBeginning = currentMonthGrid[0][0] === 0;

      if (needsToBeFilledFromBeginning) {
        const lastMonth = DateMath.substractMonths(this.date, 1);
        const lastDayOfLastMonth = DateMath.getLastDayOfMonth(lastMonth).getDate();

        const firstDayOfCurrentMonth = DateMath.getFirstDayOfMonth(this.date);
        const daysToPickFromLastMonth = firstDayOfCurrentMonth.getDay() - weekStart.valueOf();

        for (let i = 0; i < daysToPickFromLastMonth; i++) {
          currentMonthGrid[0][i] = lastDayOfLastMonth - (daysToPickFromLastMonth - (i + 1));
        }
      }

      let fillingDays = 1;
      for (let week = 0; week < this.WEEKS_PER_MONTH; week++) {
        for (let dayOfWeek = 0; dayOfWeek < this.DAYS_PER_WEEK; dayOfWeek++) {
          if (currentMonthGrid[week][dayOfWeek] === 0) {
            currentMonthGrid[week][dayOfWeek] = fillingDays++;
          }
        }
      }
    }

    return currentMonthGrid;
  }

  /**
   * Creates the grid corresponding to the month specified
   * by the date.
   * @param date Date to use.
   * @param weekStart Day of week which will be considered
   * the beginning of the week.
   */
  private createGrid(date: Date, weekStart = DayOfWeek.Monday): Array<Array<number>> {
    const grid = this.initGrid();
    const firstDayOfWeek =
      DateMath.getFirstDayOfMonth(date).getDay() - weekStart.valueOf();
    const lastDay = DateMath.getLastDayOfMonth(date).getDate();

    let dayOfWeek = firstDayOfWeek;
    let currentDayOfMonth = 1;
    for (let week = 0; week < this.WEEKS_PER_MONTH; week++) {

      for (; dayOfWeek < this.DAYS_PER_WEEK && currentDayOfMonth <= lastDay; dayOfWeek++) {
        grid[week][dayOfWeek] = currentDayOfMonth;
        currentDayOfMonth++;
      }

      dayOfWeek = 0;

    }

    return grid;
  }

  /**
   * Initializes the grid that contains
   * the info about the "shape" of the
   * month.
   */
  private initGrid(): Array<Array<number>> {
    const defaultEmpty = 0;
    const grid = [
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty)
    ];

    return grid;
  }
}
