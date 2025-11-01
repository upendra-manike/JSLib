import { Variants } from 'framer-motion';
import type { AnimationOptions, UseAnimationReturn } from '../types';

export function useFadeIn(options: AnimationOptions = {}): UseAnimationReturn {
  const {
    duration = 0.5,
    delay = 0,
    ease = 'easeOut',
    once = false,
  } = options;

  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
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

