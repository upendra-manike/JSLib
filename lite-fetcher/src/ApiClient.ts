import { Cache } from './cache';
import type {
  ApiOptions,
  RequestOptions,
  ApiResponse,
  CacheOptions,
} from './types';

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private defaultTimeout: number;
  private cache: Cache;

  constructor(options: ApiOptions = {}) {
    this.baseURL = options.baseURL || '';
    this.defaultHeaders = options.headers || {
      'Content-Type': 'application/json',
    };
    this.defaultTimeout = options.timeout || 30000;
    this.cache = new Cache('localStorage');
  }

  private createTimeoutAbort(timeout: number): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    retryOptions?: { attempts?: number; delay?: number }
  ): Promise<Response> {
    const attempts = retryOptions?.attempts || 0;
    const delay = retryOptions?.delay || 1000;

    for (let i = 0; i <= attempts; i++) {
      try {
        const controller = this.createTimeoutAbort(this.defaultTimeout);
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok && i < attempts) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response;
      } catch (error) {
        if (i === attempts) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error('Request failed after retries');
  }

  private getCacheKey(url: string, options: RequestInit): string {
    return this.cache.generateKey(url, options);
  }

  async request<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    // Handle caching
    const cacheOptions: CacheOptions | undefined =
      typeof options.cache === 'boolean'
        ? { enabled: options.cache }
        : options.cache;

    // Prepare request options (need to extract cache before creating fetchOptions)
    const { cache, baseURL: _, timeout: __, retry: ___, ...fetchOptionsForCache } = options;
    
    if (cacheOptions?.enabled !== false) {
      const cacheKey =
        cacheOptions?.key || this.getCacheKey(fullUrl, fetchOptionsForCache as RequestInit);
      const cached = this.cache.get<T>(cacheKey);

      if (cached !== null) {
        return {
          data: cached,
          status: 200,
          statusText: 'OK',
          headers: new Headers(),
          cached: true,
        };
      }
    }

    // Prepare request (already extracted above)
    const fetchOptions = fetchOptionsForCache;

    const headers = new Headers({
      ...this.defaultHeaders,
      ...fetchOptions.headers,
    });

    // Make request (exclude our custom cache property)
    try {
      const response = await this.fetchWithRetry(
        fullUrl,
        {
          ...fetchOptions,
          headers,
        } as RequestInit,
        options.retry
      );

      let data: T;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as T;
      }

      // Cache response if enabled
      if (cacheOptions?.enabled !== false) {
        const cacheKey =
          cacheOptions?.key || this.getCacheKey(fullUrl, fetchOptions as RequestInit);
        this.cache.set(cacheKey, data, cacheOptions?.ttl);
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        cached: false,
      };
    } catch (error) {
      throw new Error(`API request failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async get<T = any>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T = any>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T = any>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async patch<T = any>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delete<T = any>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

