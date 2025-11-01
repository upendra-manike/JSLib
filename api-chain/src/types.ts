export type ApiRequest<T = any> = (...args: any[]) => Promise<T>;

export interface ChainStep<TInput = any, TOutput = any> {
  (input: TInput): Promise<TOutput>;
}

export interface ChainOptions {
  onError?: (error: Error, step: number) => void | Promise<void>;
  onStepComplete?: (result: any, step: number) => void | Promise<void>;
  stopOnError?: boolean;
}

export interface ChainResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
  step?: number;
  results?: any[];
}

