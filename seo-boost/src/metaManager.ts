/**
 * Meta Tag Manager
 * Handles setting and updating meta tags in the document head
 */

export interface MetaConfig {
  title?: string;
  description?: string;
  keywords?: string | string[];
  author?: string;
  canonical?: string;
  robots?: string;
  viewport?: string;
  charset?: string;
  lang?: string;
  themeColor?: string;
  [key: string]: any;
}

/**
 * Set or update a meta tag
 */
export function setMetaTag(name: string, content: string): void {
  if (typeof document === 'undefined') return;

  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

/**
 * Remove a meta tag
 */
export function removeMetaTag(name: string): void {
  if (typeof document === 'undefined') return;
  
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) {
    meta.remove();
  }
}

/**
 * Set document title
 */
export function setTitle(title: string): void {
  if (typeof document === 'undefined') return;
  document.title = title;
}

/**
 * Set canonical URL
 */
export function setCanonical(url: string): void {
  if (typeof document === 'undefined') return;
  
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
}

/**
 * Set language attribute
 */
export function setLang(lang: string): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', lang);
}

/**
 * Apply meta configuration
 */
export function applyMetaConfig(config: MetaConfig): void {
  if (typeof document === 'undefined') return;

  // Title
  if (config.title) {
    setTitle(config.title);
  }

  // Canonical
  if (config.canonical) {
    setCanonical(config.canonical);
  }

  // Language
  if (config.lang) {
    setLang(config.lang);
  }

  // Standard meta tags
  const metaFields: (keyof MetaConfig)[] = [
    'description',
    'keywords',
    'author',
    'robots',
    'viewport',
    'themeColor',
  ];

  metaFields.forEach((field) => {
    const value = config[field];
    if (value) {
      if (field === 'keywords' && Array.isArray(value)) {
        setMetaTag(field as string, value.join(', '));
      } else if (typeof value === 'string') {
        setMetaTag(field as string, value);
      }
    }
  });

  // Custom meta tags
  Object.entries(config).forEach(([key, value]) => {
    if (
      !['title', 'canonical', 'lang', 'openGraph', 'twitter', 'jsonLd'].includes(key) &&
      typeof value === 'string' &&
      !metaFields.includes(key as keyof MetaConfig)
    ) {
      setMetaTag(key as string, value);
    }
  });
}

/**
 * Clear all meta tags (useful for cleanup)
 */
export function clearMetaTags(): void {
  if (typeof document === 'undefined') return;
  
  const metaTags = document.querySelectorAll('meta[name]');
  metaTags.forEach((tag) => tag.remove());
}

