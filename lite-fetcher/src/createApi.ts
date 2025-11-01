import { ApiClient } from './ApiClient';
import type { ApiOptions } from './types';

/**
 * Creates a new API client instance
 */
export function createApi(options?: ApiOptions): ApiClient {
  return new ApiClient(options);
}

/**
 * Default API instance with no base URL
 */
export const api = new ApiClient();

