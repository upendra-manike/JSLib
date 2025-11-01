import { ApiChain } from './ApiChain';
import type { ChainStep, ChainOptions } from './types';

/**
 * Creates a new API chain instance
 */
export function createChain(options?: ChainOptions): ApiChain {
  return new ApiChain(options);
}

/**
 * Creates a chain with steps and executes it immediately
 */
export function chain<T = any>(
  ...steps: ChainStep[]
): {
  run: (initialInput?: any) => Promise<T>;
  runWithResult: (initialInput?: any) => Promise<any>;
} {
  const apiChain = new ApiChain();
  steps.forEach((step) => apiChain.step(step));

  return {
    run: async (initialInput?: any) => {
      return apiChain.runData<T>(initialInput);
    },
    runWithResult: async (initialInput?: any) => {
      return apiChain.run(initialInput);
    },
  };
}

