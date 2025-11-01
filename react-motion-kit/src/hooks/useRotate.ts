import { Variants } from 'framer-motion';
import type { RotateOptions, UseAnimationReturn } from '../types';

export function useRotate(options: RotateOptions = {}): UseAnimationReturn {
  const {
    from = 0,
    to = 360,
    duration = 0.5,
    delay = 0,
    ease = 'easeOut',
  } = options;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      rotate: from,
    },
    visible: {
      opacity: 1,
      rotate: to,
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

