/**
 * Represents information about one
 * day of the month.
 */
export class DayInfo {
    isToday: boolean;
    isHole: boolean;
    day: number;

    /**
     * Creates an empty DataInfo.
     */
    static CreateEmpty(): DayInfo {
        return {
            isToday: false,
            isHole: false,
            day: 0
        };
    }
}
