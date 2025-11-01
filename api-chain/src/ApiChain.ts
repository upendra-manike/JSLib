import type {
  ChainStep,
  ChainOptions,
  ChainResult,
  ApiRequest,
} from './types';

export class ApiChain {
  private steps: ChainStep[] = [];
  private options: ChainOptions;

  constructor(options: ChainOptions = {}) {
    this.options = {
      stopOnError: true,
      ...options,
    };
  }

  /**
   * Add a step to the chain
   */
  step<TInput = any, TOutput = any>(
    stepFn: ChainStep<TInput, TOutput>
  ): this {
    this.steps.push(stepFn);
    return this;
  }

  /**
   * Execute the chain
   */
  async run<T = any>(initialInput?: any): Promise<ChainResult<T>> {
    const results: any[] = [];
    let currentInput = initialInput;

    for (let i = 0; i < this.steps.length; i++) {
      try {
        const result = await this.steps[i](currentInput);
        results.push(result);
        currentInput = result;

        // Call onStepComplete hook
        if (this.options.onStepComplete) {
          await this.options.onStepComplete(result, i);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));

        // Call onError hook
        if (this.options.onError) {
          await this.options.onError(err, i);
        }

        if (this.options.stopOnError) {
          return {
            success: false,
            error: err,
            step: i,
            results,
          };
        }

        // If not stopping on error, continue with error as input
        currentInput = err;
        results.push(err);
      }
    }

    return {
      success: true,
      data: currentInput,
      results,
    };
  }

  /**
   * Execute the chain and return only the final data
   */
  async runData<T = any>(initialInput?: any): Promise<T> {
    const result = await this.run<T>(initialInput);
    if (!result.success) {
      throw result.error || new Error('Chain execution failed');
    }
    return result.data!;
  }

  /**
   * Clear all steps
   */
  clear(): this {
    this.steps = [];
    return this;
  }

  /**
   * Get the number of steps
   */
  get length(): number {
    return this.steps.length;
  }
}

