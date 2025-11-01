import type { StorageOptions, StorageAdapter } from './types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}

class MemoryStorage implements StorageAdapter {
  private store = new Map<string, CacheEntry<any>>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    this.store.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl,
    });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

class BrowserStorage implements StorageAdapter {
  private storage: Storage;

  constructor(type: 'localStorage' | 'sessionStorage') {
    if (typeof window === 'undefined') {
      throw new Error(`${type} is only available in browser environment`);
    }
    this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const item = this.storage.getItem(key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);

      if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
        this.storage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const entry: CacheEntry<T> = {
        data: value,
        timestamp: Date.now(),
        ttl,
      };
      this.storage.setItem(key, JSON.stringify(entry));
    } catch {
      // Storage might be full
    }
  }

  async delete(key: string): Promise<void> {
    try {
      this.storage.removeItem(key);
    } catch {
      // Ignore
    }
  }

  async clear(): Promise<void> {
    try {
      this.storage.clear();
    } catch {
      // Ignore
    }
  }
}

export class SmartStorage {
  private adapter: StorageAdapter;
  private prefix: string;

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || 'smart-storage:';

    switch (options.type || 'localStorage') {
      case 'memory':
        this.adapter = new MemoryStorage();
        break;
      case 'sessionStorage':
        this.adapter = new BrowserStorage('sessionStorage');
        break;
      case 'localStorage':
      default:
        this.adapter = new BrowserStorage('localStorage');
        break;
    }
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    return this.adapter.get<T>(this.getKey(key));
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    return this.adapter.set(this.getKey(key), value, ttl);
  }

  async delete(key: string): Promise<void> {
    return this.adapter.delete(this.getKey(key));
  }

  async clear(): Promise<void> {
    return this.adapter.clear();
  }
}

