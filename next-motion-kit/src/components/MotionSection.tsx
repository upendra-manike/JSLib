import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getPreset, MotionPresetName } from '../utils/motionPresets';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

export interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  motionPreset?: MotionPresetName;
  once?: boolean;
  delay?: number;
}

export function MotionSection({
  children,
  className = '',
  motionPreset = 'fadeUp',
  once = true,
  delay = 0,
}: MotionSectionProps) {
  const { ref, isInView } = useAnimateOnScroll({ once });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getPreset(motionPreset)}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}
