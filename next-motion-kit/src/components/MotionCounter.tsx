import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

export interface MotionCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function MotionCounter({
  value,
  duration = 1.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = 'text-4xl font-bold',
}: MotionCounterProps) {
  const { ref, isInView } = useAnimateOnScroll({ once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 20,
    stiffness: 120,
    mass: Math.max(0.5, duration / 1.2),
  });
  const displayValue = useTransform(spring, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  );
}
