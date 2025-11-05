function splitPath(path: string): string[] {
  if (!path) return [];
  return path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
}

export function get<T = unknown, D = undefined>(obj: any, path: string, defaultValue?: D): T | D {
  const parts = splitPath(path);
  let cur: any = obj;
  for (const key of parts) {
    if (cur == null) return defaultValue as D;
    cur = cur[key];
  }
  return (cur === undefined ? (defaultValue as D) : (cur as T));
}

export function set<T extends object>(obj: T, path: string, value: any): T {
  const parts = splitPath(path);
  if (parts.length === 0) return obj;
  let cur: any = obj;
  for (let i = 0; i < parts.length; i += 1) {
    const key = parts[i];
    if (i === parts.length - 1) {
      cur[key] = value;
    } else {
      if (cur[key] == null || typeof cur[key] !== 'object') {
        const nextIsIndex = /^(\d+)$/.test(parts[i + 1]);
        cur[key] = nextIsIndex ? [] : {};
      }
      cur = cur[key];
    }
  }
  return obj;
}

export const deepAccess = { get, set };


