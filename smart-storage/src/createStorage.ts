import { SmartStorage } from './SmartStorage';
import type { StorageOptions } from './types';

export function createStorage(options?: StorageOptions): SmartStorage {
  return new SmartStorage(options);
}

