import type { ReactNode } from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: ReactNode;
  animate?: boolean;
}

