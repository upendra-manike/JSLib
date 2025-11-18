import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { getPreset, MotionPresetName } from '../utils/motionPresets';

export interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  motionPreset?: MotionPresetName;
  delay?: number;
}

export function MotionReveal({
  children,
  className = '',
  motionPreset = 'fadeUp',
  delay = 0,
}: MotionRevealProps) {
  const { ref, isInView } = useAnimateOnScroll<HTMLDivElement>({ once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getPreset(motionPreset)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
