import { useEffect, useRef, useState } from 'react';

export interface UseAnimateOnScrollOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useAnimateOnScroll<T extends HTMLElement = HTMLElement>(options: UseAnimateOnScrollOptions = {}) {
  const { once = true, root = null, rootMargin = '0px', threshold = 0.2 } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return { ref, isInView } as const;
}
