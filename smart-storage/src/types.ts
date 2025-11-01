export type StorageType = 'localStorage' | 'sessionStorage' | 'indexedDB' | 'memory';

export interface StorageOptions {
  type?: StorageType;
  prefix?: string;
  ttl?: number;
}

export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

