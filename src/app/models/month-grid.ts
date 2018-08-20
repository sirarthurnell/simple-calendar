import { DateMath } from "../core/date/date-math";

/**
 * Creates a data representation of a month.
 */
export class MonthGrid {
    private readonly WEEKS_PER_MONTH = 5;
    private readonly DAYS_PER_WEEK = 7;

    /**
     * Creates a new instance of MonthGrid.
     */
    constructor(private date: Date) { }

    /**
     * Creates the grid with the days of the month.
     */
    createGrid(weekStart = 1): Array<Array<number>> {
        const grid = this.initGrid();
        const firstDayOfWeek = DateMath.getFirstDayOfMonth(this.date).getDay() - weekStart;
        const lastDay = DateMath.getLastDayOfMonth(this.date).getDate();

        let dayOfWeek = firstDayOfWeek;
        let currentDayOfMonth = 1;
        for(let week = 0; week < this.WEEKS_PER_MONTH; week++) {
            
            for(; dayOfWeek < this.DAYS_PER_WEEK && currentDayOfMonth <= lastDay; dayOfWeek++) {
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