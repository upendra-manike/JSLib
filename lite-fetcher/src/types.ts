export interface CacheOptions {
  enabled?: boolean;
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
  storage?: 'localStorage' | 'sessionStorage' | 'memory';
}

export interface RequestOptions extends Omit<RequestInit, 'cache'> {
  cache?: boolean | CacheOptions;
  baseURL?: string;
  timeout?: number;
  retry?: {
    attempts?: number;
    delay?: number;
  };
}

export interface ApiOptions extends RequestOptions {
  baseURL?: string;
  headers?: HeadersInit;
  timeout?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  cached?: boolean;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl?: number;
}

