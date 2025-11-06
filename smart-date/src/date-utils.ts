/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtract days from a date
 */
export function subDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

/**
 * Check if year is leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Convert timezone (basic implementation)
 */
export function convertTimezone(date: Date, targetTimezone: string): Date {
  // Note: This is a simplified implementation
  // For full timezone support, consider using libraries like date-fns-tz
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  // This is a placeholder - actual timezone conversion requires timezone data
  return new Date(utc);
}

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export function dayOfWeek(date: Date): number {
  return date.getDay();
}

/**
 * Get day name
 */
export function dayName(date: Date, locale: string = 'en-US'): string {
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

/**
 * Get month name
 */
export function monthName(date: Date, locale: string = 'en-US'): string {
  return date.toLocaleDateString(locale, { month: 'long' });
}

/**
 * Get first day of month
 */
export function firstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get last day of month
 */
export function lastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Compare two dates
 * Returns: -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compareDates(date1: Date, date2: Date): number {
  const time1 = date1.getTime();
  const time2 = date2.getTime();
  if (time1 < time2) return -1;
  if (time1 > time2) return 1;
  return 0;
}

/**
 * Convert UTC to local time
 */
export function utcToLocal(utcDate: Date): Date {
  return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
}

/**
 * Convert local to UTC time
 */
export function localToUtc(localDate: Date): Date {
  return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
}

/**
 * Get time difference in hours/minutes
 */
export function timeDifference(date1: Date, date2: Date): { hours: number; minutes: number } {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

/**
 * Countdown to given date
 */
export function countdown(targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

/**
 * Get age from date of birth
 */
export function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * Get week number of year
 */
export function weekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Check if date is weekend
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

