import { FetchPlus } from './FetchPlus';
import type { FetchPlusOptions } from './types';

export function createApi(options?: FetchPlusOptions): FetchPlus {
  return new FetchPlus(options);
}

