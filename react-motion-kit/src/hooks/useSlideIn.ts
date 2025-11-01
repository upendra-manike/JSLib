import { Variants } from 'framer-motion';
import type { SlideInOptions, UseAnimationReturn } from '../types';

export function useSlideIn(options: SlideInOptions = {}): UseAnimationReturn {
  const {
    direction = 'up',
    distance = 50,
    duration = 0.5,
    delay = 0,
    ease = 'easeOut',
  } = options;

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  const transform = getTransform();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...transform,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
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

