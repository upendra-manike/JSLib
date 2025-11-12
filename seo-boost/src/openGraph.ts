/**
 * Open Graph and Twitter Cards Manager
 * Handles social media meta tags for better sharing
 */

export interface OpenGraphConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile' | 'video' | 'music' | 'book';
  siteName?: string;
  locale?: string;
  [key: string]: string | undefined;
}

export interface TwitterConfig {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string;
  description?: string;
  image?: string;
  creator?: string;
  site?: string;
  [key: string]: string | undefined;
}

/**
 * Set Open Graph meta tag
 */
export function setOpenGraphTag(property: string, content: string): void {
  if (typeof document === 'undefined') return;

  let meta = document.querySelector(`meta[property="og:${property}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', `og:${property}`);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

/**
 * Set Twitter Card meta tag
 */
export function setTwitterTag(name: string, content: string): void {
  if (typeof document === 'undefined') return;

  let meta = document.querySelector(`meta[name="twitter:${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', `twitter:${name}`);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

/**
 * Apply Open Graph configuration
 */
export function applyOpenGraph(config: OpenGraphConfig): void {
  if (typeof document === 'undefined') return;

  const defaultType = config.type || 'website';
  
  // Required Open Graph tags
  if (config.title) setOpenGraphTag('title', config.title);
  if (config.description) setOpenGraphTag('description', config.description);
  if (config.image) setOpenGraphTag('image', config.image);
  if (config.url) setOpenGraphTag('url', config.url);
  setOpenGraphTag('type', defaultType);

  // Optional Open Graph tags
  if (config.siteName) setOpenGraphTag('site_name', config.siteName);
  if (config.locale) setOpenGraphTag('locale', config.locale);

  // Custom Open Graph tags
  Object.entries(config).forEach(([key, value]) => {
    if (
      !['title', 'description', 'image', 'url', 'type', 'siteName', 'locale'].includes(key) &&
      typeof value === 'string'
    ) {
      setOpenGraphTag(key, value);
    }
  });
}

/**
 * Apply Twitter Cards configuration
 */
export function applyTwitterCards(config: TwitterConfig): void {
  if (typeof document === 'undefined') return;

  const defaultCard = config.card || 'summary_large_image';
  setTwitterTag('card', defaultCard);

  if (config.title) setTwitterTag('title', config.title);
  if (config.description) setTwitterTag('description', config.description);
  if (config.image) setTwitterTag('image', config.image);
  if (config.creator) setTwitterTag('creator', config.creator);
  if (config.site) setTwitterTag('site', config.site);

  // Custom Twitter tags
  Object.entries(config).forEach(([key, value]) => {
    if (
      !['card', 'title', 'description', 'image', 'creator', 'site'].includes(key) &&
      typeof value === 'string'
    ) {
      setTwitterTag(key, value);
    }
  });
}

/**
 * Clear all Open Graph tags
 */
export function clearOpenGraph(): void {
  if (typeof document === 'undefined') return;
  
  const ogTags = document.querySelectorAll('meta[property^="og:"]');
  ogTags.forEach((tag) => tag.remove());
}

/**
 * Clear all Twitter Card tags
 */
export function clearTwitterCards(): void {
  if (typeof document === 'undefined') return;
  
  const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
  twitterTags.forEach((tag) => tag.remove());
}

