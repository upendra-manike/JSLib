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


