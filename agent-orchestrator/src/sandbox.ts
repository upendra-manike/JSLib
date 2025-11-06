export interface SandboxOptions {
  timeoutMs?: number;
  maxOutputBytes?: number;
}

export async function executeWithTimeout<T>(fn: () => Promise<T>, opts: SandboxOptions = {}): Promise<T> {
  const { timeoutMs = 10_000 } = opts;
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    return await Promise.race<T>([
      fn(),
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error('Tool execution timed out')), timeoutMs);
      })
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function capOutput(output: string, maxBytes: number = 262_144): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(output);
  if (bytes.length <= maxBytes) return output;
  // Truncate preserving valid UTF-8 by slicing bytes and decoding
  const truncated = bytes.slice(0, maxBytes);
  const decoder = new TextDecoder('utf-8', { fatal: false });
  return decoder.decode(truncated) + '\n[[TRUNCATED]]';
}

