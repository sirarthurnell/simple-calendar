/**
 * Represents information about one
 * day of the month.
 */
export class DayInfo<T> {
    data: T;
    isToday: boolean;
    isHole: boolean;
    day: number;

    /**
     * Creates an empty DataInfo.
     */
    static CreateEmpty(): DayInfo<null> {
        return {
            data: null,
            isToday: false,
            isHole: false,
            day: 0
        };
    }
}