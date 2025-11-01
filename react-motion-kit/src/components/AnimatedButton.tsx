import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { useHover } from '../hooks/useHover';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface AnimatedButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode;
  variant?: 'default' | 'bounce' | 'scale' | 'pulse';
}

export function AnimatedButton({
  children,
  variant = 'default',
  ...props
}: AnimatedButtonProps) {
  const hover = useHover();

  const variants = {
    default: hover,
    bounce: {
      whileHover: {
        scale: 1.1,
        y: -5,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      },
      whileTap: {
        scale: 0.95,
      },
    },
    scale: {
      whileHover: {
        scale: 1.1,
      },
      whileTap: {
        scale: 0.9,
      },
    },
    pulse: {
      whileHover: {
        scale: 1.05,
      },
      whileTap: {
        scale: 0.95,
      },
    },
  };

  const animation = variants[variant];

  return (
    <motion.button {...(animation as MotionProps)} {...props}>
      {children}
    </motion.button>
  );
}

