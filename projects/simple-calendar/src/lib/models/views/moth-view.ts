import { DayOfWeek } from '../day-of-week';
import { DateMath } from '../dates/date-math';
import { DayInfo } from '../day-info';

/**
 * Creates a view of a month.
 */
export class MonthView {
    private readonly WEEKS_PER_MONTH = 6;
    private readonly DAYS_PER_WEEK = 7;

  /**
   * Creates a new instance of MonthView.
   * @param date Date of the month.
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
  createView(completeHoles = false, weekStart = DayOfWeek.Monday): Array<Array<DayInfo>> {
    const currentMonthGrid = this.createGrid(this.date, weekStart);

    if (completeHoles) {
      const needsToBeFilledFromBeginning = !!!currentMonthGrid[0][0];

      if (needsToBeFilledFromBeginning) {
        const lastMonth = DateMath.substractMonths(this.date, 1);
        const lastDayOfLastMonth = DateMath.getLastDayOfMonth(lastMonth).getDate();

        const firstDayOfCurrentMonth = DateMath.getFirstDayOfMonth(this.date);
        const daysToPickFromLastMonth = firstDayOfCurrentMonth.getDay() - weekStart.valueOf();

        for (let i = 0; i < daysToPickFromLastMonth; i++) {
          const currentDayOfMonth = lastDayOfLastMonth - (daysToPickFromLastMonth - (i + 1));
          const currentDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), currentDayOfMonth);

          currentMonthGrid[0][i] = {
            isToday: false,
            isSelected: false,
            day: currentDayOfMonth,
            date: currentDate
          };
        }
      }

      let fillingDays = 1;
      for (let week = 0; week < this.WEEKS_PER_MONTH; week++) {
        for (let dayOfWeek = 0; dayOfWeek < this.DAYS_PER_WEEK; dayOfWeek++) {
          if (!!!currentMonthGrid[week][dayOfWeek]) {

            const fillingDates = new Date(this.date.getFullYear(), this.date.getMonth(), fillingDays++);

            currentMonthGrid[week][dayOfWeek] = {
              isToday: false,
              isSelected: false,
              day: fillingDays,
              date: fillingDates
            };
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
  private createGrid(date: Date, weekStart = DayOfWeek.Monday): Array<Array<DayInfo>> {
    const grid = this.initGrid();
    const firstDayOfWeek =
      DateMath.getFirstDayOfMonth(date).getDay() - weekStart.valueOf();
    const lastDay = DateMath.getLastDayOfMonth(date).getDate();

    const today = new Date();
    let dayOfWeek = firstDayOfWeek;
    let currentDayOfMonth = 1;
    for (let week = 0; week < this.WEEKS_PER_MONTH; week++) {

      for (; dayOfWeek < this.DAYS_PER_WEEK && currentDayOfMonth <= lastDay; dayOfWeek++) {
        const todaySameYear = today.getFullYear() === this.date.getFullYear();
        const todaySameMonth = today.getMonth() === this.date.getMonth();
        const todaySameDay = today.getDate() === currentDayOfMonth;
        const currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), currentDayOfMonth);

        grid[week][dayOfWeek] = {
          isToday: todaySameYear && todaySameMonth && todaySameDay,
          isSelected: this.date.getDate() === currentDayOfMonth,
          day: currentDayOfMonth,
          date: currentDate
        };

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
  private initGrid(): Array<Array<DayInfo>> {
    const defaultEmpty = undefined;
    const grid = [
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty),
      new Array(this.DAYS_PER_WEEK).fill(defaultEmpty)
    ];

    return grid;
  }
}
