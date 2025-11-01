/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof globalThis === 'undefined' || typeof (globalThis as any).navigator === 'undefined' || !(globalThis as any).navigator.clipboard) {
    // Fallback for older browsers
    if (typeof globalThis === 'undefined' || typeof (globalThis as any).document === 'undefined') return false;
    const doc = (globalThis as any).document;
    const textArea = doc.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    doc.body.appendChild(textArea);
    textArea.select();
    try {
      doc.execCommand('copy');
      doc.body.removeChild(textArea);
      return true;
    } catch {
      doc.body.removeChild(textArea);
      return false;
    }
  }

  try {
    await ((globalThis as any).navigator.clipboard.writeText(text));
    return true;
  } catch {
    return false;
  }
}

/**
 * Detect if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  if (typeof globalThis === 'undefined') return false;
  const win = globalThis as any;
  const doc = win.document;
  if (!doc || !element.getBoundingClientRect) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (win.innerHeight || doc.documentElement.clientHeight) &&
    rect.right <= (win.innerWidth || doc.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(
  element: HTMLElement | string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void {
  if (typeof globalThis === 'undefined') return;
  const doc = (globalThis as any).document;
  if (!doc) return;
  
  const target = typeof element === 'string' 
    ? doc.querySelector(element) as HTMLElement
    : element;
  
  if (target && target.scrollIntoView) {
    target.scrollIntoView(options);
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

