import { Variants } from 'framer-motion';
import type { ScaleOptions, UseAnimationReturn } from '../types';

export function useScale(options: ScaleOptions = {}): UseAnimationReturn {
  const {
    from = 0,
    to = 1,
    duration = 0.5,
    delay = 0,
    ease = 'easeOut',
  } = options;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: from,
    },
    visible: {
      opacity: 1,
      scale: to,
      transition: {
        duration,
        delay,
        ease,
      },
    },
  };

  return {
    variants,
    initial: 'hidden',
    animate: 'visible',
  };
}

