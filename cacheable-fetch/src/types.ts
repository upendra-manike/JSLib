export interface CacheableFetchOptions extends Omit<RequestInit, 'cache'> {
  ttl?: number; // Time to live in milliseconds
  cache?: 'localStorage' | 'indexedDB' | 'memory';
  backgroundRefresh?: boolean;
  key?: string;
}

