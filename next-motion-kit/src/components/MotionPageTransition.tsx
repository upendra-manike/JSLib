import { ReactNode } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { getPreset, MotionPresetName } from '../utils/motionPresets';

export interface MotionPageTransitionProps {
  children: ReactNode;
  routeKey: string;
  preset?: MotionPresetName | Variants;
  duration?: number;
}

export function MotionPageTransition({
  children,
  routeKey,
  preset = 'fadeUp',
  duration = 0.35,
}: MotionPageTransitionProps) {
  const variants = typeof preset === 'string' ? getPreset(preset) : preset;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration }}
        style={{ minHeight: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
