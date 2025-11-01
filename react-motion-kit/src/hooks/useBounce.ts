import { Variants } from 'framer-motion';
import type { AnimationOptions, UseAnimationReturn } from '../types';

export function useBounce(options: AnimationOptions = {}): UseAnimationReturn {
  const {
    duration = 0.6,
    delay = 0,
    ease = [0.68, -0.55, 0.265, 1.55],
  } = options;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration,
        delay,
      },
    },
  };

  return {
    variants,
    initial: 'hidden',
    animate: 'visible',
  };
}

