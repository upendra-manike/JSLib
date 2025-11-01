import React from 'react';
import type { SkeletonProps } from './types';

export function Skeleton({
  width,
  height,
  className = '',
  animate = true,
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || '1em',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    ...(animate && {
      animation: 'skeleton-pulse 1.5s ease-in-out infinite',
    }),
  };

  return (
    <>
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <div className={className} style={style} />
    </>
  );
}

export function SkeletonAuto({ target, children }: { target?: string; children?: React.ReactNode }) {
  if (target && typeof document !== 'undefined') {
    // In browser, clone structure from target element
    const element = document.querySelector(target);
    if (element) {
      return (
        <div style={{ opacity: 0.6 }}>
          <Skeleton width={element.clientWidth} height={element.clientHeight} />
        </div>
      );
    }
  }

  if (children) {
    // Wrap children with skeleton overlay
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ opacity: 0 }}>
          {children}
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    );
  }

  return <Skeleton />;
}

