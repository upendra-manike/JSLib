import { Variants } from 'framer-motion';
import type { AnimationOptions, UseAnimationReturn } from '../types';

export function usePulse(options: AnimationOptions = {}): UseAnimationReturn {
  const { duration = 1.5, delay = 0 } = options;

  const variants: Variants = {
    hidden: {
      scale: 1,
    },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration,
        delay,
        repeat: Infinity,
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

