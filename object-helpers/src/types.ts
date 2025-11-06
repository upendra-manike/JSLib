/**
 * TypeScript utility types for object manipulation
 */

/**
 * Deep partial - makes all properties optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Deep required - makes all properties required recursively
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

/**
 * Deep readonly - makes all properties readonly recursively
 */
export type DeepReadonly<T> = T extends object
  ? {
      readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
  : T;

/**
 * Deep mutable - removes readonly recursively
 */
export type DeepMutable<T> = T extends object
  ? {
      -readonly [P in keyof T]: DeepMutable<T[P]>;
    }
  : T;

/**
 * Deep pick - pick nested keys recursively
 */
export type DeepPick<T, K extends string> = T extends object
  ? {
      [P in keyof T as P extends K ? P : never]: T[P] extends object
        ? DeepPick<T[P], Extract<K, `${string & P}.${string}`> extends `${infer Prefix}.${infer Rest}`
            ? Rest
            : never>
        : T[P];
    } & {
      [P in keyof T as P extends K ? never : P extends `${K}.${string}` ? never : P]: T[P] extends object
        ? DeepPick<T[P], Extract<K, `${string & P}.${string}`> extends `${infer Prefix}.${infer Rest}`
            ? Rest
            : never>
        : T[P];
    }
  : T;

/**
 * Deep omit - omit nested keys recursively
 */
export type DeepOmit<T, K extends string> = T extends object
  ? {
      [P in keyof T as P extends K ? never : P]: T[P] extends object
        ? DeepOmit<T[P], Extract<K, `${string & P}.${string}`> extends `${infer Prefix}.${infer Rest}`
            ? Rest
            : never>
        : T[P];
    }
  : T;

/**
 * Exact keys - ensures object has exactly these keys (no more, no less)
 */
export type ExactKeys<T, K extends keyof T> = T & {
  [P in Exclude<keyof T, K>]?: never;
};

/**
 * Optional keys - make specific keys optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Required keys - make specific keys required
 */
export type RequiredKeys<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

/**
 * Non-nullable - remove null and undefined from type
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Deep non-nullable - remove null and undefined recursively
 */
export type DeepNonNullable<T> = T extends object
  ? {
      [P in keyof T]: DeepNonNullable<NonNullable<T[P]>>;
    }
  : NonNullable<T>;

/**
 * ValueOf - get union of all values in object
 */
export type ValueOf<T> = T[keyof T];

/**
 * KeysOfType - get keys that have specific type
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * PickByType - pick properties of specific type
 */
export type PickByType<T, U> = Pick<T, KeysOfType<T, U>>;

/**
 * OmitByType - omit properties of specific type
 */
export type OmitByType<T, U> = Omit<T, KeysOfType<T, U>>;

