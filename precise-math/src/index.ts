function toBigIntScaled(input: number | string, scale: number): bigint {
  const str = String(input);
  const [intPart, fracPartRaw = ''] = str.split('.');
  const fracPart = fracPartRaw.padEnd(scale, '0').slice(0, scale);
  const sign = str.trim().startsWith('-') ? -1n : 1n;
  const digits = (intPart.replace('-', '') + fracPart) || '0';
  const n = BigInt(digits);
  return sign * n;
}

function normalizeScale(a: number | string, b: number | string) {
  const aFrac = String(a).split('.')[1]?.length ?? 0;
  const bFrac = String(b).split('.')[1]?.length ?? 0;
  const scale = Math.max(aFrac, bFrac);
  const A = toBigIntScaled(a, scale);
  const B = toBigIntScaled(b, scale);
  const factor = 10n ** BigInt(scale);
  return { A, B, scale, factor };
}

function fromBigIntScaled(n: bigint, scale: number): number {
  if (scale === 0) return Number(n);
  const sign = n < 0n ? '-' : '';
  const s = (n < 0n ? -n : n).toString().padStart(scale + 1, '0');
  const intPart = s.slice(0, -scale) || '0';
  const fracPart = s.slice(-scale);
  return Number(`${sign}${intPart}.${fracPart}`);
}

export function add(a: number | string, b: number | string): number {
  const { A, B, scale } = normalizeScale(a, b);
  return fromBigIntScaled(A + B, scale);
}

export function sub(a: number | string, b: number | string): number {
  const { A, B, scale } = normalizeScale(a, b);
  return fromBigIntScaled(A - B, scale);
}

export function mul(a: number | string, b: number | string): number {
  const aStr = String(a);
  const bStr = String(b);
  const aFrac = aStr.split('.')[1]?.length ?? 0;
  const bFrac = bStr.split('.')[1]?.length ?? 0;
  const scale = aFrac + bFrac;
  const A = toBigIntScaled(a, aFrac);
  const B = toBigIntScaled(b, bFrac);
  return fromBigIntScaled(A * B, scale);
}

export function div(a: number | string, b: number | string, precision = 12): number {
  // Scale numerator to preserve precision
  const { A, B } = normalizeScale(a, b);
  if (B === 0n) throw new Error('Division by zero');
  const scaleUp = 10n ** BigInt(precision);
  const q = (A * scaleUp) / B;
  return fromBigIntScaled(q, precision);
}

export function round(value: number | string, digits = 0): number {
  const scale = Math.max(0, digits);
  const factor = 10n ** BigInt(scale);
  const n = toBigIntScaled(value, scale + 1); // extra digit for rounding
  const last = n % 10n;
  let head = n / 10n;
  if (last >= 5n) head += 1n;
  return fromBigIntScaled(head, scale);
}

export const preciseMath = { add, sub, mul, div, round };


