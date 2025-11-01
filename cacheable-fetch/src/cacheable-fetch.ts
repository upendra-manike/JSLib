import type { CacheableFetchOptions } from './types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();

async function getIndexedDB(key: string): Promise<any | null> {
  if (typeof globalThis === 'undefined') return null;
  const win = globalThis as any;
  if (!win.indexedDB) return null;
  
  return new Promise((resolve) => {
    const request = win.indexedDB.open('cacheable-fetch', 1);
    
    request.onerror = () => resolve(null);
    
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(['cache'], 'readonly');
      const store = transaction.objectStore('cache');
      const getRequest = store.get(key);
      
      getRequest.onsuccess = () => {
        const entry = getRequest.result;
        if (!entry) {
          resolve(null);
          return;
        }
        
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
          resolve(null);
          return;
        }
        
        resolve(entry.data);
      };
      
      getRequest.onerror = () => resolve(null);
    };
    
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('cache')) {
        db.createObjectStore('cache');
      }
    };
  });
}

async function setIndexedDB(key: string, data: any, ttl?: number): Promise<void> {
  if (typeof globalThis === 'undefined') return;
  const win = globalThis as any;
  if (!win.indexedDB) return;
  
  return new Promise((resolve, reject) => {
    const request = win.indexedDB.open('cacheable-fetch', 1);
    
    request.onerror = () => reject(new Error('IndexedDB open failed'));
    
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      
      const entry: CacheEntry<any> = {
        data,
        timestamp: Date.now(),
        ttl,
      };
      
      store.put(entry, key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error('IndexedDB write failed'));
    };
    
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('cache')) {
        db.createObjectStore('cache');
      }
    };
  });
}

function getLocalStorage(key: string): any | null {
  if (typeof globalThis === 'undefined') return null;
  const win = globalThis as any;
  if (!win.localStorage) return null;
  try {
    const item = win.localStorage.getItem(key);
    if (!item) return null;
    const entry: CacheEntry<any> = JSON.parse(item);
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      win.localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setLocalStorage(key: string, data: any, ttl?: number): void {
  if (typeof globalThis === 'undefined') return;
  const win = globalThis as any;
  if (!win.localStorage) return;
  try {
    const entry: CacheEntry<any> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    win.localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Storage might be full
  }
}

function generateCacheKey(url: string, options: RequestInit): string {
  return `cacheable-fetch:${options.method || 'GET'}:${url}:${options.body || ''}`;
}

export async function cacheableFetch<T = any>(
  url: string,
  options: CacheableFetchOptions = {}
): Promise<T> {
  const { ttl, cache = 'localStorage', backgroundRefresh, key, ...fetchOptions } = options;
  
  const cacheKey = key || generateCacheKey(url, fetchOptions);
  
  // Try to get from cache
  let cachedData: T | null = null;
  
  if (cache === 'indexedDB') {
    cachedData = await getIndexedDB(cacheKey);
  } else if (cache === 'localStorage') {
    cachedData = getLocalStorage(cacheKey);
  } else {
    const entry = memoryCache.get(cacheKey);
    if (entry && (!entry.ttl || Date.now() - entry.timestamp < entry.ttl)) {
      cachedData = entry.data;
    }
  }
  
  // Return cached data immediately if available
  if (cachedData !== null) {
    // Background refresh if enabled
    if (backgroundRefresh) {
      fetch(url, fetchOptions)
        .then(res => res.json())
        .then(data => {
          if (cache === 'indexedDB') {
            setIndexedDB(cacheKey, data, ttl);
          } else if (cache === 'localStorage') {
            setLocalStorage(cacheKey, data, ttl);
          } else {
            memoryCache.set(cacheKey, { data, timestamp: Date.now(), ttl });
          }
        })
        .catch(() => {
          // Ignore background refresh errors
        });
    }
    return cachedData;
  }
  
  // Fetch fresh data
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  
  // Cache the response
  if (cache === 'indexedDB') {
    await setIndexedDB(cacheKey, data, ttl);
  } else if (cache === 'localStorage') {
    setLocalStorage(cacheKey, data, ttl);
  } else {
    memoryCache.set(cacheKey, { data, timestamp: Date.now(), ttl });
  }
  
  return data;
}

