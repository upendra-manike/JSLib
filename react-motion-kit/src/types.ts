import { Variants } from 'framer-motion';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  once?: boolean;
}

export interface SlideInOptions extends AnimationOptions {
  direction?: Direction;
  distance?: number;
}

export interface ScaleOptions extends AnimationOptions {
  from?: number;
  to?: number;
}

export interface RotateOptions extends AnimationOptions {
  from?: number;
  to?: number;
}

export interface UseAnimationReturn {
  variants: Variants;
  initial: string;
  animate: string;
  whileHover?: Variants;
  whileTap?: Variants;
}

