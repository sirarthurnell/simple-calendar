/**
 * Contains several functions to work with
 * dates in JS.
 */
export class DateMath {

    private constructor() {}

    /**
     * Adds days to the specified date.
     * @param date Date that will be increased.
     * @param days Number of days to add to the specified
     * date.
     */
    static addDays(date: Date, days: number): Date {
        const daysAdded = new Date(date.valueOf());
        daysAdded.setDate(daysAdded.getDate() + days);
        return daysAdded;
    }

    /**
     * Substract days to the specified date.
     * @param date Date that will be decreased.
     * @param days Number of days to substract from
     * the specified date.
     */
    static substractDays(date: Date, days: number): Date {
        return this.addDays(date, -days);
    }

    /**
     * Gets the date corresponding to the first day
     * of the month of the specified date.
     * @param date Date.
     */
    static getFirstDayOfMonth(date: Date): Date {
        const firstDay = new Date();
        firstDay.setFullYear(date.getFullYear(), date.getMonth(), 1);
        return firstDay;
    }

    /**
     * Gets the date corresponding to the last day
     * of the month of the specified date.
     * @param date Date.
     */
    static getLastDayOfMonth(date: Date): Date {
        const lastDay = new Date();
        lastDay.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
        return lastDay;
    }
}