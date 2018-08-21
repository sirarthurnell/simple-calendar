/**
 * Holds the state of a month.
 */
export class MonthState<T> {
    [day: number]: T;
}