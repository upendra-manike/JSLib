/**
 * SEO Boost - Complete SEO optimization package
 * 
 * @packageDocumentation
 */

// Meta Tags
export {
  applyMetaConfig,
  setMetaTag,
  removeMetaTag,
  setTitle,
  setCanonical,
  setLang,
  clearMetaTags,
} from './metaManager';
export type { MetaConfig } from './metaManager';

// Open Graph & Twitter Cards
export {
  applyOpenGraph,
  applyTwitterCards,
  setOpenGraphTag,
  setTwitterTag,
  clearOpenGraph,
  clearTwitterCards,
} from './openGraph';
export type { OpenGraphConfig, TwitterConfig } from './openGraph';

// JSON-LD Structured Data
export {
  addJSONLD,
  removeJSONLD,
  clearJSONLD,
  createOrganizationSchema,
  createWebSiteSchema,
  createArticleSchema,
  createProductSchema,
  createBreadcrumbSchema,
} from './jsonld';
export type { JSONLDConfig, SchemaType } from './jsonld';

// Sitemap & Robots
export {
  generateSitemap,
  generateRobotsTxt,
  formatSitemapDate,
} from './sitemap';
export type { SitemapUrl, SitemapConfig, RobotsConfig } from './sitemap';

// SEO Analyzer
export { analyzeSEO } from './analyzer';
export type { SEOAnalysis, SEOIssue, AnalyzerConfig } from './analyzer';

// React hooks (re-exported for convenience)
export { useSEO } from './react/useSEO';
export type { SEOConfig } from './react/useSEO';

