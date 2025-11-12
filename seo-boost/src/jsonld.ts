/**
 * JSON-LD Structured Data Manager
 * Handles adding structured data for better search engine understanding
 */

export type SchemaType =
  | 'Organization'
  | 'WebSite'
  | 'WebPage'
  | 'Article'
  | 'BlogPosting'
  | 'Product'
  | 'Person'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'LocalBusiness'
  | 'Event'
  | 'Recipe'
  | 'VideoObject'
  | 'Review'
  | 'Rating';

export interface JSONLDConfig {
  '@context'?: string;
  '@type': SchemaType | SchemaType[];
  [key: string]: any;
}

/**
 * Add JSON-LD script to document head
 */
export function addJSONLD(data: JSONLDConfig, id?: string): string {
  if (typeof document === 'undefined') return '';

  const scriptId = id || `jsonld-${Date.now()}`;
  
  // Remove existing script with same ID if present
  const existing = document.getElementById(scriptId);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  }, null, 2);

  document.head.appendChild(script);
  return scriptId;
}

/**
 * Remove JSON-LD script by ID
 */
export function removeJSONLD(id: string): void {
  if (typeof document === 'undefined') return;
  
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

/**
 * Clear all JSON-LD scripts
 */
export function clearJSONLD(): void {
  if (typeof document === 'undefined') return;
  
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach((script) => script.remove());
}

/**
 * Helper: Create Organization schema
 */
export function createOrganizationSchema(config: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
}): JSONLDConfig {
  return {
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    ...(config.logo && { logo: config.logo }),
    ...(config.description && { description: config.description }),
    ...(config.contactPoint && { contactPoint: config.contactPoint }),
    ...(config.sameAs && { sameAs: config.sameAs }),
  };
}

/**
 * Helper: Create WebSite schema
 */
export function createWebSiteSchema(config: {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}): JSONLDConfig {
  return {
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
    ...(config.description && { description: config.description }),
    ...(config.potentialAction && { potentialAction: config.potentialAction }),
  };
}

/**
 * Helper: Create Article schema
 */
export function createArticleSchema(config: {
  headline: string;
  description: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': string;
    name: string;
    url?: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo?: {
      '@type': string;
      url: string;
    };
  };
}): JSONLDConfig {
  return {
    '@type': 'Article',
    headline: config.headline,
    description: config.description,
    ...(config.image && { image: config.image }),
    datePublished: config.datePublished,
    ...(config.dateModified && { dateModified: config.dateModified }),
    author: config.author,
    publisher: config.publisher,
  };
}

/**
 * Helper: Create Product schema
 */
export function createProductSchema(config: {
  name: string;
  description: string;
  image?: string | string[];
  brand?: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
}): JSONLDConfig {
  return {
    '@type': 'Product',
    name: config.name,
    description: config.description,
    ...(config.image && { image: config.image }),
    ...(config.brand && { brand: config.brand }),
    ...(config.offers && { offers: config.offers }),
    ...(config.aggregateRating && { aggregateRating: config.aggregateRating }),
  };
}

/**
 * Helper: Create BreadcrumbList schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>): JSONLDConfig {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

