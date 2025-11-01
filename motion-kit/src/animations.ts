import type { AnimationOptions } from './types';

export function animateElement(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: AnimationOptions = {}
): Animation {
  return element.animate(keyframes, {
    duration: options.duration || 500,
    delay: options.delay || 0,
    easing: options.easing || 'ease-out',
    fill: options.fill || 'forwards',
  });
}

export function fadeIn(
  element: HTMLElement,
  options: AnimationOptions = {}
): Animation {
  return animateElement(
    element,
    [
      { opacity: 0 },
      { opacity: 1 },
    ],
    options
  );
}

export function slideIn(
  element: HTMLElement,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  options: AnimationOptions = {}
): Animation {
  const transforms: Record<string, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  };

  return animateElement(
    element,
    [
      { opacity: 0, transform: transforms[direction] },
      { opacity: 1, transform: 'translate(0, 0)' },
    ],
    options
  );
}

export function scale(
  element: HTMLElement,
  from: number = 0,
  to: number = 1,
  options: AnimationOptions = {}
): Animation {
  return animateElement(
    element,
    [
      { opacity: 0, transform: `scale(${from})` },
      { opacity: 1, transform: `scale(${to})` },
    ],
    options
  );
}

export function bounce(
  element: HTMLElement,
  options: AnimationOptions = {}
): Animation {
  return animateElement(
    element,
    [
      { opacity: 0, transform: 'scale(0.3)' },
      { opacity: 1, transform: 'scale(1.1)' },
      { transform: 'scale(0.9)' },
      { transform: 'scale(1)' },
    ],
    {
      ...options,
      duration: options.duration || 600,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  );
}

