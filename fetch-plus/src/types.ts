export interface FetchPlusOptions {
  baseURL?: string;
  headers?: HeadersInit;
  timeout?: number;
  retry?: {
    attempts?: number;
    delay?: number;
    retryable?: (error: Error, response?: Response) => boolean;
  };
  cache?: {
    enabled?: boolean;
    ttl?: number;
    key?: string;
  };
}

export interface RequestOptions extends Omit<RequestInit, 'cache'> {
  cache?: boolean | number;
  timeout?: number;
  retry?: {
    attempts?: number;
    delay?: number;
    retryable?: (error: Error, response?: Response) => boolean;
  };
  cancel?: AbortSignal;
}

export interface Interceptor {
  request?: (
    config: RequestInit,
    url: string
  ) => RequestInit | Promise<RequestInit>;
  response?: (
    response: Response,
    request: RequestInit
  ) => Response | Promise<Response>;
  error?: (error: Error, request: RequestInit) => Error | Promise<Error>;
}

export interface FetchPlusResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: RequestInit;
}

