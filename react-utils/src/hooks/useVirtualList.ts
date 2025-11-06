import { useState, useEffect, useRef, useMemo } from 'react';

export interface UseVirtualListOptions {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
  containerHeight: number;
}

export interface VirtualItem {
  index: number;
  start: number;
  end: number;
  size: number;
}

/**
 * Virtual list hook for rendering large lists efficiently.
 * Solves: "Large lists cause UI performance issues (no virtualization/windowing)"
 */
export function useVirtualList<T>(
  items: T[],
  options: UseVirtualListOptions
): {
  virtualItems: VirtualItem[];
  totalHeight: number;
  scrollToIndex: (index: number) => void;
  scrollOffset: number;
  setScrollOffset: (offset: number) => void;
} {
  const { itemHeight, overscan = 5, containerHeight } = options;
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  const getItemHeight = useMemo(() => {
    if (typeof itemHeight === 'function') {
      return itemHeight;
    }
    return () => itemHeight;
  }, [itemHeight]);

  const totalHeight = useMemo(() => {
    return items.reduce((sum, _, index) => sum + getItemHeight(index), 0);
  }, [items, getItemHeight]);

  const virtualItems = useMemo(() => {
    const result: VirtualItem[] = [];
    let offset = 0;
    let startIndex = 0;
    let endIndex = 0;

    // Find start index
    for (let i = 0; i < items.length; i++) {
      const height = getItemHeight(i);
      if (offset + height > scrollOffset) {
        startIndex = Math.max(0, i - overscan);
        break;
      }
      offset += height;
    }

    // Find end index
    offset = 0;
    for (let i = 0; i < items.length; i++) {
      const height = getItemHeight(i);
      offset += height;
      if (offset > scrollOffset + containerHeight) {
        endIndex = Math.min(items.length, i + overscan);
        break;
      }
    }
    if (endIndex === 0) endIndex = items.length;

    // Build virtual items
    offset = 0;
    for (let i = 0; i < startIndex; i++) {
      offset += getItemHeight(i);
    }

    for (let i = startIndex; i < endIndex; i++) {
      const size = getItemHeight(i);
      result.push({
        index: i,
        start: offset,
        end: offset + size,
        size,
      });
      offset += size;
    }

    return result;
  }, [items, scrollOffset, containerHeight, overscan, getItemHeight]);

  const scrollToIndex = (index: number) => {
    let offset = 0;
    for (let i = 0; i < index && i < items.length; i++) {
      offset += getItemHeight(i);
    }
    setScrollOffset(offset);
    if (containerRef.current) {
      containerRef.current.scrollTop = offset;
    }
  };

  return {
    virtualItems,
    totalHeight,
    scrollToIndex,
    scrollOffset,
    setScrollOffset,
  };
}

