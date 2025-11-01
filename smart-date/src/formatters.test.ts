import { describe, it, expect, beforeEach, vi } from 'vitest';
import { formatRelative, formatAbsolute } from './formatters';

describe('formatRelative', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should format "just now" for recent past', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);
    const date = new Date('2024-01-15T11:59:55');
    expect(formatRelative(date, { showSeconds: true })).toBe('just now');
  });

  it('should format minutes ago', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);
    const date = new Date('2024-01-15T11:30:00');
    expect(formatRelative(date)).toBe('30 minutes ago');
  });

  it('should format hours ago', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);
    const date = new Date('2024-01-15T10:00:00');
    expect(formatRelative(date)).toBe('2h ago');
  });

  it('should format yesterday', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);
    const date = new Date('2024-01-14T12:00:00');
    expect(formatRelative(date)).toBe('yesterday');
  });

  it('should format tomorrow', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);
    const date = new Date('2024-01-16T12:00:00');
    expect(formatRelative(date)).toBe('tomorrow');
  });
});

describe('formatAbsolute', () => {
  it('should format with default pattern', () => {
    const date = new Date('2024-01-15T12:30:45');
    const result = formatAbsolute(date);
    expect(result).toContain('2024');
    expect(result).toContain('January');
    expect(result).toContain('15');
  });

  it('should format with custom pattern', () => {
    const date = new Date('2024-01-15T12:30:45');
    expect(formatAbsolute(date, 'YYYY-MM-DD')).toBe('2024-01-15');
    expect(formatAbsolute(date, 'HH:mm:ss')).toBe('12:30:45');
  });
});

