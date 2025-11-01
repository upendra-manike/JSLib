import type { CacheEntry, CacheOptions } from './types';

const memoryCache = new Map<string, CacheEntry>();

export class Cache {
  private storage: 'localStorage' | 'sessionStorage' | 'memory';

  constructor(storage: CacheOptions['storage'] = 'localStorage') {
    this.storage = storage || 'localStorage';
  }

  get<T>(key: string): T | null {
    if (this.storage === 'memory') {
      const entry = memoryCache.get(key);
      if (!entry) return null;

      if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
        memoryCache.delete(key);
        return null;
      }

      return entry.data as T;
    }

    try {
      const storage =
        this.storage === 'localStorage'
          ? typeof window !== 'undefined'
            ? window.localStorage
            : null
          : typeof window !== 'undefined'
          ? window.sessionStorage
          : null;

      if (!storage) return null;

      const item = storage.getItem(key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);

      if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
        this.delete(key);
        return null;
      }

      return entry.data;
    } catch {
      return null;
    }
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    if (this.storage === 'memory') {
      memoryCache.set(key, entry);
      return;
    }

    try {
      const storage =
        this.storage === 'localStorage'
          ? typeof window !== 'undefined'
            ? window.localStorage
            : null
          : typeof window !== 'undefined'
          ? window.sessionStorage
          : null;

      if (storage) {
        storage.setItem(key, JSON.stringify(entry));
      }
    } catch (error) {
      // Storage might be full or not available
      console.warn('Failed to set cache:', error);
    }
  }

  delete(key: string): void {
    if (this.storage === 'memory') {
      memoryCache.delete(key);
      return;
    }

    try {
      const storage =
        this.storage === 'localStorage'
          ? typeof window !== 'undefined'
            ? window.localStorage
            : null
          : typeof window !== 'undefined'
          ? window.sessionStorage
          : null;

      if (storage) {
        storage.removeItem(key);
      }
    } catch (error) {
      console.warn('Failed to delete cache:', error);
    }
  }

  clear(): void {
    if (this.storage === 'memory') {
      memoryCache.clear();
      return;
    }

    try {
      const storage =
        this.storage === 'localStorage'
          ? typeof window !== 'undefined'
            ? window.localStorage
            : null
          : typeof window !== 'undefined'
          ? window.sessionStorage
          : null;

      if (storage) {
        // Only clear cache keys, not all storage
        const keys = Object.keys(storage);
        keys.forEach((key) => {
          if (key.startsWith('lite-fetcher:')) {
            storage.removeItem(key);
          }
        });
      }
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  generateKey(url: string, options?: RequestInit): string {
    const method = options?.method || 'GET';
    const body = options?.body
      ? typeof options.body === 'string'
        ? options.body
        : JSON.stringify(options.body)
      : '';
    return `lite-fetcher:${method}:${url}:${body}`;
  }
}

