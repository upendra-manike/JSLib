import type {
  FetchPlusOptions,
  RequestOptions,
  Interceptor,
  FetchPlusResponse,
} from './types';

export class FetchPlus {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private defaultTimeout: number;
  private retryConfig?: FetchPlusOptions['retry'];
  private cacheConfig?: FetchPlusOptions['cache'];
  private requestInterceptors: Interceptor['request'][] = [];
  private responseInterceptors: Interceptor['response'][] = [];
  private errorInterceptors: Interceptor['error'][] = [];

  constructor(options: FetchPlusOptions = {}) {
    this.baseURL = options.baseURL || '';
    this.defaultHeaders = options.headers || {
      'Content-Type': 'application/json',
    };
    this.defaultTimeout = options.timeout || 30000;
    this.retryConfig = options.retry;
    this.cacheConfig = options.cache;
  }

  use(interceptor: Interceptor): void {
    if (interceptor.request) {
      this.requestInterceptors.push(interceptor.request);
    }
    if (interceptor.response) {
      this.responseInterceptors.push(interceptor.response);
    }
    if (interceptor.error) {
      this.errorInterceptors.push(interceptor.error);
    }
  }

  private async executeRequestInterceptors(
    config: RequestInit,
    url: string
  ): Promise<RequestInit> {
    let finalConfig = config;
    for (const interceptor of this.requestInterceptors) {
      if (interceptor) {
        finalConfig = await interceptor(finalConfig, url);
      }
    }
    return finalConfig;
  }

  private async executeResponseInterceptors(
    response: Response,
    request: RequestInit
  ): Promise<Response> {
    let finalResponse = response;
    for (const interceptor of this.responseInterceptors) {
      if (interceptor) {
        finalResponse = await interceptor(finalResponse, request);
      }
    }
    return finalResponse;
  }

  private async executeErrorInterceptors(
    error: Error,
    request: RequestInit
  ): Promise<Error> {
    let finalError = error;
    for (const interceptor of this.errorInterceptors) {
      if (interceptor) {
        finalError = await interceptor(finalError, request);
      }
    }
    return finalError;
  }

  private createTimeoutAbort(timeout: number): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit & { timeout?: number },
    retryOptions?: RequestOptions['retry']
  ): Promise<Response> {
    const attempts = retryOptions?.attempts || this.retryConfig?.attempts || 0;
    const delay = retryOptions?.delay || this.retryConfig?.delay || 1000;
    const isRetryable =
      retryOptions?.retryable || this.retryConfig?.retryable;

    for (let i = 0; i <= attempts; i++) {
      try {
        const timeout = (options as any).timeout || this.defaultTimeout;
        const controller = this.createTimeoutAbort(timeout);
        const mergedSignal = this.mergeSignals(controller.signal, options.signal);

        const response = await fetch(url, {
          ...options,
          signal: mergedSignal,
        });

        if (!response.ok && i < attempts) {
          const shouldRetry = isRetryable
            ? isRetryable(new Error(`HTTP ${response.status}`), response)
            : response.status >= 500;
          if (shouldRetry) {
            await this.delay(delay);
            continue;
          }
        }

        return response;
      } catch (error) {
        if (i === attempts) {
          throw error;
        }
        const shouldRetry = isRetryable
          ? isRetryable(error as Error)
          : true;
        if (shouldRetry) {
          await this.delay(delay);
        } else {
          throw error;
        }
      }
    }

    throw new Error('Request failed after retries');
  }

  private mergeSignals(signal1: AbortSignal, signal2?: AbortSignal | null): AbortSignal {
    if (!signal2) return signal1;
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal1.addEventListener('abort', abort);
    signal2.addEventListener('abort', abort);
    return controller.signal;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getCacheKey(url: string, options: RequestInit): string {
    return `fetch-plus:${options.method || 'GET'}:${url}:${options.body || ''}`;
  }

  private getCache(url: string, options: RequestInit): any | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      const key = this.getCacheKey(url, options);
      const item = localStorage.getItem(key);
      if (!item) return null;
      const { data, timestamp, ttl } = JSON.parse(item);
      if (ttl && Date.now() - timestamp > ttl) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  private setCache(url: string, options: RequestInit, data: any, ttl?: number): void {
    if (typeof window === 'undefined') return;
    try {
      const key = this.getCacheKey(url, options);
      localStorage.setItem(
        key,
        JSON.stringify({ data, timestamp: Date.now(), ttl })
      );
    } catch {
      // Storage might be full
    }
  }

  async request<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<FetchPlusResponse<T>> {
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    // Handle caching
    const cacheEnabled =
      typeof options.cache === 'number' ||
      (options.cache === true && this.cacheConfig?.enabled !== false);

    if (cacheEnabled) {
      const cached = this.getCache(fullUrl, options as RequestInit);
      if (cached !== null) {
        return {
          data: cached,
          status: 200,
          statusText: 'OK',
          headers: new Headers(),
          config: options as RequestInit,
        };
      }
    }

    // Prepare request
    const { cache, timeout, retry, cancel, ...fetchOptions } = options;

    const headers = new Headers({
      ...this.defaultHeaders,
      ...fetchOptions.headers,
    });

    let requestConfig: RequestInit = {
      ...fetchOptions,
      headers,
      signal: cancel,
    };

    // Execute request interceptors
    requestConfig = await this.executeRequestInterceptors(requestConfig, fullUrl);

    try {
      // Make request with retry
      const response = await this.fetchWithRetry(
        fullUrl,
        requestConfig,
        retry || this.retryConfig
      );

      // Execute response interceptors
      const processedResponse = await this.executeResponseInterceptors(
        response,
        requestConfig
      );

      // Parse response
      let data: T;
      const contentType = processedResponse.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await processedResponse.json();
      } else {
        data = (await processedResponse.text()) as T;
      }

      // Cache response if enabled
      if (cacheEnabled) {
        const ttl = typeof options.cache === 'number' ? options.cache : this.cacheConfig?.ttl;
        this.setCache(fullUrl, fetchOptions as RequestInit, data, ttl);
      }

      return {
        data,
        status: processedResponse.status,
        statusText: processedResponse.statusText,
        headers: processedResponse.headers,
        config: requestConfig,
      };
    } catch (error) {
      const processedError = await this.executeErrorInterceptors(
        error as Error,
        requestConfig
      );
      throw processedError;
    }
  }

  async get<T = any>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<FetchPlusResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T = any>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<FetchPlusResponse<T>> {
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
  ): Promise<FetchPlusResponse<T>> {
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
  ): Promise<FetchPlusResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delete<T = any>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<FetchPlusResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  createCancelToken(): AbortController {
    return new AbortController();
  }
}

/**
 * Simple cancellable fetch wrapper using AbortController
 */
export function cancellableFetch(input: RequestInfo | URL, init: RequestInit & { timeoutMs?: number } = {}) {
  const controller = new AbortController();
  const timeout = init.timeoutMs ? setTimeout(() => controller.abort(), init.timeoutMs) : null;
  const signal = init.signal
    ? new FetchPlus({}).['mergeSignals'](controller.signal, init.signal as any)
    : controller.signal;
  const promise = fetch(input, { ...init, signal }).finally(() => {
    if (timeout) clearTimeout(timeout);
  });
  return { promise, cancel: () => controller.abort() } as const;
}
