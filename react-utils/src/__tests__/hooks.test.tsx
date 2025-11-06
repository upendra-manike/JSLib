import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useDebounce,
  useThrottle,
  usePrevious,
  useWindowSize,
  useSafeState,
  useStableCallback,
  useAsync,
  useErrorBoundary,
} from '../index';

describe('React Utils Hooks', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('useDebounce delays value updates', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useDebounce(value, delay);
    }, { initialProps: { value: 'test', delay: 100 } });

    expect(result.current).toBe('test');
    
    rerender({ value: 'updated', delay: 100 });
    expect(result.current).toBe('test'); // Still old value
    
    act(() => {
      vi.advanceTimersByTime(150);
    });
    
    expect(result.current).toBe('updated');
  });

  it('usePrevious returns previous value', () => {
    const { result, rerender } = renderHook(({ value }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return usePrevious(value);
    }, { initialProps: { value: 1 } });

    expect(result.current).toBeUndefined();
    
    rerender({ value: 2 });
    expect(result.current).toBe(1);
    
    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });

  it('useSafeState prevents updates after unmount', () => {
    const { result, unmount } = renderHook(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSafeState(0);
    });

    act(() => {
      result.current[1](1);
    });
    expect(result.current[0]).toBe(1);

    unmount();
    
    act(() => {
      result.current[1](2);
    });
    // Should not cause errors or warnings
  });

  it('useStableCallback returns stable reference', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    
    const { result, rerender } = renderHook(({ cb }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useStableCallback(cb);
    }, { initialProps: { cb: callback1 } });

    const stable1 = result.current;
    
    rerender({ cb: callback2 });
    const stable2 = result.current;
    
    // Reference should be stable even though callback changed
    expect(stable1).toBe(stable2);
    
    act(() => {
      stable1();
    });
    
    // Should call the latest callback
    expect(callback2).toHaveBeenCalled();
  });

  it('useAsync handles async operations', async () => {
    vi.useRealTimers();
    const asyncFn = vi.fn().mockResolvedValue('success');
    
    const { result } = renderHook(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useAsync(asyncFn, false);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('useAsync handles errors', async () => {
    vi.useRealTimers();
    const error = new Error('Test error');
    const asyncFn = vi.fn().mockRejectedValue(error);
    
    const { result } = renderHook(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useAsync(asyncFn, false);
    });

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeNull();
  });

  it('useErrorBoundary captures errors', () => {
    const { result } = renderHook(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useErrorBoundary();
    });

    expect(result.current.hasError).toBe(false);

    act(() => {
      result.current.captureError(new Error('Test error'));
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.error?.message).toBe('Test error');

    act(() => {
      result.current.resetError();
    });

    expect(result.current.hasError).toBe(false);
  });
});

