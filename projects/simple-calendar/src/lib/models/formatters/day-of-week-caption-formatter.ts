import { DAY_NAMES } from '../day-names';
import { DayOfWeek } from '../day-of-week';

/**
 * Default formatter for the captions of the days
 * of the week.
 * @param dayOfWeek Day of the week.
 */
export function defaultDayOfWeekCaptionFormatterFactory(firstDayOfWeek: DayOfWeek): (dayOfWeek: DayOfWeek) => string {
  return (dayOfWeek: DayOfWeek) => {
    const formattedDayNames = DAY_NAMES.map(
      dayName => formatDayName(dayName)
    );

    const reordered = reorderDays(formattedDayNames, firstDayOfWeek);
    return reordered[dayOfWeek.valueOf()];
  };
}

/**
 * Applies formatting to the name of the day.
 * @param dayName Name of the day.
 */
function formatDayName(dayName: string): string {
  const newDayName = dayName.substr(0, 1).toUpperCase() + dayName.substr(1, 1).toLowerCase();
  return newDayName;
}

/**
 * Reorders the array of names so the first index
 * corresponds with the name of the first day of
 * the week.
 * @param dayNames Array with the names of the days
 * of the week.
 * @param firstDayOfWeek First day of the week.
 */
function reorderDays(dayNames: string[], firstDayOfWeek: DayOfWeek): string[] {
  const dayCount = DAY_NAMES.length;

  const dayIndex = firstDayOfWeek.valueOf();
  const reordered = (new Array(dayCount)).fill(0);
  for (let i = 0; i < dayCount; i++) {
    const newPosition = (i + dayIndex) % dayCount;
    reordered[i] = dayNames[newPosition];
  }

  return reordered;
}
