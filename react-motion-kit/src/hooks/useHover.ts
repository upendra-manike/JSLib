import { useMemo } from 'react';

export interface UseHoverOptions {
  scale?: number;
  rotate?: number;
  translateY?: number;
  duration?: number;
}

export interface UseHoverReturn {
  whileHover: Record<string, any>;
  whileTap?: Record<string, any>;
}

export function useHover(options: UseHoverOptions = {}): UseHoverReturn {
  const {
    scale = 1.05,
    rotate = 0,
    translateY = -5,
    duration = 0.2,
  } = options;

  return useMemo(
    () => ({
      whileHover: {
        scale,
        rotate,
        y: translateY,
        transition: {
          duration,
          ease: 'easeOut',
        },
      },
      whileTap: {
        scale: 0.95,
        transition: {
          duration: 0.1,
        },
      },
    }),
    [scale, rotate, translateY, duration]
  );
}

