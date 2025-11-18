import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { getPreset, motionPresets, MotionPresetName } from '../utils/motionPresets';

interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface MotionHeroProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: HeroAction[];
  align?: 'left' | 'center';
  className?: string;
  motionPreset?: MotionPresetName;
  children?: ReactNode;
}

const actionStyles: Record<NonNullable<HeroAction['variant']>, string> = {
  primary: 'bg-black text-white border border-transparent hover:bg-black/90',
  secondary: 'bg-white text-black border border-black/10 hover:border-black/30',
  ghost: 'bg-transparent text-black border border-transparent hover:border-black/10',
};

export function MotionHero({
  eyebrow,
  title,
  description,
  actions,
  align = 'center',
  className = '',
  motionPreset = 'fadeUp',
  children,
}: MotionHeroProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const actionAlignment = align === 'center' ? 'justify-center' : 'justify-start';

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={motionPresets.stagger}
      className={`flex flex-col gap-6 ${alignment} ${className}`.trim()}
    >
      {eyebrow && (
        <motion.span variants={getPreset(motionPreset)} className="text-sm uppercase tracking-[0.3em] text-gray-500">
          {eyebrow}
        </motion.span>
      )}

      <motion.h1
        variants={getPreset(motionPreset)}
        className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p variants={getPreset(motionPreset)} className="max-w-2xl text-lg text-gray-600">
          {description}
        </motion.p>
      )}

      {children && (
        <motion.div variants={getPreset(motionPreset)} className="w-full">
          {children}
        </motion.div>
      )}

      {actions && actions.length > 0 && (
        <motion.div variants={getPreset(motionPreset)} className={`flex flex-wrap gap-3 ${actionAlignment}`}>
          {actions.map((action) => {
            const variant = action.variant || 'primary';
            const baseClasses = 'px-5 py-3 rounded-full text-sm font-semibold transition-colors';
            const classes = `${baseClasses} ${actionStyles[variant]}`;

            if (action.href) {
              return (
                <a key={action.label} href={action.href} className={classes}>
                  {action.label}
                </a>
              );
            }

            return (
              <button key={action.label} className={classes} onClick={action.onClick}>
                {action.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </motion.section>
  );
}
