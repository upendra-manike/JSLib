import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface MotionNavbarProps {
  children: ReactNode;
  className?: string;
  hideOnScroll?: boolean;
  blur?: boolean;
}

export function MotionNavbar({
  children,
  className = '',
  hideOnScroll = true,
  blur = true,
}: MotionNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!hideOnScroll || typeof window === 'undefined') return;

    const handleScroll = () => {
      const current = window.scrollY;
      if (current < lastScrollY) {
        setVisible(true);
      } else if (current > lastScrollY + 10) {
        setVisible(false);
      }
      setLastScrollY(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, lastScrollY]);

  const baseClasses = blur ? 'backdrop-blur bg-white/80 shadow-sm' : 'bg-white shadow';

  return (
    <motion.nav
      initial={false}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 w-full ${baseClasses} ${className}`.trim()}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {children}
      </div>
    </motion.nav>
  );
}
