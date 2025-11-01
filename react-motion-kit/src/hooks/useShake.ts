import { Variants } from 'framer-motion';
import type { AnimationOptions, UseAnimationReturn } from '../types';

export function useShake(options: AnimationOptions = {}): UseAnimationReturn {
  const { duration = 0.5, delay = 0 } = options;

  const variants: Variants = {
    hidden: {
      x: 0,
    },
    visible: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration,
        delay,
        ease: 'easeInOut',
      },
    },
  };

  return {
    variants,
    initial: 'hidden',
    animate: 'visible',
  };
}

