import { describe, it, expect } from 'vitest';
import { ApiChain } from './ApiChain';

describe('ApiChain', () => {
  it('should execute steps in sequence', async () => {
    const chain = new ApiChain();

    const result = await chain
      .step(async (input) => {
        return input ? input + 1 : 1;
      })
      .step(async (input) => {
        return input * 2;
      })
      .step(async (input) => {
        return input + 10;
      })
      .run();

    expect(result.success).toBe(true);
    expect(result.data).toBe(12); // ((1) * 2) + 10
  });

  it('should pass result from previous step to next', async () => {
    const chain = new ApiChain();

    const result = await chain
      .step(async () => 'hello')
      .step(async (input) => input + ' world')
      .run();

    expect(result.data).toBe('hello world');
  });

  it('should stop on error by default', async () => {
    const chain = new ApiChain();

    const result = await chain
      .step(async () => 1)
      .step(async () => {
        throw new Error('Test error');
      })
      .step(async () => 3)
      .run();

    expect(result.success).toBe(false);
    expect(result.error?.message).toBe('Test error');
    expect(result.step).toBe(1);
  });

  it('should continue on error when stopOnError is false', async () => {
    const chain = new ApiChain({ stopOnError: false });

    const result = await chain
      .step(async () => 1)
      .step(async () => {
        throw new Error('Test error');
      })
      .step(async (input) => {
        // When error is passed, handle it and return 1 (handled error case)
        // Otherwise continue with input + 1
        return input instanceof Error ? 1 : input + 1;
      })
      .run();

    expect(result.success).toBe(true);
    expect(result.data).toBe(1); // Handled error case
  });

  it('should call onError hook', async () => {
    let errorCalled = false;
    const chain = new ApiChain({
      onError: async () => {
        errorCalled = true;
      },
    });

    await chain
      .step(async () => {
        throw new Error('Test error');
      })
      .run();

    expect(errorCalled).toBe(true);
  });

  it('should call onStepComplete hook', async () => {
    const completedSteps: number[] = [];
    const chain = new ApiChain({
      onStepComplete: async (_, step) => {
        completedSteps.push(step);
      },
    });

    await chain
      .step(async () => 1)
      .step(async () => 2)
      .run();

    expect(completedSteps).toEqual([0, 1]);
  });

  it('should work with initial input', async () => {
    const chain = new ApiChain();

    const result = await chain
      .step(async (input) => input * 2)
      .step(async (input) => input + 1)
      .run(5);

    expect(result.data).toBe(11); // (5 * 2) + 1
  });

  it('should clear steps', async () => {
    const chain = new ApiChain();
    chain.step(async () => 1);
    expect(chain.length).toBe(1);

    chain.clear();
    expect(chain.length).toBe(0);
  });
});

