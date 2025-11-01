import type { RelativeTimeOptions } from './types';

/**
 * Formats a date as relative time (e.g., "2h ago", "yesterday", "next Monday")
 */
export function formatRelative(
  date: Date,
  options?: RelativeTimeOptions,
  now: Date = new Date()
): string {
  const opts = {
    showSeconds: false,
    showFuture: true,
    threshold: {
      seconds: 60,
      minutes: 60,
      hours: 24,
      days: 7,
    },
    ...options,
  };

  const diff = date.getTime() - now.getTime();
  const absDiff = Math.abs(diff);
  const isFuture = diff > 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Handle special cases
  if (!isFuture && isToday(date, now)) {
    if (opts.showSeconds && seconds < opts.threshold.seconds!) {
      if (seconds < 10) return 'just now';
      return `${seconds}s ago`;
    }
    if (minutes < opts.threshold.minutes!) {
      if (minutes === 0) return 'just now';
      if (minutes === 1) return '1 minute ago';
      return `${minutes} minutes ago`;
    }
    if (hours < opts.threshold.hours!) {
      if (hours === 1) return '1 hour ago';
      return `${hours}h ago`;
    }
  }

  if (!isFuture && isYesterday(date, now)) {
    return 'yesterday';
  }

  if (isFuture && isTomorrow(date, now)) {
    return 'tomorrow';
  }

  if (isFuture && isToday(date, now)) {
    if (minutes < opts.threshold.minutes!) {
      if (minutes === 0) return 'in a moment';
      if (minutes === 1) return 'in 1 minute';
      return `in ${minutes} minutes`;
    }
    if (hours < opts.threshold.hours!) {
      if (hours === 1) return 'in 1 hour';
      return `in ${hours}h`;
    }
  }

  // Day names for this week/next week
  if (days < opts.threshold.days!) {
    const dayName = getDayName(date);
    if (!isFuture) {
      return dayName; // e.g., "Monday", "Tuesday"
    } else {
      return `next ${dayName}`;
    }
  }

  // For dates further away, return formatted absolute date
  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'} ${isFuture ? 'from now' : 'ago'}`;
  }

  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ${isFuture ? 'from now' : 'ago'}`;
  }

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ${isFuture ? 'from now' : 'ago'}`;
}

/**
 * Formats a date as absolute time
 */
export function formatAbsolute(
  date: Date,
  pattern?: string,
  locale: string = 'en-US'
): string {
  if (!pattern) {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Simple pattern replacement
  const replacements: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    M: String(date.getMonth() + 1),
    DD: String(date.getDate()).padStart(2, '0'),
    D: String(date.getDate()),
    HH: String(date.getHours()).padStart(2, '0'),
    H: String(date.getHours()),
    mm: String(date.getMinutes()).padStart(2, '0'),
    m: String(date.getMinutes()),
    ss: String(date.getSeconds()).padStart(2, '0'),
    s: String(date.getSeconds()),
  };

  let result = pattern;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(key, value);
  }

  return result;
}

// Helper functions
function isToday(date: Date, now: Date): boolean {
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function isYesterday(date: Date, now: Date): boolean {
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

function isTomorrow(date: Date, now: Date): boolean {
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}

function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

