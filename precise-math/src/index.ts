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

/**
 * Calculate factorial of a number
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Check if a number is prime
 */
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Generate Fibonacci sequence up to n numbers
 */
export function fibonacci(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

/**
 * Find Greatest Common Divisor (GCD)
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Find Least Common Multiple (LCM)
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Reverse digits of a number
 */
export function reverseDigits(n: number): number {
  const reversed = parseInt(String(n).split('').reverse().join(''), 10);
  return n < 0 ? -reversed : reversed;
}

/**
 * Check if number is perfect square
 */
export function isPerfectSquare(n: number): boolean {
  if (n < 0) return false;
  const sqrt = Math.sqrt(n);
  return Number.isInteger(sqrt);
}

/**
 * Generate random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert decimal to binary
 */
export function decimalToBinary(n: number): string {
  if (n === 0) return '0';
  const sign = n < 0 ? '-' : '';
  n = Math.abs(n);
  let binary = '';
  while (n > 0) {
    binary = (n % 2) + binary;
    n = Math.floor(n / 2);
  }
  return sign + binary;
}

/**
 * Convert binary to decimal
 */
export function binaryToDecimal(binary: string): number {
  const sign = binary.startsWith('-') ? -1 : 1;
  const cleaned = binary.replace(/^-/, '');
  return sign * parseInt(cleaned, 2);
}

/**
 * Check if number is Armstrong number
 */
export function isArmstrong(n: number): boolean {
  const digits = String(n).split('').map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0);
  return sum === n;
}

/**
 * Check if number is perfect number
 */
export function isPerfect(n: number): boolean {
  if (n < 2) return false;
  let sum = 1;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i * i !== n) sum += n / i;
    }
  }
  return sum === n;
}

/**
 * Calculate sum of digits
 */
export function sumOfDigits(n: number): number {
  return String(Math.abs(n))
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

/**
 * Count digits in a number
 */
export function countDigits(n: number): number {
  return String(Math.abs(n)).length;
}

/**
 * Check if number is palindrome
 */
export function isPalindromeNumber(n: number): boolean {
  const str = String(n);
  return str === str.split('').reverse().join('');
}

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Calculate compound interest
 */
export function compoundInterest(
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number = 1
): number {
  return principal * Math.pow(1 + rate / (100 * compoundingFrequency), compoundingFrequency * time);
}

/**
 * Calculate simple interest
 */
export function simpleInterest(principal: number, rate: number, time: number): number {
  return (principal * rate * time) / 100;
}

/**
 * Convert number to words (basic implementation for 0-999)
 */
export function numberToWords(n: number): string {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if (n === 0) return 'zero';
  if (n < 0) return 'negative ' + numberToWords(-n);
  if (n < 20) return ones[n];
  if (n < 100) {
    const ten = Math.floor(n / 10);
    const one = n % 10;
    return tens[ten] + (one ? '-' + ones[one] : '');
  }
  if (n < 1000) {
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    return ones[hundred] + ' hundred' + (remainder ? ' ' + numberToWords(remainder) : '');
  }
  return String(n); // For numbers >= 1000, return as string
}

/**
 * Check if number is power of 2
 */
export function isPowerOf2(n: number): boolean {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}


