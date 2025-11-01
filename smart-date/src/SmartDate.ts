import { formatRelative, formatAbsolute } from './formatters';
import type { SmartDateOptions, RelativeTimeOptions } from './types';

export class SmartDate {
  private date: Date;
  private options: SmartDateOptions;

  constructor(date?: Date | string | number, options: SmartDateOptions = {}) {
    this.date = date ? new Date(date) : new Date();
    this.options = options;
  }

  /**
   * Returns human-readable relative time (e.g., "2h ago", "yesterday", "next Monday")
   */
  fromNow(options?: RelativeTimeOptions): string {
    return formatRelative(this.date, options);
  }

  /**
   * Returns relative time from a specific date
   */
  from(date: Date | string | number, options?: RelativeTimeOptions): string {
    return formatRelative(this.date, options, new Date(date));
  }

  /**
   * Returns formatted date string
   */
  format(pattern?: string): string {
    return formatAbsolute(this.date, pattern, this.options.locale);
  }

  /**
   * Returns the underlying Date object
   */
  toDate(): Date {
    return new Date(this.date);
  }

  /**
   * Returns timestamp
   */
  getTime(): number {
    return this.date.getTime();
  }

  /**
   * Checks if date is in the future
   */
  isFuture(): boolean {
    return this.date.getTime() > Date.now();
  }

  /**
   * Checks if date is in the past
   */
  isPast(): boolean {
    return this.date.getTime() < Date.now();
  }

  /**
   * Checks if date is today
   */
  isToday(): boolean {
    const today = new Date();
    return (
      this.date.getDate() === today.getDate() &&
      this.date.getMonth() === today.getMonth() &&
      this.date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Checks if date is yesterday
   */
  isYesterday(): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      this.date.getDate() === yesterday.getDate() &&
      this.date.getMonth() === yesterday.getMonth() &&
      this.date.getFullYear() === yesterday.getFullYear()
    );
  }

  /**
   * Checks if date is tomorrow
   */
  isTomorrow(): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      this.date.getDate() === tomorrow.getDate() &&
      this.date.getMonth() === tomorrow.getMonth() &&
      this.date.getFullYear() === tomorrow.getFullYear()
    );
  }

  /**
   * Returns the day of the week name
   */
  dayName(): string {
    return this.date.toLocaleDateString(this.options.locale || 'en-US', {
      weekday: 'long',
    });
  }

  /**
   * Returns the month name
   */
  monthName(): string {
    return this.date.toLocaleDateString(this.options.locale || 'en-US', {
      month: 'long',
    });
  }
}

