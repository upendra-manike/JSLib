/**
 * React Hook for SEO
 * Easy-to-use hook for managing SEO in React applications
 */

import { useEffect } from 'react';
import { applyMetaConfig, MetaConfig } from '../metaManager';
import { applyOpenGraph, OpenGraphConfig } from '../openGraph';
import { applyTwitterCards, TwitterConfig } from '../openGraph';
import { addJSONLD, JSONLDConfig } from '../jsonld';

export interface SEOConfig extends Omit<MetaConfig, 'openGraph' | 'twitter' | 'jsonLd'> {
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  jsonLd?: JSONLDConfig | JSONLDConfig[];
  jsonLdId?: string;
}

/**
 * React hook for SEO management
 * 
 * @example
 * ```tsx
 * function HomePage() {
 *   useSEO({
 *     title: "Home | My App",
 *     description: "Best platform for SEO automation",
 *     openGraph: {
 *       image: "https://myapp.com/og-image.jpg",
 *       type: "website",
 *     },
 *   });
 * 
 *   return <h1>Welcome</h1>;
 * }
 * ```
 */
export function useSEO(config: SEOConfig | null | undefined): void {
  useEffect(() => {
    if (!config) return;

    // Apply meta tags
    applyMetaConfig(config);

    // Apply Open Graph
    if (config.openGraph) {
      applyOpenGraph(config.openGraph);
    }

    // Apply Twitter Cards
    if (config.twitter) {
      applyTwitterCards(config.twitter);
    }

    // Apply JSON-LD
    if (config.jsonLd) {
      const jsonLdArray = Array.isArray(config.jsonLd) ? config.jsonLd : [config.jsonLd];
      jsonLdArray.forEach((jsonLd, index) => {
        const id = config.jsonLdId || `jsonld-${index}`;
        addJSONLD(jsonLd, id);
      });
    }
  }, [config]);
}

