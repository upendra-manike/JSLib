import type { TelemetryEvent } from './types';

export function makeTelemetry() {
  const events: TelemetryEvent[] = [];
  return {
    push(type: string, meta?: Record<string, unknown>) {
      events.push({ type, at: Date.now(), meta });
    },
    all(): TelemetryEvent[] { return events; }
  };
}

