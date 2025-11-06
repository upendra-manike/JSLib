export type Disposer = () => void;

export function on<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  handler: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): Disposer;
export function on(
  target: EventTarget,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): Disposer;
export function on(
  target: EventTarget,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): Disposer {
  target.addEventListener(type, handler as EventListener, options);
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    target.removeEventListener(type, handler as EventListener, options as any);
  };
}

export function group(...disposers: Disposer[]): Disposer {
  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    for (const d of disposers) {
      try { d(); } catch { /* no-op */ }
    }
  };
}

export const eventManager = { on, group };

/**
 * Type-safe event emitter
 */
export class TypedEventEmitter<T extends Record<string, (...args: any[]) => void>> {
  private listeners: Map<keyof T, Set<(...args: any[]) => void>> = new Map();

  on<K extends keyof T>(event: K, handler: T[K]): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off<K extends keyof T>(event: K, handler: T[K]): void {
    this.listeners.get(event)?.delete(handler);
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
    this.listeners.get(event)?.forEach((handler) => {
      try {
        handler(...args);
      } catch (err) {
        console.error(`Error in event handler for ${String(event)}:`, err);
      }
    });
  }

  once<K extends keyof T>(event: K, handler: T[K]): () => void {
    const wrapped = ((...args: Parameters<T[K]>) => {
      handler(...args);
      this.off(event, wrapped as T[K]);
    }) as T[K];
    return this.on(event, wrapped);
  }

  removeAllListeners<K extends keyof T>(event?: K): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  listenerCount<K extends keyof T>(event: K): number {
    return this.listeners.get(event)?.size ?? 0;
  }
}


